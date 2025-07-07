import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Save the uploaded file to /tmp
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploadPath = `/tmp/${file.name}`;
  fs.writeFileSync(uploadPath, buffer);

  // Call the Python script for analysis
  const pythonProcess = spawn('python3', [
    path.join(process.cwd(), 'src/lib/analyze_video.py'),
    uploadPath
  ]);

  let result = '';
  for await (const chunk of pythonProcess.stdout) {
    result += chunk;
  }

  let error = '';
  for await (const chunk of pythonProcess.stderr) {
    error += chunk;
  }

  const exitCode = await new Promise((resolve) => {
    pythonProcess.on('close', resolve);
  });

  if (exitCode !== 0) {
    return NextResponse.json({ error: error || 'Python analysis failed' }, { status: 500 });
  }

  // Assume the Python script prints a JSON string with keywords
  let keywords;
  try {
    keywords = JSON.parse(result);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid response from analyzer' }, { status: 500 });
  }

  return NextResponse.json({ keywords });
}

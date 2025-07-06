import sys
import os
from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip

def add_watermark(input_path, output_path, watermark_text="NS"):
    # Load the video
    video = VideoFileClip(input_path)
    # Create a text watermark
    txt_clip = TextClip(watermark_text, fontsize=48, color='white', font='Arial-Bold', stroke_color='black', stroke_width=2)
    txt_clip = txt_clip.set_opacity(0.5)
    txt_clip = txt_clip.set_position(("right", "bottom")).set_duration(video.duration)
    # Overlay the text on the video
    result = CompositeVideoClip([video, txt_clip])
    # Write the result
    result.write_videofile(output_path, codec="libx264", audio_codec="aac")

def main():
    if len(sys.argv) < 3:
        print("Usage: python add_watermark.py <input_video> <output_video> [watermark_text]")
        sys.exit(1)
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    watermark_text = sys.argv[3] if len(sys.argv) > 3 else "NS"
    add_watermark(input_path, output_path, watermark_text)

if __name__ == "__main__":
    main()

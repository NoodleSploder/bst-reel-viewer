import torch
import sys
import json
import torchvision.transforms as T
from torchvision import models
import decord
from decord import VideoReader, cpu
import numpy as np
import urllib.request

# Load a pretrained model (e.g., ResNet50)
model = models.resnet50(pretrained=True)
model.eval()

# ImageNet class labels
LABELS_URL = "https://raw.githubusercontent.com/pytorch/hub/master/imagenet_classes.txt"
LABELS = []
with urllib.request.urlopen(LABELS_URL) as f:
    LABELS = [line.strip().decode('utf-8') for line in f.readlines()]

transform = T.Compose([
    T.ToPILImage(),
    T.Resize(256),
    T.CenterCrop(224),
    T.ToTensor(),
    T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def analyze_video(video_path):
    vr = VideoReader(video_path, ctx=cpu(0))
    num_frames = len(vr)
    # Sample up to 16 evenly spaced frames
    idxs = np.linspace(0, num_frames - 1, num=min(16, num_frames), dtype=int)
    frames = vr.get_batch(idxs).asnumpy()
    keywords = set()
    for frame in frames:
        img = transform(frame)
        img = img.unsqueeze(0)
        with torch.no_grad():
            outputs = model(img)
            _, preds = outputs.topk(3, 1, True, True)
            for pred in preds[0]:
                keywords.add(LABELS[pred])
    return list(keywords)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No video path provided"}))
        sys.exit(1)
    video_path = sys.argv[1]
    try:
        keywords = analyze_video(video_path)
        print(json.dumps(keywords))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

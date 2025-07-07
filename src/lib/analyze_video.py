import torch
import sys
import json
import torchvision.transforms as T
from torchvision import models
from torchvision.models import ResNet50_Weights
import decord
from decord import VideoReader, cpu
import numpy as np

# 1. Load a pretrained model (ResNet50)
weights = ResNet50_Weights.IMAGENET1K_V1
model = models.resnet50(weights=weights)
model.eval()

# 2. ImageNet class labels
LABELS = weights.meta['categories']

# 3. Define a single, correct transform for individual frames
transform = T.Compose([
    T.ToPILImage(),
    T.Resize(256),
    T.CenterCrop(224),
    T.ToTensor(),
    T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def analyze_video(video_path):
    try:
        vr = VideoReader(video_path, ctx=cpu(0))
        # Sample up to 32 evenly spaced frames
        num_frames = len(vr)
        if num_frames == 0:
            return {"error": "Video has no frames"}

        indices = np.linspace(0, num_frames - 1, num=min(num_frames, 32), dtype=int)
        frames = vr.get_batch(indices).asnumpy()

        all_preds = []
        for frame in frames:
            img = transform(frame).unsqueeze(0) # Add batch dimension
            with torch.no_grad():
                outputs = model(img)
                # Get top 5 predictions for the frame
                _, preds = torch.topk(outputs, 5)
                all_preds.extend(preds[0].cpu().numpy())

        # Aggregate predictions: count occurrences of each predicted class
        if not all_preds:
            return []

        pred_counts = {}
        for pred in all_preds:
            pred_counts[pred] = pred_counts.get(pred, 0) + 1

        # Sort by count to find the most common predictions
        sorted_preds = sorted(pred_counts.keys(), key=lambda p: pred_counts[p], reverse=True)

        # Return the top 5 most frequent keywords
        keywords = [LABELS[pred] for pred in sorted_preds[:5]]
        return keywords

    except decord.DECORDError as e:
        return {"error": f"Failed to read video file: {str(e)}"}
    except Exception as e:
        # Catch other potential errors during processing
        return {"error": f"An unexpected error occurred: {str(e)}"}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No video path provided"}))
        sys.exit(1)

    video_path = sys.argv[1]
    result = analyze_video(video_path)

    # The script will now output either a list of keywords or an error object
    print(json.dumps(result))

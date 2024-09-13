import torchvision.models as models
from torchvision.models import ResNet50_Weights

# ResNet 사전 학습된 가중치에서 ImageNet 클래스 라벨 가져오기
weights = ResNet50_Weights.DEFAULT
imagenet_labels = weights.meta["categories"]

# ImageNet 클래스 출력
print(imagenet_labels)
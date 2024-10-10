import torch
import torchvision.models as models
from torchvision import transforms
from PIL import Image
import subprocess
import requests
import time

# ImageNet 클래스 라벨 가져오기
from torchvision.models import ResNet50_Weights

# 1. ResNet50 모델 불러오기 (사전 학습된 가중치 사용)
def load_resnet50_model():
    model = models.resnet50(weights="ResNet50_Weights.DEFAULT")
    model.eval()  # 모델을 평가 모드로 전환
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    return model.to(device)

# 2. 이미지 전처리 (ResNet 입력에 맞는 크기와 정규화 적용)
def preprocess_image(image):
    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    img_t = preprocess(image)  # Image 객체를 바로 처리
    img_t = img_t.unsqueeze(0)  # 배치 차원 추가
    return img_t

# 3. 이미지 예측 수행
def predict_image(model, image_tensor):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    image_tensor = image_tensor.to(device)

    with torch.no_grad():
        outputs = model(image_tensor)
        _, predicted = torch.max(outputs, 1)
    
    return predicted.item()

# 4. 예측된 클래스 이름 찾기
def get_class_label(class_idx):
    weights = ResNet50_Weights.DEFAULT
    class_labels = weights.meta["categories"]
    return class_labels[class_idx]

# 5. ResNet이 학습한 ImageNet 클래스 목록 출력
def print_imagenet_classes():
    weights = ResNet50_Weights.DEFAULT
    class_labels = weights.meta["categories"]
    
    print("ResNet이 학습한 ImageNet 클래스 목록 :")
    for idx, label in enumerate(class_labels):
        print(f"{idx}: {label}")
    
    return class_labels

# Flask 서버를 실행하고 AI 예측 요청 보내기
def run_predict(image_url):
    # Flask 서버를 백그라운드에서 실행
    subprocess.Popen(["python", "app.py"])
    
    # Flask 서버가 준비될 때까지 대기 (필요시 조정)
    time.sleep(2)  # 서버가 시작될 시간을 확보

    # Flask API에 예측 요청
    response = requests.post("https://j11a101.p.ssafy.io/run-predict/", json={"image_url": image_url})
    
    return response.json()
import torch
import torchvision.models as models
from torchvision import transforms
from PIL import Image

# 학습된 ResNet50 모델 불러오기
def load_trained_resnet50_model(model_path, num_classes):
    model = models.resnet50(weights=None)
    num_ftrs = model.fc.in_features
    model.fc = torch.nn.Linear(num_ftrs, num_classes)
    
    # 학습된 가중치 불러오기
    model.load_state_dict(torch.load(model_path))
    model.eval()  # 평가 모드로 전환
    return model

# 이미지 전처리
def preprocess_image(image_path):
    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    
    img = Image.open(image_path)
    img_t = preprocess(img)
    img_t = img_t.unsqueeze(0)  # 배치 차원 추가
    return img_t

# 이미지 예측 수행
def predict_image(model, image_tensor):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    image_tensor = image_tensor.to(device)
    model = model.to(device)

    with torch.no_grad():
        outputs = model(image_tensor)
        _, predicted = torch.max(outputs, 1)
    
    return predicted.item()

# 전체 실행
if __name__ == "__main__":
    model_path = "resnet50_trained.pth"  # 학습된 가중치 파일 경로
    num_classes = 5  # 학습에 사용한 클래스 수
    model = load_trained_resnet50_model(model_path, num_classes)

    image_path = "./images/image1.jpg"  # 분석할 이미지 경로
    image_tensor = preprocess_image(image_path)

    predicted_class_idx = predict_image(model, image_tensor)
    print(f"Predicted class index: {predicted_class_idx}")

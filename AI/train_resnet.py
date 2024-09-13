import torch
import torch.optim as optim
import torch.nn as nn
from torchvision import datasets, models, transforms
from torch.utils.data import DataLoader

# ResNet50 모델 정의 (사전 학습된 가중치 없이 처음부터 학습)
def load_resnet50_model(num_classes):
    model = models.resnet50(weights=None)  # 사전 학습된 가중치 없이 초기화
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, num_classes)  # 새로운 데이터셋에 맞게 출력 레이어 수정
    return model

# 데이터셋 준비
def get_data_loaders(data_dir, batch_size=32):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(15),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    train_dataset = datasets.ImageFolder(root=data_dir + '/train', transform=transform)
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)

    val_dataset = datasets.ImageFolder(root=data_dir + '/val', transform=transform)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)

    return train_loader, val_loader

# 모델 학습 함수
def train_model(model, train_loader, val_loader, num_epochs=10, learning_rate=0.001):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(model.parameters(), lr=learning_rate, momentum=0.9)

    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0
        for inputs, labels in train_loader:
            inputs, labels = inputs.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

        print(f'Epoch {epoch+1}/{num_epochs}, Loss: {running_loss/len(train_loader)}')

        # 검증 데이터 평가
        model.eval()
        correct = 0
        total = 0
        with torch.no_grad():
            for inputs, labels in val_loader:
                inputs, labels = inputs.to(device), labels.to(device)
                outputs = model(inputs)
                _, predicted = torch.max(outputs.data, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()

        accuracy = 100 * correct / total
        print(f'Validation Accuracy: {accuracy}%')

    return model

# 학습된 모델 저장
def save_model(model, path):
    torch.save(model.state_dict(), path)

if __name__ == "__main__":
    data_dir = "./data"
    num_classes = 5  # 클래스 수에 맞게 설정
    batch_size = 16
    num_epochs = 10
    learning_rate = 0.001

    model = load_resnet50_model(num_classes)
    train_loader, val_loader = get_data_loaders(data_dir, batch_size)

    model = train_model(model, train_loader, val_loader, num_epochs, learning_rate)

    # 학습이 끝난 모델 저장
    save_model(model, "resnet50_trained.pth")

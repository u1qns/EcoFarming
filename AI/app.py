from flask import Flask, request, jsonify
from flask_cors import CORS
import predict  # predict.py에서 AI 모델을 불러온다고 가정
from PIL import Image
import os
import subprocess
import time
import requests

app = Flask(__name__)
CORS(app, supports_credentials=True)  # CORS 허용 설정

# 이미지가 저장된 경로 (기본 디렉토리 설정)
UPLOAD_FOLDER = '/home/ubuntu/uploads'


# AI 예측을 수행하는 엔드포인트
@app.route('/run-predict/', methods=['POST'])
def run_predict():
    print(1111111111111111111)
    try:
        print(222222222222222)
        data = request.json
        # 클라이언트에서 받은 파일 경로에서 파일명만 추출
        image_filename = os.path.basename(data['image_url'])
        print(f"Received image filename: {image_filename}")  # 디버깅을 위한 로그 출력

        # 서버에서 해당 파일명을 사용하여 경로 생성
        image_path = os.path.join(UPLOAD_FOLDER ,image_filename)
        print(f"Full image path: {image_path}")

        # 서버의 해당 경로에 파일이 존재하는지 확인
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"File not found: {image_path}")

        print(f"Processing image at ``path: {image_path}")  # 경로 확인 로그

        image = Image.open(image_path)

        # AI 예측 로직
        print("Loading model...")
        model = predict.load_resnet50_model()
        print("Model loaded successfully.")

        print("Preprocessing image...")
        image_tensor = predict.preprocess_image(image)
        print("Image preprocessed successfully.")

        print("Predicting image...")
        prediction = predict.predict_image(model, image_tensor)
        print(f"Prediction: {prediction}")

        # 예측 결과 반환
        return jsonify({"aiPass": prediction})
    except Exception as e:
        # 오류 메시지 출력
        print(f"Error during prediction: {e}", 500)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # flask서버 시작
    app.run(host="0.0.0.0", port=5000, debug=True)
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
UPLOAD_FOLDER = '/home/ubuntu/uploads/ProofPhotos'

# AI 예측을 수행하는 엔드포인트
@app.route('/run-predict', methods=['POST'])
def run_predict():
    try:
        data = request.json
        image_filename = data['image_url']  # 이미지 파일 이름만 전달된다고 가정
        print(f"Received image filename: {image_filename}")  # 디버깅을 위한 로그 출력

        # 이미지의 전체 경로를 생성 (UPLOAD_FOLDER와 파일명을 합침)
        image_path = os.path.join(UPLOAD_FOLDER, image_filename)

        # 로컬 파일에서 이미지를 읽음
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"File not found: {image_path}")

        print(f"Processing image at path: {image_path}")  # 경로 확인 로그

        image = Image.open(image_path)

        # AI 예측 로직
        model = predict.load_resnet50_model()
        image_tensor = predict.preprocess_image(image)
        prediction = predict.predict_image(model, image_tensor)

        # 예측 결과 반환
        return jsonify({"aiPass": prediction})
    except Exception as e:
        # 오류 메시지 출력
        print(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500


# Flask 서버를 서브프로세스로 실행
def start_flask_server():
    print("Flask 서버를 실행합니다...")
    process = subprocess.Popen(["python", "-m", "flask", "run", "--host=0.0.0.0", "--port=5000"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # 서버가 완전히 시작될 때까지 상태 확인
    while True:
        try:
            response = requests.get("http://localhost:5000")
            if response.status_code == 200:
                break
        except requests.exceptions.ConnectionError:
            time.sleep(1)  # 연결이 될 때까지 대기
    return process



# 서버 실행 후 나머지 로직을 실행하는 함수
def run_post_server_code():
    # Flask 서버가 실행된 후에 자동으로 예측 요청을 보낼 수 있음
    try:
        image_url = "2024-10-07_11.png"  # 예시 이미지 파일명
        api_url = "http://localhost:5000/run-predict"

        # Flask 서버의 예측 엔드포인트로 요청 전송
        response = requests.post(api_url, json={"image_url": image_url})
        print("자동 예측 요청 결과:", response.json())
    except Exception as e:
        print(f"자동 예측 요청 중 오류 발생: {e}")


if __name__ == '__main__':
    # 1. Flask 서버를 서브프로세스로 시작
    flask_process = start_flask_server()
    
    # 2. Flask 서버가 시작된 후 나머지 코드를 실행
    run_post_server_code()

    # Flask 서버가 종료될 때까지 대기하거나, 필요 시 플라스크 종료 처리 가능
    flask_process.terminate()  # 작업이 완료되면 플라스크 서버 종료
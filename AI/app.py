from flask import Flask, request, jsonify
from flask_cors import CORS
import predict  # predict.py에서 AI 모델을 불러온다고 가정
import requests
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app)  # CORS 허용 설정

# AI 예측을 수행하는 엔드포인트
def run_predict():
    try:
        data = request.json
        image_url = data['image_url']

        # URL에서 이미지를 다운로드
        response = requests.get(image_url)
        image = Image.open(BytesIO(response.content))

        # predict.py에서 예측 함수 호출
        model = predict.load_resnet50_model()
        image_tensor = predict.preprocess_image(image)
        prediction_idx = predict.predict_image(model, image_tensor)

        # 예측된 클래스 인덱스를 클래스 이름으로 변환
        predicted_label = predict.get_class_label(prediction_idx)

        # AI 예측 결과 반환
        result = {"aiPass": predicted_label}  # 여기서 label을 반환
        return jsonify(result)
    except Exception as e:
        # 예외 발생 시 오류 메시지를 Flask 콘솔에 출력
        print(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500
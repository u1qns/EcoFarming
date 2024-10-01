from flask import Flask, request, jsonify
from flask_cors import CORS
import predict  # predict.py에서 AI 모델을 불러온다고 가정
import requests
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app)  # CORS 허용 설정

# AI 예측을 수행하는 엔드포인트
@app.route('/run-predict', methods=['POST'])
def run_predict():
    try:
        data = request.json
        print(data)
        image_url = data['image_url']

        # URL에서 이미지를 다운로드
        response = requests.get(image_url)
        image = Image.open(BytesIO(response.content))

        # predict.py에서 예측 함수 호출
        model = predict.load_resnet50_model()
        image_tensor = predict.preprocess_image(image)
        prediction = predict.predict_image(model, image_tensor)

        # AI 예측 결과 반환
        result = {"aiPass": prediction}
        return jsonify(result)
    except Exception as e:
        # 예외 발생 시 오류 메시지를 Flask 콘솔에 출력
        print(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
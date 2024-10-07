from flask import Flask, request, jsonify
from flask_cors import CORS
import predict  # predict.py에서 AI 모델을 불러온다고 가정
from PIL import Image
import os

app = Flask(__name__)
CORS(app, supports_credentials=True)  # CORS 허용 설정

# 이미지가 저장된 경로 (기본 디렉토리 설정)
UPLOAD_FOLDER = '/home/ubuntu/uploads/ProofPhotos'

# AI 예측을 수행하는 엔드포인트
@app.route('/run-predict', methods=['POST'])
def run_predict():
    try:
        data = request.json
        print(data)
        image_filename = data['image_url']  # 이미지 파일 이름만 전달된다고 가정

        # 이미지의 전체 경로를 생성 (UPLOAD_FOLDER와 파일명을 합침)
        image_path = os.path.join(UPLOAD_FOLDER, image_filename)

        # 로컬 파일에서 이미지를 읽음
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"File not found: {image_path}")
        
        image = Image.open(image_path)

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
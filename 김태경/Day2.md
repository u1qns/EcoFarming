# 사용할 AI 모델 조사
## 조사한 AI 모델 종류
* YOLO8 (You Only Look Once 8)
    * 빠르고 정확하게 이미지 내의 물체를 인식할 수 있는 알고리즘입니다. 다양한 크기의 물체들을 동시에 감지할 수 있어서 상품 인식에 자주 사용됩니다.
    * 빠르게 인식이 가능하지만 정밀하지 못함
* Faster R-CNN (Region-based Convolutional Neural Networks)
    * 매우 높은 정확도로 이미지를 분석하여 물체를 감지할 수 있습니다. 다만, YOLO보다 속도는 느리지만 정밀한 상품 인식이 필요한 경우에 적합합니다.
* Google Cloud Vision API
    * 이 API를 사용하면 사진 속 물체를 인식하고, 각각의 상품을 분류할 수 있습니다. 특히 이미지에서 특정 물체를 식별해 내는 데 유용합니다.
    * 클라우드 기반 서비스로 local 또는 server에서 사용 불가 -> API를 통해 접근하여 사용해야 함
* Amazon Rekognition
    * 이미지와 동영상에서 객체, 사람, 텍스트 등을 분석할 수 있습니다. 상품 인식 및 카테고리 분류에도 많이 사용됩니다.
    클라우드 기반 서비스로 local 또는 server에서 사용 불가 -> API를 통해 접근하여 사용해야 함

## 사용할 AI모델
결정되진 않았지만 YOLOv8, Faster R-CNN, OpenCV, Tesseract 중 하나를 선택해서 사용할 것 같음 -> 추가적인 조사가 필요함
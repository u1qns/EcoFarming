# AWS EC2에 스프링 프로젝트를 배포하기

AWS EC2에 스프링 프로젝트를 배포하는 것은 클라우드 환경에서 애플리케이션을 호스팅하는 일반적인 방법 중 하나입니다. 이 과정에서는 EC2 인스턴스를 생성하고, 필요한 환경을 설정하며, 스프링 애플리케이션을 배포하고 실행하는 방법을 단계별로 설명하겠습니다.

1. AWS 계정 생성 및 EC2 인스턴스 생성
AWS 계정 생성
AWS 공식 웹사이트(https://aws.amazon.com/)에 접속하여 "계정 만들기" 버튼을 클릭합니다.
계정을 생성하고 로그인합니다.
EC2 인스턴스 생성
AWS 관리 콘솔에 로그인 후 "EC2" 서비스를 검색하여 이동합니다.
"인스턴스 시작" 버튼을 클릭합니다.
사용할 Amazon Machine Image (AMI)를 선택합니다. 예를 들어, "Amazon Linux 2 AMI"를 선택합니다.
인스턴스 유형을 선택합니다. 예: t2.micro (프리 티어 사용 가능)
인스턴스 세부 사항을 구성합니다. 기본 설정으로 진행해도 됩니다.
"저장소 추가" 단계에서 기본 옵션을 사용합니다.
"태그 추가" 단계에서 태그를 추가할 수 있습니다. (선택 사항)
"보안 그룹 구성" 단계에서는 인바운드 규칙에 HTTP(80) 및 SSH(22) 규칙을 추가합니다.
HTTP: 포트 80, 소스는 0.0.0.0/0로 설정하여 모든 IP로부터의 접근을 허용합니다.
SSH: 포트 22, 소스는 0.0.0.0/0로 설정하여 모든 IP로부터의 접근을 허용합니다. (보안을 위해 나중에 특정 IP로 제한하는 것이 좋습니다.)
"인스턴스 시작" 버튼을 클릭하고 키 페어를 생성하거나 기존 키 페어를 선택합니다. 이 키 페어는 EC2 인스턴스에 SSH로 접근하는 데 사용됩니다.
인스턴스가 시작될 때까지 기다립니다.
2. EC2 인스턴스 설정
SSH를 통해 EC2 인스턴스에 접속
로컬 컴퓨터에서 터미널(또는 PuTTY 등 SSH 클라이언트)을 열고, 인스턴스 시작 시 생성한 키 페어(.pem 파일)를 사용하여 SSH로 접속합니다.
bash
코드 복사
ssh -i "your-key-pair.pem" ec2-user@your-ec2-public-dns
성공적으로 접속하면 EC2 인스턴스의 터미널에 접근할 수 있습니다.
Java 및 기타 필수 도구 설치
최신 패키지 리스트를 가져오고 업데이트합니다.
bash
코드 복사
sudo yum update -y
OpenJDK 11을 설치합니다. (스프링 프로젝트가 Java 11을 사용하는 경우)
bash
코드 복사
sudo amazon-linux-extras install java-openjdk11 -y
Java 설치를 확인합니다.
bash
코드 복사
java -version
3. 스프링 프로젝트 빌드 및 전송
프로젝트 빌드
로컬 환경에서 스프링 프로젝트를 빌드합니다. 일반적으로 Gradle 또는 Maven을 사용합니다.
Gradle 사용 시:

bash
코드 복사
./gradlew build
Maven 사용 시:

bash
코드 복사
mvn clean package
빌드 후, build/libs 또는 target 폴더에 .jar 파일이 생성됩니다.

.jar 파일 EC2로 전송
SCP(Secure Copy Protocol)를 사용하여 .jar 파일을 EC2 인스턴스로 전송합니다.
bash
코드 복사
scp -i "your-key-pair.pem" path/to/your/spring-app.jar ec2-user@your-ec2-public-dns:/home/ec2-user/
4. 스프링 프로젝트 실행 및 설정
애플리케이션 실행
EC2 인스턴스 터미널에서 .jar 파일을 실행합니다.
bash
코드 복사
java -jar your-spring-app.jar
애플리케이션이 실행되면, 인스턴스의 공용 DNS를 통해 웹 브라우저에서 애플리케이션에 접속할 수 있습니다. 예: http://your-ec2-public-dns:8080
백그라운드에서 실행 (선택 사항)
nohup 명령어를 사용하여 백그라운드에서 애플리케이션을 실행할 수 있습니다.
bash
코드 복사
nohup java -jar your-spring-app.jar > app.log 2>&1 &
이렇게 하면 터미널을 종료해도 애플리케이션이 계속 실행됩니다. 로그는 app.log 파일에 저장됩니다.

5. 자동 시작 설정 (선택 사항)
EC2 인스턴스가 재부팅될 때 애플리케이션이 자동으로 시작되도록 설정하려면 다음과 같은 방법을 사용할 수 있습니다.

시스템 서비스 설정
새로운 서비스 파일을 생성합니다.
bash
코드 복사
sudo nano /etc/systemd/system/springboot.service
아래 내용을 서비스 파일에 추가합니다.
plaintext
코드 복사
[Unit]
Description=Spring Boot Application

[Service]
User=ec2-user
ExecStart=/usr/bin/java -jar /home/ec2-user/your-spring-app.jar
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
서비스 파일을 저장하고 닫습니다.
서비스 설정을 재로드합니다.
bash
코드 복사
sudo systemctl daemon-reload
서비스를 시작하고 부팅 시 자동으로 시작되도록 설정합니다.
bash
코드 복사
sudo systemctl start springboot
sudo systemctl enable springboot
6. 보안 및 기타 설정
보안 그룹 수정
보안을 강화하기 위해 SSH(포트 22) 접근을 특정 IP로 제한합니다. AWS 콘솔에서 인바운드 규칙을 편집하여 특정 IP만 허용하도록 변경합니다.

모니터링 및 로깅
CloudWatch와 같은 AWS 서비스로 애플리케이션의 로그와 성능을 모니터링할 수 있습니다. 이를 통해 애플리케이션 상태를 실시간으로 확인하고 문제 발생 시 빠르게 대응할 수 있습니다.

결론
이로써 AWS EC2에 스프링 프로젝트를 배포하고 실행하는 기본적인 방법을 완료했습니다. 추가적으로 보안 설정, 자동 백업, 스케일링 등 다양한 AWS 서비스와 기능을 활용하여 애플리케이션을 최적화하고 확장할 수 있습니다.
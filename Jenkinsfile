pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS_ID = 'dockerhub-access-chanmin'  // Docker Hub 접근 정보
        GITLAB_CREDENTIALS_ID = 'gitlab-access-chanmin2'        // GitLab 접근 정보
        BACKEND_DOCKER_REPO = 'chanmin314/ecofarmingback'       // 백엔드 Docker 이미지 저장소
        USER_SERVER_IP = 'j11a101.p.ssafy.io'                   // 배포할 서버 IP
        SPRING_PROFILE = 'prod'                                 // Spring 프로파일 (운영 환경)
        BLUE_PORT = '8085'
        GREEN_PORT = '8086'
        CURRENT_ACTIVE_PORT = "${BLUE_PORT}"                    // 현재 활성화된 포트 (초기: Blue)
    }
    stages {
        // 1. GitLab에서 소스 코드 클론
        stage('Clone Repository') {
            steps {
                script {
                    def newPort = (CURRENT_ACTIVE_PORT == BLUE_PORT) ? GREEN_PORT : BLUE_PORT
                    def environmentName = (newPort == BLUE_PORT) ? "Blue" : "Green"
                    echo "Start Cloning Repository for ${environmentName} Environment..."
                    git credentialsId: "${GITLAB_CREDENTIALS_ID}", branch: 'develop', url: 'https://lab.ssafy.com/s11-ai-image-sub1/S11P21A101.git'
                    echo "Repository Cloning Complete for ${environmentName} Environment!"
                }
            }
        }

        // 2. 백엔드 빌드 및 Docker 이미지 생성
        stage('Build Backend') {
            steps {
                script {
                    def newPort = (CURRENT_ACTIVE_PORT == BLUE_PORT) ? GREEN_PORT : BLUE_PORT
                    def environmentName = (newPort == BLUE_PORT) ? "Blue" : "Green"
                    dir('backend') {
                        echo "Start Building Backend for ${environmentName} Environment..."
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean build -x test -Pprofile=prod'
                        echo "Backend Build Complete for ${environmentName} Environment!"
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    def newPort = (CURRENT_ACTIVE_PORT == BLUE_PORT) ? GREEN_PORT : BLUE_PORT
                    def environmentName = (newPort == BLUE_PORT) ? "Blue" : "Green"
                    dir('backend') {
                        echo "Start Building Docker Image for ${environmentName} Environment..."
                        def app = docker.build("${BACKEND_DOCKER_REPO}:latest")
                        echo "Docker Image Build Complete for ${environmentName} Environment!"
                    }
                }
            }
        }

        // 3. Docker Hub로 이미지 푸시
        stage('Push Backend Docker Image to Docker Hub') {
            steps {
                script {
                    def newPort = (CURRENT_ACTIVE_PORT == BLUE_PORT) ? GREEN_PORT : BLUE_PORT
                    def environmentName = (newPort == BLUE_PORT) ? "Blue" : "Green"
                    echo "Pushing Docker Image to Docker Hub for ${environmentName} Environment..."
                    docker.withRegistry('', DOCKER_HUB_CREDENTIALS_ID) {
                        docker.image("${BACKEND_DOCKER_REPO}:latest").push()
                    }
                    echo "Docker Image Push Complete for ${environmentName} Environment!"
                }
            }
        }

        // 4. Green 환경에 새 버전 배포
        stage('Deploy to Green (New) Environment') {
            steps {
                sshagent(['ssafy-ec2-ssh']) {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        script {
                            def newPort = (CURRENT_ACTIVE_PORT == BLUE_PORT) ? GREEN_PORT : BLUE_PORT
                            def environmentName = (newPort == BLUE_PORT) ? "Blue" : "Green"
                            echo "Deploying to ${environmentName} Environment (Port: ${newPort})..."
                            sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${USER_SERVER_IP} << EOF
                            docker image prune -f
                            echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin
                            docker pull ${BACKEND_DOCKER_REPO}:latest
                            docker stop backend_${newPort} || true
                            docker rm backend_${newPort} || true
                            docker run -d --name backend_${newPort} -p ${newPort}:8080 -v /home/ubuntu/uploads:/home/ubuntu/uploads ${BACKEND_DOCKER_REPO}:latest --spring.profiles.active=${SPRING_PROFILE} --file.upload-dir=/home/ubuntu/uploads
                            docker logout
                            EOF
                            """
                            echo "Deployment to ${environmentName} Environment Complete!"
                        }
                    }
                }
            }
        }

        // 5. Green 포트가 정상적으로 작동하는지 확인 (Health Check)
        stage('Health Check on Green Environment') {
            steps {
                script {
                    def newPort = (CURRENT_ACTIVE_PORT == BLUE_PORT) ? GREEN_PORT : BLUE_PORT
                    def environmentName = (newPort == BLUE_PORT) ? "Blue" : "Green"
                    echo "Performing Health Check on ${environmentName} Environment (Port: ${newPort})..."
                    def response = sh(
                        script: "curl --silent --fail http://${USER_SERVER_IP}:${newPort}/api/health",
                        returnStatus: true
                    )
                    if (response != 0) {
                        error("Health Check Failed for ${environmentName} Environment (Port: ${newPort}), stopping deployment.")
                    } else {
                        echo "Health Check Passed for ${environmentName} Environment (Port: ${newPort})."
                    }
                }
            }
        }

        // 6. Nginx 설정 변경하여 Green 환경으로 트래픽 전환
        stage('Switch Traffic to Green') {
            steps {
                script {
                    def newPort = (CURRENT_ACTIVE_PORT == BLUE_PORT) ? GREEN_PORT : BLUE_PORT
                    def environmentName = (newPort == BLUE_PORT) ? "Blue" : "Green"
                    echo "Switching Traffic to ${environmentName} Environment (Port: ${newPort})..."
                    sshagent(['ssafy-ec2-ssh']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${USER_SERVER_IP} << EOF
                        sed -i 's/${CURRENT_ACTIVE_PORT}/${newPort}/g' /etc/nginx/sites-enabled/j11a101.p.ssafy.io
                        sudo nginx -s reload
                        EOF
                        """
                        CURRENT_ACTIVE_PORT = newPort  // Nginx가 Green을 바라보도록 전환 완료
                    }
                    echo "Traffic Successfully Switched to ${environmentName} Environment!"
                }
            }
        }
    }
}

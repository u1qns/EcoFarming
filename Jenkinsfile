pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS_ID = 'dockerhub-access-chanmin'
        GITLAB_CREDENTIALS_ID = 'gitlab-access-chanmin2'
        BACKEND_DOCKER_REPO = 'chanmin314/ecofarmingback'
        USER_SERVER_IP = 'j11a101.p.ssafy.io'
        SPRING_PROFILE = 'prod'
        BLUE_PORT = '8085'
        GREEN_PORT = '8086'
        PORT_FILE = "/home/ubuntu/current_port.txt"  // EC2 서버에 저장할 포트 상태 파일
    }

    stages {
        // 현재 활성화된 포트 읽기
        stage('Read Current Active Port') {
            steps {
                script {
                    def currentPort = sh(script: "ssh -o StrictHostKeyChecking=no ubuntu@${USER_SERVER_IP} 'cat ${PORT_FILE} || echo ${BLUE_PORT}'", returnStdout: true).trim()
                    env.CURRENT_ACTIVE_PORT = currentPort
                    echo "Current Active Port is: ${currentPort}"
                }
            }
        }

        // GitLab에서 소스 코드 클론
        stage('Clone Repository') {
            steps {
                script {
                    def newPort = (env.CURRENT_ACTIVE_PORT == BLUE_PORT) ? GREEN_PORT : BLUE_PORT
                    def environmentName = (newPort == BLUE_PORT) ? "Blue" : "Green"
                    echo "Start Cloning Repository for ${environmentName} Environment..."
                    git credentialsId: "${GITLAB_CREDENTIALS_ID}", branch: 'develop', url: 'https://lab.ssafy.com/s11-ai-image-sub1/S11P21A101.git'
                    echo "Repository Cloning Complete for ${environmentName} Environment!"
                }
            }
        }

        // 백엔드 빌드 및 Docker 이미지 생성
        stage('Build Backend and Docker Image') {
            steps {
                script {
                    def newPort = (env.CURRENT_ACTIVE_PORT == BLUE_PORT) ? GREEN_PORT : BLUE_PORT
                    def environmentName = (newPort == BLUE_PORT) ? "Blue" : "Green"
                    dir('backend') {
                        echo "Start Building Backend for ${environmentName} Environment..."
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean build -x test -Pprofile=prod'
                        echo "Backend Build Complete for ${environmentName} Environment!"

                        echo "Start Building Docker Image for ${environmentName} Environment..."
                        def app = docker.build("${BACKEND_DOCKER_REPO}:latest")
                        echo "Docker Image Build Complete for ${environmentName} Environment!"
                    }
                }
            }
        }

        // 새로운 버전 배포
        stage('Deploy to New Environment') {
            steps {
                sshagent(['ssafy-ec2-ssh']) {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        script {
                            def newPort = (env.CURRENT_ACTIVE_PORT == BLUE_PORT) ? GREEN_PORT : BLUE_PORT
                            def environmentName = (newPort == BLUE_PORT) ? "Blue" : "Green"
                            echo "Deploying to ${environmentName} Environment (Port: ${newPort})..."
                            sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${USER_SERVER_IP} \\
                                'docker image prune -f && \\
                                echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin && \\
                                docker pull ${BACKEND_DOCKER_REPO}:latest && \\
                                docker stop backend_${newPort} || true && \\
                                docker rm backend_${newPort} || true && \\
                                docker run -d --name backend_${newPort} -p ${newPort}:8080 -v /home/ubuntu/uploads:/home/ubuntu/uploads ${BACKEND_DOCKER_REPO}:latest --spring.profiles.active=${SPRING_PROFILE} --file.upload-dir=/home/ubuntu/uploads && \\
                                docker logout'
                            """
                            echo "Deployment to ${environmentName} Environment Complete!"
                        }
                    }
                }
            }
        }

        // Health Check
        stage('Health Check on New Environment') {
            steps {
                script {
                    def newPort = (env.CURRENT_ACTIVE_PORT == BLUE_PORT) ? GREEN_PORT : BLUE_PORT
                    def environmentName = (newPort == BLUE_PORT) ? "Blue" : "Green"
                    echo "Performing Health Check on ${environmentName} Environment (Port: ${newPort})..."

                    retry(3) {
                        sleep(time: 5, unit: "SECONDS")
                        def response = sh(
                            script: "curl --silent --fail http://${USER_SERVER_IP}:${newPort}/api/actuator/health",
                            returnStatus: true
                        )
                        if (response != 0) {
                            error("Health Check Failed for ${environmentName} Environment (Port: ${newPort}), stopping deployment.")
                        }
                    }

                    echo "Health Check Passed for ${environmentName} Environment (Port: ${newPort})."
                }
            }
        }

        // Nginx 설정 변경 및 트래픽 전환
        stage('Switch Traffic to New Environment') {
            steps {
                script {
                    def newPort = (env.CURRENT_ACTIVE_PORT == BLUE_PORT) ? GREEN_PORT : BLUE_PORT
                    def environmentName = (newPort == BLUE_PORT) ? "Blue" : "Green"
                    echo "Switching Traffic to ${environmentName} Environment (Port: ${newPort})..."
                    sshagent(['ssafy-ec2-ssh']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${USER_SERVER_IP} \\
                            "sudo sed -i 's/localhost:808[5|6]/localhost:${newPort}/g' /etc/nginx/sites-enabled/j11a101.p.ssafy.io && sudo nginx -s reload && echo ${newPort} > ${PORT_FILE}"
                        """
                        env.CURRENT_ACTIVE_PORT = newPort
                    }
                    echo "Traffic Successfully Switched to ${environmentName} Environment!"
                }
            }
        }
    }
}

pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-access-chanmin'
        GITLAB_CREDENTIALS_ID = 'gitlab-access-chanmin2'
        DOCKERHUB_BACKEND_REPO = 'chanmin314/ecofarmingback'
        DOCKERHUB_FRONTEND_REPO = 'chanmin314/ecofarmingfront'
        GITLAB_REPO = 'https://lab.ssafy.com/s11-ai-image-sub1/S11P21A101.git'
        BRANCH = 'develop'
        USER_SERVER_IP = 'j11a101.p.ssafy.io'
        SPRING_PROFILE = 'prod'
    }
    stages {
        stage('Clone Repository') {
            steps {
                script {
                    echo "Start Clone Repository,,,"
                    git credentialsId: "${GITLAB_CREDENTIALS_ID}", branch: "${BRANCH}", url: "${GITLAB_REPO}"
                    echo "Clone Repository Complete!!!"
                }
            }
        }

        // Backend 빌드, 이미지 생성 및 배포
        stage('Build Backend') {
            steps {
                script {
                    dir('backend') {
                        echo "Start Build Backend,,,"
                        sh 'chmod +x ./gradlew'
                        sh './gradlew clean build -x test -Pprofile=prod'
                        echo "Build Backend Complete!!!"
                    }
                }
            }
        }
        stage('Build Backend Docker Image') {
            steps {
                script {
                    dir('backend') {
                        def app = docker.build("${DOCKERHUB_BACKEND_REPO}:latest")
                    }
                }
            }
        }
        stage('Push Backend to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        docker.image("${DOCKERHUB_BACKEND_REPO}:latest").push()
                    }
                }
            }
        }
        stage('Deploy Backend') {
            steps {
                sshagent(['ssafy-ec2-ssh']) {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${USER_SERVER_IP} << EOF
                        echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin
                        docker pull ${DOCKERHUB_BACKEND_REPO}:latest
                        docker stop backend || true
                        docker rm backend || true
                        docker run -d --name backend -p 8085:8085 ${DOCKERHUB_BACKEND_REPO}:latest --spring.profiles.active=${SPRING_PROFILE}
                        docker logout
EOF
                        """
                    }
                }
            }
        }

        // Frontend 빌드, 이미지 생성 및 배포
        stage('Build Frontend') {
            steps {
                script {
                    dir('frontend') {
                        echo "Start Build Frontend,,,"
                        sh 'npm install'
                        sh 'CI=false npm run build'
                        echo "Build Frontend Complete!!!"
                    }
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                script {
                    dir('frontend') {
                        def app = docker.build("${DOCKERHUB_FRONTEND_REPO}:latest")
                    }
                }
            }
        }
        stage('Push Frontend to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        docker.image("${DOCKERHUB_FRONTEND_REPO}:latest").push()
                    }
                }
            }
        }
        stage('Deploy Frontend') {
            steps {
                sshagent(['ssafy-ec2-ssh']) {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${USER_SERVER_IP} << EOF
                        echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin
                        docker pull ${DOCKERHUB_FRONTEND_REPO}:latest
                        docker stop frontend || true
                        docker rm frontend || true
                        docker run -d --name frontend -p 80:80 ${DOCKERHUB_FRONTEND_REPO}:latest
                        docker logout
EOF
                        """
                    }
                }
            }
        }
    }
}

FROM openjdk:17-jdk-slim
VOLUME /tmp

# curl 설치
RUN apt-get update && apt-get install -y curl

COPY build/libs/ecofarming-0.0.1-SNAPSHOT.jar backend.jar

ENTRYPOINT ["java", "-jar", "/backend.jar"]

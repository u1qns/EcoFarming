FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY build/libs/frontend-0.0.1-SNAPSHOT.jar frontend.jar
ENTRYPOINT ["java", "-jar", "/frontend.jar"]

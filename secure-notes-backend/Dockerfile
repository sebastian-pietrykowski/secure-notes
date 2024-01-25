FROM maven:3.8.4-openjdk-17 as build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests
FROM openjdk:17
WORKDIR /app
COPY --from=build /app/target/secure-notes-0.0.1-SNAPSHOT.jar /app/secure-notes-0.0.1-SNAPSHOT.jar
ENTRYPOINT [ "java", "-jar", "/app/secure-notes-0.0.1-SNAPSHOT.jar" ]
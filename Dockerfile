FROM maven:latest as build

WORKDIR /app

COPY . /app

RUN mvn package

FROM openjdk:17-ea-17-jdk

WORKDIR /app

COPY --from=build /app/target/remo-0.0.1-SNAPSHOT.jar /app

EXPOSE 8090

CMD ["java", "-jar", "remo-0.0.1-SNAPSHOT.jar"]
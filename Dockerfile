FROM maven:3-amazoncorretto-17 as build

COPY . .

RUN mvn clean install

FROM openjdk:17

COPY --from=build /target/remo-0.0.1-SNAPSHOT.jar remo.jar

EXPOSE 8080

CMD ["java", "-jar", "remo.jar"]
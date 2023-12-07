FROM openjdk:17

WORKDIR /app

COPY * app/

EXPOSE 8080

CMD cd ./app

CMD mvn spring-boot:run
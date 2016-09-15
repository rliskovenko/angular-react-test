FROM alpine:latest
ADD . /app
WORKDIR /app

RUN apk update
RUN apk add git nodejs
RUN npm install

CMD node ./app/server.js
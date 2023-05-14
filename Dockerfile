FROM node:latest AS build
WORKDIR /app
COPY ./sipi_front/package*.json ./
RUN npm install
COPY ./sipi_front .
RUN npm run build

CMD cp -r dist dist
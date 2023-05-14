FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./sipi_front .
RUN npm run build

CMD cp -r dist result_build
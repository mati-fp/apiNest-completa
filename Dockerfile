FROM node:14.20-alpine3.15

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app


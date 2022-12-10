#!/bin/sh 

npm install

npm run build

npm run typeorm migration:revert
npm run typeorm migration:run

npm run start:dev
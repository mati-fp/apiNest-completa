#!/bin/sh 

npm install

npm run build

npm run typeorm migration:run -d dist/database.providers.js

npm run start:dev
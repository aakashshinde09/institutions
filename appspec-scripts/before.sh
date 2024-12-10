#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.18.1/bin

cd /home/ubuntu/code

if pm2 list | grep -q "impactstake-institution"; then
    echo "stopping the application........."
    pm2 stop impactstake-institution
    pm2 delete impactstake-institution
else
    echo "Application is not running. Skipping the step"
fi

npm install
cp ../.env ../.env.production
npm run build:production
npm run start
#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.18.1/bin

cd /home/ubuntu/code
pm2 start "npm run start" --name impactstake-institution



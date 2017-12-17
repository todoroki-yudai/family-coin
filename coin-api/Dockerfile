FROM node:9.2.1

RUN npm install -g typescript typings
# RUN npm install nem-library rxjs

COPY . /coin-api
WORKDIR /coin-api

RUN npm install

CMD ["/sbin/init"]

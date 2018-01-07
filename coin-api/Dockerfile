FROM node:9.2.1

RUN cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
  npm install -g typescript typings
# RUN npm install nem-library rxjs

COPY . /coin-api
WORKDIR /coin-api

RUN yarn install

CMD ["/sbin/init"]

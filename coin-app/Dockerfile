FROM node:9.2.1

RUN cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    npm install --quiet --global \
    vue-cli
    # npm i -g npm to update

COPY . /coin-app
WORKDIR /coin-app

RUN cd /coin-app/vue-element-admin && \
  npm install

CMD ["/sbin/init"]

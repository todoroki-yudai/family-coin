FROM node:9.2.1

RUN npm install --quiet --global \
      vue-cli
    # npm i -g npm to update

COPY . /coin-app
WORKDIR /coin-app

# vue init webpack familly-point
# cd familly-point/
# npm install
# cp package.json familly-point/
# npm run dev

CMD ["/sbin/init"]

# # Initialize a bootstrap project in the directory 'my-project'
# vue init bootstrap-vue/webpack-simple my-project
# # Change into the directory
# cd my-project
# # Install dependencies
# yarn install
# yarn add bootstrap-vue bootstrap@4.0.0-beta.2
# # Fire up the dev server with HMR
# npm run dev

# vue generate
# npm install -g --save-dev swagger-vue-generator
# node /usr/local/lib/node_modules/swagger-vue-generator/bin/generate-api.js -s ./api/swagger.json -d ./api.js -m vue-swagger

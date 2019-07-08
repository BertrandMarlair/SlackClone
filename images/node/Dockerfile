FROM node:alpine

WORKDIR /src/app

COPY package.json .
COPY bin ./bin

RUN apk update && apk upgrade \
    && apk add --no-cache git \
    && apk --no-cache add --virtual builds-deps build-base python \
    && npm install -g nodemon node-gyp node-pre-gyp \
    && npm install dotenv

RUN npm install --production

RUN npm rebuild bcrypt --build-from-source

CMD ["npm","start"]

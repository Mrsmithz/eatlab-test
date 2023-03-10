FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
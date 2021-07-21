FROM node:alpine

ENV POSTS_PORT=4000

ENV EVENT_BUS_PORT=4005

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]

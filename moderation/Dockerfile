FROM node:alpine

ENV MODERATION_PORT=4002

ENV EVENT_BUS_PORT=4005

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]

FROM node:alpine

ENV COMMENTS_PORT=4001

ENV EVENT_BUS_PORT=4005

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]

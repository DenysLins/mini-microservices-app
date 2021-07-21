FROM node:alpine

ENV QUERY_PORT=4003

ENV EVENT_BUS_PORT=4005

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]

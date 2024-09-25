FROM node:20.17 AS Production

ENV NODE ENV=Production

WORKDIR /opt/fab-ticket
COPY . .

RUN npm install

CMD ["sh","-c","npm run start"]
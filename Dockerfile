
FROM node:16-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
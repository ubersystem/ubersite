from node:13.8.0-alpine

COPY dist dist/
COPY package.json .

RUN npm install pm2 -g

ENV PORT 8080
EXPOSE 8080

CMD [ "npm", "run", "production" ]
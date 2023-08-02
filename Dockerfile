FROM node:18.12.1

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["node ./dist/src/index.js"]

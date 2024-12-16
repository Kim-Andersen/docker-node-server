FROM node:23-alpine

WORKDIR /server

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]


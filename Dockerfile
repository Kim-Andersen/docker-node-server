FROM node:23-alpine AS base
WORKDIR /server
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

FROM base as dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base as test
COPY . .
RUN npm run test


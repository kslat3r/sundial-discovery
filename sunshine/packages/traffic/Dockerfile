FROM node:12.1.0-alpine as thick
WORKDIR /app
COPY . .
RUN npm install

FROM node:12.1.0-alpine as thin
WORKDIR /app
COPY --from=thick /app .
RUN npm prune --production

CMD npm start

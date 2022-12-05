FROM node:16-alpine
RUN apk add --no-cache git

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT ["sh", "./run.sh"]
CMD ["dev", "3000"]

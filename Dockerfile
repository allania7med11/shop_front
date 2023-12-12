FROM node:16-alpine
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

ENTRYPOINT ["sh", "./run.sh"]
CMD ["dev", "3000"]

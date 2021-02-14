FROM node:11.9 as front-builder

LABEL mantainer="Javier Bullrich <javier@bullrich.dev>"

WORKDIR /usr/src/app

COPY client/package.json client/package-lock.json ./

RUN npm ci

COPY client ./

RUN npm run build

FROM node:14

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY tsconfig.json tslint.json ./

COPY src src

RUN ls /usr/src/app

RUN npm run build

COPY --from=front-builder /usr/src/app/build ./client/build

EXPOSE 80

ENV PORT=80

CMD [ "node", "dist/index.js" ]
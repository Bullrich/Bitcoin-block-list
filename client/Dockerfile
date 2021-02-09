FROM node:11.9 as builder

LABEL mantainer="Javier Bullrich <javier@bullrich.dev>"

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

RUN npm run build

FROM nginx

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
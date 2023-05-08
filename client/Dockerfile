FROM node:16-alpine as build-stage
WORKDIR /app
COPY *.json ./

RUN npm install --save --legacy-peer-deps
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
RUN ["rm", "/etc/nginx/conf.d/default.conf"]
COPY ./default.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

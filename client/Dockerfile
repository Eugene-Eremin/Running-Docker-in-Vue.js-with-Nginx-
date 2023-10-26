FROM node:18.15.0 as build-stage

WORKDIR /client

COPY . .

RUN npm install 
RUN npm run build

FROM nginx:stable as production-stage

COPY --from=build-stage /client/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000 

CMD ["nginx", "-g", "daemon off;"]
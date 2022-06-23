FROM node:12-alpine AS build
WORKDIR /admin
COPY . .
RUN npm install -g @angular/cli
#FROM bw_admin:base AS build
#WORKDIR /admin
RUN npm install
RUN node_modules/.bin/ng build --prod

FROM nginx:alpine
WORKDIR /html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /admin/dist/bw-admin /html
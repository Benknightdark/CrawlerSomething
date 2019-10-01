FROM node:alpine AS node-builder
WORKDIR /src
ARG arg
COPY . .
RUN npm install --silent
#RUN npm run build -- --prod --output-path dist
RUN npm run build

# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx

FROM nginx:alpine
# ARG  BackendUri
# ENV BACKEND_URI=${BackendUri}
# RUN rm -rf /usr/share/nginx/html/*
# #COPY default.conf /etc/nginx/conf.d/default.conf
# COPY nginx.site.template /etc/nginx/conf.d/
COPY --from=node-builder /src/dist/WebSite/. /usr/share/nginx/html
#COPY /dist/. /usr/share/nginx/html
# CMD envsubst '${BACKEND_URI}' < /etc/nginx/conf.d/nginx.site.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'
EXPOSE  80

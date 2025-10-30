FROM nginx:alpine@sha256:b3c656d55d7ad751196f21b7fd2e8d4da9cb430e32f646adcf92441b72f82b14

COPY ./dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
RUN cp /usr/share/nginx/html/index.html /usr/share/nginx/html/404.html

CMD ["nginx", "-g", "daemon off;"]
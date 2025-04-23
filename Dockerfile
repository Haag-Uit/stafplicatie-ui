FROM nginx:alpine@sha256:65645c7bb6a0661892a8b03b89d0743208a18dd2f3f17a54ef4b76fb8e2f2a10

COPY ./dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
RUN cp /usr/share/nginx/html/index.html /usr/share/nginx/html/404.html

CMD ["nginx", "-g", "daemon off;"]
FROM nginx:alpine@sha256:42a516af16b852e33b7682d5ef8acbd5d13fe08fecadc7ed98605ba5e3b26ab8

COPY ./dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
RUN cp /usr/share/nginx/html/index.html /usr/share/nginx/html/404.html

CMD ["nginx", "-g", "daemon off;"]
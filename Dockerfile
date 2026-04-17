FROM nginx:alpine@sha256:5616878291a2eed594aee8db4dade5878cf7edcb475e59193904b198d9b830de

COPY ./dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
RUN cp /usr/share/nginx/html/index.html /usr/share/nginx/html/404.html

CMD ["nginx", "-g", "daemon off;"]
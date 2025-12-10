FROM nginx:alpine@sha256:289decab414250121a93c3f1b8316b9c69906de3a4993757c424cb964169ad42

COPY ./dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
RUN cp /usr/share/nginx/html/index.html /usr/share/nginx/html/404.html

CMD ["nginx", "-g", "daemon off;"]
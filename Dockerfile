FROM nginx:latest

COPY ./dist /usr/share/nginx/html
RUN cp /usr/share/nginx/html/index.html /usr/share/nginx/html/404.html

CMD ["nginx", "-g", "daemon off;"]
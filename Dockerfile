FROM nginx
LABEL maintainer="gh1506301420@gmail.com"

COPY ./public/ /usr/share/nginx/html/

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
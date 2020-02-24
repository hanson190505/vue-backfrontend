FROM nginx:1.17.4-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY dist /home/cms
#COPY nginx.conf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/nginx.conf

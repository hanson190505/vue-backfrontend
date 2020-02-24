FROM nginx:1.17.4-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY dist /app/cms
#COPY nginx.conf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/nginx.conf

RUN chmod 755 app
RUN chmod u+s app
RUN chmod 755 letsencrypt
RUN chmod u+s letsencrypt

USER nginx
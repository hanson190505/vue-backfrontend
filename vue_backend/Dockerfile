# pull official base image
FROM python:3.7-alpine

# set work directory
WORKDIR /usr/src/api

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir /usr/src/api/static

# install psycopg2 dependencies
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk update
RUN apk add --no-cache jpeg-dev zlib-dev
RUN apk add --no-cache --virtual .build-deps build-base linux-headers \
    && pip install pip --upgrade \
    && pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pillow \
    && apk del .build-deps
RUN apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/api/requirements.txt
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh /usr/src/api/entrypoint.sh

# copy project
COPY . /usr/src/api/

# run entrypoint.sh
RUN chmod +x /usr/src/api/entrypoint.sh
ENTRYPOINT ["/usr/src/api/entrypoint.sh"]

FROM node:lts-alpine
# /usr/src/main
# /usr/src/main/node_modules

# tmp debug reasoning
RUN apk update && apk add bash

# TODO make a path variable
WORKDIR /usr/src/main

# Copy "only" required dependencies, decided to go copy everything
# COPY packages/common /usr/src/main/packages/common
# COPY proto /usr/src/main/proto
# COPY tsconfig.json /usr/src/main
# COPY node_modules /usr/src/main/node_modules

COPY . /usr/src/main
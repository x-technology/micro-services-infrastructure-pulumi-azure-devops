FROM node:lts-alpine

RUN apk update && \
  apk upgrade && \
  apk add bash protoc

# TODO make a path variable
WORKDIR /usr/src/main
COPY package.json yarn.lock /usr/src/main/

# Install runtime dependencies
RUN yarn install

COPY . /usr/src/main
RUN yarn lerna bootstrap
RUN yarn lerna run build

# Copy "only" required dependencies, decided to go copy everything
# COPY packages/common /usr/src/main/packages/common
# COPY proto /usr/src/main/proto
# COPY tsconfig.json /usr/src/main
# COPY node_modules /usr/src/main/node_modules

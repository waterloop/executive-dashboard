# syntax=docker/dockerfile:1

# Using node 16
FROM node:16-slim

# Change timezone of container from UTC to EST
RUN rm -rf /etc/localtime
RUN ln -s /usr/share/zoneinfo/America/New_York /etc/localtime

WORKDIR /waterloop

# Initialize dependencies
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY .babelrc.js package.json yarn.lock .nvmrc .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases
COPY .yarn/plugins ./.yarn/plugins

# similar to `yarn install --production` for Yarn 2.x version.
RUN yarn workspaces focus -A --production

# add missing dependencies

# copy files over here after installing deps, to skip reinstalling deps
COPY src ./src
COPY public ./public
COPY .env.prod ./.env

# build project
RUN yarn build

EXPOSE 9000-9002
EXPOSE 3000-3002

# enable swap memory, then run yarn start:
# https://community.fly.io/t/swap-memory/2749
CMD /bin/bash -c "fallocate -l $(($(stat -f -c "(%a*%s/10)*7" .))) _swapfile && mkswap _swapfile && swapon _swapfile;" && yarn start

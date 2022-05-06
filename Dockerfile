# Var definitions.
ARG BACKEND_DIR=./backend

# Using node 16
FROM node:16-slim 

# Change timezone of container from UTC to EST
RUN rm -rf /etc/localtime
RUN ln -s /usr/share/zoneinfo/America/New_York /etc/localtime

WORKDIR /waterloop

COPY $BACKEND_DIR/src ./src/
COPY $BACKEND_DIR/migrations ./migrations/
COPY $BACKEND_DIR/seeds ./seeds/

# Copy over remaining files
COPY .env package-docker.json yarn.lock knexfile.js ./
RUN mv package-docker.json package.json

# Initialize dependencies
ENV NODE_ENV=test
RUN yarn install
RUN yarn build
EXPOSE 9001

CMD ["bash"]

# Setting the base to nodejs 10.0.0
FROM node:10.4.0-alpine@sha256:00f2d006d9ddaedd8d4ec87d5b25d8d73ac724c923ca59b471ffc11062b2f1f8

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python tzdata

# Timezone
ENV TIMEZONE Europe/Oslo
RUN cp /usr/share/zoneinfo/${TIMEZONE} /etc/localtime
RUN echo "${TIMEZONE}" > /etc/timezone

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Expose 8000
EXPOSE 8000

# Startup
ENTRYPOINT node standalone.js

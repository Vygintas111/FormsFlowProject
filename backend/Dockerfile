FROM node:18-alpine

WORKDIR /app

# Install yarn
RUN apk add --no-cache yarn

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the application code and build it
COPY . .
RUN yarn build

# Start the server
CMD ["yarn", "start"]

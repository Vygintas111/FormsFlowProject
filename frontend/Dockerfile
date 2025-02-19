# Stage 1: Build
FROM node:18-alpine

WORKDIR /app

# Install yarn
RUN apk add --no-cache yarn

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application code and build it
COPY . .
RUN yarn build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

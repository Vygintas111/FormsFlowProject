# Stage 1: Build
FROM node:18-alpine

WORKDIR /app

# Install yarn
RUN apk add --no-cache yarn

# Copy package files and install dependencies
COPY package.json ./
RUN yarn install

# Copy the rest of the application code and build it
COPY . .
RUN yarn build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

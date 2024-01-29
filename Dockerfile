# Stage 1: Install Node dependencies
FROM node:lts-slim as dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# Stage 2: Build Angular application
FROM node:lts-slim as builder
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN ng build --output-path=dist --verbose

# Stage 3: Create production environment with Nginx
FROM nginx:stable-alpine-slim
COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]

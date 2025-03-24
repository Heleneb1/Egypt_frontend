
# Stage 1: Build Angular application
FROM node:lts-slim AS builder
WORKDIR /usr/src/app
COPY . .
ENV PATH=./node_modules/.bin:$PATH
# npm
RUN npm ci 
RUN ng cache clean
RUN ng build --output-path=dist

# Stage 2: Create production environment with Nginx
FROM nginx:stable-alpine-slim
# Install curl for health check
RUN apk add --no-cache curl
RUN mkdir -p /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/
# EXPOSE 4200
# HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl -f http://localhost:4200/ || exit 1
EXPOSE 4300
HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl -f http://localhost:4300/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

# docker build -t mon-app .
# docker run -p 4200:4200 mon-app
# Stage 1: Build Angular application
FROM node:lts-slim AS builder
WORKDIR /usr/src/app
COPY . .
ENV PATH=./node_modules/.bin:$PATH

RUN npm ci && ng cache clean && ng build --output-path=dist

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine-slim
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# docker build -t mon-app .
# docker run -p 4200:4200 mon-app
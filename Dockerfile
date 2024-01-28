# Stage 1: Build Angular application
FROM node:lts-slim as builder
WORKDIR /usr/src/app
COPY . .
ENV PATH ./node_modules/.bin:$PATH
RUN npm ci 
RUN rm -fr .angular/cache
RUN ng cache clean
RUN ng build --output-path=dist --verbose

# Stage 2: Create production environment with Nginx
FROM nginx:stable-alpine-slim
COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]


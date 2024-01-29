# Dockerfile frontend
# build environment
# FROM node:lts-slim as build
# WORKDIR /build
# COPY . .
# ENV PATH ./node_modules/.bin:$PATH
# RUN npm ci
# RUN ng build --configuration production --output-path=dist

# # production environment
# FROM nginx:stable-alpine-slim
# COPY --from=build /build/dist/ /usr/share/nginx/html
# COPY default.conf /etc/nginx/conf.d/
# EXPOSE 4200
# CMD ["nginx", "-g", "daemon off;"]

# Entre ces 2 dockerfiles lequel est le plus optimisé ?

# FROM node:lts-slim as builder
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
# COPY . /usr/src/app
# RUN npm ci
# RUN ng build --output-path=dist

# # production environment
# FROM nginx:stable-alpine-slim
# COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
# COPY ./default.conf /etc/nginx/conf.d/
# EXPOSE 4200
# CMD ["nginx", "-g", "daemon off;"]
# Stage 1: Build Angular application
FROM node:lts-slim as builder
WORKDIR /usr/src/app
COPY . .
ENV PATH ./node_modules/.bin:$PATH
RUN npm ci 
RUN ng cache clean
RUN ng build --output-path=dist --verbose

# Stage 2: Create production environment with Nginx
FROM nginx:stable-alpine-slim
COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]


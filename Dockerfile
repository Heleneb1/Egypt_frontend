# Stage 1: Build Angular application
FROM node:lts-slim AS builder
WORKDIR /usr/src/app

# Copier d'abord les fichiers de dépendances pour le cache Docker
COPY package*.json ./
RUN npm ci

# Ensuite copier le code source
COPY . .

# Build Angular
RUN npm run build -- --output-path=dist --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine-slim
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
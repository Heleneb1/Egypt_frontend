# Stage 1: Build Angular application
FROM node:lts-slim as builder
WORKDIR /usr/src/app

# Copier les fichiers nécessaires pour l'installation des dépendances
COPY package.json package-lock.json angular.json tsconfig.json ./

# Installer les dépendances
RUN npm ci

# Copier le reste des fichiers du projet
COPY . .

# Augmenter la mémoire allouée à Node.js
ENV NODE_OPTIONS=--max_old_space_size=4096
ENV PATH ./node_modules/.bin:$PATH

# Construire l'application Angular
RUN npm run build

# Stage 2: Create production environment with Nginx
FROM nginx:stable-alpine-slim
RUN mkdir -p /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

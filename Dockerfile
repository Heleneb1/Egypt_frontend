# # Stage 1: Build Angular application
# FROM node:lts-slim as builder
# WORKDIR /usr/src/app
# COPY . .
# ENV PATH ./node_modules/.bin:$PATH
# RUN npm ci 
# RUN ng build --output-path=dist --verbose

# # Stage 2: Create production environment with Nginx
# FROM nginx:stable-alpine-slim
# COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html
# COPY ./default.conf /etc/nginx/conf.d/
# EXPOSE 4200
# CMD ["nginx", "-g", "daemon off;"]



# Stage 1: Build Angular application
FROM node:lts-slim as build
WORKDIR /build
COPY package.json package-lock.json ./
ENV PATH ./node_modules/.bin:$PATH

# Installer uniquement les dépendances de production
RUN npm ci

# Copier le reste des fichiers après l'installation des dépendances
COPY . .

# Augmenter la mémoire allouée à Node.js pendant la compilation Angular
ENV NODE_OPTIONS=--max_old_space_size=4096

# Construire l'application Angular
RUN ng build --output-path=dist --verbose

# Stage 2: Create production environment with Nginx
FROM nginx:stable-alpine-slim
COPY --from=build /build/dist/ /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]

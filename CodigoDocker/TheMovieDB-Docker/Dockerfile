# Etapa 1: Construcción
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Etapa 1: Build del proyecto React con Vite
FROM node:18 AS build

WORKDIR /app

# Copiar archivos del frontend
COPY TheMovieDB/package*.json ./
COPY TheMovieDB/tsconfig*.json ./
COPY TheMovieDB/vite.config.ts ./
COPY TheMovieDB/ ./

RUN npm install
RUN npm run build

# Etapa 2: Imagen final
FROM python:3.11-slim

RUN apt update && apt install -y \
    nodejs \
    npm \
    nginx \
    curl \
    git \
    procps \
    sysbench \
    supervisor && \
    apt clean

COPY --from=build /app/dist /var/www/html

# Configurar Nginx
RUN rm /etc/nginx/sites-enabled/default
COPY TheMovieDB/nginx.conf /etc/nginx/nginx.conf

# Workspace
WORKDIR /workspace

COPY TheMovieDB/ ./TheMovieDB/
COPY benchmark.py .
COPY benchmark.ipynb .
COPY vm_setup.sh .
COPY docker_setup.sh .
COPY supervisord.conf /etc/supervisord.conf

WORKDIR /workspace/TheMovieDB
RUN npm install

WORKDIR /workspace
RUN pip install --upgrade pip && \
    pip install psutil matplotlib jupyter

EXPOSE 80
EXPOSE 3000
EXPOSE 8888

CMD ["supervisord", "-c", "/etc/supervisord.conf"]

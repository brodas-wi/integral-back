# --- ETAPA 1: Compilación de Frontend con Node.js/Vite ---
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build


# --- ETAPA 2: Runtime PHP-FPM para Producción ---
FROM php:8.3-fpm-alpine AS production

RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    oniguruma-dev \
    icu-dev \
    libzip-dev

RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . /var/www

COPY --from=frontend-builder /app/public/build /var/www/public/build

RUN composer install --no-dev --optimize-autoloader --no-interaction

# Copia intacta del public/ recién compilado (código público + build/ nuevo),
# usada por el entrypoint para resincronizar el volumen compartido con nginx
# en cada arranque del contenedor, evitando que quede un build viejo "pegado".
RUN cp -a /var/www/public /var/www/public-src

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www/public-src /var/www/public

USER www-data

EXPOSE 9000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]
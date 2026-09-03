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
    libzip-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    freetype-dev

RUN docker-php-ext-configure gd \
    --with-jpeg \
    --with-webp \
    --with-freetype

RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip

RUN { \
    echo 'upload_max_filesize = 45M'; \
    echo 'post_max_size = 45M'; \
    echo 'memory_limit = 256M'; \
    echo 'max_execution_time = 120'; \
} > /usr/local/etc/php/conf.d/uploads.ini

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . /var/www

COPY --from=frontend-builder /app/public/build /var/www/public/build

RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN cp -a /var/www/public /var/www/public-src

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www/public-src /var/www/public

EXPOSE 9000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]
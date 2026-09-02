#!/bin/sh
set -e

# El volumen storage_data solo persiste storage/; el resto de public/
# (incluido build/) viene siempre fresco de la imagen recién construida.
# Se sincroniza hacia el volumen compartido con nginx en cada arranque
# para evitar que un build viejo quede "atrapado" en el volumen.
mkdir -p /var/www/public
find /var/www/public -mindepth 1 -maxdepth 1 ! -name storage -exec rm -rf {} +
cp -a /var/www/public-src/. /var/www/public/

# Normaliza permisos en cada arranque. El volumen storage_data puede
# quedar con archivos de dueño mixto (ej. root, si alguna vez se corrió
# un comando artisan manualmente como root dentro del contenedor),
# lo que provoca fallos silenciosos al escribir logs o cache.
chown -R www-data:www-data /var/www/public /var/www/storage

php artisan storage:link --force || true

exec "$@"
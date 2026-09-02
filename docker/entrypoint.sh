#!/bin/sh
set -e

# El volumen storage_data solo persiste storage/; el resto de public/
# (incluido build/) viene siempre fresco de la imagen recién construida.
# Se sincroniza hacia el volumen compartido con nginx en cada arranque
# para evitar que un build viejo quede "atrapado" en el volumen.
mkdir -p /var/www/public
find /var/www/public -mindepth 1 -maxdepth 1 ! -name storage -exec rm -rf {} +
cp -a /var/www/public-src/. /var/www/public/

# Aseguramos que todo lo recién copiado quede con el dueño correcto,
# sin importar qué UID haya poblado el volumen originalmente.
chown -R www-data:www-data /var/www/public

php artisan storage:link --force || true

exec "$@"
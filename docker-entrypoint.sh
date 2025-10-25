#!/bin/sh

# รัน PHP-FPM และ Nginx
php-fpm &  # รัน PHP-FPM เป็น background process
nginx -g "daemon off;"  # รัน Nginx
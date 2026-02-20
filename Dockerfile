# ใช้ base image ที่มี PHP 8.3 และ Nginx
FROM php:8.3-fpm

# ติดตั้งไลบรารีที่จำเป็น
RUN apt-get update && \
    apt-get install -y \
    nginx unzip git \
    libpq-dev \
    libfreetype6-dev libjpeg62-turbo-dev libpng-dev libwebp-dev libzip-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install gd zip opcache pdo_pgsql pgsql && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
    
# คัดลอกไฟล์เว็บไซต์
COPY . /usr/share/nginx/html

# สร้าง folder run php
RUN mkdir -p /run/php

# Config Nginx
COPY ./conf.d/default.conf /etc/nginx/sites-available/default
COPY ./conf.d/php_settings.conf /etc/nginx/conf.d/php_settings.conf
RUN rm -f /etc/nginx/sites-enabled/default && \
    ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Entrypoint
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

WORKDIR /usr/share/nginx/html/singha-members
COPY --from=composer /usr/bin/composer /usr/bin/composer

# --- ส่วนจัดการ Dependency ---
RUN composer dump-autoload
RUN composer install

COPY ./singha-members/.env.prod /usr/share/nginx/html/singha-members/.env

# รัน Artisan (ไฟล์ที่เกิดตรงนี้จะเป็น root ก่อน)
RUN php artisan config:clear
RUN php artisan cache:clear
RUN php artisan storage:link

# --- ส่วน Node.js ---
RUN apt-get update && apt-get install -y curl gnupg2 ca-certificates lsb-release
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@9.6.7

RUN npm install
RUN npm run build
# ไฟล์ที่ได้จาก build จะเป็น root

# เปลี่ยนเจ้าของไฟล์ทั้งหมดให้เป็น www-data ตั้งแต่ตอน Build Image
RUN chown -R www-data:www-data /usr/share/nginx/html/singha-members

# เปิดพอร์ต 8080
EXPOSE 8080

# เรียก entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]
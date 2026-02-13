#FROM nginx:1.27.0
#COPY . /usr/share/nginx/html
#COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
#EXPOSE 8080
#CMD ["nginx", "-g", "daemon off;"]


# ใช้ base image ที่มี PHP 8.3 และ Nginx
FROM php:8.3-fpm

# ติดตั้งไลบรารีที่จำเป็นสำหรับ PHP Extensions
RUN apt-get update && \
    apt-get install -y \
    nginx unzip git \
    libpq-dev \
    libfreetype6-dev libjpeg62-turbo-dev libpng-dev libwebp-dev libzip-dev && \
    
    # คอมไพล์และติดตั้ง GD และ ZIP Extension
    docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install gd zip opcache pdo_pgsql pgsql && \

    # ทำความสะอาดไฟล์ติดตั้ง
    apt-get clean && rm -rf /var/lib/apt/lists/*
    
# คัดลอกไฟล์เว็บไซต์ไปยังโฟลเดอร์ Nginx
COPY . /usr/share/nginx/html

# ตั้งค่าโฟลเดอร์สำหรับ PHP
RUN mkdir -p /run/php && \
    chown -R www-data:www-data /usr/share/nginx/html

# คัดลอกไฟล์การตั้งค่า Nginx ไปยัง sites-available และสร้าง symbolic link ไปยัง sites-enabled
COPY ./conf.d/default.conf /etc/nginx/sites-available/default
COPY ./conf.d/php_settings.conf /etc/nginx/conf.d/php_settings.conf
RUN rm -f /etc/nginx/sites-enabled/default && \
    ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# ตั้งค่า entrypoint สำหรับรัน Nginx และ PHP-FPM
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

WORKDIR /usr/share/nginx/html/singha-members
COPY --from=composer /usr/bin/composer /usr/bin/composer

#start
RUN composer require phpmailer/phpmailer
RUN composer require league/flysystem-aws-s3-v3:^3.0
RUN composer dump-autoload
#end

RUN composer install
RUN chown -R www-data:www-data /usr/share/nginx/html/singha-members
RUN chown -R www-data:www-data /usr/share/nginx/html/singha-members/storage
RUN chown -R www-data:www-data /usr/share/nginx/html/singha-members/bootstrap/cache
RUN chmod -R 775 /usr/share/nginx/html/singha-members/storage
RUN chmod -R 775 /usr/share/nginx/html/singha-members/bootstrap/cache

COPY ./singha-members/.env.prod /usr/share/nginx/html/singha-members/.env
#RUN php artisan key:generate
# RUN php artisan config:cache
RUN php artisan config:clear
RUN php artisan cache:clear
RUN php artisan storage:link

# ติดตั้งเครื่องมือที่จำเป็น
RUN apt-get update && apt-get install -y \
    curl gnupg2 ca-certificates lsb-release

# ติดตั้ง Node.js v18.17.1 และ npm 9.6.7
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@9.6.7

# ตรวจสอบเวอร์ชันของ Node.js และ npm
RUN node -v && npm -v

# ติดตั้ง dependencies
RUN npm install

# สร้างโปรเจกต์
RUN npm run build

# เปิดพอร์ต 8080
EXPOSE 8080

# เรียก entrypoint เพื่อรัน Nginx และ PHP-FPM
ENTRYPOINT ["docker-entrypoint.sh"]

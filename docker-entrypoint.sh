#!/bin/sh

echo "Starting Entrypoint Script..."

# 1. สร้างโฟลเดอร์ย่อยที่จำเป็นสำหรับ Laravel (ป้องกันกรณี git ละเว้นโฟลเดอร์ว่าง)
mkdir -p /usr/share/nginx/html/singha-members/storage/framework/cache/data
mkdir -p /usr/share/nginx/html/singha-members/storage/framework/sessions
mkdir -p /usr/share/nginx/html/singha-members/storage/framework/views
mkdir -p /usr/share/nginx/html/singha-members/storage/logs
mkdir -p /usr/share/nginx/html/singha-members/bootstrap/cache

# 2. ปรับ Ownership ให้ Nginx และ PHP-FPM (www-data) เป็นเจ้าของ
echo "Setting up permissions for storage and bootstrap/cache..."
chown -R www-data:www-data /usr/share/nginx/html/singha-members/storage
chown -R www-data:www-data /usr/share/nginx/html/singha-members/bootstrap/cache

# 3. กำหนดสิทธิ์ให้สามารถอ่าน/เขียน/รัน ได้อย่างถูกต้อง (775)
chmod -R 775 /usr/share/nginx/html/singha-members/storage
chmod -R 775 /usr/share/nginx/html/singha-members/bootstrap/cache

echo "Permissions configured successfully."
echo "Starting PHP-FPM and Nginx..."

# 4. รัน PHP-FPM และ Nginx
php-fpm &  # รัน PHP-FPM เป็น background process
nginx -g "daemon off;"  # รัน Nginx เป็น foreground เพื่อไม่ให้ Container ดับ
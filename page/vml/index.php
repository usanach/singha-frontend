<?php
header('Content-Type: text/plain');
$url = "https://residential.singhaestate.co.th/leadadmin/api/project/seo";

echo "--- Testing Connection for: $url ---\n\n";

// 1. เช็คว่า allow_url_fopen เปิดอยู่ไหม
echo "1. allow_url_fopen: " . (ini_get('allow_url_fopen') ? "ON" : "OFF") . "\n";

// 2. ทดลองใช้ file_get_contents แบบพื้นฐาน
echo "2. file_get_contents (Basic): ";
$data = @file_get_contents($url);
echo ($data === false) ? "FAILED\n" : "SUCCESS\n";

// 3. ทดลองใช้ file_get_contents แบบใส่ User-Agent (เลียนแบบ Browser)
echo "3. file_get_contents (with User-Agent): ";
$options = [
    "http" => [
        "method" => "GET",
        "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36\r\n"
    ],
    "ssl" => [
        "verify_peer" => false, // ข้ามการเช็ค SSL ถ้าจำเป็น
        "verify_peer_name" => false,
    ]
];
$context = stream_context_create($options);
$data_ua = @file_get_contents($url, false, $context);
echo ($data_ua === false) ? "FAILED\n" : "SUCCESS\n";

// 4. ทดลองใช้ cURL (แนะนำวิธีนี้ที่สุด)
echo "4. cURL Test: ";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // กรณี SSL มีปัญหา
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
$curl_res = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if ($curl_res === false) {
    echo "FAILED (Error: " . curl_error($ch) . ")\n";
} else {
    echo "SUCCESS (HTTP Code: $http_code)\n";
}
curl_close($ch);
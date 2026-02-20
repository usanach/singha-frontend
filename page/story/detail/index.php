
<!DOCTYPE html>
<html lang="en">
<?php 

// ปิดการแจ้งเตือนทุกชนิด
error_reporting(0);
ini_set('display_errors', '0');

?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/fonts/font.css">
    <link href="/assets/fonts/f1/stylesheet.css" rel="stylesheet">
    <link href="/assets/fonts/f2/stylesheet.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/fonts/singha/stylesheet.css">

    <link rel="stylesheet" href="/page/story/detail/component/component1/article_component1.css">
    <link rel="stylesheet" href="/page/story/detail/component/component2/article_component2.css">
    <link rel="stylesheet" href="/page/story/detail/component/component3/article_component3.css">
    <link rel="stylesheet" href="/page/story/detail/component/component4/article_component4.css">
    <link rel="stylesheet" href="/page/story/detail/component/component5/article_component5.css">
    <link rel="stylesheet" href="/page/story/detail/component/component6/article_component6.css">
    <link rel="stylesheet" href="/page/story/detail/component/component7/article_component7.css">
    <link rel="stylesheet" href="/page/story/detail/component/component8/article_component8.css">
    <link rel="stylesheet" href="/page/story/detail/component/component9/article_component9.css">
    <link rel="stylesheet" href="/page/story/detail/component/component10/article_component10.css">
    <link rel="stylesheet" href="/page/story/detail/component/component11/article_component11.css">
    <link rel="stylesheet" href="/page/story/detail/component/component12/article_component12.css">
    <link rel="stylesheet" href="/page/story/detail/component/banner/articlesHeaderPage.css">
    <!-- header -->
    <link rel="stylesheet" href="/assets/js/swiper/swiper-bundle.min.css">
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

    <link rel="stylesheet" href="/src/output.css">
    <!-- header -->
    <link rel="stylesheet" href="/assets/js/owl-carousel/owl.carousel.min.css">
    <link rel="stylesheet" href="/assets/js/owl-carousel/owl.theme.default.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/css/lightgallery.min.css">
    <!-- Google Tag Manager -->
    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-MGKK5G');
    </script>
    <?php
// ปิดการแจ้งเตือนทุกชนิด
error_reporting(0);
ini_set('display_errors', '0');

// -------------------- ENV CONFIG (ให้เหมือน config.js) --------------------
$hostRaw = $_SERVER['HTTP_HOST'] ?? 'localhost';
$scheme  = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
$frontDomain = $scheme . $hostRaw; // domain ฝั่งหน้าเว็บหลัก เช่น https://residential.singhaestate.co.th

// map env แบบเดียวกับ config.js
if ($hostRaw === 'localhost' || $hostRaw === '127.0.0.1' || strpos($hostRaw, 'local') !== false) {
    // local
    $env        = 'local';
    $apiBaseUrl = 'http://localhost:8000/api';
    $storageUrl = 'http://localhost:8000/storage/';
} elseif (strpos($hostRaw, 'uat') !== false) {
    // UAT
    $env        = 'staging';
    $apiBaseUrl = 'https://residential-uat.singhaestate.co.th/leadadmin/api';
    $storageUrl = 'https://sreweb-prod-media.s3.ap-southeast-1.amazonaws.com/';
} else {
    // production
    $env        = 'production';
    $apiBaseUrl = 'https://residential.singhaestate.co.th/leadadmin/api';
    $storageUrl = 'https://sreweb-prod-media.s3.ap-southeast-1.amazonaws.com/';
}

// -------------------- อ่าน path + language --------------------
$current_path_raw = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';

// ภาษา: ถ้า path ขึ้นต้นด้วย /en/ ให้เป็น en, ไม่งั้น th
$language = 'th';
if (strpos($current_path_raw, '/en/') === 0) {
    $language = 'en';
}

// -------------------- ค่า default meta --------------------
$title       = 'Singha Estate';
$description = 'Welcome to Singha Estate';
$keywords    = 'Singha Estate PLC';
$og_image    = $frontDomain . '/assets/default-og.jpg';
$og_url      = $frontDomain . $current_path_raw;

// -------------------- ดึงข้อมูลจาก API /article --------------------
try {
    
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
    $articleJson = file_get_contents($API_BASE . '/article', false, $context);
} catch (Throwable $e) {}

if ($articleJson !== false) {
    $articleData = json_decode($articleJson, true);

    if (json_last_error() === JSON_ERROR_NONE && isset($articleData['data']) && is_array($articleData['data'])) {

        foreach ($articleData['data'] as $a) {

            // URL ที่ได้จาก API ตามภาษา
            $urlFromApi = ($language === 'en')
                ? ($a['url_en'] ?? null)
                : ($a['url_th'] ?? null);

            // ถ้า URL จาก API ตรงกับ path ปัจจุบัน
            if ($urlFromApi && $urlFromApi === $current_path_raw) {

                // title
                $rawTitle =
                    ($a['meta_title'] ?? null)
                    ?? ($a['title'][$language] ?? null)
                    ?? ($a['title']['th'] ?? null)
                    ?? 'Singha Estate';

                // description
                $rawDesc =
                    ($a['meta_description'] ?? null)
                    ?? ($a['detail'][$language] ?? null)
                    ?? ($a['detail']['th'] ?? null)
                    ?? '';

                // keywords
                $rawKeywords =
                    ($a['meta_keywords'] ?? null)
                    ?? ($a['tag'] ?? null)
                    ?? 'Singha Estate PLC';

                // og:image
                $rawOgImage = null;
                if (!empty($a['og_image_small'])) {
                    $img = $a['og_image_small'];

                    if (preg_match('#^https?://#', $img)) {
                        // ถ้า API ส่งเป็น URL เต็มอยู่แล้ว
                        $rawOgImage = $img;
                    } else {
                        // ถ้า API ส่ง path แบบ "uploads/article/xxx.webp"
                        if (strpos($img, 'uploads/') === 0) {
                            $rawOgImage = rtrim($storageUrl, '/') . '/' . ltrim($img, '/');
                        } else {
                            // ถ้าส่งมาเป็นแค่ชื่อไฟล์ เช่น "thumb_1764739362_5.webp"
                            $rawOgImage = rtrim($storageUrl, '/') . 'uploads/article/' . $img;
                        }
                    }
                }

                // escape ก่อน inject ลง meta
                $title       = htmlspecialchars($rawTitle,    ENT_QUOTES, 'UTF-8');
                $description = htmlspecialchars($rawDesc,     ENT_QUOTES, 'UTF-8');
                $keywords    = htmlspecialchars($rawKeywords, ENT_QUOTES, 'UTF-8');
                $og_image    = htmlspecialchars($rawOgImage ?: $og_image, ENT_QUOTES, 'UTF-8');
                $og_url      = htmlspecialchars($frontDomain . $urlFromApi, ENT_QUOTES, 'UTF-8');

                break;
            }
        }
    }
}
?>
<meta charset="utf-8">
<title><?= $title ?> | SINGHA ESTATE</title>
<link rel="icon" type="image/svg+xml" href="https://residential.singhaestate.co.th/assets/image/residential/logo-tab.png">
<meta name="description" content="<?= $description ?>">
<meta name="keywords" content="<?= $keywords ?>">
<meta property="og:title" content="<?= $title ?> | <?= $keywords ?>">
<meta property="og:description" content="<?= $description ?>">
<meta property="og:image" content="<?= $og_image ?>">
<meta property="og:url" content="<?= $og_url ?>">


    <script>
        (function () {

            // Function to extract language from the URL
            const getLanguageFromPath = () => {
                const path = window.location.pathname;
                const match = path.match(/\/(th|en)(\/|$)/);
                return match ? match[1] : 'th'; // Default to 'th' if not found
            };

            const lang = getLanguageFromPath();

            // 2. map to the right cwcid
            const cwcidMap = {
                en: 'G8KagLJ5UosNj5tSaTpuRKc8',
                th: 'RKrTF5pZRzyMGQDJY2eGdC41'
            };
            const cwcid = cwcidMap[lang];

            // 3. inject the core library
            const head = document.head;
            const core = document.createElement('script');
            core.src = 'https://cookiecdn.com/cwc.js';
            core.async = true;
            head.appendChild(core);

            // 4. once it's loaded, inject the config
            core.onload = () => {
                const cfg = document.createElement('script');
                cfg.id = 'cookieWow';
                cfg.src = `https://cookiecdn.com/configs/${cwcid}`;
                cfg.setAttribute('data-cwcid', cwcid);
                head.appendChild(cfg);
            };
        })();
    </script>
</head>

<body>
    <main class="article-page" id="app">
        <header-component></header-component>
        <banner-component></banner-component>
        <content-component></content-component>
        <article11-component></article11-component>
        <article10-component></article10-component>
        <!-- footer -->
        <footer-component></footer-component>
        <!-- footer -->

        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MGKK5G" height="0" width="0"
                style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
    </main>

    <!-- Loading Screen -->
    <div id="loading-screen"
        class="fixed inset-0 flex items-center justify-center bg-[#1A2F4D] z-[9999]">
        <div class="loader"></div>
    </div>


    

    <style>
    /* Simple spinner */
    .loader {
        border: 6px solid #e5e7eb;
        border-top: 6px solid #1a2f4d;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    </style>
    
    <script src="/config.js"></script>
    <script src="/assets/js/vue/vue.global.prod.js"></script>
    <script src="/assets/js/axios/axios.min.js"></script>
    <script src="/page/api.js"></script>

    <script src="/assets/js/jquery-3.6.0.min.js"></script>
    <script src="/assets/js/owl-carousel/owl.carousel.min.js"></script>
    <script src="/assets/js/gsap/gsap.min.js"></script>
    <script src="/assets/js/gsap/ScrollTrigger.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/js/lightgallery-all.min.js"></script>
    <script src="/assets/js/aos/aos.js"></script>
    <!-- header -->
    <script src="/assets/js/swiper/swiper-bundle.min.js"></script>
    <script src="/assets/js/gsap/SmoothScroll.min.js"
        integrity="sha512-HaoDYc3PGduguBWOSToNc0AWGHBi2Y432Ssp3wNIdlOzrunCtB2qq6FrhtPbo+PlbvRbyi86dr5VQx61eg/daQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="/assets/js/api.js"></script>

    <!-- header -->

    <script src="/component/header/header.js"></script>
    <script src="/component/footer/footer.js"></script>
    <script src="/page/story/detail/component/banner/component.js"></script>
    <script src="/page/story/detail/component/component10/component.js"></script>
    <script src="/page/story/detail/component/component11/component.js"></script>
    <script src="/page/story/detail/content/component.js"></script>
    <script src="/page/story/detail/main.js"></script>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-MNKFVS8Q98"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-MNKFVS8Q98');
    </script>
    <!-- Google tag (gtag.js) -->
</body>

</html>
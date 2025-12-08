<!doctype html>
<html>

<head>
    <?php
        // -----------------------------
        // 1) หาจาก URL ปัจจุบัน
        // -----------------------------
        // ex: /th/house/detached-house/santiburi-the-residences
        $currentPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';

        // -----------------------------
        // 2) หา language จาก path
        // -----------------------------
        if (preg_match('#^/(th|en)(/|$)#', $currentPath, $m)) {
            $lang = $m[1]; // 'th' หรือ 'en'
        } else {
            $lang = 'th';
        }

        // -----------------------------
        // 3) base URL ของเว็บ + API + storage
        // -----------------------------
        $scheme  = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $host    = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $baseUrl = $scheme . '://' . $host;          // เช่น https://residential.singhaestate.co.th

        // ถ้า API อยู่ที่ Laravel local ให้เปลี่ยนเป็น 'http://127.0.0.1:8000/api'
        // หรือถ้า deploy แล้วอยู่โดเมนเดียวกันก็ใช้ $baseUrl.'/api' ได้
        $API_BASE     = 'http://127.0.0.1:8000/api';
        $STORAGE_BASE = $baseUrl . '/storage/';

        // -----------------------------
        // 4) ดึง SEO จาก API
        // -----------------------------
        $seoData = null;

        try {
            $apiUrl = $API_BASE . '/project/seo';

            // ใช้ file_get_contents แบบง่าย ๆ
            $json = @file_get_contents($apiUrl);

            if ($json !== false) {
                $decoded = json_decode($json, true);
                $rows    = $decoded['data'] ?? [];

                // filter: ตัดที่ seo_disabled = 1 ทิ้ง
                $rows = array_filter($rows, function ($row) {
                    return ($row['seo_disabled'] ?? 0) != 1;
                });

                // หา row ที่ URL ตรงกับ path ตามภาษา
                foreach ($rows as $row) {
                    $field = ($lang === 'en') ? 'seo_url_en' : 'seo_url_th';
                    if (!empty($row[$field]) && $row[$field] === $currentPath) {
                        $seoData = $row;
                        break;
                    }
                }
            }
        } catch (Throwable $e) {
            // ถ้าอยาก debug ก็ var_dump หรือ log ได้
            // error_log('SEO API error: ' . $e->getMessage());
        }

        // -----------------------------
        // 5) ตั้ง default ถ้าไม่พบข้อมูลจาก API
        // -----------------------------
        $defaultTitle   = 'Singha Estate Residential';
        $defaultDesc    = 'ธุรกิจอสังหาริมทรัพย์เพื่อการพักอาศัย โครงการบ้านจาก สิงห์ เอสเตท มุ่งมั่นในการพัฒนาอสังหาริมทรัพย์ที่พักอาศัยทั้งแนวสูงและแนวราบ เพื่อตอบสนองความต้องการของลูกค้าที่หลากหลาย';
        $defaultKeyword = 'Singha Estate Residential, Singha Residential, Singha Estate, สิงห์ เรสซิเดนซ์, สิงห์ เอสเตท';
        $defaultOgImage = $baseUrl . '/assets/image/residential/logo-tab.png';

        $metaTitle       = $seoData['seo_meta_title']       ?? $defaultTitle;
        $metaDescription = $seoData['seo_meta_description'] ?? $defaultDesc;
        $metaKeyword     = $seoData['seo_meta_keyword']     ?? $defaultKeyword;

        // OG image
        $ogImage = $seoData['seo_og_img'] ?? null;
        if ($ogImage) {
            // ถ้าไม่ใช่ full URL ให้ prepend ด้วย STORAGE_BASE
            if (!preg_match('#^https?://#', $ogImage)) {
                $ogImage = $STORAGE_BASE . ltrim($ogImage, '/');
            }
        } else {
            $ogImage = $defaultOgImage;
        }

        // URL ปัจจุบันแบบเต็ม (ใช้กับ og:url ได้)
        $fullUrl = $baseUrl . $currentPath;
         // -----------------------------
        // 6) สร้าง landing_page key จาก path ท้าย
        // -----------------------------
        $pathSegments = explode('/', trim($currentPath, '/'));
        $lastSegment  = end($pathSegments) ?: 'page';

        // แปลงเป็นตัวพยัญชนะ/ตัวเลข + underscore
        // เช่น santiburi-the-residences -> santiburi_the_residences
        $landingKey = strtolower(preg_replace('/[^a-z0-9]+/i', '_', $lastSegment));
        $landingKey = trim($landingKey, '_');
        if ($landingKey === '') {
            $landingKey = 'page';
        }
    ?>
    <title>
        <?= htmlspecialchars($metaTitle, ENT_QUOTES, 'UTF-8'); ?>
    </title>

    <link rel="icon" type="image/svg+xml"
        href="https://residential.singhaestate.co.th/assets/image/residential/logo-tab.png">

    <meta name="description"
        content="<?= htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8'); ?>">

    <meta name="keywords"
        content="<?= htmlspecialchars($metaKeyword, ENT_QUOTES, 'UTF-8'); ?>">

    <meta property="og:title"
        content="<?= htmlspecialchars($metaTitle, ENT_QUOTES, 'UTF-8'); ?>">

    <meta property="og:description"
        content="<?= htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8'); ?>">

    <meta property="og:image"
        content="<?= htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8'); ?>">

    <meta property="og:url"
        content="<?= htmlspecialchars($fullUrl, ENT_QUOTES, 'UTF-8'); ?>">

    <meta property="og:type" content="website">



    <script src="https://www.google.com/recaptcha/api.js?render=6LevUS0nAAAAAInOUaytl6bgNgWFE4FQt2yofWyZ"></script>

    <link href="/assets/js/swiper/swiper-bundle.min.css" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <link href="/assets/fonts/f1/stylesheet.css" rel="stylesheet">
    <link href="/assets/fonts/f2/stylesheet.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets//fonts/f3/stylesheet.css">
    <link rel="stylesheet" href="/assets/fonts/singha/stylesheet.css">
    <link rel="stylesheet" href="/assets/fonts/cinzel/stylesheet.css">
    <link rel="stylesheet" href="/src/animate.css">
    <link rel="stylesheet" href="/src/rotatevdo.css">
    <link href="/src/output.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/lity@2.4.1/dist/lity.min.css" rel="stylesheet">
    <!-- Google Tag Manager -->
    <script>(function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-MGKK5G');</script>
    <!-- End Google Tag Manager -->


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

        <script type="application/ld+json">
        <?php
            echo json_encode([
                "@context"    => "https://schema.org",
                "@type"       => "WebPage",
                "name"        => $metaTitle,
                "description" => $metaDescription,
                "image"       => $ogImage,
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        ?>
        </script>

</head>

<body class="shawn-panya-page-home font-['IBM_Plex_Sans_Thai']">
    <div class="flex flex-col  overflow-x-hidden" id="app">
        <header-component></header-component>
        <sub-header-component></sub-header-component>
        <banner-component></banner-component>
        <craft-your-tale-component></craft-your-tale-component>
        <form-register-component></form-register-component>

        <design-concept-component></design-concept-component>
        <projects-highlight-component></projects-highlight-component>
        <project-information-component></project-information-component>
        <!-- <show-case-component></show-case-component> -->
        <gallery-component></gallery-component>
        <vdo-component></vdo-component>
        <location-component></location-component>
        <life-style-component></life-style-component>
        <related-projects-component></related-projects-component>
        <div class="fixed right-0 bottom-0 w-fit z-50">
            <more-info-component></more-info-component>
        </div>
        <footer-component></footer-component>
    </div>
    
    <!-- Loading Screen -->
    <div id="loading-screen"
        class="fixed inset-0 flex items-center justify-center bg-[#1A2F4D] z-[9999]">
        <div class="loader"></div>
    </div>


    <script>
    // Hide loading when page fully loaded
    window.addEventListener("load", () => {
        const loader = document.getElementById("loading-screen");
        loader.style.opacity = "0";

        setTimeout(() => loader.style.display = "none", 500);
    });
    </script>

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
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MGKK5G" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <script src="/assets/js/gsap/gsap.min.js"></script>
    <script src="/assets/js/gsap/ScrollTrigger.min.js"></script>
    <script src="/assets/js/gsap/SmoothScroll.min.js"
        integrity="sha512-HaoDYc3PGduguBWOSToNc0AWGHBi2Y432Ssp3wNIdlOzrunCtB2qq6FrhtPbo+PlbvRbyi86dr5VQx61eg/daQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="/assets/js/aos/aos.js"></script>
    <script src="/assets/js/swiper/swiper-bundle.min.js"></script>
    <script src="/assets/js/api.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/rellax@1.12.1/rellax.min.js"></script>

    <script defer src="/assets/js/custom.js"></script>
    <!-- Google tag (gtag.js) -->

    <script src="/page/shawn/component/header/header.js"></script>
    <script src="/component/footer/footer.js"></script>
    <script src="/page/shawn/shawn-content-page/shawn-panya/component/sub-header/component.js"></script>
    <script src="/page/projects/banner/component.js"></script>
    <script src="/page/shawn/shawn-content-page/shawn-panya/component/craft-your-tale/component.js"></script>
    <script src="/page/projects/form/component.js"></script>
    <script src="/page/shawn/shawn-content-page/shawn-panya/component/design-concept/component.js"></script>
    <script src="/page/shawn/shawn-content-page/shawn-panya/component/project-highlights/component.js"></script>
    <script src="/page/shawn/shawn-content-page/shawn-panya/component/project-information/component.js"></script>
    <script src="/page/shawn/shawn-content-page/shawn-panya/component/show-case/component.js"></script>
    <script src="/page/shawn/shawn-content-page/shawn-panya/component/gallery/component.js"></script>
    <script src="/page/shawn/shawn-content-page/shawn-panya/component/location-map/component.js"></script>
    <script src="/page/shawn/shawn-content-page/shawn-panya/component/life-style/component.js"></script>
    <script src="/page/shawn/shawn-content-page/shawn-panya/component/vdo/component.js"></script>
    <script src="/page/shawn/component/related-projects/component.js"></script>
    <script src="/component/more-info/component.js"></script>
    <script src="/page/shawn/shawn-content-page/shawn-panya/main.js"></script>

    <script defer src="/page/projects/dataLayer.js"></script>

    <script src="/assets/js/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lity@2.4.1/dist/lity.min.js"></script>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-MNKFVS8Q98"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'G-MNKFVS8Q98');
    </script>
    <!-- Google tag (gtag.js) -->

    <script defer>
        const landing_page = "project_<?= $landingKey ?>_page";

        const propertySelect = {
            event: "select_property",
            section: "related_projects",
            event_action: "click",
        }
        const propertyLoadMore = {
            event: "explore_more_property",
            landing_page: landing_page,
            section: "related_projects",
            event_action: "click",
            button: "explore_more_property"
        }
        const property_filter = {
            event: "property_filter",
            landing_page: landing_page,
            section: "related_projects",
            event_action: "click",
        }
    </script>


</body>

</html>

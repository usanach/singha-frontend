<!doctype html>
<html>

<head>
    <?php
// ดึง path จาก URL ปัจจุบัน
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$lowerPath = strtolower($path);

// default page type
$pageType = 'condo';

// เช็คจาก URL ว่าเป็นหน้า condo หรือ house
if (strpos($lowerPath, '/house') !== false) {
    $pageType = 'house';
} elseif (strpos($lowerPath, '/condominium') !== false || strpos($lowerPath, '/condo') !== false) {
    $pageType = 'condo';
}

// CONFIG SEO (ภาษาไทยอย่างเดียว)
$SEO_CONFIG = [
    'condo' => [
        'title'       => 'CONDOMINIUM | SINGHA ESTATE',
        'description' => 'ธุรกิจอสังหาริมทรัพย์เพื่อการพักอาศัย โครงการคอนโดมิเนียมจาก สิงห์ เอสเตท มุ่งมั่นในการพัฒนาที่พักอาศัยทั้งแนวสูง เพื่อตอบสนองความต้องการของลูกค้าที่หลากหลาย',
        'keywords'    => 'Condominium Singha Estate, คอนโดสิงห์ เอสเตท, Singha Estate Residential, สิงห์ เอสเตท',
        'og_title'    => 'CONDOMINIUM | SINGHA ESTATE',
        'og_desc'     => 'โครงการคอนโดมิเนียมจากสิงห์ เอสเตท ที่ตอบโจทย์ทุกไลฟ์สไตล์การอยู่อาศัย',
        'og_image'    => 'https://residential.singhaestate.co.th/assets/og/OG_R.jpg',
    ],
    'house' => [
        'title'       => 'HOUSE | SINGHA ESTATE',
        'description' => 'ธุรกิจอสังหาริมทรัพย์เพื่อการพักอาศัย โครงการบ้านจาก สิงห์ เอสเตท มุ่งมั่นในการพัฒนาที่พักอาศัยแนวราบ เพื่อตอบโจทย์การใช้ชีวิตของทุกคนในครอบครัว',
        'keywords'    => 'บ้าน Singha Estate, โครงการบ้านสิงห์ เอสเตท, Singha Estate Residential, สิงห์ เอสเตท',
        'og_title'    => 'HOUSE | SINGHA ESTATE',
        'og_desc'     => 'โครงการบ้านแนวราบจากสิงห์ เอสเตท ที่ออกแบบเพื่อการอยู่อาศัยอย่างมีคุณภาพ',
        'og_image'    => 'https://residential.singhaestate.co.th/assets/og/OG_R.jpg',
    ],
];

// fallback เผื่อ value หาย
$seo = $SEO_CONFIG['condo'];
if (isset($SEO_CONFIG[$pageType])) {
    $seo = $SEO_CONFIG[$pageType];
}
?>

    <meta http-equiv="expires" content="0">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

    <title><?= htmlspecialchars($seo['title'], ENT_QUOTES, 'UTF-8') ?></title>

    <link rel="icon" type="image/svg+xml"
          href="https://residential.singhaestate.co.th/assets/image/residential/logo-tab.png">

    <meta name="description"
          content="<?= htmlspecialchars($seo['description'], ENT_QUOTES, 'UTF-8') ?>">
    <meta name="keywords"
          content="<?= htmlspecialchars($seo['keywords'], ENT_QUOTES, 'UTF-8') ?>">

    <meta property="og:title"
          content="<?= htmlspecialchars($seo['og_title'], ENT_QUOTES, 'UTF-8') ?>">
    <meta property="og:description"
          content="<?= htmlspecialchars($seo['og_desc'], ENT_QUOTES, 'UTF-8') ?>">
    <meta property="og:image"
          content="<?= htmlspecialchars($seo['og_image'], ENT_QUOTES, 'UTF-8') ?>">

    <script src="https://www.google.com/recaptcha/api.js?render=6LevUS0nAAAAAInOUaytl6bgNgWFE4FQt2yofWyZ"></script>

    <link href="/assets/js/swiper/swiper-bundle.min.css" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

    <link rel="stylesheet" href="/assets/fonts/font.css">
    <link href="/assets/fonts/f1/stylesheet.css" rel="stylesheet">
    <link href="/assets/fonts/f2/stylesheet.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets//fonts/f3/stylesheet.css">
    <link rel="stylesheet" href="/assets/fonts/singha/stylesheet.css">
    <link rel="stylesheet" href="/assets/fonts/cinzel/stylesheet.css">
    <link rel="stylesheet" href="/src/animate.css">
    <link rel="stylesheet" href="/page/becomeAgent/estateBecomeAgent.css">
    <link rel="stylesheet" href="/page/story/detail/component/component10/article_component10.css">
    <link href="/src/output.css" rel="stylesheet">
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
</head>

<body class="house-and-condo-page-home">
    <div class="flex flex-col  overflow-x-hidden" id="app">
        <header-component></header-component>
        <sub-header-component></sub-header-component>
        <banner-component></banner-component>
        <projects-highlight-component></projects-highlight-component>
        <collection-component></collection-component>
        <div class="lg:pb-20 md:bg-[url('./../assets/image/story/bg.svg')] bg-[url('./../assets/image/story/bg-m.svg')] bg-no-repeat bg-cover bg-center">
            <filter-component></filter-component>
        </div>
        <entrusted-component></entrusted-component>
        <div class="-mt-2">
            <article10-component></article10-component>
        </div>
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

    <!-- Example Page Content -->
    <div>
        <h1 class="text-3xl font-bold p-10">Your Page Content</h1>
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
    <script src="/assets/js/jquery-3.6.0.min.js"></script>
    <script src="/assets/js/owl-carousel/owl.carousel.min.js"></script>
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

    <script src="/page/house_and_condo/component/header/header.js"></script>
    <script src="/component/footer/footer.js"></script>
    <script src="/page/house_and_condo/page/condo/component/sub-header/component.js"></script>
    <script src="/page/house_and_condo/components/banner/component.js"></script>
    <script src="/page/house_and_condo/components/highlights/component.js"></script>
    <script src="/page/house_and_condo/components/collections/component.js"></script>
    <script src="/page/house_and_condo/page/condo/component/filter/component.js"></script>
    <script src="/page/house_and_condo/components/entrusted/component.js"></script>
    <script src="/page/story/detail/component/component10/component.js"></script>
    <script src="/component/more-info/component.js"></script>
    <script src="/page/house_and_condo/page/condo/main.js"></script>
    <script defer src="/page/house_and_condo/page/condo/dataLayer.js"></script>


    <script async src="https://www.googletagmanager.com/gtag/js?id=G-MNKFVS8Q98"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'G-MNKFVS8Q98');
    </script>
    <!-- Google tag (gtag.js) -->

    <script defer>
        const landing_page = "landing_condo_page";
        const propertySelect = {
            event: "select_property",
            section: "residence_discovery",
            event_action: "click",
        }
        const propertyLoadMore = {
            event: "explore_more_property",
            landing_page: landing_page,
            section: "residence_discovery",
            event_action: "click",
            button: "explore_more_property"
        }
        const property_filter = {
            event: "property_filter",
            landing_page: landing_page,
            section: "residence_discovery",
            event_action: "click",
        }
    </script>

</body>

</html>
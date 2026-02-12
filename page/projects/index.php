<?php
// =================================================
// BOOTSTRAP + SEO + 404 (MUST BE BEFORE HTML)
// =================================================

// 1) current path
$currentPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';

// 2) language
if (preg_match('#^/(th|en)(/|$)#', $currentPath, $m)) {
    $lang = $m[1];
} else {
    $lang = 'th';
}

// 3) base url + env
$scheme   = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host_raw = $_SERVER['HTTP_HOST'] ?? 'localhost';
$baseUrl  = $scheme . '://' . $host_raw;

if ($host_raw === 'localhost' || $host_raw === '127.0.0.1' || strpos($host_raw, 'local') !== false) {
    $apiBaseUrl = 'http://localhost:8000/api';
    $storageUrl = 'http://localhost:8000/storage/';
} elseif (strpos($host_raw, 'uat') !== false) {
    $apiBaseUrl = 'https://residential-uat.singhaestate.co.th/leadadmin/api';
    $storageUrl = 'https://sreweb-prod-media.s3.ap-southeast-1.amazonaws.com/';
} else {
    $apiBaseUrl = 'https://residential.singhaestate.co.th/leadadmin/api';
    $storageUrl = 'https://sreweb-prod-media.s3.ap-southeast-1.amazonaws.com/';
}

$API_BASE     = rtrim($apiBaseUrl, '/');
$STORAGE_BASE = rtrim($storageUrl, '/') . '/';

// 4) SEO API
$seoData = null;
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
    $json = file_get_contents($API_BASE . '/project/seo', false, $context);

    if ($json !== false) {
        $rows = json_decode($json, true)['data'] ?? [];
        //$rows = array_filter($rows, fn($r) => ($r['seo_disabled'] ?? 0) != 1);
        
        foreach ($rows as $row) {
            $field = ($lang === 'en') ? 'seo_url_en' : 'seo_url_th';
            if (!empty($row[$field]) && $row[$field] === $currentPath) {
                $seoData = $row;
                break;
            }
        }
    }
} catch (Throwable $e) {}

// 🚨 404 BEFORE ANY HTML
if ($seoData === null) {
    http_response_code(404);

    $notFoundPage = __DIR__ . '/404.php';
    if (file_exists($notFoundPage)) {
        require $notFoundPage;
    } else {
        echo '
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Not Found</title>

        <style>
            /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}a{background-color:transparent}code{font-family:monospace,monospace;font-size:1em}[hidden]{display:none}html{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}*,:after,:before{box-sizing:border-box;border:0 solid #e2e8f0}a{color:inherit;text-decoration:inherit}code{font-family:Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}svg,video{display:block;vertical-align:middle}video{max-width:100%;height:auto}.bg-white{--bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--bg-opacity))}.bg-gray-100{--bg-opacity:1;background-color:#f7fafc;background-color:rgba(247,250,252,var(--bg-opacity))}.border-gray-200{--border-opacity:1;border-color:#edf2f7;border-color:rgba(237,242,247,var(--border-opacity))}.border-gray-400{--border-opacity:1;border-color:#cbd5e0;border-color:rgba(203,213,224,var(--border-opacity))}.border-t{border-top-width:1px}.border-r{border-right-width:1px}.flex{display:flex}.grid{display:grid}.hidden{display:none}.items-center{align-items:center}.justify-center{justify-content:center}.font-semibold{font-weight:600}.h-5{height:1.25rem}.h-8{height:2rem}.h-16{height:4rem}.text-sm{font-size:.875rem}.text-lg{font-size:1.125rem}.leading-7{line-height:1.75rem}.mx-auto{margin-left:auto;margin-right:auto}.ml-1{margin-left:.25rem}.mt-2{margin-top:.5rem}.mr-2{margin-right:.5rem}.ml-2{margin-left:.5rem}.mt-4{margin-top:1rem}.ml-4{margin-left:1rem}.mt-8{margin-top:2rem}.ml-12{margin-left:3rem}.-mt-px{margin-top:-1px}.max-w-xl{max-width:36rem}.max-w-6xl{max-width:72rem}.min-h-screen{min-height:100vh}.overflow-hidden{overflow:hidden}.p-6{padding:1.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.px-4{padding-left:1rem;padding-right:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.pt-8{padding-top:2rem}.fixed{position:fixed}.relative{position:relative}.top-0{top:0}.right-0{right:0}.shadow{box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)}.text-center{text-align:center}.text-gray-200{--text-opacity:1;color:#edf2f7;color:rgba(237,242,247,var(--text-opacity))}.text-gray-300{--text-opacity:1;color:#e2e8f0;color:rgba(226,232,240,var(--text-opacity))}.text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.text-gray-500{--text-opacity:1;color:#a0aec0;color:rgba(160,174,192,var(--text-opacity))}.text-gray-600{--text-opacity:1;color:#718096;color:rgba(113,128,150,var(--text-opacity))}.text-gray-700{--text-opacity:1;color:#4a5568;color:rgba(74,85,104,var(--text-opacity))}.text-gray-900{--text-opacity:1;color:#1a202c;color:rgba(26,32,44,var(--text-opacity))}.uppercase{text-transform:uppercase}.underline{text-decoration:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.tracking-wider{letter-spacing:.05em}.w-5{width:1.25rem}.w-8{width:2rem}.w-auto{width:auto}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}@-webkit-keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@-webkit-keyframes ping{0%{transform:scale(1);opacity:1}75%,to{transform:scale(2);opacity:0}}@keyframes ping{0%{transform:scale(1);opacity:1}75%,to{transform:scale(2);opacity:0}}@-webkit-keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}@-webkit-keyframes bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:translateY(0);-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}@keyframes bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:translateY(0);-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}@media (min-width:640px){.sm\:rounded-lg{border-radius:.5rem}.sm\:block{display:block}.sm\:items-center{align-items:center}.sm\:justify-start{justify-content:flex-start}.sm\:justify-between{justify-content:space-between}.sm\:h-20{height:5rem}.sm\:ml-0{margin-left:0}.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\:pt-0{padding-top:0}.sm\:text-left{text-align:left}.sm\:text-right{text-align:right}}@media (min-width:768px){.md\:border-t-0{border-top-width:0}.md\:border-l{border-left-width:1px}.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:1024px){.lg\:px-8{padding-left:2rem;padding-right:2rem}}@media (prefers-color-scheme:dark){.dark\:bg-gray-800{--bg-opacity:1;background-color:#2d3748;background-color:rgba(45,55,72,var(--bg-opacity))}.dark\:bg-gray-900{--bg-opacity:1;background-color:#1a202c;background-color:rgba(26,32,44,var(--bg-opacity))}.dark\:border-gray-700{--border-opacity:1;border-color:#4a5568;border-color:rgba(74,85,104,var(--border-opacity))}.dark\:text-white{--text-opacity:1;color:#fff;color:rgba(255,255,255,var(--text-opacity))}.dark\:text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}}
        </style>

        <style>
            body {
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            }
        </style>
    </head>
    <body class="antialiased">
        <div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
            <div class="max-w-xl mx-auto sm:px-6 lg:px-8">
                <div class="flex items-center pt-8 sm:justify-start sm:pt-0">
                    <div class="px-4 text-lg text-gray-500 border-r border-gray-400 tracking-wider">
                        404                    </div>

                    <div class="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                        Not Found                    </div>
                </div>
            </div>
        </div>
    </body>
</html>';
    }
    exit;
}

// =================================================
// META
// =================================================
$defaultTitle   = 'Singha Estate Residential';
$defaultDesc    = 'ธุรกิจอสังหาริมทรัพย์เพื่อการพักอาศัย';
$defaultKeyword = 'Singha Estate Residential';
$defaultOgImage = $baseUrl . '/assets/image/residential/logo-tab.png';

$metaTitle       = $seoData['seo_meta_title']       ?? $defaultTitle;
$metaDescription = $seoData['seo_meta_description'] ?? $defaultDesc;
$metaKeyword     = $seoData['seo_meta_keyword']     ?? $defaultKeyword;

$ogImage = $seoData['seo_og_img'] ?? $defaultOgImage;
if ($ogImage && !preg_match('#^https?://#', $ogImage)) {
    $ogImage = $STORAGE_BASE . ltrim($ogImage, '/');
}

$fullUrl = $baseUrl . $currentPath;

// landing key
$segments   = explode('/', trim($currentPath, '/'));
$last       = end($segments) ?: 'page';
$landingKey = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '_', $last), '_'));

$gaNumber = $seoData['seo_ga_number'] ?? 'G-MNKFVS8Q98';
?>

<!doctype html>
<html>

<head>
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

    <meta name="viewport" content="width=device-width, initial-scale=1.0">


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
      const projectIDs = "<?= $seoData['project_id'] ?>";
      const zap = "<?= $seoData['seo_zapier_hooks'] ?>";
    </script>
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

    <script src="/assets/js/gsap/gsap.min.js"></script>
    <script src="/assets/js/gsap/ScrollTrigger.min.js"></script>
    <script src="/assets/js/gsap/SmoothScroll.min.js"
        integrity="sha512-HaoDYc3PGduguBWOSToNc0AWGHBi2Y432Ssp3wNIdlOzrunCtB2qq6FrhtPbo+PlbvRbyi86dr5VQx61eg/daQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="/assets/js/aos/aos.js"></script>
    <script src="/assets/js/swiper/swiper-bundle.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/rellax@1.12.1/rellax.min.js"></script>

    <script defer src="/assets/js/custom.js"></script>
    <script src="/page/api.js"></script>
    <!-- Google tag (gtag.js) -->

    <script src="/component/header/header.js"></script>
    <script src="/component/footer/footer.js"></script>
    <script src="/page/projects/sub-header/component.js"></script>
    <script src="/page/projects/banner/component.js"></script>
    <script src="/page/projects/brand-tagline/component.js"></script>
    <script src="/page/projects/brand-tagline-extro/component.js"></script>
    <script src="/page/projects/form/component.js"></script>
    <script src="/page/projects/design-concept/component.js"></script>
    <script src="/page/projects/project-highlight/component.js"></script>
    <script src="/page/projects/project_information/component.js"></script>
    <script src="/page/shawn/shawn-content-page/shawn-panya/component/show-case/component.js"></script>
    <script src="/page/projects/gallery/component.js"></script>
    <script src="/page/projects/location/component.js"></script>
    <script src="/page/projects/slifestyle/component.js"></script>
    <script src="/page/projects/vdo/component.js"></script>
    <script src="/page/projects/related-projects/component.js"></script>
    <script src="/component/more-info/component.js"></script>
    <script src="/page/projects/main.js"></script>

    <script defer src="/page/projects/dataLayer.js"></script>

    <script src="/assets/js/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lity@2.4.1/dist/lity.min.js"></script>

    <script async src="https://www.googletagmanager.com/gtag/js?id=<?= htmlspecialchars($gaNumber, ENT_QUOTES, "UTF-8"); ?>"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', '<?= htmlspecialchars($gaNumber, ENT_QUOTES, "UTF-8"); ?>');
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

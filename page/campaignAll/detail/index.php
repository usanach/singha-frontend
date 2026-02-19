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
    
    <script src="https://www.google.com/recaptcha/api.js?render=6LevUS0nAAAAAInOUaytl6bgNgWFE4FQt2yofWyZ"></script>

    <link rel="stylesheet" href="/page/campaignAll/detail/estateCampaignDetail.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/fonts/font.css">
    <link rel="stylesheet" href="/assets/fonts/f1/stylesheet.css">
    <link rel="stylesheet" href="/assets/fonts/f2/stylesheet.css">
    <!-- header -->
    <link rel="stylesheet" href="/assets/fonts/singha/stylesheet.css">
    <link rel="stylesheet" href="/assets/fonts/cinzel/stylesheet.css">
    <link rel="stylesheet" href="/assets/js/swiper/swiper-bundle.min.css">
    <link rel="stylesheet" href="/page/story/detail/component/component10/article_component10.css">
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">

    <link rel="stylesheet" href="/src/output.css">
    <!-- header -->
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
    <!-- End Google Tag Manager -->

<?php
// =========================
//   ดึงเมต้า จาก API (promotion)
// =========================

// 1) current path + host
$current_path_raw = filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_URL) ?: '/';
$current_path     = parse_url($current_path_raw, PHP_URL_PATH) ?: '/';

$host_raw = filter_input(INPUT_SERVER, 'HTTP_HOST', FILTER_SANITIZE_STRING) ?: ($_SERVER['HTTP_HOST'] ?? 'localhost');

// 2) สร้าง frontend domain (ใช้ทำ og:url)
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
$frontDomain = $scheme . $host_raw;

// 3) ตรวจ env แบบเดียวกับ config.js
if ($host_raw === 'localhost' || $host_raw === '127.0.0.1' || strpos($host_raw, 'local') !== false) {
    // local
    $env        = 'local';
    $apiBaseUrl = 'http://localhost:8000/api';
    $storageUrl = 'http://localhost:8000/storage/';
} elseif (strpos($host_raw, 'uat') !== false) {
    // uat
    $env        = 'staging';
    $apiBaseUrl = 'https://residential-uat.singhaestate.co.th/leadadmin/api';
    $storageUrl = 'https://sreweb-prod-media.s3.ap-southeast-1.amazonaws.com/';
} else {
    // production
    $env        = 'production';
    $apiBaseUrl = 'https://residential.singhaestate.co.th/leadadmin/api';
    $storageUrl = 'https://sreweb-prod-media.s3.ap-southeast-1.amazonaws.com/';
}

// 4) ตรวจภาษา จาก path
$language = 'th';
if (strpos($current_path, '/en/') === 0) {
    $language = 'en';
}

// 5) ค่าเริ่มต้นของ meta + dataForm
$title       = 'Singha Estate';
$description = 'Welcome to Singha Estate';
$keywords    = 'singha,estate';
$og_image    = $frontDomain . '/assets/default-og.webp';
$og_url      = $frontDomain . '/';

$dataForm = 0; // default แสดงฟอร์มเสมอ ถ้าไม่เจอใน API

// 6) call API /promotion ตาม env
$apiUrl      = rtrim($apiBaseUrl, '/') . '/promotion';
$apiResponse = @file_get_contents($apiUrl);

if ($apiResponse !== false) {
    $promotionJson = json_decode($apiResponse, true);
    $promotionItemIds = '';
    $zaphook = '';
    $emailDesktop = '';
    $emailMobile  = '';
    $emailImage   = '';

    if (json_last_error() === JSON_ERROR_NONE && isset($promotionJson['sub-data']) && is_array($promotionJson['sub-data'])) {

        foreach ($promotionJson['sub-data'] as $item) {
            $urlTh = $item['data_url_th'] ?? '';
            $urlEn = $item['data_url_en'] ?? '';
            $zaphook = $item['data_zapier_hooks'] ??'';
            $promotionItemIds = $item['id'] ??'';

            $isMatchTh = ($language === 'th' && $urlTh === $current_path);
            $isMatchEn = ($language === 'en' && $urlEn === $current_path);

            if ($isMatchTh || $isMatchEn) {
                // ------- เจอ promotion ที่ตรง path ปัจจุบัน -------

                // meta text
                $rawTitle = $item['meta_title']       ?? 'Singha Estate';
                $rawDesc  = $item['meta_description'] ?? '';
                $rawKey   = $item['meta_keyword']     ?? 'Singha Estate PLC';

                // og image: ใช้ og_image_small ถ้ามี, ไม่งั้น fallback image_0
                $rawOgPath = $item['og_image_small'] ?? ($item['image_0'] ?? '');

                // ประกอบ URL รูปให้ตรงกับ storageUrl
                $rawOgFull = $og_image; // default เดิม
                if (!empty($rawOgPath)) {
                    if (preg_match('#^https?://#i', $rawOgPath)) {
                        // ถ้า API ส่ง URL มาเต็ม ๆ แล้ว
                        $rawOgFull = $rawOgPath;
                    } else {
                        // ถ้าเป็น path
                        if (strpos($rawOgPath, 'uploads/') === 0) {
                            // case: "uploads/promotion_item_data/xxx.jpg"
                            $rawOgFull = rtrim($storageUrl, '/') . '/' . ltrim($rawOgPath, '/');
                        } else {
                            // case: ส่งมาเป็นชื่อไฟล์ เช่น "thumb_1764653048_0.jpg"
                            $rawOgFull = rtrim($storageUrl, '/') . 'uploads/promotion_item_data/' . ltrim($rawOgPath, '/');
                        }
                    }
                }

                // escape ก่อน output ลง meta
                $title       = htmlspecialchars($rawTitle,  ENT_QUOTES, 'UTF-8');
                $description = htmlspecialchars($rawDesc,   ENT_QUOTES, 'UTF-8');
                $keywords    = htmlspecialchars($rawKey,    ENT_QUOTES, 'UTF-8');
                $og_image    = htmlspecialchars($rawOgFull, ENT_QUOTES, 'UTF-8');

                $pageUrl     = $isMatchEn ? $urlEn : $urlTh;
                $og_url      = htmlspecialchars($frontDomain . $pageUrl, ENT_QUOTES, 'UTF-8');

                // data_form: 0 = ปิดฟอร์ม, 1 = เปิดฟอร์ม
                $dataForm = isset($item['data_form']) ? (int)$item['data_form'] : 1;
                
                break;
            }
        }
    }
    
    if (!empty($promotionItemIds) && isset($promotionJson['emails']) && is_array($promotionJson['emails'])) {

        foreach ($promotionJson['emails'] as $emailRow) {

            if ((string)$emailRow['id_main'] === (string)$promotionItemIds) {

                if ($language === 'en') {
                    $emailDesktop = $emailRow['image_desktop_en'] ?? '';
                    $emailMobile  = $emailRow['image_mobile_en'] ?? '';
                } else {
                    $emailDesktop = $emailRow['image_desktop_th'] ?? '';
                    $emailMobile  = $emailRow['image_mobile_th'] ?? '';
                }

                $emailImage = $emailRow['image_email'] ?? '';
                break;
            }
        }
    }

    if (!empty($emailDesktop)) {
        $emailDesktop = rtrim($storageUrl, '/') . '/uploads/promotion_item_email/' . $emailDesktop;
    }

    if (!empty($emailMobile)) {
        $emailMobile = rtrim($storageUrl, '/') . '/uploads/promotion_item_email/' . $emailMobile;
    }

    if (!empty($emailImage)) {
        $emailImage = rtrim($storageUrl, '/') . '/uploads/promotion_item_email/' . $emailImage;
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

    <script>
      const promotionItemIds = "<?= $promotionItemIds ?>"
      const zap = "<?= $zaphook ?>";
    </script>

<body>
    <main class="campaign-detail-main" id="app">
        <header-component></header-component>
        <div class="min-h-screen">
            <content-component></content-component>
        </div>
        <div>
            <?php if ($dataForm === 1): ?>
                <section class="campaign-detail-form-section  " :class="[campaignShowDetail?'pb-20':'']">
                    <img class="campaign-form-detail-bg" src="/assets/image/estate_CampaignDetail/Rectangle4.webp" alt="bg" />
                    <div class="campaign-detail-form-wrapper">
                        <div class="form-section header-wrapper">
                            <div class="header-text-block">
                                <h2 :class="['header-text',font]">{{formSection.title}}</h2>
                            </div>
                            <div class="sub-text-block">
                                <p class="sub-text" v-html="formSection.detail"></p>
                            </div>
                        </div>
                        <form class="form-wrapper" id="questionForm" method="post" action="javascript:void(0)">
                            <div class="fullname-wrapper">
                                <div class="firstname-wrapper">
                                    <label class="firstname form-label">{{formSection.inputText.firstName[lang]}}</label>
                                    <input id="FIRST_NAME" name="FIRST_NAME" type="text" autocomplete="off" maxlength="40"
                                        oninput="validateInputFL(this)" onkeydown="checkPaste(event)" required />
                                </div>
                                <div class="lastname-wrapper">
                                    <label class="lastname form-label">{{formSection.inputText.lastName[lang]}}</label>
                                    <input id="LAST_NAME" name="LAST_NAME" type="text" autocomplete="off" maxlength="40"
                                        oninput="validateInputFL(this)" onkeydown="checkPaste(event)" required />
                                </div>
                            </div>
                            <div class="email-mobile-wrapper">
                                <div class="mobile-wrapper">
                                    <label class="mobile form-label">{{formSection.inputText.mobile[lang]}}</label>
                                    <input id="MOBILE_PHONE_NUMBER" name="MOBILE_PHONE_NUMBER" type="text" autocomplete="off"
                                        maxlength="10" oninput="validateInputTel(this)" onkeydown="checkPaste(event)"
                                        required />
                                </div>
                                <div class="email-wrapper">
                                    <label class="email form-label">{{formSection.inputText.email[lang]}}</label>
                                    <input id="EMAIL" name="EMAIL" type="text" autocomplete="off" maxlength="40"
                                        oninput="validateInputE(this)" onkeydown="checkPaste(event)" required />
                                </div>
                            </div>
                            <div class="project-name-wrapper">
                                <?php
                                // ============================
                                // language text
                                // ============================
                                $isEn = ($language === 'en');

                                $labelProject = $isEn ? 'Interested Project' : 'โครงการที่คุณสนใจ';
                                $placeholderProject = $isEn ? 'Please select a project' : 'กรุณาเลือกโครงการ';

                                // ============================
                                // project options
                                // ============================
                                $projectOptions = [];

                                $apiUrl = rtrim($apiBaseUrl, '/') . '/promotion';
                                $apiResponse = @file_get_contents($apiUrl);

                                if ($apiResponse !== false) {
                                $promotionJson = json_decode($apiResponse, true);

                                if (json_last_error() === JSON_ERROR_NONE) {
                                    $sub2 = $promotionJson['sub-data2'] ?? [];

                                    if (!empty($promotionItemIds) && is_array($sub2)) {
                                    foreach ($sub2 as $row) {
                                        if ((string)($row['promotion_item_data_id'] ?? '') === (string)$promotionItemIds) {

                                        $lv2 = trim($row['lv2'] ?? '');
                                        $lv3 = trim($row['lv3'] ?? '');
                                        if ($lv2 === '' && $lv3 === '') continue;

                                        $value = $lv2 . '|' . $lv3;
                                        $label = trim($lv2 . ' - ' . $lv3);

                                        $projectOptions[] = [
                                            'value' => $value,
                                            'label' => $label,
                                        ];
                                        }
                                    }
                                    }
                                }
                                }

                                // default selected (ถ้ามีตัวเดียว เลือกอัตโนมัติ)
                                $selectedProject = '';
                                if (count($projectOptions) === 1) {
                                $selectedProject = $projectOptions[0]['value'];
                                }
                                ?>

                                <div class="project-wrapper">
                                    <label class="project form-label">
                                        <?= $labelProject ?>
                                    </label>

                                    <select
                                        id="PROJECT"
                                        name="PROJECT"
                                        class="project-select text-black h-[40px]"
                                        required
                                    >
                                        <option value="" disabled <?= $selectedProject === '' ? 'selected' : '' ?>>
                                        <?= $placeholderProject ?>
                                        </option>

                                        <?php foreach ($projectOptions as $opt): ?>
                                        <?php
                                            $val = htmlspecialchars($opt['value'], ENT_QUOTES, 'UTF-8');
                                            $lab = htmlspecialchars($opt['label'], ENT_QUOTES, 'UTF-8');
                                            $isSelected = ($opt['value'] === $selectedProject) ? 'selected' : '';
                                        ?>
                                        <option value="<?= $val ?>" <?= $isSelected ?>>
                                            <?= $lab ?>
                                        </option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>

                                <div class="project-wrapper"></div>
                            </div>

                            <div class="notice-wrapper mt-5">
                                <p class="notice-text">
                                </p>
                            </div>
                            <div class="checkbox-wrapper">
                                <div class="checkbox">
                                    <input type="checkbox" id="check1" name="check1">
                                    <label class="form-check-label"
                                        v-html="formSection.inputText.terms.text2[lang]">
                                    </label>
                                </div>
                            </div>
                            <div class="notice-wrapper">
                                <p class="notice-text"></p>
                            </div>
                            <div class="submit-btn-wrapper">
                                <button type="submit" class="submit-btn" id="btnSubmit">
                                    <div class="loaded">
                                        <p>{{formSection.submitText[lang]}}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                                            <path
                                                d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z"
                                                data-name="3-Arrow Right" />
                                        </svg>
                                    </div>
                                    
                                    <div class="loading hidden">
                                        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
                                            fill="none">
                                            <circle cx="50" cy="50" r="40" stroke="#000" stroke-width="10" opacity="0.2" />
                                            <path d="M90 50a40 40 0 0 1-40 40" stroke="#000" stroke-width="10"
                                                stroke-linecap="round">
                                                <animateTransform attributeName="transform" type="rotate" from="0 50 50"
                                                    to="360 50 50" dur="1s" repeatCount="indefinite" />
                                            </path>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            <input type="hidden" id="firstTemp" name="firstTemp" value="">
                            <input type="hidden" id="lastTemp" name="lastTemp" value="">
                            <input type="hidden" id="projectTemp" name="projectTemp" value="">
                        </form>
                    </div>
                </section>

                <section class="campaign-detail-show-product" v-if="campaignShowDetail">
                    <div class="show-product-wrapper">
                        <div class="show-product-image">
                            <img class="show-product-img shadow-xl" :src="campaignShowDetail.image"
                                alt="show-product-image" />
                        </div>
                        <div class="show-product-text-wrapper">
                            <div class="text-wrapper mx-auto lg:max-w-[230px] max-w-[120px]">
                                <img :src="campaignShowDetail.logo" alt="">
                            </div>
                            <div class="desc-text-wrap">
                                <p class="desc-text text-center">{{campaignShowDetail.detail}}</p>
                            </div>
                            <div class="seerproject-btn-wrapper">
                                <a :data-href="campaignShowDetail.url" class="seerproject-btn cursor-pointer"
                                    onclick="toProject(this)">
                                    <p>{{campaignShowDetail.more}}</p>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" />
                                    </svg>

                                </a>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
            <?php endif; ?>

        </div>
        <div class="-mt-2">
            <article10-component></article10-component>
        </div>
        <!-- footer -->

        <footer-component></footer-component>
        <!-- footer -->
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MGKK5G" height="0" width="0"
                style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
    </main>


    <div class="form-popup-wrapper">
        <div class="flex justify-center absolute inset-0">
            <!-- <div class="lg:w-[250px] w-[110px] lg:mb-5 ">
                <img src="/assets/image/residential/logo singha estate.svg" alt="">
            </div> -->
            <div class="m-auto max-h-[60%] relative">
                <div class="popup-header-a absolute">
                    <button type="button" class="thank-popup-close">
                        <img src="/assets/icon/popup-close.svg" alt="">
                    </button>
                </div>

                <img class="lg:block hidden" src="<?php echo $emailDesktop; ?>">
                <img class="lg:hidden block" src="<?php echo $emailMobile; ?>">
            </div>
            <!-- <h3 class="font-['Cinzel'] font-normal">Thank you for expressing your interest</h3>
            <p class="font-normal">Our dedicated sales representative will be in touch with you shortly.</p> -->
        </div>
    </div>

    <!-- Loading Screen -->
    <div id="loading-screen"
        class="fixed inset-0 flex items-center justify-center bg-[#1A2F4D] z-[9999] transition-opacity duration-300 opacity-0 pointer-events-none">
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
    <!-- Google Tag Manager (noscript) -->
    <script src="/config.js"></script>
    <script src="/assets/js/vue/vue.global.prod.js"></script>
    <script src="/assets/js/axios/axios.min.js"></script>
    <script src="/page/api.js"></script>

    <script src="/assets/js/jquery-3.6.0.min.js"></script>
    <script src="/assets/js/jquery.validate.min.js"></script>
    <script src="/assets/js/additional-methods.min.js"></script>
    <script src="/assets/js/gsap/gsap.min.js"></script>
    <script src="/assets/js/gsap/ScrollTrigger.min.js"></script>
    <!-- header -->
    <script src="/assets/js/aos/aos.js"></script>
    <script src="/assets/js/swiper/swiper-bundle.min.js"></script>
    <script src="/assets/js/gsap/SmoothScroll.min.js"
        integrity="sha512-HaoDYc3PGduguBWOSToNc0AWGHBi2Y432Ssp3wNIdlOzrunCtB2qq6FrhtPbo+PlbvRbyi86dr5VQx61eg/daQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="/assets/js/api.js"></script>

    <!-- header -->
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-MNKFVS8Q98"></script>
    <!-- <script id="recap" src="https://www.google.com/recaptcha/api.js?render=%REACT_APP_RECAPTCHA_KEY%"></script> -->

    <script src="/component/header/header.js"></script>
    <script src="/component/footer/footer.js"></script>
    <script src="/page/story/detail/component/component10/component.js"></script>
    <script src="/page/campaignAll/detail/content/main.js"></script>
    <script src="/page/campaignAll/detail/content/esse/formValidate.js"></script>
    <script src="/page/campaignAll/detail/main.js"></script>


    <script defer>
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
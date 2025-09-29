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
    <!-- <title>
    </title> -->
    <script src="https://www.google.com/recaptcha/api.js?render=6LevUS0nAAAAAInOUaytl6bgNgWFE4FQt2yofWyZ"></script>
    <!-- <meta name="description"
        content="">
    <meta name="keywords"
        content="Singha Estate Residential, Singha Residential, Singha Estate, สิงห์ เรสซิเดนซ์, สิงห์ เอสเตท,โครงการบ้าน สิงห์ เอสเตท,  โครงการบ้านเดี่ยว สิงห์ เอสเตท"> -->

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
    $data = [
        [
            'meta' => [
                'title' => [
                    'en' => "Summer Special | Singha Residences",
                    'th' => "Summer Special | Singha Residences"
                ],
                'description' => [
                    'en' => "Summer Special ราคาพิเศษรับหน้าร้อน 7.59 ลบ. เพียง 5 ยูนิต เท่านั้น!",
                    'th' => "Summer Special ราคาพิเศษรับหน้าร้อน 7.59 ลบ. เพียง 5 ยูนิต เท่านั้น!"
                ],
                'topic' => 'Summer Special ',
                's' => '/assets/image/promotion/summer-special/EXTRO_Summer-Special-banners_1440x781.jpg',
                'url' => [
                    'en' => "/en/campaigns/summer-special",
                    'th' =>  "/th/campaigns/summer-special"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => '𝙏𝙃𝙀 𝙇𝙐𝘾𝙆𝙔 𝙎𝙉𝘼𝙆𝙀 | Singha Residences',
                    'th' => '𝙏𝙃𝙀 𝙇𝙐𝘾𝙆𝙔 𝙎𝙉𝘼𝙆𝙀 | Singha Residences'
                ],
                'description' => [
                    'en' => 'รวมโครงการ \'บ้านเดี่ยว‘ และ \'คอนโด‘ คุณภาพจาก สิงห์ เอสเตท มอบโปรดีต้อนรับตรุษจีน 29 ม.ค.- 9 ก.พ.นี้',
                    'th' =>  'รวมโครงการ \'บ้านเดี่ยว‘ และ \'คอนโด‘ คุณภาพจาก สิงห์ เอสเตท มอบโปรดีต้อนรับตรุษจีน 29 ม.ค.- 9 ก.พ.นี้'
                ],
                'topic' => '𝙏𝙃𝙀 𝙇𝙐𝘾𝙆𝙔 𝙎𝙉𝘼𝙆𝙀 !',
                's' => '/assets/image/promotion/the-lucky-snake/1440x781.jpg',
                'url' => [
                    'en' => "/en/campaigns/the-lucky-snake",
                    'th' =>  "/th/campaigns/the-lucky-snake"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => '𝑬𝑿𝑪𝑳𝑼𝑺𝑰𝑽𝑬 𝑫𝑬𝑨𝑳 - 𝑳𝑰𝑴𝑰𝑻𝑬𝑫 𝑶𝑭𝑭𝑬𝑹𝑺 ! ธ.ค.นี้เท่านั้น | Singha Residences',
                    'th' => '𝑬𝑿𝑪𝑳𝑼𝑺𝑰𝑽𝑬 𝑫𝑬𝑨𝑳 - 𝑳𝑰𝑴𝑰𝑻𝑬𝑫 𝑶𝑭𝑭𝑬𝑹𝑺 ! ธ.ค.นี้เท่านั้น | Singha Residences'
                ],
                'description' => [
                    'en' => '\'สิงห์ เอสเตท\' คัดให้แล้ว! พบยูนิตสวยข้อเสนอสุดพิเศษ สูงสุด 20 ล้าน! สำหรับทุกโครงการพร้อมอยู่ ทั้งบ้านและคอนโดฯ เริ่ม 7.59 - 195 ล้าน* ส่วนลดสูงสุด 20 ล้าน* Exclusive furniture package สูงสุด 10 ล้าน* ส่วนลดเงินจอง & ทำสัญญา 50%* ฟรีค่าใช้จ่ายวันโอนฯ และค่าส่วนกลาง* ดอกเบี้ยพิเศษ / ผ่อนสบาย ล้านละ 3,200 บาท* *เงื่อนไขเป็นไปตามที่บริษัทฯ และธนาคารกำหนด',
                    'th' => '\'สิงห์ เอสเตท\' คัดให้แล้ว! พบยูนิตสวยข้อเสนอสุดพิเศษ สูงสุด 20 ล้าน! สำหรับทุกโครงการพร้อมอยู่ ทั้งบ้านและคอนโดฯ เริ่ม 7.59 - 195 ล้าน* ส่วนลดสูงสุด 20 ล้าน* Exclusive furniture package สูงสุด 10 ล้าน* ส่วนลดเงินจอง & ทำสัญญา 50%* ฟรีค่าใช้จ่ายวันโอนฯ และค่าส่วนกลาง* ดอกเบี้ยพิเศษ / ผ่อนสบาย ล้านละ 3,200 บาท* *เงื่อนไขเป็นไปตามที่บริษัทฯ และธนาคารกำหนด'
                ],
                'topic' => '𝑬𝑿𝑪𝑳𝑼𝑺𝑰𝑽𝑬 𝑫𝑬𝑨𝑳 - 𝑳𝑰𝑴𝑰𝑻𝑬𝑫 𝑶𝑭𝑭𝑬𝑹𝑺 ! ธ.ค.นี้เท่านั้น',
                's' => '/assets/image-new/promotion/Exclusive-deal/og-image.jpg',
                'url' => [
                    'en' => "/en/campaigns/exclusive-deal",
                    'th' =>  "/th/campaigns/exclusive-deal"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => '𝙎𝙞𝙜𝙣𝙖𝙩𝙪𝙧𝙚 𝘿𝙚𝙖𝙡 ! ครั้งแรกกับโปรโมชั่นสุดพิเศษ | Singha Residences',
                    'th' => '𝙎𝙞𝙜𝙣𝙖𝙩𝙪𝙧𝙚 𝘿𝙚𝙖𝙡 ! ครั้งแรกกับโปรโมชั่นสุดพิเศษ | Singha Residences'
                ],
                'description' => [
                    'en' => 'ดอกเบี้ยพิเศษ 0.99%* หรือ ผ่อนต่ำ เพียงล้านละ 3,200 บาท*​ และ ข้อเสนอพิเศษอื่นๆอีกมากมาย* ! จองเพียง 50% ทำสัญญา เพียง 0 บาท ​พร้อมฟรีค่าจดจำนอง *เงื่อนไขเป็นไปตามที่บริษัทฯ และธนาคารกำหนด',
                    'th' => 'ดอกเบี้ยพิเศษ 0.99%* หรือ ผ่อนต่ำ เพียงล้านละ 3,200 บาท*​ และ ข้อเสนอพิเศษอื่นๆอีกมากมาย* ! จองเพียง 50% ทำสัญญา เพียง 0 บาท ​พร้อมฟรีค่าจดจำนอง *เงื่อนไขเป็นไปตามที่บริษัทฯ และธนาคารกำหนด'
                ],
                'topic' => '𝙎𝙞𝙜𝙣𝙖𝙩𝙪𝙧𝙚 𝘿𝙚𝙖𝙡 ! ครั้งแรกกับโปรโมชั่นสุดพิเศษ',
                's' => '/assets/image-new/promotion/Signature-deal/og-image.jpg',
                'url' => [
                    'en' => "/en/campaigns/signature-deal",
                    'th' =>  "/th/campaigns/signature-deal"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => '1 BEDROOM : THE ESSE Sukhumvit 36 | Singha Residences',
                    'th' => '1 ห้องนอน : ดิ เอส สุขุมวิท 36 | Singha Residences'
                ],
                'description' => [
                    'en' => 'THE ESSE Sukhumvit 36 EXPERIENCE THE PULSE OF THONGLOR LIVING 1 BEDROOMS STARTS 10.9 MB.* Register Now Discount up to 500,000 THB.',
                    'th' => 'ดิ เอส สุขุมวิท 36 EXPERIENCE THE PULSE OF THONGLOR LIVING 1 ห้องนอน ราคาเริ่มต้น 10.9 ลบ.* ลงทะเบียนตอนนี้ รับส่วนลดสูงสุด 500,000 บาท'
                ],
                'topic' => '1 ห้องนอน : ดิ เอส สุขุมวิท 36 | Singha Residences',
                's' => '/assets/image-new/promotion/1bed/og-image.jpg',
                'url' => [
                    'en' => "/en/campaigns/1bed-the-esse",
                    'th' =>  "/th/campaigns/1bed-the-esse"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => '2 BEDROOM : THE ESSE Sukhumvit 36 | Singha Residences',
                    'th' => '2 ห้องนอน : ดิ เอส สุขุมวิท 36 | Singha Residences'
                ],
                'description' => [
                    'en' => 'THE ESSE Sukhumvit 36 EXPERIENCE THE PULSE OF THONGLOR LIVING 2 BEDROOMS STARTS 21.5 MB.* Register Now Discount up to 1,000,000 THB.',
                    'th' => 'ดิ เอส สุขุมวิท 36 EXPERIENCE THE PULSE OF THONGLOR LIVING 2 ห้องนอน ราคาเริ่มต้น 21.5 ลบ.* ลงทะเบียนตอนนี้ รับส่วนลดสูงสุด 1,000,000 บาท'
                ],
                'topic' => '2 ห้องนอน : ดิ เอส สุขุมวิท 36 | Singha Residences',
                's' => '/assets/image-new/promotion/2bed/og-image.jpg',
                'url' => [
                    'en' => "/en/campaigns/2bed-the-esse",
                    'th' =>  "/th/campaigns/2bed-the-esse"
                ],
            ],
        ],
    ]
    ?>

<?php
// 1. กรองค่า input เบื้องต้น
$current_path_raw = filter_input(INPUT_SERVER, 'REQUEST_URI', FILTER_SANITIZE_URL) ?: '/';
$host_raw         = filter_input(INPUT_SERVER, 'HTTP_HOST', FILTER_SANITIZE_STRING) ?: $_SERVER['HTTP_HOST'];

// 2. ตั้งค่า domain ให้ปลอดภัย
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
$domain = $scheme . $host_raw;

// 3. ตรวจสอบภาษาจาก path ให้เป็นแค่ 'th' หรือ 'en'
$language = 'th';
if (strpos($current_path_raw, '/en/') === 0) {
    $language = 'en';
}

// 4. หา matched item จาก config เดิม (ไม่เปลี่ยน)
$found = false; $matched_item = null;
foreach ($data as $item) {
    if (isset($item['meta']['url'][$language]) 
        && $item['meta']['url'][$language] === $current_path_raw) {
        $found = true;
        $matched_item = $item;
        break;
    }
}

// 5. เตรียมค่าไว้ escape ก่อน output
if ($found) {
    $title        = htmlspecialchars($matched_item['meta']['title'][$language],       ENT_QUOTES, 'UTF-8');
    $description  = htmlspecialchars($matched_item['meta']['description'][$language], ENT_QUOTES, 'UTF-8');
    $keywords     = htmlspecialchars($matched_item['meta']['topic'],                  ENT_QUOTES, 'UTF-8');
    $og_image     = htmlspecialchars($domain . $matched_item['meta']['s'],            ENT_QUOTES, 'UTF-8');
    $og_url       = htmlspecialchars($domain . $current_path_raw,                     ENT_QUOTES, 'UTF-8');
} else {
    // ค่า fallback กรณีไม่เจอเพจ
    $title       = 'Singha Estate';
    $description = 'Welcome to Singha Estate';
    $keywords    = 'singha,estate';
    $og_image    = htmlspecialchars($domain . '/assets/default-og.webp',             ENT_QUOTES, 'UTF-8');
    $og_url      = htmlspecialchars($domain . '/',                                  ENT_QUOTES, 'UTF-8');
}
?>
    <meta charset="utf-8">
    <title><?= $title ?> | SINGHA ESTATE</title>
    <link rel="icon" type="image/svg+xml" href="/assets/image/residential/logo-tab.svg">
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
    <main class="campaign-detail-main" id="app">
        <header-component></header-component>
        <div class="min-h-screen">
            <content-component></content-component>
        </div>
        <div class="loading opacity-0">
            <section class="campaign-detail-form-section  " v-if="formSection.form[0]" :class="[campaignShowDetail?'pb-20':'']">
                <img aria-hidden="true" class="campaign-form-detail-bg" src="/assets/image/estate_CampaignDetail/Rectangle4.webp" alt="bg" />
                <div class="campaign-detail-form-wrapper">
                    <div class="form-section header-wrapper">
                        <div class="header-text-block">
                            <h2 :class="['header-text',font]">{{formSection.title}}</h2>
                        </div>
                        <div class="sub-text-block">
                            <p class="sub-text" v-html="formSection.detail"></p>
                        </div>
                    </div>
                    <form class="form-wrapper" id="questionForm">
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
                        <div class="project-name-wrapper !hidden">
                            <div class="project-wrapper">
                                <label class="project form-label">Project</label>
                                <input id="PROJECT" name="PROJECT" type="text" autocomplete="off" maxlength="40"
                                    oninput="validateInputFL(this)" onkeydown="checkPaste(event)"
                                    :value="formSection.project" />
                            </div>
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
                                <div class="loading hidden  ">
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
                        <img aria-hidden="true" class="show-product-img shadow-xl" :src="campaignShowDetail.image"
                            alt="show-product-image" />
                    </div>
                    <div class="show-product-text-wrapper">
                        <div class="text-wrapper mx-auto lg:max-w-[230px] max-w-[120px]">
                            <img aria-hidden="true" :src="campaignShowDetail.logo" alt="">
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
        <div class="form-popup">
            <div class="lg:w-[250px] w-[110px] lg:mb-5 ">
                <img aria-hidden="true" src="/assets/image/residential/logo singha estate.svg" alt="">
            </div>
            <div class="popup-header-a">
                <button type="button" class="thank-popup-close">
                    <img aria-hidden="true" src="/assets/icon/popup-close.svg" alt="">
                </button>
            </div>
            <h3 class="font-['SinghaEstate'] font-normal">Thank you for expressing your interest</h3>
            <p class="font-normal">Our dedicated sales representative will be in touch with you shortly.</p>
        </div>
    </div>

    <script src="/assets/js/vue/vue.global.prod.js"></script>
    <script src="/assets/js/axios/axios.min.js"></script>

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
    <script src="/page/campaignAll/detail/main.js"></script>
    <script src="/page/campaignAll/detail/content/esse/formValidate.js"></script>


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
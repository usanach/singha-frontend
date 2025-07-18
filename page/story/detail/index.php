
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
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="stylesheet" href="/assets/fonts/font.css">
    <link href="/assets/fonts/f1/stylesheet.css" rel="stylesheet">
    <link href="/assets/fonts/f2/stylesheet.css" rel="stylesheet">

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
    <!-- End Google Tag Manager -->
    <?php
    $data = [
        [
            'meta' => [
                'title' => [
                    'en' => "SMYTH’S Kaset-Nawamin, สมิทธ์ เกษตร-นวมินทร์",
                    'th' => "SMYTH’S Kaset-Nawamin, สมิทธ์ เกษตร-นวมินทร์"
                ],
                'description' => [
                    'en' => "SMYTH’S Kaset-Nawamin (สมิทธ์ เกษตร-นวมินทร์) รีวิวบ้านเดี่ยวหรู Pool Villa  ระดับ Super Luxury จาก สิงห์ เอสเตท ที่ใส่ใจความเป็นส่วนตัวระดับสูงสุด ด้วยจำนวน 10 ยูนิต เดินทางสะดวกบนถนนประเสริฐมนูกิจ ใกล้เลียบด่วนรามอินทรา",
                    'th' => "SMYTH’S Kaset-Nawamin (สมิทธ์ เกษตร-นวมินทร์) รีวิวบ้านเดี่ยวหรู Pool Villa  ระดับ Super Luxury จาก สิงห์ เอสเตท ที่ใส่ใจความเป็นส่วนตัวระดับสูงสุด ด้วยจำนวน 10 ยูนิต เดินทางสะดวกบนถนนประเสริฐมนูกิจ ใกล้เลียบด่วนรามอินทรา"
                ],
                'topic' => "Singha Estate PLC",
                's' => '/assets/image/content/review-smyths-kaset-nawamin/OG.jpg',
                'url' => [
                    'en' => "/en/stories/sblog/review-smyths-kaset-nawamin",
                    'th' =>  "/th/stories/sblog/review-smyths-kaset-nawamin"
                ],
            ]
        ],
        [
            'meta' => [
                'title' => [
                    'en' => "สมาร์ทคอนโด ที่พักแห่งอนาคตที่มากกว่าการอยู่อาศัย",
                    'th' => "สมาร์ทคอนโด ที่พักแห่งอนาคตที่มากกว่าการอยู่อาศัย"
                ],
                'description' => [
                    'en' => "สมาร์ทคอนโด เทรนด์สิ่งอำนวยความสะดวกสบายล่าสุดสำหรับที่พักอาศัย เพราะสมาร์ทคอนโดช่วยให้ผู้อยู่อาศัยสามารถควบคุมและจัดการอุปกรณ์ต่าง ๆ ภายในคอนโดได้อย่างง่ายดายผ่านอุปกรณ์ต่าง ๆ เช่น การเปิด-ปิดไฟ, ปรับอุณหภูมิห้อง, หรือตรวจสอบกล้องวงจรปิดภายในบ้านได้ง่าย ๆ ได้ด้วยปลายนิ้ว",
                    'th' => "สมาร์ทคอนโด เทรนด์สิ่งอำนวยความสะดวกสบายล่าสุดสำหรับที่พักอาศัย เพราะสมาร์ทคอนโดช่วยให้ผู้อยู่อาศัยสามารถควบคุมและจัดการอุปกรณ์ต่าง ๆ ภายในคอนโดได้อย่างง่ายดายผ่านอุปกรณ์ต่าง ๆ เช่น การเปิด-ปิดไฟ, ปรับอุณหภูมิห้อง, หรือตรวจสอบกล้องวงจรปิดภายในบ้านได้ง่าย ๆ ได้ด้วยปลายนิ้ว"
                ],
                'topic' => "Singha Estate PLC",
                's' => '/assets/image/content/content15/SmartCondo_og.jpg',
                'url' => [
                    'en' => "/en/stories/slifestyle/smart-condo",
                    'th' =>  "/th/stories/slifestyle/smart-condo"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => "2 คอนโดหรูระดับ Luxury ใจกลางเมือง พร้อมทำเลคุณภาพ",
                    'th' => "2 คอนโดหรูระดับ Luxury ใจกลางเมือง พร้อมทำเลคุณภาพ"
                ],
                'description' => [
                    'en' => "คอนโดหรู ถือเป็นที่อยู่อาศัยระดับพรีเมียมที่มอบประสบการณ์การใช้ชีวิตที่เหนือกว่า ด้วยการออกแบบที่หรูหรา พร้อมสิ่งอำนวยความสะดวกที่ครบครัน และอยู่กลางทำเลไพรม์โลเคชั่น (Prime Location) บริเวรในกลางเมืองท่ามกลางย่านธุรกิจ",
                    'th' => "คอนโดหรู ถือเป็นที่อยู่อาศัยระดับพรีเมียมที่มอบประสบการณ์การใช้ชีวิตที่เหนือกว่า ด้วยการออกแบบที่หรูหรา พร้อมสิ่งอำนวยความสะดวกที่ครบครัน และอยู่กลางทำเลไพรม์โลเคชั่น (Prime Location) บริเวรในกลางเมืองท่ามกลางย่านธุรกิจ"
                ],
                'topic' => "Singha Estate PLC",
                's' => '/assets/image/content/content14/LuxuryCondo_og.jpg',
                'url' => [
                    'en' => "/en/stories/sliving/luxury-condo",
                    'th' =>  "/th/stories/sliving/luxury-condo"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => "ปักหมุด 4 ออนเซ็นส่วนตัว ระดับพรีเมียม ใกล้รถไฟฟ้า ใจกลางกรุงเทพ",
                    'th' => "ปักหมุด 4 ออนเซ็นส่วนตัว ระดับพรีเมียม ใกล้รถไฟฟ้า ใจกลางกรุงเทพ"
                ],
                'description' => [
                    'en' => "ปักหมุด 4 ออนเซ็นส่วนตัว ระดับพรีเมียม เดินทางสะดวกใกล้รถไฟฟ้า แถมอยู่ใจกลางกรุงเทพ ใครมีแพลนชวนคนรักไปแช่น้ำร้อนพร้อมทำสปา ฮีลกายฮีลใจไปด้วยกันในบทความนี้ได้เลย",
                    'th' => "ปักหมุด 4 ออนเซ็นส่วนตัว ระดับพรีเมียม เดินทางสะดวกใกล้รถไฟฟ้า แถมอยู่ใจกลางกรุงเทพ ใครมีแพลนชวนคนรักไปแช่น้ำร้อนพร้อมทำสปา ฮีลกายฮีลใจไปด้วยกันในบทความนี้ได้เลย"
                ],
                'topic' => "Singha Estate PLC",
                's' => '/assets/image/content/content13/og.jpg',
                'url' => [
                    'en' => "/en/stories/sblog/premium-private-onsen",
                    'th' =>  "/th/stories/sblog/premium-private-onsen"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => 'เช็คลิสต์สำคัญ ‘อยากต่อเติมบ้าน’ ต้องรู้อะไรบ้าง',
                    'th' => 'เช็คลิสต์สำคัญ ‘อยากต่อเติมบ้าน’ ต้องรู้อะไรบ้าง'
                ],
                'description' => [
                    'en' => 'เช็คลิสต์สำคัญ ‘อยากต่อเติมบ้าน’ ต้องรู้อะไรบ้าง | แต่ละครอบครัวมีไลฟ์สไตล์และความต้องการที่แตกต่างกัน เมื่อมีความต้องการใช้งานที่เพิ่มขึ้น การต่อเติมบ้านหรือขยายออกไปบริเวณข้างบ้านก็เป็นอีกไอเดียที่นิยมทำกัน',
                    'th' => 'เช็คลิสต์สำคัญ ‘อยากต่อเติมบ้าน’ ต้องรู้อะไรบ้าง | แต่ละครอบครัวมีไลฟ์สไตล์และความต้องการที่แตกต่างกัน เมื่อมีความต้องการใช้งานที่เพิ่มขึ้น การต่อเติมบ้านหรือขยายออกไปบริเวณข้างบ้านก็เป็นอีกไอเดียที่นิยมทำกัน'
                ],
                'topic' => 'ต่อเติมบ้าน, ต่อเติมข้างบ้าน',
                's' => '/assets/image/content/content8/images/H1/og_m.jpg',
                'url' => [
                    'en' => "/en/stories/sblog/house-addition",
                    'th' =>  "/th/stories/sblog/house-addition"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => 'S’RIN ราชพฤกษ์ - สาย 1 บ้านเดี่ยวที่คุณออกแบบได้ สู่ความสุขของทุกคนในครอบครัว',
                    'th' => 'S’RIN ราชพฤกษ์ - สาย 1 บ้านเดี่ยวที่คุณออกแบบได้ สู่ความสุขของทุกคนในครอบครัว'
                ],
                'description' => [
                    'en' => 'S\'RIN ราชพฤกษ์-สาย 1 โครงการบ้านเดี่ยวระดับลักซ์ชัวรี สไตล์ Modern Tropical ที่ผสานความงามของสถาปัตยกรรมเข้ากับธรรมชาติ บนแนวคิด Crafted to Last พร้อมฟังก์ชันครบครัน ตอบโจทย์คนทุกรุ่นในครอบครัว',
                    'th' => 'S\'RIN ราชพฤกษ์-สาย 1 โครงการบ้านเดี่ยวระดับลักซ์ชัวรี สไตล์ Modern Tropical ที่ผสานความงามของสถาปัตยกรรมเข้ากับธรรมชาติ บนแนวคิด Crafted to Last พร้อมฟังก์ชันครบครัน ตอบโจทย์คนทุกรุ่นในครอบครัว'
                ],
                'topic' => 'S\'RIN ราชพฤกษ์-สาย 1, S’RIN Ratchapruek, บ้าน เดี่ยว ราชพฤกษ์',
                's' => '/assets/image/content/content11/images/H1/og_m.webp',
                'url' => [
                    'en' => "/en/stories/sblog/review-srin-ratchaphruek-sai1",
                    'th' =>  "/th/stories/sblog/review-srin-ratchaphruek-sai1"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => 'SHAWN ปัญญาอินทรา - บ้านเดี่ยวที่ตอบโจทย์การอยู่อาศัยของคนทุกรุ่น',
                    'th' => 'SHAWN ปัญญาอินทรา - บ้านเดี่ยวที่ตอบโจทย์การอยู่อาศัยของคนทุกรุ่น'
                ],
                'description' => [
                    'en' => 'SHAWN Panya Indra (ฌอน ปัญญาอินทรา) บ้านเดี่ยวระดับลักซ์ชัวรี บนดีไซน์ Modern Tropical ที่สะท้อนตัวตนผ่านฟังก์ชันที่ครบครันสำหรับครอบครัว Multi-Generation บนทำเลศักยภาพรามอินทรา',
                    'th' => 'SHAWN Panya Indra (ฌอน ปัญญาอินทรา) บ้านเดี่ยวระดับลักซ์ชัวรี บนดีไซน์ Modern Tropical ที่สะท้อนตัวตนผ่านฟังก์ชันที่ครบครันสำหรับครอบครัว Multi-Generation บนทำเลศักยภาพรามอินทรา'
                ],
                'topic' => 'shawn panya indra, shawn ปัญญาอินทรา, ฌอน ปัญญาอินทรา, บ้าน รามอินทรา',
                's' => '/assets/image/content/content12/images/H1/og_m.webp',
                'url' => [
                    'en' => "/en/stories/sblog/review-shawnpanyaindra",
                    'th' =>  "/th/stories/sblog/review-shawnpanyaindra"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => 'S-Air นวัตกรรมอากาศบริสุทธิ์ ยกระดับคุณภาพชีวิตสำหรับผู้พักอาศัยในบ้านของ สิงห์ เอสเตท',
                    'th' => 'S-Air นวัตกรรมอากาศบริสุทธิ์ ยกระดับคุณภาพชีวิตสำหรับผู้พักอาศัยในบ้านของ สิงห์ เอสเตท'
                ],
                'description' => [
                    'en' => 'S-Air นวัตกรรมอากาศบริสุทธิ์ | ปัจจุบันปัญหาคุณภาพอากาศโดยเฉพาะอากาศที่มีมลพิษฝุ่น PM2.5 ปะปนอยู่ กลายเป็นปัญหาที่ใครหลายคนกังวล ฉะนั้นการมีระบบระบายอากาศที่ดีอย่าง S-Air จึงเป็นสิ่งจำเป็นอย่างยิ่งเพื่อสุขภาพและคุณภาพชีวิตของผู้อยู่อาศัย',
                    'th' => 'S-Air นวัตกรรมอากาศบริสุทธิ์ | ปัจจุบันปัญหาคุณภาพอากาศโดยเฉพาะอากาศที่มีมลพิษฝุ่น PM2.5 ปะปนอยู่ กลายเป็นปัญหาที่ใครหลายคนกังวล ฉะนั้นการมีระบบระบายอากาศที่ดีอย่าง S-Air จึงเป็นสิ่งจำเป็นอย่างยิ่งเพื่อสุขภาพและคุณภาพชีวิตของผู้อยู่อาศัย'
                ],
                'topic' => 's air , อากาศดี , อากาศบริสุทธิ์ , คุณภาพชีวิต',
                's' => '/assets/image/content/content9/images/H1/og_m.jpg',
                'url' => [
                    'en' => "/en/stories/sblog/s-air",
                    'th' =>  "/th/stories/sblog/s-air"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => '13 อุปกรณ์ทันสมัย Smart Home ที่ช่วยเปลี่ยนบ้านของคุณน่าอยู่ขึ้น',
                    'th' => '13 อุปกรณ์ทันสมัย Smart Home ที่ช่วยเปลี่ยนบ้านของคุณน่าอยู่ขึ้น'
                ],
                'description' => [
                    'en' => '13 อุปกรณ์ทันสมัย สมาร์ทโฮม (Smart Home) หรือ บ้านอัจฉริยะ เริ่มเป็นที่คุ้นหูและแพร่หลายมากขึ้น ด้วยเทคโนโลยี IoT ที่ทำให้การควบคุมระบบภายในบ้านเป็นเรื่องง่าย โดยผู้ใช้สามารถสั่งการผ่านแอปพลิเคชันบนสมาร์ทโฟนหรืออุปกรณ์สั่งการด้วยเสียงตลอดเวลา',
                    'th' => '13 อุปกรณ์ทันสมัย สมาร์ทโฮม (Smart Home) หรือ บ้านอัจฉริยะ เริ่มเป็นที่คุ้นหูและแพร่หลายมากขึ้น ด้วยเทคโนโลยี IoT ที่ทำให้การควบคุมระบบภายในบ้านเป็นเรื่องง่าย โดยผู้ใช้สามารถสั่งการผ่านแอปพลิเคชันบนสมาร์ทโฟนหรืออุปกรณ์สั่งการด้วยเสียงตลอดเวลา'
                ],
                'topic' => 'smart home คือ อะไร, smart home มี อะไร บ้าง , บ้านทันสมัย',
                's' => '/assets/image/content/content10/images/H1/og_m.jpg',
                'url' => [
                    'en' => "/en/stories/sblog/top-13-smart-home-items",
                    'th' =>  "/th/stories/sblog/top-13-smart-home-items"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => 'ฮวงจุ้ยบ้าน เคล็ดลับนำความสุข ความเจริญรุ่งเรืองให้แก่ผู้อยู่อาศัย',
                    'th' => 'ฮวงจุ้ยบ้าน เคล็ดลับนำความสุข ความเจริญรุ่งเรืองให้แก่ผู้อยู่อาศัย'
                ],
                'description' => [
                    'en' => 'เรียนรู้หลักการฮวงจุ้ยบ้านเพื่อสร้างพลังงานที่ดี ส่งเสริมความสุข สุขภาพ และความมั่งคั่ง พร้อมเคล็ดลับการจัดห้องต่างๆ และวิธีแก้ไขฮวงจุ้ยที่ไม่ดีในบ้าน',
                    'th' => 'เรียนรู้หลักการฮวงจุ้ยบ้านเพื่อสร้างพลังงานที่ดี ส่งเสริมความสุข สุขภาพ และความมั่งคั่ง พร้อมเคล็ดลับการจัดห้องต่างๆ และวิธีแก้ไขฮวงจุ้ยที่ไม่ดีในบ้าน'
                ],
                'topic' => 'ฮวงจุ้ยบ้าน',
                's' => '/assets/image/content/content1/images/H1/og_m.jpg',
                'url' => [
                    'en' => "/en/stories/sblog/feng-shui-home-tips-to-enhance-happiness",
                    'th' =>  "/th/stories/sblog/feng-shui-home-tips-to-enhance-happiness"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => 'ฮวงจุ้ยห้องนอน เคล็ดลับจัดห้องนอนให้ถูกหลัก ช่วยเสริมพลังชีวิต',
                    'th' => 'ฮวงจุ้ยห้องนอน เคล็ดลับจัดห้องนอนให้ถูกหลัก ช่วยเสริมพลังชีวิต'
                ],
                'description' => [
                    'en' => 'เรียนรู้หลักฮวงจุ้ยห้องนอนที่ถูกต้อง พร้อมเคล็ดลับการจัดวางเตียง กระจก และของตกแต่ง เพื่อสร้างพื้นที่พักผ่อนที่สมบูรณ์แบบ ส่งเสริมการนอนหลับที่มีคุณภาพและชีวิตที่สมดุล',
                    'th' => 'เรียนรู้หลักฮวงจุ้ยห้องนอนที่ถูกต้อง พร้อมเคล็ดลับการจัดวางเตียง กระจก และของตกแต่ง เพื่อสร้างพื้นที่พักผ่อนที่สมบูรณ์แบบ ส่งเสริมการนอนหลับที่มีคุณภาพและชีวิตที่สมดุล'
                ],
                'topic' => 'ฮวงจุ้ยห้องนอน',
                's' => '/assets/image/content/content2/images/H1/og_m.jpg',
                'url' => [
                    'en' => "/en/stories/sblog/feng-shui-bedroom-tips",
                    'th' =>  "/th/stories/sblog/feng-shui-bedroom-tips"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => "พาชมโครงการบ้านหรู คฤหาสน์ Luxury บนทำเลทอง ปี 2024",
                    'th' => "พาชมโครงการบ้านหรู คฤหาสน์ Luxury บนทำเลทอง ปี 2024"
                ],
                'description' => [
                    'en' => "การเป็นเจ้าของบ้านหรูระดับ Luxury ไปจนถึง Ultra Luxury ถือเป็นสัญลักษณ์แห่งความสำเร็จ ความมั่งคั่ง สะท้อนให้เห็นถึงไลฟ์สไตล์ที่ดูหรูหรา รสนิยม และความสำเร็จของเจ้าของบ้าน",
                    'th' => "การเป็นเจ้าของบ้านหรูระดับ Luxury ไปจนถึง Ultra Luxury ถือเป็นสัญลักษณ์แห่งความสำเร็จ ความมั่งคั่ง สะท้อนให้เห็นถึงไลฟ์สไตล์ที่ดูหรูหรา รสนิยม และความสำเร็จของเจ้าของบ้าน"
                ],
                'topic' => "บ้านหรู",
                's' => "/assets/image/content/content3/images/H1/og_m.jpg",
                'url' => [
                    'en' => "/en/stories/sblog/luxury-houses-in-prime-locations",
                    'th' =>  "/th/stories/sblog/luxury-houses-in-prime-locations"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => "ทางลาดสำหรับผู้สูงอายุและคนพิการ ตามหลัก Universal Design",
                    'th' => "ทางลาดสำหรับผู้สูงอายุและคนพิการ ตามหลัก Universal Design"
                ],
                'description' => [
                    'en' => "การออกแบบทางลาดสำหรับคนพิการทุพพลภาพและผู้สูงอายุตามหลัก Universal Design เพื่อความปลอดภัยและความสะดวกสบายในการใช้งาน",
                    'th' => "การออกแบบทางลาดสำหรับคนพิการทุพพลภาพและผู้สูงอายุตามหลัก Universal Design เพื่อความปลอดภัยและความสะดวกสบายในการใช้งาน"
                ],
                'topic' => "ทางลาดผู้สูงอายุ",
                's' => "/assets/image/content/content4/images/H1/og_m.jpg",
                'url' => [
                    'en' => "/en/stories/sblog/accessibility-ramps",
                    'th' =>  "/th/stories/sblog/accessibility-ramps"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => "Universal Design คืออะไร เทคนิคการออกแบบที่ไม่ว่าใคร ก็ใช้งานร่วมกันได้",
                    'th' => "Universal Design คืออะไร เทคนิคการออกแบบที่ไม่ว่าใคร ก็ใช้งานร่วมกันได้"
                ],
                'description' => [
                    'en' => "Universal Design เป็นหลักการออกแบบผลิตภัณฑ์ สภาพแวดล้อม และบริการต่างๆ ให้สามารถใช้งานได้อย่างเท่าเทียมที่ทุกคนสามารถใช้ร่วมกันได้",
                    'th' => "Universal Design เป็นหลักการออกแบบผลิตภัณฑ์ สภาพแวดล้อม และบริการต่างๆ ให้สามารถใช้งานได้อย่างเท่าเทียมที่ทุกคนสามารถใช้ร่วมกันได้"
                ],
                'topic' => "universal design คือ",
                's' => "/assets/image/content/content5/images/H1/og_m.jpg",
                'url' => [
                    'en' => "/en/stories/sblog/universal-design",
                    'th' =>  "/th/stories/sblog/universal-design"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => "รวมต้นไม้ฟอกอากาศปลูกง่าย ช่วยลดสารพิษในบ้าน และห้องต่าง ๆ",
                    'th' => "รวมต้นไม้ฟอกอากาศปลูกง่าย ช่วยลดสารพิษในบ้าน และห้องต่าง ๆ"
                ],
                'description' => [
                    'en' => "ต้นไม้ฟอกอากาศ มีประโยชน์หลายอย่าง ไม่ว่าจะช่วยทำให้บ้านของเราสดชื่น ช่วยดักจับฝุ่นในอากาศ และยังลดความเครียดได้อีกด้วย",
                    'th' => "ต้นไม้ฟอกอากาศ มีประโยชน์หลายอย่าง ไม่ว่าจะช่วยทำให้บ้านของเราสดชื่น ช่วยดักจับฝุ่นในอากาศ และยังลดความเครียดได้อีกด้วย"
                ],
                'topic' => "ต้นไม้ฟอกอากาศ",
                's' => "/assets/image/content/content6/images/H1/og_m.jpg",
                'url' => [
                    'en' => "/en/stories/sblog/indoor-air-purifying-plants",
                    'th' =>  "/th/stories/sblog/indoor-air-purifying-plants"
                ],
            ],
        ],
        [
            'meta' => [
                'title' => [
                    'en' => "11 ต้นไม้มงคลเสริมโชคลาภ ปลูกแล้วเฮงเรียกทรัพย์ตลอดปี",
                    'th' => "11 ต้นไม้มงคลเสริมโชคลาภ ปลูกแล้วเฮงเรียกทรัพย์ตลอดปี"
                ],
                'description' => [
                    'en' => "หลายคนนิยมปลูกต้นไม้มงคลในบ้าน และคอนโด เพราะนอกจากจะช่วยประดับตกแต่งภายบ้านแล้ว ยังสามารถช่วยเสริมสิริมงคล ดึงดูดโชคลาภ เงินทอง ให้ไหลมาเทมาแก่ผู้อาศัยอีกด้วย",
                    'th' => "หลายคนนิยมปลูกต้นไม้มงคลในบ้าน และคอนโด เพราะนอกจากจะช่วยประดับตกแต่งภายบ้านแล้ว ยังสามารถช่วยเสริมสิริมงคล ดึงดูดโชคลาภ เงินทอง ให้ไหลมาเทมาแก่ผู้อาศัยอีกด้วย"
                ],
                'topic' => "ต้นไม้มงคล",
                's' => "/assets/image/content/content7/images/H1/og_m.jpg",
                'url' => [
                    'en' => "/en/stories/sblog/11-auspicious-tree-boost-rich-in-wealth",
                    'th' =>  "/th/stories/sblog/11-auspicious-tree-boost-rich-in-wealth"
                ],
            ],
        ],
        // Add more content items as needed
    ];
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
        $og_image    = htmlspecialchars($domain . '/assets/default-og.jpg',             ENT_QUOTES, 'UTF-8');
        $og_url      = htmlspecialchars($domain . '/',                                  ENT_QUOTES, 'UTF-8');
    }
    ?>
    <meta charset="utf-8">
    <title><?= $title ?> | SINGHA ESTATE</title>
    <meta name="description" content="<?= $description ?>">
    <meta name="keywords"    content="<?= $keywords ?>">
    <meta property="og:title"       content="<?= $title ?> | <?= $keywords ?>">
    <meta property="og:description" content="<?= $description ?>">
    <meta property="og:image"       content="<?= $og_image ?>">
    <meta property="og:url"         content="<?= $og_url ?>">

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
                en: 'vV5KRPiutJUfuYN1tEgsBbbx',
                th: 'Cn8gySm4ef1bxsoGPL3VgH4M'
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

    <script src="/assets/js/vue/vue.global.prod.js"></script>
    <script src="/assets/js/axios/axios.min.js"></script>

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
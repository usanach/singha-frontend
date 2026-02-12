// BannerComponent.js
const BannerComponent = defineComponent({
    name: 'BannerComponent',
   template: `
    <section class="trigger-singha-estate">
        <div class="bg-[url('./../assets/image/background/linear-bg.svg')] bg-cover bg-center bg-no-repeat relative pt-5 pb-10">

            <!-- TITLE -->
            <div
                class="container py-5"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-easing="linear"
            >
                <h2
                    class="font-['SinghaEstate'] text-white text-[35px] lg:text-center text-center uppercase title leading-tight"
                    v-html="title"
                ></h2>
            </div>

            <!-- SLIDER -->
            <div class="relative mt-5">
                <div
                    class="swiper singha-estate-slide lg:h-[700px] h-[500px]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                >
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="(item, index) in items"
                            :key="index"
                        >
                            <!-- ให้ slide มีความสูงตายตัว แล้วให้รูป cover -->
                            <div class="relative w-full h-full">
                                <img
                                    :src="item.image_l"
                                    :alt="item.alt"
                                    class="w-full h-full object-cover lg:block hidden"
                                >
                                <img
                                    :src="item.image_s"
                                    :alt="item.alt"
                                    class="w-full h-full object-cover block lg:hidden"
                                >
                                <div class="absolute bottom-0 left-0 w-full h-full flex pointer-events-none">
                                    <img
                                        src="/assets/image/story/linear-gd.svg"
                                        alt=""
                                        class="w-full mt-auto"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- PAGINATION + ARROWS -->
                    <div class="absolute bottom-0 w-full z-10">
                        <div class="container lg:!px-[20px] !px-0">
                            <div class="flex lg:w-3/4 mx-auto lg:p-5 p-0 py-5 gap-5 lg:flex-row flex-col lg:px-5 px-[20px]">
                                <div class="flex gap-5 mx-auto">
                                    <div class="custom-pagination-square !relative lg:my-auto mt-auto mb-2 lg:mb-auto !bottom-0"></div>
                                    <div class="flex gap-5 my-auto">
                                        <span class="prev" tabindex="0" role="button" aria-label="Previous slide">
                                            <img
                                                src="/assets/image/residential/Button-Icon.webp"
                                                alt="icon"
                                                class="rotate-180 w-[55px]"
                                            >
                                        </span>
                                        <span class="next" tabindex="0" role="button" aria-label="Next slide">
                                            <img
                                                src="/assets/image/residential/Button-Icon.webp"
                                                alt="icon"
                                                class="w-[55px]"
                                            >
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- DETAIL TEXT -->
            <div
                class="container py-10 pb-0"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-easing="linear"
                data-aos-anchor=".trigger-singha-estate"
            >
                <p class="text-[22px] text-center text-white lg:w-3/4 mx-auto detail">
                    {{ detail }}
                </p>
            </div>
        </div>
    </section>
`,


    setup() {
        const title = ref('โครงการที่อยู่อาศัย จาก สิงห์ เอสเตท');
        const detail = ref('');
        const items = ref([]);
        const language = ref('th'); // Default language

        // อ่าน config จาก window.APP_CONFIG
        const APP_CONFIG = window.APP_CONFIG || {};
        const apiBaseUrl = (APP_CONFIG.apiBaseUrl || '').replace(/\/+$/, '');
        const storageBaseUrl = (APP_CONFIG.storageUrl || '').replace(/\/+$/, '');

        // หา language จาก path /th /en
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        // สร้าง URL รูปจากชื่อไฟล์ที่ส่งมาจาก API โดยใช้ storageUrl จาก config.js
        const buildImageUrl = (filename) => {
            if (!filename) return '';
            if (
                filename.startsWith('http://') ||
                filename.startsWith('https://') ||
                filename.startsWith('/')
            ) {
                return filename;
            }

            // ปรับ sub-path ให้ตรงกับโปรเจกต์จริงของคุณ
            // เช่น ถ้าไฟล์เก็บที่ storage/app/public/banner_collection
            // และ symlink ไปที่ /storage/banner_collection/ ก็อาจใช้:
            // `${storageBaseUrl}banner_collection/${filename}`
            return `${storageBaseUrl.replace(/\/+$/, '')}uploads/banner_collection_item/${filename.replace(/^\/+/, '')}`;
        };

        const loadData = async (lang) => {
            try {
                if (!apiBaseUrl) {
                    console.error('APP_CONFIG.apiBaseUrl is not defined');
                    return;
                }

                const res = await axios.get(
                    `${apiBaseUrl}/collection-page/banner-collection`
                );
                const apiData = res.data || {};

                // main data: title / detail
                const main =
                    Array.isArray(apiData.data) && apiData.data.length
                        ? apiData.data[0]
                        : {};

                // sub-data: slide list
                const subData = apiData['sub-data'] || apiData.subData || [];

                // fallback text ถ้า API ไม่มี
                const defaultTitle = {
                    th: 'โครงการที่อยู่อาศัย จาก สิงห์ เอสเตท',
                    en: 'Residential by Singha Estate',
                };

                const defaultDetail = {
                    th: 'สิงห์ เอสเตท นำเสนอเอกลักษณ์ของผู้อยู่อาศัยผ่านโครงการภายใต้แบรนด์ที่หลากหลายด้วย บ้านเดี่ยว ไพรเวทเอสเตท คอนโดมิเนียม โฮมออฟฟิศ คัดสรรทำเลศักยภาพ ออกแบบและพัฒนาที่อยู่อาศัยด้วยความเข้าใจอย่างลึกซึ้งในความต้องการของสมาชิกในครอบครัว ใส่ใจในรายละเอียดจนถึงขั้นตอนการเลือกวัสดุและการก่อสร้าง เพื่อความสุขที่ยั่งยืนของสมาชิกในครอบครัว',
                    en: 'Singha Estate presents a collection of branded residences all located in prime locations. We are committed to excellence in every detail, from material selection to construction. With a deep understanding of family dynamics and the unique lifestyle, our properties are designed and crafted to ensure enduring happiness and refined living.',
                };

                let apiTitle = (main.title && main.title[lang]) || defaultTitle[lang];
                const apiDetail = (main.detail && main.detail[lang]) || defaultDetail[lang];

                // EN: ใส่ <br> แทรกกลางคำว่า "by" เหมือนของเดิม
                if (lang === 'en') {
                    apiTitle = apiTitle.replace(
                        ' by ',
                        " <br class='lg:hidden block'/>by "
                    );
                }

                title.value = apiTitle;
                detail.value = apiDetail;

                items.value = subData.map((item) => {
                    const plainTitle = apiTitle.replace(/<br.*?>/gi, ' ');
                    const altText =
                        lang === 'en'
                            ? (item.title_en || plainTitle)
                            : (item.title_th || plainTitle);

                    return {
                        image_l: buildImageUrl(item.image_l),
                        image_s: buildImageUrl(item.image_s),
                        alt: altText,
                    };
                });
            } catch (error) {
                console.error('Failed to load banner from API:', error);
            }
        };

        const init = () => {
            AOS.init();
            const singhaEstateSwiper = new Swiper('.singha-estate-slide', {
                pagination: {
                    el: '.singha-estate-slide .custom-pagination-square',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.singha-estate-slide .next',
                    prevEl: '.singha-estate-slide .prev',
                },
                on: {
                    init: function () {
                        const bullet = document.querySelector(
                            '.singha-estate-slide .custom-pagination-square .swiper-pagination-bullet-active'
                        );
                        if (bullet) {
                            bullet.style.setProperty('--vdo-width', '100%');
                        }
                    },
                    slideChange: function () {
                        const bullet = document.querySelector(
                            '.singha-estate-slide .custom-pagination-square .swiper-pagination-bullet-active'
                        );
                        if (bullet) {
                            bullet.style.setProperty('--vdo-width', '100%');
                        }
                    },
                },
            });
        };

        onMounted(async () => {
            language.value = getLanguageFromPath();
            await loadData(language.value);

            nextTick(() => {
                init(); // init Swiper หลัง DOM + data พร้อม
            });
        });

        return { title, detail, items, language };
    },
});

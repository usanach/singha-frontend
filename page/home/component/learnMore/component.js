const LearnMoreComponent = defineComponent({
    name: 'LearnMoreComponent',

    template: `
        <section>
            <div class="py-10 pt-0 bg-[#1A2F4D]">
                <div class="relative flex flex-col ">
                    <!-- BG Image -->
                    <div
                        class="w-full h-[70dvh] overflow-hidden absolute top-0 left-0"
                        data-aos="fade-in"
                        data-aos-duration="1000"
                        data-aos-easing="linear"
                        data-aos-delay="300"
                    >
                        <img
                            class="w-full lg:block hidden"
                            src="/assets/image/learn_more/Group 1000004304.webp"
                            alt="learn more about singha estate"
                        >
                        <img
                            class="w-full lg:hidden block"
                            src="/assets/image/learn_more/home-mo.webp"
                            alt="learn more about singha estate"
                        >
                    </div>

                    <!-- Head Text -->
                    <div class="container relative pt-10 z-10 lg:my-0 my-auto">
                        <div class="lg:px-10 flex flex-col">
                            <h2
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-easing="linear"
                                :class="[fontClass, 'text-white text-[35px] leading-tight lg:text-left text-center uppercase']"
                                v-html="content.title[language]"
                            ></h2>

                            <p
                                class="text-[20px] text-white lg:text-left text-center mt-2"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-easing="linear"
                                data-aos-delay="100"
                                v-html="content.detail[language]"
                            ></p>

                            <!-- ปุ่ม more ถ้าจะใช้ทีหลัง
                            <div
                                class="mt-5"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-easing="linear"
                                data-aos-delay="200"
                            >
                                <a
                                    type="button"
                                    class="btn"
                                    href="https://www.singhaestate.co.th/th/about"
                                    target="_blank"
                                >
                                    {{ moreText }}
                                </a>
                            </div>
                            -->
                        </div>
                    </div>

                    <!-- News Cards -->
                    <div class="container relative mt-20">
                        <div class="lg:bg-[#15274196] lg:p-10 w-3/4 mx-auto">
                            <div>
                                <ul class="flex gap-5 flex-wrap">
                                    <li
                                        v-for="(card, index) in content.items"
                                        :key="index"
                                        class="lg:flex-[1_1_30%] flex-[1_1_100%] shadow-xl animate-border-hover flex flex-col max-w-[335px]"
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                        data-aos-easing="linear"
                                        data-aos-delay="100"
                                    >
                                        <div>
                                            <a :href="card.url[language]" target="_blank">
                                                <img
                                                    :src="card.image.thumb"
                                                    :alt="card.image.alt"
                                                    class="w-full"
                                                >
                                            </a>
                                        </div>
                                        <div class="bg-white flex flex-col h-fit">
                                            <div class="px-5 lg:pt-5 pt-5 pb-5 flex flex-col h-full lg:min-h-[180px]">
                                                <div>
                                                    <a :href="card.url[language]" target="_blank">
                                                        <p
                                                            class="text-[16px] border border-[3px] border-[#786028] border-r-0 border-t-0 border-b-0 leading-tight pl-3 text-[#696969]"
                                                        >
                                                            {{ card.category[language] }}
                                                        </p>
                                                    </a>
                                                </div>
                                                <div class="mb-auto mt-3">
                                                    <a :href="card.url[language]" target="_blank">
                                                        <h3 class="text-[16px] font-normal">
                                                            {{ truncateTitle(card.title[language]) }}
                                                        </h3>
                                                    </a>
                                                </div>
                                                <div class="mt-2 flex gap-4">
                                                    <p class="text-[#A3A3A3] text-[15px]">
                                                        {{ formatDate(card.date) }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    `,

    setup() {
        const language = ref('th');

        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        // ===== CONFIG จาก APP_CONFIG =====
        const APP_CONFIG = window.APP_CONFIG || {};
        const API_BASE_URL = APP_CONFIG.apiBaseUrl || 'http://127.0.0.1:8000/api';
        const STORAGE_ROOT = (APP_CONFIG.storageUrl || 'http://127.0.0.1:8000/storage/').replace(/\/?$/, '/');

        // helper สำหรับรูปข่าว
        const resolveNewsImageUrl = (file) => {
            if (!file) return '';

            // URL เต็ม
            if (/^https?:\/\//.test(file)) return file;

            // asset หน้าเว็บ
            if (file.startsWith('/')) return file;

            // ถ้าขึ้นต้นด้วย uploads/ ให้ต่อกับ storage ตรงๆ
            if (file.startsWith('uploads/')) {
                return STORAGE_ROOT + file;
            }

            // default เผื่อ backend ส่งมาเป็นชื่อไฟล์ล้วน
            return STORAGE_ROOT + 'uploads/news/' + file;
        };

        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            if (Number.isNaN(date.getTime())) return '';

            if (language.value === 'en') {
                return new Intl.DateTimeFormat('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                }).format(date);
            } else {
                const thMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
                const day = date.getDate();
                const month = thMonths[date.getMonth()];
                const year = date.getFullYear() + 543;
                return `${day} ${month} ${year}`;
            }
        };

        const truncateTitle = (text) => {
            if (!text) return '';
            return text.length > 80 ? text.slice(0, 80) + '...' : text;
        };

        const more = {
            th: 'ดูเพิ่มเติม​',
            en: 'Explore more',
        };

        // ===== DEFAULT CONTENT (จะถูก override จาก API ถ้ามี) =====
        const defaultContent = {
            title: {
                en: "LEARN MORE ABOUT <span class='text-nowrap'>SINGHA ESTATE​</span><br/> ​Entrusted and Value Enricher ",
                th: 'รู้จัก สิงห์ เอสเตท <br/> ​Entrusted and Value Enricher ​​',
            },
            detail: {
                en: `To develop and manage Singha Estate’s balanced and well diversified portfolio with high professional standards. Thus, delivering best-in-class products and services to enhance great customer experience with unparalleled value proposition. The Company strives to achieve all this without compromising on the integrity of its code of business conduct under good corporate governance principles, ensuring fair treatment of all stakeholders, taking into consideration the community, social and environmental wellbeing, in quest of sustainable growth.<br/><br/>This vision has been conveyed through the development of residential real estate, which is one of the core business groups of Singha Estate.​​`,
                th: `ภายใต้วิสัยทัศน์ในการมุ่งมั่นสร้างคุณค่าและการเติบโตที่ยั่งยืน คือการทำงานที่เรายึดมั่นและผลักดัน ให้เราเป็นบริษัทผู้พัฒนาอสังหาริมทรัพย์และการลงทุนระดับสากล ที่มุ่งสร้างธุรกิจและพัฒนาโครงการพร้อมการบริการอย่างมืออาชีพชั้นเลิศ ด้วยความมุ่งมั่นสร้างการเติบโตที่ยั่งยืน รับผิดชอบต่อสังคมบนหลักธรรมภิบาลที่ดีงามและส่งมอบคุณค่านี้จากรุ่นสู่รุ่นได้เต็มภาคภูมิ <br/><br/>ซึ่งวิสัยทัศน์นี้ได้ถูกถ่ายทอดสู่การพัฒนา ธุรกิจอสังหาริมทรัพย์เพื่อการพักอาศัย ซึ่งเป็นหนึ่งในกลุ่มธุรกิจหลักของ สิงห์ เอสเตท`,
            },
            items: [
                {
                    type: 'News',
                    category: { en: 'News', th: 'ข่าวสาร' },
                    title: {
                        en: 'Singha Estate Wins Prestigious Global Business Outlook Award 2024, reinforcing a decade of excellence as a leader in luxury real estate development with world-class standards',
                        th: 'สิงห์ เอสเตท คว้ารางวัลใหญ่ระดับโลก Global Business Outlook Award 2024 ตอกย้ำความแข็งแกร่ง 10 ปี แห่งการเป็นผู้พัฒนาและเข้าใจอสังหาฯระดับลักชูรี มาตรฐานระดับเวิลด์คลาส',
                    },
                    url: {
                        en: 'https://singhaestate.co.th/en/news-room/GBO2024Residential',
                        th: 'https://singhaestate.co.th/th/news-room/GBO2024Residential',
                    },
                    date: '27 Sep 2024',
                    image: {
                        alt: 'Singha Estate Wins Prestigious Global Business Outlook Award 2024',
                        thumb: '/assets/image-new/thumb/news/thumbnail_0_27_Sep_2024_1727422937803.webp',
                    },
                },
                {
                    type: 'News',
                    category: { en: 'News', th: 'ข่าวสาร' },
                    title: {
                        en: 'สิงห์ เอสเตท ตอกย้ำ ความเป็นบริษัทพัฒนาอสังหาริมทรัพย์ที่เข้าใจในการพัฒนาที่อยู่อาศัยในระดับลักชูรีของประเทศไทย คว้า 4 รางวัลคุณภาพเวทีระดับเอเชีย  “PropertyGuru Thailand Property Awards 2024”',
                        th: 'สิงห์ เอสเตท ตอกย้ำ ความเป็นบริษัทพัฒนาอสังหาริมทรัพย์ที่เข้าใจในการพัฒนาที่อยู่อาศัยในระดับลักชูรีของประเทศไทย คว้า 4 รางวัลคุณภาพเวทีระดับเอเชีย  “PropertyGuru Thailand Property Awards 2024”',
                    },
                    url: {
                        en: 'https://singhaestate.co.th/en/news-room/PropertyGuru2024',
                        th: 'https://singhaestate.co.th/th/news-room/PropertyGuru2024',
                    },
                    date: '26 Sep 2024',
                    image: {
                        alt: 'สิงห์ เอสเตท ตอกย้ำ ความเป็นบริษัทพัฒนาอสังหาริมทรัพย์ที่เข้าใจในการพัฒนาที่อยู่อาศัยในระดับลักชูรีของประเทศไทย',
                        thumb: '/assets/image-new/thumb/news/thumbnail_0_26_Sep_2024_1727342274929.webp',
                    },
                },
                {
                    type: 'News',
                    category: { en: 'News', th: 'ข่าวสาร' },
                    title: {
                        en: 'Singha Estate Honoring Resident Experience with Exclusive World-Class Luxury Offering. Through the "S Life" Memorable Experiences of Divergent Happiness.',
                        th: 'สิงห์ เอสเตท ตอบแทนลูกค้าคนพิเศษ มอบประสบการณ์สุดเอ็กซ์คลูซีฟจากแบรนด์ลักชูรี่ระดับเวิลด์คลาสผ่านกิจกรรม "S Life" MEMORABLE EXPERIENCES OF DIVERGENT HAPPINESS',
                    },
                    url: {
                        en: 'https://singhaestate.co.th/en/news-room/S-Life-Memorable-Experiences-of-Divergent-Happiness',
                        th: 'https://singhaestate.co.th/th/news-room/S-Life-Memorable-Experiences-of-Divergent-Happiness',
                    },
                    date: '04 Jul 2024',
                    image: {
                        alt: 'Singha Estate Honoring Resident Experience with Exclusive World-Class Luxury Offering.',
                        thumb: '/assets/image-new/thumb/news/thumbnail_0_03_Jul_2024_1719994075762.webp',
                    },
                },
            ],
        };

        // ใช้ reactive เพื่อให้เปลี่ยนจาก API แล้ว DOM อัปเดต
        const content = reactive(JSON.parse(JSON.stringify(defaultContent)));

        const fontClass = computed(() =>
            language.value === 'en' ? "font-['SinghaEstate']" : ''
        );

        const moreText = computed(() => more[language.value]);

        const initAOS = () => {
            if (window.AOS) {
                AOS.init();
            }
        };

        const fetchNews = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/home/news`);
                const mainArr = res.data?.data || [];
                const subs = res.data?.['sub-data'] || [];

                if (mainArr.length) {
                    const main = mainArr[0];

                    // title / detail: แปลง \r\n -> <br/>
                    content.title.th =
                        (main.title?.th || '').replace(/\r\n/g, "<br class='lg:block hidden'/>");
                    content.title.en =
                        (main.title?.en || '').replace(/\r\n/g, "<br class='lg:block hidden'/>");

                    content.detail.th =
                        (main.detail?.th || '').replace(/\r\n/g, "<br/><br/>");
                    content.detail.en =
                        (main.detail?.en || '').replace(/\r\n/g, "<br/><br/>");
                }

                if (subs.length) {
                    const sorted = subs
                        .slice()
                        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

                    content.items = sorted.map((s) => {
                        return {
                            type: (s.type || 'News').trim(),
                            category: { th: 'ข่าวสาร', en: 'News' },
                            title: s.title || { th: '', en: '' },
                            url: s.url || { th: '#', en: '#' },
                            date: s.date || '',
                            image: {
                                alt: s.image_alt || (s.title?.th || s.title?.en || ''),
                                thumb: s.image_thumb
                                    ? resolveNewsImageUrl(s.image_thumb)
                                    : '/assets/image/learn_more/default-thumb.webp'
                            }
                        };
                    });
                }
            } catch (err) {
                console.error('Failed to load news content:', err);
                // ถ้า error จะใช้ defaultContent ต่อไป
            }
        };

        onMounted(async () => {
            language.value = getLanguageFromPath();
            await fetchNews();
            nextTick(() => {
                initAOS();
            });
        });

        /* ===== DEFAULT CONTENT (KEEP AS COMMENT) =====

        // const content = {
        //   title: { ... เดิม ... },
        //   detail: { ...เดิม... },
        //   items: [ ...เดิม... ]
        // };

        ===== END DEFAULT CONTENT ===== */

        return {
            language,
            content,
            formatDate,
            truncateTitle,
            fontClass,
            moreText,
        };
    },
});

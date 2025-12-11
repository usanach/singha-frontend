// Define the Design Concept component
const DesignConceptComponent = defineComponent({
    name: 'DesignConceptComponent',
    template: `
    <!-- แสดงเฉพาะเมื่อโหลดข้อมูลเสร็จ และ section ถูกเปิดใช้งาน -->
    <section
        v-if="isReady && isEnabled"
        class="design-concept-component onview"
        id="design_concept"
        data-section="design_concept"
    >
        <div
            class="relative min-h-[800px] flex bg-cover bg-center"
            :style="{ backgroundImage: 'url(' + datasets.image.bg + ')' }"
        >
            <!-- side image (desktop) -->
            <div class="lg:block hidden">
                <div
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    data-aos-easing="linear"
                    class="absolute right-0 top-0 w-1/2 h-full overflow-hidden bg-cover bg-center"
                    :style="{ backgroundImage: 'url(' + datasets.image.side + ')' }"
                ></div>
            </div>

            <div class="container mx-auto relative my-20 px-0 lg:px-5">
                <div class="flex lg:flex-row flex-col">
                    <div class="lg:w-1/2 w-full">
                        <div class="flex flex-col gap-3">
                            <!-- Design Concept Text (label ด้านบน) -->
                            <h2
                                data-aos="fade-up"
                                data-aos-duration="300"
                                data-aos-easing="linear"
                                class="uppercase font-medium text-[22px] leading-none lg:px-0"
                                :style="{ color: datasets.colors.text }"
                            >
                                {{ datasets.text[language] }}
                            </h2>

                            <hr
                                class="w-1/5 lg:mx-0 mx-5"
                                data-aos="fade-up"
                                data-aos-duration="300"
                                data-aos-easing="linear"
                                :style="{ borderColor: datasets.colors.text }"
                            />

                            <!-- Title หลัก (ใช้ฟอนต์จาก API + รองรับขึ้นบรรทัดใหม่ด้วย <br/>) -->
                            <h3
                                data-aos="fade-up"
                                data-aos-duration="300"
                                data-aos-easing="linear"
                                data-aos-delay="100"
                                class="uppercase text-nowrap lg:text-[70px] text-[35px] leading-none lg:px-0"
                                :class="titleFontClass()"
                                :style="{ color: datasets.colors.title }"
                                v-html="datasets.title[language]"
                            >
                            </h3>

                            <!-- side image (mobile) -->
                            <img
                                :src="datasets.image.side"
                                alt=""
                                class="my-5 lg:hidden"
                                v-if="datasets.image.side"
                            >

                            <!-- Description -->
                            <p
                                class="font-normal w-full lg:w-3/5 text-[16px] lg:mt-6 lg:px-0"
                                data-aos="fade-up"
                                data-aos-delay="200"
                                data-aos-duration="300"
                                data-aos-easing="linear"
                                :style="{ color: datasets.colors.description }"
                                v-html="datasets.description[language]"
                            >
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`,

    setup() {
        const language  = ref('th');   // th | en
        const isReady   = ref(false);  // โหลด config เสร็จหรือยัง
        const isEnabled = ref(true);   // design_concept_disabled == 1 หรือไม่

        // default (ใช้เป็น fallback ถ้า API error / ไม่มีข้อมูล)
        const datasets = ref({
            text: {
                th: 'Design Concept',
                en: 'Design Concept',
            },
            title: {
                en: "MODERN<br/> TROPICAL<br/> CONTEMPORARY",
                th: "MODERN<br/> TROPICAL<br/> CONTEMPORARY",
            },
            description: {
                en: "Embrace nature-centric living through expansive light wells that welcome both natural light and breezes. The design creates a seamless harmony between ambient atmosphere and the home's palette.​",
                th: "ดีไซน์รูปแบบการใช้ชีวิตใกล้ชิดธรรมชาติมากยิ่งขึ้น ด้วยช่องแสงขนาดใหญ่ ที่เปิดรับได้ทั้งแสงสว่าง และลมจากธรรมชาติ พร้อมการออกแบบให้สีสันของบรรยากาศและตัวบ้านเข้ากันอย่างกลมกลืน​",
            },
            image: {
                bg: "/assets/image/page-shawn-panya/design-concept/bg.webp",
                side: "/assets/image/page-shawn-panya/design-concept/concept-img.webp",
            },
            fontKey: {
                th: 'gotham', // design_concept_font_th
                en: 'gotham', // design_concept_font_en
            },
            titleFontKey: {
                th: 'gotham', // design_concept_title_font_th
                en: 'gotham', // design_concept_title_font_en
            },
            colors: {
                text: '#3D2120',
                title: '#362662',
                description: '#2C2C2C',
            },
        });

        // mapping คีย์ฟอนต์จาก DB -> tailwind class
        const FONT_CLASS_MAP = {
            gotham: "font-['Gotham']",
            singhaestate: "font-['SinghaEstate']",
            the_seasons: "font-['The_Seasons']",
            tenor_sans: "font-['Tenor_Sans']",
            ibm_plex_thai: "font-['IBM_Plex_Sans_Thai']",
            // เพิ่ม mapping อื่น ๆ ตามที่หลังบ้านใช้
        };

        // base URL API/storage
        const API_BASE     = window.APP_CONFIG?.apiBaseUrl  || 'http://127.0.0.1:8000/api';
        const STORAGE_BASE = window.APP_CONFIG?.storageUrl || `${window.location.origin}/storage`;

        const buildImagePath = (imagePath) => {
            if (!imagePath) return '';
            if (/^https?:\/\//i.test(imagePath)) return imagePath;
            return `${STORAGE_BASE}/uploads/projects/${imagePath.replace(/^\/+/, '')}`;
        };

        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        const normalizeMultiline = (val) => {
            if (!val) return '';
            if (typeof val === 'string') {
                // แทนที่ \r\n, \n เป็น <br/>
                return val.replace(/\r\n|\n/g, '<br/>');
            }
            return val;
        };

        const getLocalized = (value, lang) => {
            if (!value) return '';
            if (typeof value === 'string') return value;
            if (typeof value === 'object') {
                return value[lang] || value.th || value.en || '';
            }
            return '';
        };

        const resolveFontClass = (key, langDefault = 'th', isTitle = false) => {
            if (!key) {
                return '';
            }
            const k = String(key).toLowerCase();
            return FONT_CLASS_MAP[k] || '';
        };

        const sectionFontClass = () => {
            const lang = language.value;
            const key  = datasets.value.fontKey?.[lang] || '';
            return resolveFontClass(key, lang, false);
        };

        const titleFontClass = () => {
            const lang = language.value;
            const key  = datasets.value.titleFontKey?.[lang] || '';
            return resolveFontClass(key, lang, true);
        };

        const fetchDesignConcept = async () => {
            try {
                const currentPath = window.location.pathname;
                const lang        = language.value;

                // 1) หา project_id จาก /project/seo
                const seoRes  = await axios.get(`${API_BASE}/project/seo`);
                const seoRows = Array.isArray(seoRes.data?.data) ? seoRes.data.data : [];

                const enabledRows = seoRows.filter(r => (r.seo_disabled ?? 0) != 1);
                const field       = lang === 'en' ? 'seo_url_en' : 'seo_url_th';
                const matchedSeo  = enabledRows.find(row => row[field] === currentPath);

                if (!matchedSeo || !matchedSeo.project_id) {
                    console.warn('DesignConcept: no SEO row matched current URL, fallback ตาม default datasets');
                    isReady.value   = true;   // แสดง default
                    isEnabled.value = true;
                    return;
                }

                const projectId = matchedSeo.project_id;

                // 2) ดึง design concept ตาม project_id
                const dcRes  = await axios.get(`${API_BASE}/project/design-concept/${projectId}`);
                const dcRows = Array.isArray(dcRes.data?.data) ? dcRes.data.data : [];

                if (!dcRows.length) {
                    console.warn('DesignConcept: no data from API, ใช้ default');
                    isReady.value   = true;
                    isEnabled.value = true;
                    return;
                }

                // เลือก row ที่เปิดใช้งาน (design_concept_disabled = 1)
                let row = dcRows.find(r => Number(r.design_concept_disabled ?? 0) === 1);
                if (!row) {
                    row = dcRows[0];
                }

                const disabledFlag = Number(row.design_concept_disabled ?? 0);
                isEnabled.value    = disabledFlag === 1;
                if (!isEnabled.value) {
                    isReady.value = true;
                    return;
                }

                const textTh = row.design_concept_text_th || 'Design Concept';
                const textEn = row.design_concept_text_en || 'Design Concept';

                const titleThRaw = getLocalized(row.design_concept_title, 'th');
                const titleEnRaw = getLocalized(row.design_concept_title, 'en');

                const descThRaw  = getLocalized(row.design_concept_description, 'th');
                const descEnRaw  = getLocalized(row.design_concept_description, 'en');

                datasets.value = {
                    text: {
                        th: textTh,
                        en: textEn,
                    },
                    title: {
                        th: normalizeMultiline(titleThRaw || ''),
                        en: normalizeMultiline(titleEnRaw || ''),
                    },
                    description: {
                        th: normalizeMultiline(descThRaw || ''),
                        en: normalizeMultiline(descEnRaw || ''),
                    },
                    image: {
                        bg: buildImagePath(row.design_concept_image_bg),
                        side: buildImagePath(row.design_concept_image_side),
                    },
                    fontKey: {
                        th: row.design_concept_font_th || 'gotham',
                        en: row.design_concept_font_en || 'gotham',
                    },
                    titleFontKey: {
                        th: row.design_concept_title_font_th || 'gotham',
                        en: row.design_concept_title_font_en || 'gotham',
                    },
                    colors: {
                        text: row.design_concept_font_color || '#3D2120',
                        title: row.design_concept_title_font_color || '#362662',
                        description: row.design_concept_description_font_color || '#2C2C2C',
                    }
                };

                isReady.value = true;
            } catch (err) {
                console.error('DesignConcept: fetch error', err);
                // ถ้า error ให้ใช้ default แล้วแสดงได้
                isReady.value   = true;
                isEnabled.value = true;
            }
        };

        const initAOS = () => {
            if (window.AOS) {
                AOS.init();
            }
        };

        onMounted(async () => {
            language.value = getLanguageFromPath();
            await fetchDesignConcept();

            nextTick(() => {
                initAOS();
            });
        });

        return {
            language,
            datasets,
            isReady,
            isEnabled,
            sectionFontClass,
            titleFontClass,
        };
    },
});

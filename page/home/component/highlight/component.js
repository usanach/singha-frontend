// Define the Header component
const HighlightComponent = defineComponent({
    name: 'HighlightComponent',
    template: `
<section id="HighlightComponent">
    <div class="bg-[#101C2E] py-10">
        <div class="container pb-10">
            <h2
                :class="[language === 'en' ? 'font-[\\'SinghaEstate\\']' : '', 'text-[#CBA449]', 'text-[35px]', 'uppercase', 'text-center', 'leading-tight']"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="linear"
                v-html="sectionTitle"
            ></h2>

            <!-- detail (optional) -->
            <p v-if="sectionDetail"
               class="text-[14px] text-center text-white w-3/4 mx-auto mt-2"
               data-aos="fade-up"
               data-aos-duration="1000"
               data-aos-easing="linear"
               data-aos-delay="100"
               v-html="sectionDetail">
            </p>
        </div>

        <div class="relative container mt-0" v-if="items.length">
            <div class="swiper privilege-slide w-full lg:w-5/6">
                <!-- slide image -->
                <div class="swiper-wrapper" aria-live="polite">
                    <div
                        class="swiper-slide"
                        v-for="(item, index) in items"
                        :key="'img-'+index"
                        data-aos="fade-in"
                        data-aos-duration="1000"
                        data-aos-easing="linear"
                        data-aos-delay="200"
                        role="group"
                        :aria-label="(index+1) + ' / ' + items.length"
                    >
                        <div class="relative w-full overflow-hidden">
                            <img
                                :src="item.image.l"
                                :alt="item.alt"
                                class="w-full relative lg:block hidden"
                            >
                            <img
                                :src="item.image.thumb"
                                :alt="item.alt"
                                class="w-full relative lg:hidden block"
                            >
                        </div>
                    </div>
                </div>

                <!-- block detail + controller -->
                <div class="w-full z-10 shadow-xl bg-[url('./../assets/image-new/home/collection/BG.webp')] bg-no-repeat bg-cover bg-center">
                    <div>
                        <div class="flex mx-auto p-5 lg:px-10 gap-5 lg:flex-row flex-col">
                            <!-- detail slide -->
                            <div class="w-full">
                                <div class="swiper privilege-detail-slide swiper-fade">
                                    <div class="swiper-wrapper" aria-live="polite">
                                        <div
                                            class="swiper-slide"
                                            v-for="(item, index) in items"
                                            :key="'detail-'+index"
                                            role="group"
                                            :aria-label="(index+1) + ' / ' + items.length"
                                        >
                                            <div class="flex flex-col gap-5">
                                                <div class="border border-4 border-[#786028] border-t-0 border-b-0 border-r-0">
                                                    <div class="flex gap-3">
                                                        <h2 class="ml-3 text-[#696969] leading-tight text-[16px] uppercase">
                                                            {{ language === 'en' ? 'Promotion' : 'โปรโมชั่น' }}
                                                        </h2>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 class="text-[35px] font-bold leading-[1.3]" v-html="item.highlight.title"></h3>
                                                </div>

                                                <div>
                                                    <!-- body detail จาก data_detail_[lang] -->
                                                    <div class="text-[16px]" v-html="item.highlight.detail"></div>
                                                </div>

                                                <!-- time / concept -->
                                                <p
                                                    class="text-[#696969] leading-tight text-[15px]"
                                                    v-if="item.timeLabel"
                                                >
                                                    {{ item.timeLabel }}
                                                </p>

                                                <div>
                                                    <a
                                                        class="group text-[#948668] cursor-pointer lg:text-start text-center transition-all flex lg:justify-start justify-center text-[16px] border w-fit border-[#948668] py-2 px-5 hover:border-white hover:bg-[#948668] hover:text-white capitalize"
                                                        :data-href="item.link"
                                                        :data-promotion_name="item.tracking.promotion_name"
                                                        :data-promotion_start="item.tracking.promotion_start"
                                                        :data-promotion_end="item.tracking.promotion_end"
                                                        onclick="viewMore(this)"
                                                    >
                                                        {{ language === 'en' ? 'explore more' : 'ดูเพิ่มเติม' }}
                                                        <span class="lg:block hidden my-auto">
                                                            <img class="group-hover:hidden" src="/assets/icon/explore.svg" alt="icon">
                                                            <img class="group-hover:block hidden" src="/assets/icon/explore-white.svg" alt="icon">
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                                </div>
                            </div>

                            <!-- controller -->
                            <div class="lg:absolute right-0 lg:mr-10 z-10">
                                <div class="flex gap-5 ml-auto mb-auto lg:mt-10 mt-5">
                                    <div class="flex gap-5 ml-auto">
                                        <div class="lg:w-[300px] w-[130px] relative bg-[#b9a77f73] h-[4px] my-auto overflow-hidden">
                                            <div class="hero-progress-bar h-full !bg-[#b9a77f73] swiper-pagination-progressbar swiper-pagination-horizontal">
                                                <span class="swiper-pagination-progressbar-fill"></span>
                                            </div>
                                        </div>
                                        <div class="flex leading-0 text-[16px]">
                                            <div class="page-number leading-tight my-auto whitespace-nowrap swiper-pagination-fraction swiper-pagination-horizontal">
                                                <span class="swiper-pagination-current">1</span>
                                                /
                                                <span class="swiper-pagination-total">1</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex gap-5 my-auto">
                                        <span class="prev w-[40px]" tabindex="0" role="button" aria-label="Previous slide">
                                            <img src="/assets/icon/chev-icon-ci.svg" alt="icon">
                                        </span>
                                        <span class="next w-[40px]" tabindex="0" role="button" aria-label="Next slide">
                                            <img src="/assets/icon/chev-icon-ci.svg" class="rotate-180" alt="icon">
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <!-- end controller -->

                        </div>
                    </div>
                </div>

                <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
            </div>
        </div>
    </div>
</section>
`,

    setup() {
        const language = ref('th');
        const sectionTitle = ref('');
        const sectionDetail = ref('');
        const items = ref([]);  // slide ทั้งหมด
        const normTextWithBreaks = (txt) => {
            return (txt || '').replace(/(\r\n|\n|\r)/g, '<br>');
        };
        // ตรวจภาษา
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        // helper สร้าง URL รูปจากชื่อไฟล์ใน DB
        const makeImageUrl = (storageBase, fileName) => {
            
            if (!fileName) return '';
            let n = String(fileName).trim().replace(/^\/+/, '');
            // ถ้าเป็น URL เต็มแล้ว
            if (/^https?:\/\//i.test(n)) return n;

            // ถ้า backend ให้มาเป็น basename: ให้ต่อ path uploads/promotion_item_data/
            if (!n.startsWith('uploads/')) {
                n = 'uploads/promotion_item_data/' + n;
            }
            return storageBase.replace(/\/$/, '/') + n;
        };

        const loadData = async () => {
            try {
                const lang = getLanguageFromPath();
                language.value = lang;

                const cfg = window.APP_CONFIG || {};
                const baseUrl = (cfg.apiBaseUrl || 'http://127.0.0.1:8000/api').replace(/\/$/, '');
                const storage = cfg.storageUrl || '/storage/';

                const endpoint = `${baseUrl}/promotion`;
                const res = await axios.get(endpoint);
                const apiData = res.data || {};

                // title/detail section
                const root = Array.isArray(apiData.data) && apiData.data.length
                    ? apiData.data[0]
                    : { title: { th: '', en: '' }, detail: { th: '', en: '' } };

                sectionTitle.value = normTextWithBreaks(root.title?.[lang] || '');
                sectionDetail.value = normTextWithBreaks(root.detail?.[lang] || '');

                // slide list
                const subList = Array.isArray(apiData['sub-data'])
                    ? apiData['sub-data']
                    : [];

                const today = new Date().toISOString().slice(0, 10);

                // filter ตามวันที่ (ถ้าอยากให้ไม่ filter ก็เอา subList ตรง ๆ ได้เลย)
                let activeItems = subList.filter(item => {
                    if (!item.date_start || !item.date_end) return true;
                    return item.date_start <= today && today <= item.date_end;
                });

                if (!activeItems.length) {
                    activeItems = subList;
                }

                // sort ด้วย sort_order
                activeItems.sort((a, b) => {
                    const sa = a.sort_order ?? 999;
                    const sb = b.sort_order ?? 999;
                    return sa - sb;
                });

                items.value = activeItems.map(item => {
                    // เลือกรูป desktop / mobile
                    const desktopName = item.image_1 || item.image_0 || item.image_2 || item.image_3 || '';
                    const mobileName  = item.image_3 || item.image_2 || item.image_1 || item.image_0 || '';

                    const imageL =makeImageUrl(storage, desktopName);
                    const imageThumb = makeImageUrl(storage, mobileName) || imageL;

                    const dataTitle   = item.data_title || {};
                    const slideTitleRaw = dataTitle[lang] || '';
                    const slideTitle    = normTextWithBreaks(slideTitleRaw);

                    const slideTitleEn = dataTitle.en || '';
                    const slideTitleTh = dataTitle.th || '';

                    const concept = item[`data_concept_${lang}`] || item.data_concept || '';
                    const detailHtml = item[`data_detail_${lang}`] || '';

                    // label เวลาเอา concept มาโชว์บรรทัดล่าง
                    const timeLabel = concept;

                    // link ใช้ data_url_[lang] ตรง ๆ
                    const urlFromLang = item[`data_url_${lang}`] || item.data_url_th || item.data_url_en || '#';
                    const link = urlFromLang || '#';

                    // tracking name: ใช้ EN > TH > meta_title
                    const campaignName =
                        slideTitleEn ||
                        slideTitleTh ||
                        item.meta_title ||
                        '';

                    return {
                        image: {
                            l: imageL || '/assets/image-new/promotion/default-desktop.webp',
                            thumb: imageThumb || '/assets/image-new/promotion/default-mobile.webp',
                        },
                        alt: slideTitle || 'promotion',
                        highlight: {
                            title: slideTitle,
                            detail: detailHtml,
                        },
                        timeLabel,
                        link,
                        tracking: {
                            promotion_name: campaignName,
                            promotion_start: item.date_start || '',
                            promotion_end: item.date_end || '',
                        },
                    };
                });

            } catch (err) {
                console.error('Failed to load /api/promotion for HighlightComponent:', err);
            }
        };

        const initSwiper = () => {
            AOS.init();

            const privilegeSwiper = new Swiper(".privilege-slide", {
                pagination: {
                    el: ".privilege-slide .hero-progress-bar",
                    type: "progressbar",
                },
                navigation: {
                    nextEl: ".privilege-slide .next",
                    prevEl: ".privilege-slide .prev",
                },
            });

            const privilegeSwiperDetail = new Swiper(".privilege-detail-slide", {
                effect: "fade"
            });

            const privilegePagingSwiper = new Swiper(".privilege-slide", {
                pagination: {
                    el: ".privilege-slide .page-number",
                    type: "fraction",
                },
            });

            privilegeSwiper.controller.control = privilegeSwiperDetail;
            privilegeSwiperDetail.controller.control = privilegePagingSwiper;
        };

        onMounted(async () => {
            await loadData();
            nextTick(() => {
                if (items.value.length) {
                    initSwiper();
                }
            });
        });

        return {
            language,
            sectionTitle,
            sectionDetail,
            items,
        };
    }
});

// tracking เดิม ใช้ได้เลย
function viewMore(ev) {
    var tracking = {
        event: "click_view_promotion",
        landing_page: landing_page,
        section: "promotion_banner",
        event_action: "click",
        promotion_name: ev.dataset['promotion_name'],
        promotion_start: ev.dataset['promotion_start'],
        promotion_end: ev.dataset['promotion_end']
    }

    setDataLayer(tracking);
    window.open(ev.dataset['href'], '_blank');
}

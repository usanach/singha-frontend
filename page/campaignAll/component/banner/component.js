// Define the Header component
const BannerComponent = defineComponent({
    name: 'BannerComponent',
    template: `<section class="lg:mt-14 mt-12 hightlight" v-html="template"></section>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const loadTemplate = async (lang) => {
            try {
                lang = getLanguageFromPath();
                const title = {
                    en: "HIGHLIGHT PROMOTIONS &<span class='text-nowrap'> SPECIAL PRIVILEGES </span>",
                    th: "​แคมเปญและ<span class='text-nowrap'>สิทธิพิเศษเฉพาะคุณ</span>"
                }
                const detail = {
                    th: `​โครงการที่พักอาศัยจาก สิงห์ เอสเตท มอบความหลากหลายให้คุณ ด้วย บ้านเดี่ยว ไพรเวทเอสเตท โฮมออฟฟิศ และคอนโดมิเนียม ผ่านความตั้งใจที่จะตอบโจทย์ทุกความต้องการด้วยแบรนด์ที่แตกต่าง ที่สะท้อนเอกลักษณ์ของเจ้าของบ้าน​`,
                    en: `
                        Singha Estate's varied residential development, from high-rise to low-rise projects, features a
                        range of properties-single detached houses, private estates, home offices, and condominiums.
                        <br />Tailored to luxury customers across different brands, these
                        distinctive offering
                        s not only
                        define Singha Estate homes but also embody the company's commitment "Best - in - class" to
                        excellence across all segments.`
                }

                const dataset = await axios.get('/data/promotion.json');
                const data = await dataset.data;

                const templateResponse = await axios.get('/page/home/component/highlight/template.html');
                let templateContent = templateResponse.data;


                const titleTemp = `
                            <h1 class="${lang == 'en' ? "font-['Cinzel']" : ""} text-[#CBA449] lg:text-[36px] text-[24px] uppercase text-center leading-tight"
                                data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">${title[lang]}</h1>`
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, titleTemp)
                    .replace(/{{detail}}/g, detail[lang])
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
                    .replace(/{{#privilege.slide}}([\s\S]*?){{\/privilege.slide}}/, (match, slide) => {
                        return data.filter((d, i) => !d.end).map((data, i) => {
                            return slide
                                .replace(/{{privilege.slide.l}}/g, data.data.image.l)
                                .replace(/{{privilege.slide.thumb}}/g, data.data.image.thumb)
                        }).join("")
                    })
                    .replace(/{{#privilege.detail.slide}}([\s\S]*?){{\/privilege.detail.slide}}/, (match, detail) => {
                        return data.filter((d, i) => !d.end).map((data, i) => {
                            let slide = {
                                title: data.data.highlight.title[lang],
                                subtitle: data.data.highlight.subtitle[lang],
                                detail: data.data.highlight.detail[lang]
                            };
                            let link = `/${lang}/campaigns/${data.data.link}`;
                            const tracking = {
                                promotion_name: data.data.campaign['en'],
                                promotion_start: data.data.time.start,
                                promotion_end: data.data.time.end
                            }

                            return detail
                                .replace(/{{tracking.promotion.name}}/g, tracking.promotion_name)
                                .replace(/{{tracking.promotion.start}}/g, tracking.promotion_start)
                                .replace(/{{tracking.promotion.end}}/g, tracking.promotion_end)
                                .replace(/{{privilege.detail.slide.title}}/g, slide.title)
                                .replace(/{{privilege.detail.slide.subtitle}}/g, slide.subtitle)
                                .replace(/{{privilege.detail.slide.detail}}/g, slide.detail)
                                .replace(/{{privilege.detail.slide.cate}}/g, data.type)
                                .replace(/{{privilege.detail.slide.date}}/g, data.data.time[lang])
                                .replace(/{{privilege.detail.slide.link}}/g, link)
                        }).join("")
                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        const init = () => {
            AOS.init();

            var privilegeSwiper = new Swiper(".privilege-slide", {
                pagination: {
                    el: ".privilege-slide .hero-progress-bar",
                    type: "progressbar",
                },
                navigation: {
                    nextEl: ".privilege-slide .next",
                    prevEl: ".privilege-slide .prev",
                },
            });

            var privilegeSwiperDetail = new Swiper(".privilege-detail-slide", {
                effect: "fade"
            });


            var privilegePagingSwiper = new Swiper(".privilege-slide", {
                pagination: {
                    el: ".privilege-slide .page-number",
                    type: "fraction",
                },
            });

            privilegeSwiper.controller.control = privilegeSwiperDetail;
            privilegeSwiperDetail.controller.control = privilegePagingSwiper;

        }
        onMounted(async () => {
            language.value = getLanguageFromPath();
            await loadTemplate(language.value);

            nextTick(() => {
                init();
            })
        });

        return { template, language };
    }
});

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
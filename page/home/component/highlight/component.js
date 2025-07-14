// Define the Header component
const HighlightComponent = defineComponent({
    name: 'HighlightComponent',
    template: `<section id="HighlightComponent" v-html="template"></section>`,

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
                const dataset = await axios.get('/data/promotion.json');
                const data = await dataset.data;

                const templateResponse = await axios.get('/page/home/component/highlight/template.html');
                let templateContent = templateResponse.data;
                const title = data.title[lang];
                const detail = data.detail[lang]

                const titleTemp = `
                            <h2 class="${lang == 'en' ? "font-['SinghaEstate']" : ""} text-[#CBA449] text-[35px] uppercase text-center leading-tight"
                                data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                                ${title}
                            </h2>`
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, titleTemp)
                    .replace(/{{detail}}/g, detail)
                    .replace(/{{font}}/g, lang == 'en' ? "font-['SinghaEstate']" : "")
                    .replace(/{{#privilege.slide}}([\s\S]*?){{\/privilege.slide}}/, (match, slide) => {
                        return data.items.filter((d, i) => !d.end).map((data, i) => {
                            return slide
                                .replace(/{{privilege.slide.l}}/g, data.data.image.l)
                                .replace(/{{privilege.slide.thumb}}/g, data.data.image.thumb)
                        }).join("")
                    })
                    .replace(/{{#privilege.detail.slide}}([\s\S]*?){{\/privilege.detail.slide}}/, (match, detail) => {
                        return data.items.filter((d, i) => !d.end).map((data, i) => {
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
                                .replace(/{{privilege.detail.slide.cate}}/g, data.title[lang])
                                .replace(/{{privilege.detail.slide.date}}/g, data.data.time[lang])
                                .replace(/{{explore_more}}/g,lang=="en"?"explore more":"ดูเพิ่มเติม")
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
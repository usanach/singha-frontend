// Define the Header component
const BannerComponent = defineComponent({
    name: 'BannerComponent',
    template: `<section class="mt-10" v-html="template"></section>`,

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
                const title = {
                    en: "CAMPAIGN AND PROMOTION​",
                    th: "CAMPAIGN AND PROMOTION​"
                }
                const detail = {
                    th: `​`,
                    en: ``
                }
                const dataset = await axios.get('/data/promotion.json');
                const data = await dataset.data;

                const templateResponse = await axios.get('/page/campaignAll/component/banner/template.html');
                let templateContent = templateResponse.data;

                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, lang == 'en' ? title['en'] : title['th'])
                    .replace(/{{detail}}/g, lang == 'en' ? detail['en'] : detail['th'])
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
                    .replace(/{{#privilege.slide}}([\s\S]*?){{\/privilege.slide}}/, (match, slide) => {
                        return data.map((data, i) => {
                            return slide
                                .replace(/{{privilege.slide.l}}/g, data.data.image.l)
                                .replace(/{{privilege.slide.thumb}}/g, data.data.image.thumb)
                        }).join("")
                    })
                    .replace(/{{#privilege.detail.slide}}([\s\S]*?){{\/privilege.detail.slide}}/, (match, detail) => {
                        return data.map((data, i) => {
                            let slide = {
                                title: `${data.data.detail.room[lang]}: ${data.data.title[lang]}<br/>`,
                                subtitle: data.data.subtitle,
                                detail: `${data.data.detail.price[lang]}<br/>${data.data.detail.discount[lang]}`,
                                remark: data.data.detail.remark[lang]
                            };
                            let link = `/${lang}/campaigns/${data.data.link}`;
                            return detail
                                .replace(/{{privilege.detail.slide.title}}/g, slide.title)
                                .replace(/{{privilege.detail.slide.subtitle}}/g, slide.subtitle)
                                .replace(/{{privilege.detail.slide.detail}}/g, slide.detail)
                                .replace(/{{privilege.detail.slide.cate}}/g, data.type)
                                .replace(/{{privilege.detail.slide.date}}/g, data.data.time[lang])
                                .replace(/{{privilege.detail.slide.link}}/g, link)
                                .replace(/{{#privilege.detail.slide.remark}}([\s\S]*?){{\/privilege.detail.slide.remark}}/, (match, remark) => {
                                    return data.data.detail.remark[lang].map((r, i) => {
                                        let text =
                                            `${i == 0 ? (lang == "en" ? "Remarks: <br/><br/>" : "หมายเหตุ: <br/><br/>") : ""}`
                                            + `${(i + 1)}. ${r}`
                                            + (i == (data.data.detail.remark[lang].length - 1) ? `<br/>${lang == "en" ? "*Terms and conditions apply" : "*เงื่อนไขเป็นไปตามที่กำหนด"}` : "");
                                        return remark
                                            .replace(/{{privilege.detail.slide.remark.list}}/g, text)
                                    }).join("")
                                })
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
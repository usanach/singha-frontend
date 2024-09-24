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
                const data = [];
                const templateResponse = await axios.get('/page/campaignAll/component/banner/template.html');
                let templateContent = templateResponse.data;

                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, lang == 'en' ? title['en'] : title['th'])
                    .replace(/{{detail}}/g, lang == 'en' ? detail['en'] : detail['th'])
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
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

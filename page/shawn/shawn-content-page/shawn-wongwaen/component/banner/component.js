// Define the Header component
const BannerComponent = defineComponent({
    props: ['dataset'],
    name: 'BannerComponent',
    template: `<section class="banner onview" data-section="property_introduction" v-html="template" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear"></section>`,

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
                const swipeData = [{
                    title: {
                        en: "ณอน วงแหวน-จตุโชติ​",
                        th: "ณอน วงแหวน-จตุโชติ​"
                    },
                    theme: {
                        text: {
                            css: ""
                        }
                    },
                    font:{
                        en:"font-['Gotham']",
                        th:""
                    },
                    description: {
                        en: "บ้านเดี่ยวแปลงใกล้สวน และ คลับเฮาส์ ติดถนนใหญ่ ใกล้ทางด่วนจตุโชติ ​<br/>เริ่ม 18.9 – 30 ล้าน*​",
                        th: "บ้านเดี่ยวแปลงใกล้สวน และ คลับเฮาส์ ติดถนนใหญ่ ใกล้ทางด่วนจตุโชติ ​<br/>เริ่ม 18.9 – 30 ล้าน*​",
                    },
                    image: {
                        l: "/assets/image/page-shawn-wongwaen/banner/wongwaen.png",
                        s: "/assets/image/page-shawn-wongwaen/banner/wongwaen_m.png",
                        logo:"/assets/image/page-shawn-wongwaen/banner/shawn-logo.png",
                    },
                }];
                const templateResponse = await axios.get('/page/shawn/shawn-content-page/shawn-wongwaen/component/banner/template.html');
                let templateContent = templateResponse.data;
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{#slide}}([\s\S]*?){{\/slide}}/, (match, slide) => {
                        return swipeData.map((data, i) => {
                            return slide
                                .replace(/{{slide.l}}/g, data.image.l)
                                .replace(/{{slide.logo}}/g, data.image.logo)
                                .replace(/{{slide.s}}/g, data.image.s)
                                .replace(/{{slide.theme.text.css}}/g, data.theme ? data.theme.text.css : "")
                                .replace(/{{slide.title}}/g, data.title[lang])
                                .replace(/{{slide.description}}/g, data.description[lang])
                                .replace(/{{slide.font}}/g, data.font[lang])
                        }).join("")
                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        const init = () => {
            AOS.init();
            var heroBannerSwiper = new Swiper(".banner .mySwiper", {
                autoplay: {
                    delay: 10000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: ".banner .mySwiper .hero-progress-bar",
                    type: "progressbar",
                },
                navigation: {
                    nextEl: ".mySwiper .next",
                    prevEl: ".mySwiper .prev",
                },
            });

            var heroBannerPagingSwiper = new Swiper(".banner .mySwiper", {
                pagination: {
                    el: ".banner .mySwiper .page-number",
                    type: "fraction",
                },
            });
            heroBannerSwiper.controller.control = heroBannerPagingSwiper;
        }
        onMounted(async () => {
            language.value = getLanguageFromPath();
            await loadTemplate(language.value);

            nextTick(() => {
                init();  // ScrollTrigger is initialized after template is loaded and DOM is updated
            });
        });

        return { template, language };
    }
});

// Define the Header component
const BannerComponent = defineComponent({
    name: 'BannerComponent',
    template: `<section class="banner" v-html="template" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear"></section>`,

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
                    title: "Mastering <br class='lg:hidden block'/> The Luxury",
                    title_en: "Mastering <br class='lg:hidden block'/> The Luxury",
                    image: {
                        l: "/assets/image/residential/1 25.png",
                        s: "/assets/image/residential/STBR_RESIZE-223.webp"
                    }
                }, {
                    title: "Mastering <br class='lg:hidden block'/> The Luxury2",
                    title_en: "Mastering <br class='lg:hidden block'/> The Luxury2",
                    image: {
                        l: "/assets/image/residential/1 25.png",
                        s: "/assets/image/residential/STBR_RESIZE-223.webp"
                    }
                }, {
                    title: "Mastering <br class='lg:hidden block'/> The Luxury3",
                    title_en: "Mastering <br class='lg:hidden block'/> The Luxury3",
                    image: {
                        l: "/assets/image/residential/1 25.png",
                        s: "/assets/image/residential/STBR_RESIZE-223.webp"
                    }
                }];
                const templateResponse = await axios.get('/page/home/component/banner/template.html');
                let templateContent = templateResponse.data;
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{#slide}}([\s\S]*?){{\/slide}}/, (match, slide) => {
                        return swipeData.map((data, i) => {
                            return slide
                                .replace(/{{slide.l}}/g, data.image.l)
                                .replace(/{{slide.s}}/g, data.image.s)
                                .replace(/{{slide.title}}/g, lang == 'en' ? data.title_en : data.title)
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

            gsap.registerPlugin(ScrollTrigger);
            gsap.to(".banner .swiper-slide img", {
                y: "+=50",
                scrollTrigger: {
                    trigger: ".banner .swiper-slide img",
                    start: "top top",
                    scrub: 1
                }
            });
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

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
                    theme: {
                        text: {
                            css: "lg:mt-auto mt-[30%]"
                        }
                    },
                    image: {
                        l: "/assets/image-new/home/home-1.jpg",
                        s: "/assets/image-new/home/home1-1.jpg"
                    }
                }, {
                    title: "Mastering <br class='lg:hidden block'/> The Luxury",
                    title_en: "Mastering <br class='lg:hidden block'/> The Luxury",
                    theme: {
                        text: {
                            css: "lg:mt-auto mt-[30%]"
                        }
                    },
                    image: {
                        l: "/assets/image-new/home/home-2.jpg",
                        s: "/assets/image-new/home/home2-1.jpg"
                    }
                }, {
                    title: "Mastering <br class='lg:hidden block'/> The Luxury",
                    title_en: "Mastering <br class='lg:hidden block'/> The Luxury",
                    image: {
                        l: "/assets/image-new/home/home-3.jpg",
                        s: "/assets/image-new/home/home3-1.jpg"
                    }
                }];
                const templateResponse = await axios.get('https://residential-prod.singhaestate.co.th/page/home-prod/component/banner/template.html');
                let templateContent = templateResponse.data;
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{#slide}}([\s\S]*?){{\/slide}}/, (match, slide) => {
                        return swipeData.map((data, i) => {
                            return slide
                                .replace(/{{slide.l}}/g, data.image.l)
                                .replace(/{{slide.s}}/g, data.image.s)
                                .replace(/{{slide.theme.text.css}}/g, data.theme ? data.theme.text.css : "")
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
            gsap.to(".banner .swiper-slide .img", {
                y: "+=50",
                scrollTrigger: {
                    trigger: ".banner .swiper-slide .img",
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

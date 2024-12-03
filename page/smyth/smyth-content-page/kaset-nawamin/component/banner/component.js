// Define the Header component
const BannerComponent = defineComponent({
    props: ['dataset'],
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
                    title: {
                        en: "",
                        th: ""
                    },
                    theme: {
                        text: {
                            css: ""
                        }
                    },
                    image: {
                        l: "/assets/image/page-smyth-kaset/banner/kaset.png",
                        s: "/assets/image/page-smyth-kaset/banner/kaset_m.png"
                    }
                },{
                    title: {
                        en: "",
                        th: ""
                    },
                    theme: {
                        text: {
                            css: ""
                        }
                    },
                    image: {
                        l: "/assets/image/page-smyth-kaset/banner/kaset.png",
                        s: "/assets/image/page-smyth-kaset/banner/kaset_m.png"
                    }
                },{
                    title: {
                        en: "",
                        th: ""
                    },
                    theme: {
                        text: {
                            css: ""
                        }
                    },
                    image: {
                        l: "/assets/image/page-smyth-kaset/banner/kaset.png",
                        s: "/assets/image/page-smyth-kaset/banner/kaset_m.png"
                    }
                }];
                const templateResponse = await axios.get('/page/smyth/smyth-content-page/kaset-nawamin/component/banner/template.html');
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
                                .replace(/{{slide.title}}/g, data.title[lang])
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

            // gsap.registerPlugin(ScrollTrigger);
            // gsap.to(".banner .swiper-slide .img", {
            //     y: "+=50",
            //     scrollTrigger: {
            //         trigger: ".banner .swiper-slide .img",
            //         start: "top top",
            //         scrub: 1
            //     }
            // });
                gsap.to("#parallax-img", {
                    yPercent: 30,  // Move the image 30% downwards based on scroll
                    ease: "none",  // No easing to make it linear
                    scrollTrigger: {
                        trigger: "#parallax-img",  // Element that will trigger the animation
                        start: "top bottom",  // Start when the top of the image reaches the bottom of the viewport
                        end: "bottom top",  // End when the bottom of the image reaches the top of the viewport
                        scrub: true,  // Smoothly scrubs the animation to the scroll position
                    },
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

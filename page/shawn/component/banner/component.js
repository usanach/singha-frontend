// Define the Header component
const BannerComponent = defineComponent({
    name: 'BannerComponent',
    template: `<section class="banner onview" v-html="template" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear" data-section="property_introduction"></section>`,

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
                        en: "CRAFT YOUR TALE",
                        th: "CRAFT YOUR TALE"
                    },
                    button: {
                        en: "See all locations​",
                        th: "ดูโครงการทั้งหมด​"
                    },
                    theme: {
                        text: {
                            css: ""
                        }
                    },
                    image: {
                        l: "/assets/image/page-shawn-panya/banner/shawn-logo.png",
                        s: "/assets/image/page-shawn-panya/banner/shawn-logo.png"
                    }
                },{
                    title: {
                        en: "CRAFT YOUR TALE",
                        th: "CRAFT YOUR TALE"
                    },
                    button: {
                        en: "See all locations​",
                        th: "ดูโครงการทั้งหมด​"
                    },
                    theme: {
                        text: {
                            css: ""
                        }
                    },
                    image: {
                        l: "/assets/image/page-shawn-panya/banner/shawn-logo.png",
                        s: "/assets/image/page-shawn-panya/banner/shawn-logo.png"
                    }
                },{
                    title: {
                        en: "CRAFT YOUR TALE",
                        th: "CRAFT YOUR TALE"
                    },
                    button: {
                        en: "See all locations​",
                        th: "ดูโครงการทั้งหมด​"
                    },
                    theme: {
                        text: {
                            css: ""
                        }
                    },
                    image: {
                        l: "/assets/image/page-shawn-panya/banner/shawn-logo.png",
                        s: "/assets/image/page-shawn-panya/banner/shawn-logo.png"
                    }
                }];
                const templateResponse = await axios.get('/page/shawn/component/banner/template.html');
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
                                .replace(/{{slide.button}}/g, data.button[lang])
                                .replace(/{{slide.title}}/g, data.title[lang])
                        }).join("")
                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        
        const smoothScrollWithOffset = (target) => {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - 50; // Adjust by 50px
                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth',
                });
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

            const anchorLinks = document.querySelectorAll('a[href^="#"]');
            anchorLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#') && href.length > 1) {
                        e.preventDefault(); // Prevent default anchor behavior
                        smoothScrollWithOffset(href);
                    }
                });
            });
            var heroBannerPagingSwiper = new Swiper(".banner .mySwiper", {
                pagination: {
                    el: ".banner .mySwiper .page-number",
                    type: "fraction",
                },
            });
            heroBannerSwiper.controller.control = heroBannerPagingSwiper;

            gsap.registerPlugin(ScrollTrigger);
            // gsap.to(".banner .swiper-slide .img", {
            //     y: "+=50",
            //     scrollTrigger: {
            //         trigger: ".banner .swiper-slide .img",
            //         start: "top top",
            //         scrub: 1
            //     }
            // });
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

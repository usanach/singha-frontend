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
                        l: "/assets/image/page-smyth-home/banner/SMYTHS_RAMINTRA_TIVE-02_P.png",
                        s: "/assets/image/page-smyth-home/banner/SMYTHS_RAMINTRA_TIVE-02_P_mobile.png"
                    }
                }];
                const templateResponse = await axios.get('/page/smyth/component/banner/template.html');
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

            gsap.registerPlugin(ScrollTrigger);
            gsap.to(".banner .swiper-slide .img", {
                y: "+=50",
                scrollTrigger: {
                    trigger: ".banner .swiper-slide .img",
                    start: "top top",
                    scrub: 1
                }
            });
            
            ScrollTrigger.create({
                trigger: "body",
                pin: "#header .wrapper",
                start: "top top",
                pinSpacing: false,
                scrub: 1,
            });
            ScrollTrigger.create({
                trigger: "body",
                start: "+=70 top",
                scrub: 1,
                onUpdate: (self) => {
                    if (self.progress > 0) {
                        document.querySelector('.header-bg .bg-custom').classList.add('!opacity-80');
                        // document.querySelector('.header-bg').classList.remove('bg-[#1A2F4D]');
                        document.querySelector('.header-bg .animate-h').classList.add('md:h-[70px]');
                        document.querySelector('.header-bg .animate-h').classList.remove('md:h-[60px]');
                    } else {
                        // document.querySelector('.header-bg').classList.add('bg-[#1A2F4D]');
                        // document.querySelector('.header-bg').classList.remove('bg-[#1A2F4D]/75');
                        document.querySelector('.header-bg .bg-custom').classList.remove('!opacity-80');
                        document.querySelector('.header-bg .animate-h').classList.remove('md:h-[70px]');
                        document.querySelector('.header-bg .animate-h').classList.add('md:h-[60px]');
                    }
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

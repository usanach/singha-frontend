
// Define the Header component
const VideoBannerComponent = defineComponent({
    name: 'VideoBannerComponent',
    template: `<section class="pin-hero-banner lg:pt-14 pt-10" v-html="template"></section>`,

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
                    en: "PROPERTY <br/> COLLECTIONS",
                    th: "PROPERTY <br/> COLLECTIONS"
                }
                const detail = {
                    en: "",
                    th: ""
                }
                const swipeData = [{
                    brands: "SIRANINN RESIDENCES",
                    title: "TRUE LEGACY LIVES NOW​​",
                    detail: "",
                    video: "/assets/image-new/vdo/16_9 L 45S.mp4",
                    thumb: "/assets/image-new/Collection-teaser/House.png"
                }, {
                    brands: "THE EXTRO",
                    title: "LIVE EXTRA SELF",
                    detail: "",
                    video: "/assets/image-new/vdo/Story 2_6.mp4",
                    thumb: "/assets/image-new/Collection-teaser/Condo.png"
                }];
                const templateResponse = await axios.get('/page/collection/component/videoBanner/template.html');
                let templateContent = templateResponse.data;
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
                    .replace(/{{title}}/g, lang == 'en' ? title['en'] : title['th'])
                    .replace(/{{detail}}/g, lang == 'en' ? detail['en'] : detail['th'])
                    .replace(/{{#cover.slide}}([\s\S]*?){{\/cover.slide}}/, (match, slide) => {
                        return swipeData.map((data, i) => {
                            return slide
                                .replace(/{{cover.slide.vdo}}/g, data.video)
                                .replace(/{{cover.slide.index}}/g, i)
                        }).join("")
                    })
                    .replace(/{{#detail.slide}}([\s\S]*?){{\/detail.slide}}/, (match, slide) => {
                        return swipeData.map((data, i) => {
                            return slide
                                .replace(/{{detail.slide.thumb}}/g, data.thumb)
                                .replace(/{{detail.slide.vdo}}/g, data.video)
                                .replace(/{{detail.slide.title}}/g, data.title)
                                .replace(/{{detail.slide.detail}}/g, data.detail)
                                .replace(/{{detail.slide.brands}}/g, data.brands)
                                .replace(/{{detail.slide.index}}/g, i)
                        }).join("")
                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        const init = () => {
            AOS.init();
            // SmoothScroll({ stepSize: 20 })
            if (window.innerWidth > 1024) {
                ScrollTrigger.create({
                    trigger: ".pin-hero-banner",
                    pin: ".pin-hero-banner",
                    start: "top top",
                    pinSpacing: false,
                    // markers:true,
                    scrub: 1,
                });
            }
            var bannerSwipe = new Swiper(".banner-swipe", {
                loop: true,
                allowTouchMove: false,
                watchSlidesProgress: true,
            })

            var bannerDetailSwipe = new Swiper(".banner-detail-swipe", {
                loop: true,
                pagination: {
                    el: ".banner-detail-swipe .custom-pagination-square",
                    clickable: true
                },
                thumbs: {
                    swiper: bannerSwipe,
                },
                on: {
                    init: (e) => {
                          
                        // document.querySelector(`#hero-slide-vdo-${e.activeIndex}`).play();
                        document.querySelector(`#hero-slide-cover-vdo-${e.activeIndex}`).play();
                        document.querySelector(`#hero-slide-cover-vdo-${e.activeIndex}`).addEventListener("timeupdate", (event) => {
                            totalLength = document.querySelector("#hero-slide-cover-vdo-" + e.realIndex).duration % 60;
                            // totalLength = 5;
                            percentageCompleted = (document.querySelector("#hero-slide-cover-vdo-" + e.realIndex).currentTime / totalLength) * 100;

                            if (percentageCompleted < 100) {
                                document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', percentageCompleted + "%")
                            } else {
                                document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', 0 + "%")
                                bannerDetailSwipe.slideNext();
                            }
                        });
                    },
                    slideChangeTransitionStart: (e) => {
                        var collectionVdo = document.querySelectorAll('video');
                        for (let index = 0; index < collectionVdo.length; index++) {
                            const element = collectionVdo[index];
                            element.currentTime = 0;
                        }
                    },
                    slideChangeTransitionEnd: (e) => {
                        // document.querySelector(`#hero-slide-vdo-${e.activeIndex}`).play();
                        document.querySelector(`#hero-slide-cover-vdo-${e.activeIndex}`).play();
                        document.querySelector(`#hero-slide-cover-vdo-${e.activeIndex}`).addEventListener("timeupdate", (event) => {
                            totalLength = document.querySelector("#hero-slide-cover-vdo-" + e.realIndex).duration % 60;
                            // totalLength = 5;
                            percentageCompleted = (document.querySelector("#hero-slide-cover-vdo-" + e.realIndex).currentTime / totalLength) * 100;

                            if (percentageCompleted < 100) {
                                document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', percentageCompleted + "%")
                            } else {
                                document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', 0 + "%")
                                bannerDetailSwipe.slideNext();
                            }
                        });
                    },
                },
            });
        }
        onMounted(async () => {
            language.value = getLanguageFromPath();
            await loadTemplate(language.value);

            nextTick(() => {
                init();  // ScrollTrigger is initialized after template is loaded and DOM is updated
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth' // Optional: Use 'auto' for an instant scroll
                      });
                }, 1000);
            });
        });

        return { template, language };
    }
});

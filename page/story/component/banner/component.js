let hightLightSwipe = null;


const BannerComponent = defineComponent({
    name: 'BannerComponent',
    template: `<div class="section-1-trigger" v-html="template"></div>`,

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
                    en: "HIGHLIGHT STORIES",
                    th: "HIGHLIGHT STORIES"
                }
                const detail = {
                    en: "Discover personalized insights for a more fulfilling lifestyle.​",
                    th: "อัพเดตเรื่องน่ารู้ เติมเต็มไลฟ์สไตล์​​",
                }
                const templateResponse = await axios.get('/page/story/component/banner/template.html');
                let templateContent = templateResponse.data;
                let specificIndex = [3,5,1];
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "font-['Cinzel']")
                    .replace(/{{title}}/g, lang == 'en' ? title['en'] : title['th'])
                    .replace(/{{detail}}/g, lang == 'en' ? detail['en'] : detail['th'])
                    .replace(/{{#story.slide}}([\s\S]*?){{\/story.slide}}/, (match, slide) => {
                        // return articleData.filter((data, i)=> i==3 || i==5 || i==1).map((data, i) => {
                        return specificIndex.map((data, i) => {
                            const data = articleData[index];
                            return slide
                                .replace(/{{story.slide.link}}/g,  data.url[lang])
                                .replace(/{{story.slide.thumb}}/g, data.thumb)
                                .replace(/{{story.slide.topic}}/g, data.topic)
                                .replace(/{{story.slide.title}}/g, data.title)
                                .replace(/{{story.slide.index}}/g, i)
                                .replace(/{{story.slide.description}}/g, data.description)
                                .replace(/{{story.slide.delay}}/g, (i + 1) * 200)
                        }).join("")
                    })
                    .replace(/{{#story.list}}([\s\S]*?){{\/story.list}}/, (match, slide) => {
                        // return articleData.filter((data, i)=> i==3 || i==5 || i==1).map((data, i) => {
                        return specificIndex.map((data, i) => {
                            const data = articleData[index];
                            const border = i > 0 ? "text-black/40 border-black/40" : "text-black  border-black"
                            return slide
                                .replace(/{{story.list.link}}/g, data.url[lang])
                                .replace(/{{story.list.thumb}}/g, data.thumb)
                                .replace(/{{story.list.topic}}/g, data.topic)
                                .replace(/{{story.list.title}}/g, data.title)
                                .replace(/{{story.list.index}}/g, i)
                                .replace(/{{story.list.description}}/g, data.description)
                                .replace(/{{story.list.delay}}/g, (i + 1) * 200)
                                .replace(/{{story.list.delay2}}/g, (i + 1.5) * 200)
                                .replace(/{{story.list.border}}/g, border)
                        }).join("")
                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };

        const init = () => {
            AOS.init();
            hightLightSwipe = new Swiper(".highlight-story-slide", {
                allowTouchMove: false,
                effect: "fade",
                autoplay: {
                    delay: 5000,
                },
                pagination: {
                    el: ".highlight-story-slide .custom-pagination-square",
                    clickable: true
                },
            });
            hightLightSwipe.on('slideChange', function () {
                const lists = document.querySelectorAll(`#highlight_list [data-slide]`);
                for (let index = 0; index < lists.length; index++) {
                    if (index == hightLightSwipe.realIndex) {
                        const element = lists[index];
                        element.classList.add('text-black');
                        element.classList.add('border-black');
                        element.classList.remove('text-black/40');
                        element.classList.remove('border-black/40');

                    } else {
                        const element = lists[index];
                        element.classList.remove('text-black');
                        element.classList.remove('border-black');
                        element.classList.add('text-black/40');
                        element.classList.add('border-black/40');
                    }
                }

                // Do something when slide changes
            });
            let st = ScrollTrigger.create({
                trigger: ".addon-tap-pin",
                pin: ".addon-tap-pin img",
                start: "top top",
                pinSpacing: false,
                scrub: 1
            });
            gsap.to(".section-1-trigger",
                {
                    y: 200,
                    opacity: 0,
                    ease: "linear",
                    scrollTrigger: {
                        trigger: ".section-1-trigger", // Element that triggers the animation
                        start: "top top",    // Start when the top of the element hits 80% of the viewport
                        scrub: 1,            // Animates as you scroll (smooth transition)
                    },
                })
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

function highlightSelect(ev) {
    var tracking = {
        event: "click_highlight_stories",
        landing_page: landing_page,
        section: "highlight_stories",
        event_action: "click",
        article_name: ev.dataset["article_title"]
    }
    if (hightLightSwipe) {
        hightLightSwipe.slideTo(ev.dataset["slide"]);
    }
    
    setDataLayer(tracking);
}
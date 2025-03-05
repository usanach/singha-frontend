// Define the Header component
const Article10Component = defineComponent({
    name: 'Article10Component',
    template: `<section class="article-10" v-html="template"></section>`,

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
                const templateResponse = await axios.get('/page/story/detail/component/component10/template.html');
                let templateContent = templateResponse.data;
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "font-['Cinzel']")
                    .replace(/{{title}}/g, lang == 'en' ? "ARTICLES RECOMMENDATION" : "บทความเกี่ยวข้อง​")
                    .replace(/{{more}}/g, lang == 'en' ? "Explore more" : "อ่านต่อ​")
                    .replace(/{{#article.item}}([\s\S]*?){{\/article.item}}/, (match, item) => {

                        const list = []
                          list[0] = articleData[0];
                          list[1] = articleData[1];
                          list[2] = articleData[2];
                        

                        return list.map((c, i) => {
                            return item.replace(/{{article.item.recomended.l}}/g, c.recomended.m)
                                .replace(/{{article.item.recomended.s}}/g, c.recomended.s)
                                .replace(/{{article.item.topic}}/g, c.topic)
                                .replace(/{{article.item.title}}/g, c.title.slice(0,50)+"...")
                                .replace(/{{article.item.url}}/g, c.url[lang])
                        }).join("")

                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };


        const init = () => {
            AOS.init();

            gsap.registerPlugin(ScrollTrigger);

            let article10titleTextWrapper = document.querySelector('.article-10 .title-text-wrapper');
            gsap.from(article10titleTextWrapper, {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.4,
                scrollTrigger: {
                    trigger: article10titleTextWrapper,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    once: true
                }
            });

            let article10campaignDetailArticlesRecommendationWrapper = document.querySelector('.article-10 .campaign-detail-articlesRecommendation-wrapper');
            gsap.from(article10campaignDetailArticlesRecommendationWrapper.children, {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.4,
                scrollTrigger: {
                    trigger: article10campaignDetailArticlesRecommendationWrapper.children,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    once: true
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

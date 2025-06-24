// Define the Header component
const BannerComponent = defineComponent({
    name: 'BannerComponent',
    template: `<section class="banner-wrapper" v-html="template"></section>`,

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
                const templateResponse = await axios.get('/page/story/detail/component/banner/template.html');
                let templateContent = templateResponse.data;
                const res = await axios.get('/data/article.json');

                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "font-['Cinzel']")
                    .replace(/{{#banner}}([\s\S]*?){{\/banner}}/, (match, item) => {
                        return res.data.filter((d, i) => {
                            return d.url[lang] == window.location.pathname;
                        }).map((d, i) => {
                            return item
                                .replace(/{{banner.image.s}}/g, d.banner.s)
                                .replace(/{{banner.image.l}}/g, d.banner.l)
                                .replace(/{{banner.date}}/g, d.date)
                                .replace(/{{banner.title}}/g, d.title)
                        }).join("")
                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };


        const init = () => {
            AOS.init();
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

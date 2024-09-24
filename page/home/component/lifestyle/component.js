// Define the Header component
const LifestyleComponent = defineComponent({
    name: 'LifestyleComponent',
    template: `<section v-html="template"></section>`,

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
                    en: "ELEVATE YOUR LIFESTYLE ",
                    th: "เติมเต็มไลฟ์สไตล์ของคุณ"
                }
                const detail = {
                    en: `BY OUR STORIES​`,
                    th: `ผ่านโครงการของเรา​`
                }
                const more = {
                    th: "อ่านต่อ​",
                    en: "Explore more"
                }
                const data = [];
                const templateResponse = await axios.get('/page/home/component/lifestyle/template.html');
                let templateContent = templateResponse.data;

                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, lang == 'en' ? title['en'] : title['th'])
                    .replace(/{{detail}}/g, lang == 'en' ? detail['en'] : detail['th'])
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
                    .replace(/{{more}}/g, lang == 'en' ? more['en'] : more['th'])
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
                init();
            })
        });

        return { template, language };
    }
});

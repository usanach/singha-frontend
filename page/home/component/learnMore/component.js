// Define the Header component
const LearnMoreComponent = defineComponent({
    name: 'LearnMoreComponent',
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
                    en: "LEARN MORE ABOUT SINGHA ESTATE​",
                    th: "รู้จัก สิงห์ เอสเตท ​Entrusted and Value Enricher ​​"
                }
                const detail = {
                    en: `Entrusted and value enricher​<br/> To develop and manage Singha Estate’s balanced and well diversified portfolio with high professional standards. Thus, delivering best-in-class products and services to enhance great customer experience with unparalleled value proposition. The Company strives to achieve all this without compromising on the integrity of its code of business conduct under good corporate governance principles, ensuring fair treatment of all stakeholders, taking into consideration the community, social and environmental wellbeing, in quest of sustainable growth.​​`,
                    th: `ภายใต้วิสัยทัศน์ในการมุ่งมั่นสร้างคุณค่าและการเติบโตที่ยั่งยืน   คือการทำงานที่เรายึดมั่นและผลักดัน ให้เราเป็นบริษัทผู้พัฒนาอสังหาริมทรัพย์และการลงทุนระดับสากล ที่มุ่งสร้างธุรกิจและพัฒนาโครงการพร้อมการบริการอย่างมืออาชีพชั้นเลิศ ด้วยความมุ่งมั่นสร้างการเติบโตที่ยั่งยืน รับผิดชอบต่อสังคมบนหลักธรรมภิบาลที่ดีงามและส่งมอบคุณค่านี้จากรุ่นสู่รุ่นได้เต็มภาคภูมิ`
                }
                const more = {
                    th: "อ่านต่อ​",
                    en: "Explore more"
                }

                const data = [];
                const templateResponse = await axios.get('/page/home/component/learnMore/template.html');
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

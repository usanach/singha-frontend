
const ContentComponent = defineComponent({
    name: 'ContentComponent',
    template: `<section class="content-trigger-pin" v-html="template"></section>`,

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
                    en: "อัพเดตเรื่องน่ารู้ เติมเต็มไลฟ์สไตล์​​",
                    th: "อัพเดตเรื่องน่ารู้ เติมเต็มไลฟ์สไตล์​​",
                }
                const templateResponse = await axios.get('/page/story/component/content/template.html');
                let templateContent = templateResponse.data;

                let dataSet = new Array();
                let start = 0;

                for (let index = 0; index < parseInt(articleData.length / 3); index++) {
                    dataSet.push(articleData.slice(start, start + 3));
                    start += 3;
                }
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{more}}/g, lang=="en"?"Explore more":"อ่านต่อ​")
                    .replace(/{{#content}}([\s\S]*?){{\/content}}/, (match, content) => {
                        return dataSet.map((data, i) => {
                            return content
                                .replace(/{{#content.list.small}}([\s\S]*?){{\/content.list.small}}/, (match, list) => {
                                    return data.slice(0, 2).map((c, index) => {
                                        return list
                                            .replace(/{{content.list.small.thumb}}/g, c.thumb)
                                            .replace(/{{content.list.small.topic}}/g, c.topic)
                                            .replace(/{{content.list.small.title}}/g, c.title)
                                            .replace(/{{content.list.small.cate}}/g, c.cate)
                                            .replace(/{{content.list.small.date}}/g, c.date)
                                            .replace(/{{content.list.small.description}}/g, c.description.slice(0, 100))
                                    }).join("")
                                })
                                .replace(/{{#content.list.large}}([\s\S]*?){{\/content.list.large}}/, (match, list) => {
                                    return data.slice(2, 3).map((c, index) => {
                                        return list
                                            .replace(/{{content.list.large.thumb}}/g, c.thumb)
                                            .replace(/{{content.list.large.topic}}/g, c.topic)
                                            .replace(/{{content.list.large.title}}/g, c.title)
                                            .replace(/{{content.list.large.cate}}/g, c.cate)
                                            .replace(/{{content.list.large.date}}/g, c.date)
                                            .replace(/{{content.list.large.description}}/g, c.description.slice(0, 100))
                                    }).join("")
                                })
                        }).join("")
                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };

        const setContentPageNumber = async (lang) => {
            const div = document.querySelector(".pagination p")
            div.innerHTML = `<span>${articleData.length}</span> ${lang == 'en' ? "contents" : "เรื่องน่าสนใจ"} <span class="text-white/50">(${parseInt(articleData.length / 3) * 3}/${articleData.length})</span>`;
            // div.innerHTML = `<span>${articleData.length}</span> contents `;
        }
        const init = async () => {
            await setContentPageNumber(language.value);
            AOS.init(
                // { once: true }
            );
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

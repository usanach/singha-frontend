
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
                let n = 0;
                let start = 0;

                for (let index = 0; index < (articleData.length / 3); index++) {
                    dataSet.push(articleData.slice(n, n + 3));
                    n += 3;
                }
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{more}}/g, lang == "en" ? "Explore more" : "อ่านต่อ​")
                    .replace(/{{#content}}([\s\S]*?){{\/content}}/, (match, content) => {
                        return dataSet.map((data, i) => {
                            let flex = i % 2 == 0 ? "lg:flex-row-reverse" : "lg:flex-row";
                            let w = i % 2 == 0 ? "w-[90%]" : "w-full";
                            let show = i < 2 ? "" : "hidden";
                            return content
                                .replace(/{{#content.list.small}}([\s\S]*?){{\/content.list.small}}/, (match, list) => {
                                    return data.slice(1, 3).map((c, index) => {
                                        return list
                                            .replace(/{{content.list.small.link}}/g, c.url[lang])
                                            .replace(/{{content.list.small.thumb}}/g, c.thumb)
                                            .replace(/{{content.list.small.topic}}/g, c.topic)
                                            .replace(/{{content.list.small.title}}/g, c.title)
                                            .replace(/{{content.list.small.cate}}/g, c.cate)
                                            .replace(/{{content.list.small.date}}/g, c.date)
                                            .replace(/{{content.list.small.description}}/g, c.description.slice(0, 100))
                                    }).join("")
                                })
                                .replace(/{{#content.list.large}}([\s\S]*?){{\/content.list.large}}/, (match, list) => {
                                    return data.slice(0, 1).map((c, index) => {
                                        return list
                                            .replace(/{{content.list.large.link}}/g, c.url[lang])
                                            .replace(/{{content.list.large.thumb}}/g, c.thumb)
                                            .replace(/{{content.list.large.topic}}/g, c.topic)
                                            .replace(/{{content.list.large.title}}/g, c.title)
                                            .replace(/{{content.list.large.cate}}/g, c.cate)
                                            .replace(/{{content.list.large.date}}/g, c.date)
                                            .replace(/{{content.list.large.description}}/g, c.description.slice(0, 100))
                                    }).join("")
                                })
                                .replace(/{{content.flex}}/, flex)
                                .replace(/{{content.w}}/, w)
                                .replace(/{{content.show}}/, show)
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

const expandMore = (btn) => {
    const li = document.querySelectorAll('#content_list li');
    li.forEach(e => {
        e.classList.remove('hidden')
    })

    const path = window.location.pathname;
    const match = path.match(/\/(th|en)(\/|$)/);
    const lang = match ? match[1] : 'th';

    const div = document.querySelector(".pagination p")
    div.innerHTML = `<span>${articleData.length}</span> ${lang == 'en' ? "contents" : "เรื่องน่าสนใจ"} <span class="text-white/50">(${articleData.length}/${articleData.length})</span>`;

    btn.classList.add('hidden')
    ScrollTrigger.refresh();
}
function selectArticle(ev) {
    var tracking = {
        event: "click_content",
        landing_page: landing_page,
        section: "content_container",
        event_action: "click",
        article_name: ev.dataset["article_title"]
    }
    console.log(tracking);

    setDataLayer(tracking);
}
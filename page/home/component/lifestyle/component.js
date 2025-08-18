// Define the Header component
const LifestyleComponent = defineComponent({
    name: 'LifestyleComponent',
    template: `<section v-html="template" id="lifeStyle"></section>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        // Function to format date according to language
        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            if (language.value === 'en') {
                return new Intl.DateTimeFormat('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                }).format(date);
            } else {
                const thMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
                const day = date.getDate();
                const month = thMonths[date.getMonth()];
                const year = date.getFullYear();
                return `${day} ${month} ${year+ 543}`;
            }
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
                    th: "ดูเพิ่มเติม​",
                    en: "Explore more"
                }
                const templateResponse = await axios.get('/page/home/component/lifestyle/template.html');
                let templateContent = templateResponse.data;
                const res = await axios.get('/data/article.json');
                const articleData = res.data;
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, lang == 'en' ? title['en'] : title['th'])
                    .replace(/{{detail}}/g, lang == 'en' ? detail['en'] : detail['th'])
                    .replace(/{{font}}/g, lang == 'en' ? "font-['SinghaEstate']" : "")
                    .replace(/{{more}}/g, lang == 'en' ? more['en'] : more['th'])
                    .replace(/{{#lifstyle.large}}([\s\S]*?){{\/lifstyle.large}}/, (match, large) => {
                        return articleData.filter((d, i) => i == 0).map((a, i) => {
                            return large
                                .replace(/{{lifstyle.large.l}}/g, a.lifestyle.l)
                                .replace(/{{lifstyle.large.topic}}/g, a.topic)
                                .replace(/{{lifstyle.large.cate}}/g, a.cate)
                                .replace(/{{lifstyle.large.title}}/g, a.title)
                                .replace(/{{lifstyle.large.date}}/g, formatDate(a.date))
                                .replace(/{{lifstyle.large.link}}/g, a.url[lang])
                        }).join("")
                    })
                    .replace(/{{#lifstyle.small}}([\s\S]*?){{\/lifstyle.small}}/, (match, small) => {
                        let set = []
                        articleData.filter((d, i) => i == 3).map((a, i) => {
                            set.push(a);
                        })
                        articleData.filter((d, i) => i == 4).map((a, i) => {
                            set.push(a);
                        })
                        articleData.filter((d, i) => i == 1).map((a, i) => {
                            set.push(a);
                        })

                        return set.map(a => {
                            return small
                                .replace(/{{lifstyle.small.l}}/g, a.lifestyle.s)
                                .replace(/{{lifstyle.small.topic}}/g, a.topic)
                                .replace(/{{lifstyle.small.cate}}/g, a.cate)
                                .replace(/{{lifstyle.small.title}}/g, a.title.replace('<br/>', ""))
                                .replace(/{{lifstyle.small.date}}/g, formatDate(a.date))
                                .replace(/{{lifstyle.small.link}}/g, a.url[lang])
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
                init();
            })
        });

        return { template, language };
    }
});

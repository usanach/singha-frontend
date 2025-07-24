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
                                .replace(/{{banner.date}}/g, formatDate(d.date))
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

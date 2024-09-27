
const getPath = () => {
    const url = window.location.href;
    const urlObj = new URL(url);

    // Get the pathname
    const pathname = urlObj.pathname;

    // Split the pathname into parts
    const pathParts = pathname.split('/').filter(part => part);

    // Convert to parameters
    const params = {};
    for (let i = 0; i < pathParts.length; i++) {
        params[`param${i + 1}`] = decodeURIComponent(pathParts[i]);
    }
    return {
        campaign: params['param3'],
    }
}
const socialClick = () => {
    if (document.getElementById('social-mobile') !== null) {
        console.log('true');
        let socialMobileElements = document.querySelectorAll('.social-mobile-block:not(:first-child)'); // Select all except the first

        for (let i = 0; i < socialMobileElements.length; i++) {
            if (socialMobileElements[i].style.opacity === '1') {
                socialMobileElements[i].style.opacity = 0;
                socialMobileElements[i].style.marginBottom = '-100px';
                socialMobileElements[i].style.zIndex = 0;
            } else {
                socialMobileElements[i].style.opacity = 1;
                socialMobileElements[i].style.marginBottom = '0';
                socialMobileElements[i].style.zIndex = 65;
            }
        }
        console.log('click');
    } else {
        console.log('false');
    }
}
// Create and mount the Vue app
createApp({
    components: {
        HeaderComponent,
        ContentComponent,
        FooterComponent,
    },

    data() {
        const campaing_show_detail_show_product = ref('')

        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const loadTemplate = async (lang) => {
            try {
                const lang = getLanguageFromPath();
                const dataset = await axios.get('/data/promotion.json');
                const data = await dataset.data;

                const temp = data.filter((d, i) => d.data.link == getPath().campaign).map(d => d.data.template);
                const datasets = data.filter((d, i) => d.data.link == getPath().campaign).map(d => d);

                campaing_show_detail_show_product.value = {
                    logo: data.filter((d, i) => d.data.link == getPath().campaign).map(d => d.data.logo),
                    image: data.filter((d, i) => d.data.link == getPath().campaign).map(d => d.data.detail.product.image),
                    url: data.filter((d, i) => d.data.link == getPath().campaign).map(d => d.data.detail.product.url[lang]),
                    detail: '"' + data.filter((d, i) => d.data.link == getPath().campaign).map(d => d.data.subtitle)[0] + '"',
                    more: getLanguageFromPath() == 'en'
                        ? "See the project"
                        : "เยี่ยมชมโครงการ ​​",
                }

            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        loadTemplate()
        return {
            font: getLanguageFromPath() == 'en' ? "font-['Cinzel']" : "!font-['IBMPlexSansThai']",
            lang: getLanguageFromPath(),
            articles: articleData.slice(0, 3),
            form_section: {
                project: getPath().campaign,
                title: getLanguageFromPath() == 'en'
                    ? "JOIN OUR ACTIVITY"
                    : "สัมผัสประสบการณ์ดี ๆ ด้วยกัน​",
                detail: getLanguageFromPath() == 'en'
                    ? "Register to join activity & receive exclusive information"
                    : "ลงทะเบียนเพื่อร่วมกิจกรรมและรับสิทธิพิเศษ"
            },
            campaing_show_detail_show_product: campaing_show_detail_show_product,
            campaign_detail_articlesRecommendation_section: {
                title: getLanguageFromPath() == 'en'
                    ? "ARTICLES RECOMMENDATION"
                    : "บทความเกี่ยวข้อง​​",
                more: getLanguageFromPath() == 'en'
                    ? "Explore more"
                    : "อ่านต่อ​",
            }
        };
    },
}).mount('#app');


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
FooterComponent,
    },

    data() {
        const template = ref('');
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
                console.log(datasets[0]);

                campaing_show_detail_show_product.value = {
                    logo: data.filter((d, i) => d.data.link == getPath().campaign).map(d => d.data.logo),
                    image: "/assets/image/estate_CampaignDetail/image.png",
                    detail: getLanguageFromPath() == 'en'
                        ? "Where legacies thrive in the crafted living spaces for their family completeness.​​"
                        : "ศิรนินทร์ เรสซิเดนเซส บ้านที่ออกแบบ…เพื่อการใช้ชีวิตของครอบครัวใหญ่ที่สมบูรณ์​​",
                    more: getLanguageFromPath() == 'en'
                        ? "See the project"
                        : "เยี่ยมชมโครงการ ​​",
                }

                document.title = datasets[0].data.title[lang] + " | " + datasets[0].data.subtitle;
                if (document.querySelector('meta[name="description"]')) {
                    document.querySelector('meta[name="description"]').setAttribute('content', datasets[0].data.description[lang]);
                }
                if (document.querySelector('meta[name="keywords"]')) {
                    document.querySelector('meta[name="keywords"]').setAttribute('content', datasets[0].data.title[lang]);
                }

                const templateResponse = await axios.get(temp[0]);
                let templateContent = templateResponse.data;
                template.value = templateContent
                    .replace(/{{campaign.title}}/g, () => datasets[0].data.title ? datasets[0].data.title[lang] : "")
                    .replace(/{{campaign.period}}/g, () => datasets[0].data.time.text ? datasets[0].data.time.text[lang] : "")
                    .replace(/{{campaign.room}}/g, () => datasets[0].data.detail.room ? datasets[0].data.detail.room[lang] : "")
                    .replace(/{{campaign.price}}/g, () => datasets[0].data.detail.price ? datasets[0].data.detail.price[lang] : "")
                    .replace(/{{campaign.discount}}/g, () => datasets[0].data.detail.discount ? datasets[0].data.detail.discount[lang] : "")
                    .replace(/{{campaign.subtitle}}/g, () => datasets[0].data.subtitle ? datasets[0].data.subtitle : "")
                    .replace(/{{campaign.image.l}}/g, () => datasets[0].data.image.l ? datasets[0].data.image.l : "")
                    .replace(/{{campaign.image.thumb}}/g, () => datasets[0].data.image.thumb ? datasets[0].data.image.thumb : "")
                    .replace(/{{campaign.remark.text}}/g, () => datasets[0].data.detail.remark ? lang == 'en' ? "Remarks:" : "หมายเหตุ:" : "")
                    .replace(/{{#campaign.remark.list}}([\s\S]*?){{\/campaign.remark.list}}/, (match, list) => {
                        return datasets[0].data.detail.remark ? datasets[0].data.detail.remark[lang].map((r, i) => {
                            return list
                                .replace(/{{campaign.remark.list.text}}/g, r)
                                .replace(/{{campaign.remark.list.index}}/g, i + 1)
                        }).join("") : ""
                    })
                    .replace(/{{campaign.remark.list.terms}}/g, lang == "en" ? "*Terms and conditions apply" : "*เงื่อนไขเป็นไปตามที่กำหนด")


            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        loadTemplate()
        return {
            font: getLanguageFromPath() == 'en' ? "font-['Cinzel']" : "!font-['IBMPlexSansThai']",
            template: template,
            articles: articleData.slice(0, 3),
            form_section: {
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

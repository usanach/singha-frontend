let promotionData;
// Define the Header component
const ContentComponent = defineComponent({
    name: 'ContentComponent',
    template: `
<section class="campaign-detail-section" v-html="template">
</section>`,

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
                const lang = getLanguageFromPath();
                const dataset = await axios.get('/data/promotion.json');
                const data = await dataset.data;

                const temp = data.filter((d, i) => d.data.link == getPath().campaign).map(d => d.data.template);
                const datasets = data.filter((d, i) => d.data.link == getPath().campaign).map(d => d);

                document.title = datasets[0].data.title[lang] + " | " + datasets[0].data.subtitle;
                if (document.querySelector('meta[name="description"]')) {
                    document.querySelector('meta[name="description"]').setAttribute('content', datasets[0].data.description[lang]);
                }
                if (document.querySelector('meta[name="keywords"]')) {
                    document.querySelector('meta[name="keywords"]').setAttribute('content', datasets[0].data.title[lang]);
                }
                const templateResponse = await axios.get(temp[0]);
                let templateContent = templateResponse.data;

                promotionData = {
                    name: datasets[0].data.title[lang],
                    start: "",
                    end: datasets[0].data.time.text[lang],
                    brand: datasets[0].data.brand,
                    label: "pre_sale",
                    type: datasets[0].data.type,
                    location: datasets[0].data.location,
                    price: datasets[0].data.detail.price[lang]
                }
                
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

        const init = () => {
            AOS.init();

            if (document.getElementById('social-mobile') !== null) {
                console.log('true');
                let socialMobileBtn = document.getElementById('social-mobile');
                let socialMobileElements = document.querySelectorAll('.social-mobile-block:not(:first-child)'); // Select all except the first

                socialMobileBtn.addEventListener('click', () => {
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
                });
            } else {
                console.log('false');
            }

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

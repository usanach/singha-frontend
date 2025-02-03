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

        const setOpenGraphMetaTag = (property, content) => {
            let metaTag = document.querySelector(`meta[property='${property}']`);

            // If the meta tag exists, update its content
            if (metaTag) {
                metaTag.setAttribute('content', content);
            } else {
                // If the meta tag does not exist, create a new one and append it to the head
                metaTag = document.createElement('meta');
                metaTag.setAttribute('property', property);
                metaTag.setAttribute('content', content);
                document.getElementsByTagName('head')[0].appendChild(metaTag);
            }
        }

        const loadTemplate = async (lang) => {
            try {
                const lang = getLanguageFromPath();
                const dataset = await axios.get('/data/promotion.json');
                const data = await dataset.data;

                const temp = data.filter((d, i) => d.data.link == getPath().campaign).map(d => d.data.template);
                const datasets = data.filter((d, i) => d.data.link == getPath().campaign).map(d => d);

                document.title = datasets[0].data.meta.title[lang] + " | " + datasets[0].data.meta.description[lang];

                if (document.querySelector('meta[name="description"]')) {
                    document.querySelector('meta[name="description"]').setAttribute('content', datasets[0].data.meta.description[lang]);
                }
                if (document.querySelector('meta[name="keywords"]')) {
                    document.querySelector('meta[name="keywords"]').setAttribute('content', datasets[0].data.meta.title[lang]);
                }

                setOpenGraphMetaTag('og:title', datasets[0].data.meta.title[lang]);
                setOpenGraphMetaTag('og:description', datasets[0].data.meta.description[lang]);
                setOpenGraphMetaTag('og:image', `${window.location.origin}${datasets[0].data.image.thumb}`);
                setOpenGraphMetaTag('og:url', window.location.href);

                const templateResponse = await axios.get(temp[0]);
                let templateContent = templateResponse.data;

                promotionData = {
                    promotion_start: datasets[0].data.time.start,
                    promotion_end: datasets[0].data.time.end,
                    promotion_name: datasets[0].data.campaign['en'],
                    property_type: datasets[0].data.type,
                }
                if (datasets[0].data.product != undefined) {
                    promotionData.property_brand = datasets[0].data.product.brands;
                    promotionData.project_label = datasets[0].data.product.label.toLowerCase().replace(/ /g, "_");
                    promotionData.property_location = datasets[0].data.product.location;
                    promotionData.property_price = datasets[0].data.product.price[lang];
                }
                const urlToShare = window.location.href; // Replace with the URL you want to share
                const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;

                // Example usage to set or update Open Graph tags
                // setOpenGraphMetaTag('og:title', datasets[0].data.title[lang] + " | " + datasets[0].data.subtitle);
                // setOpenGraphMetaTag('og:description', datasets[0].data.description[lang]);
                // setOpenGraphMetaTag('og:image', datasets[0].data.image.thumb);
                // setOpenGraphMetaTag('og:url', window.location.href);

                const imageUrl = datasets[0].data.image.thumb; // Replace with your image URL

                // Check if the user is on a mobile device
                const instagramShoreUrl = imageUrl;

                template.value = templateContent
                    .replace(/{{campaign.share.facebook}}/g, facebookShareUrl)
                    .replace(/{{campaign.period.icon}}/g, datasets[0].data.time.text == "" ? "hidden" : "")
                    .replace(/{{campaign.share.instagram}}/g, instagramShoreUrl)
                    .replace(/{{campaign.title}}/g, () => datasets[0].data.title ? datasets[0].data.title[lang] : "")
                    .replace(/{{campaign.period}}/g, () => datasets[0].data.time.text ? datasets[0].data.time.text[lang] : "")
                    .replace(/{{campaign.room}}/g, () => datasets[0].data.detail.room ? datasets[0].data.detail.room[lang] : "")
                    .replace(/{{campaign.price}}/g, () => datasets[0].data.detail.price ? datasets[0].data.detail.price[lang] : "")
                    .replace(/{{campaign.discount}}/g, () => datasets[0].data.detail.discount ? datasets[0].data.detail.discount[lang] : "")
                    .replace(/{{campaign.detail.title}}/g, () => datasets[0].data.detail.title ? datasets[0].data.detail.title[lang] : "")
                    .replace(/{{campaign.detail.detail}}/g, () => datasets[0].data.detail.detail[lang] ? datasets[0].data.detail.detail[lang] : "")
                    .replace(/{{campaign.subtitle}}/g, () => datasets[0].data.subtitle ? datasets[0].data.subtitle : "")
                    .replace(/{{campaign.meta.title}}/g, () => datasets[0].data.meta.title[lang] ? datasets[0].data.meta.title[lang] : "")
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
                    .replace(/{{#campaign.products}}([\s\S]*?){{\/campaign.products}}/, (match, list) => {
                        return datasets[0].data.detail.products ? datasets[0].data.detail.products.map((r, i) => {
                            return list
                                .replace(/{{campaign.products.type}}/g, r.type[lang])
                                .replace(/{{#campaign.products.items}}([\s\S]*?){{\/campaign.products.items}}/, (match, items) => {
                                    return r.items ? r.items.map((d, i) => {
                                        return items
                                            .replace(/{{campaign.products.items.alt}}/g, d.alt)
                                            .replace(/{{campaign.products.items.image}}/g, d.image)
                                            .replace(/{{campaign.products.items.logo}}/g, d.logo)
                                            .replace(/{{campaign.products.items.link}}/g, d.link[lang])
                                            .replace(/{{campaign.products.items.btn}}/g, lang == "th" ? "คลิกเพื่อรับสิทธิพิเศษ" : "Click for your privilege")
                                    }).join("") : ""
                                })
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
                pageLoad();
            });
        });

        return { template, language };
    }
});


const landing_page = "campaign_detal_page";

function pageLoad() {
    var tracking = {
        event: "view_promotion",
        landing_page: landing_page,
        section: "campaign_detal",
        event_action: "view",
        ...promotionData
    }
    // console.log(tracking);

    setDataLayer(tracking);
}
function socialMediaShare(ev) {
    var tracking = {
        event: "share_promotion",
        landing_page: landing_page,
        section: "campaign_detal",
        event_action: "share",
        button: ev.dataset["button"],
        ...promotionData
    }

    if (ev.dataset['button'] == "facebook") {
        window.open(ev.dataset['href'], '_blank', 'width=600,height=400');
    } else if (ev.dataset['button'] == "instagram") {

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            window.location.href = `instagram://library?AssetPath=${encodeURIComponent(ev.dataset['href'])}`;
        } else {
            console.log('Instagram sharing is only supported on mobile devices.');
        }
    } else {
        const currentUrl = window.location.href; // Get the current page URL

        // Copy the URL to the clipboard
        navigator.clipboard.writeText(currentUrl).then(() => {
            alert('URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy URL: ', err);
        });
    }
    setDataLayer(tracking);
}
function toProject(ev) {
    var tracking = {
        event: "view_project",
        landing_page: landing_page,
        section: "property_collection",
        event_action: "click",
        button: "see_the_project",
        promotion_name: promotionData.promotion_name,
        property_brand: promotionData.property_brand,
        project_label: promotionData.project_label,
        property_type: promotionData.property_type,
        property_location: promotionData.property_location,
        property_price: promotionData.property_price,
    }
    // console.log(tracking);

    setDataLayer(tracking);
    window.open(ev.dataset['href'], '_blank');
}
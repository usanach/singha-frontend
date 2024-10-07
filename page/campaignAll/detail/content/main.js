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
                const urlToShare = window.location.href; // Replace with the URL you want to share
                const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;

                // Example usage to set or update Open Graph tags
                setOpenGraphMetaTag('og:title', datasets[0].data.title[lang] + " | " + datasets[0].data.subtitle);
                setOpenGraphMetaTag('og:description', datasets[0].data.description[lang]);
                setOpenGraphMetaTag('og:image', datasets[0].data.image.thumb);
                setOpenGraphMetaTag('og:url', window.location.href);

                const imageUrl = datasets[0].data.image.thumb; // Replace with your image URL

                // Check if the user is on a mobile device
                const instagramShoreUrl = imageUrl;

                template.value = templateContent
                    .replace(/{{campaign.share.facebook}}/g, facebookShareUrl)
                    .replace(/{{campaign.share.instagram}}/g, instagramShoreUrl)
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
                pageLoad();
            });
        });

        return { template, language };
    }
});



function pageLoad() {
    var tracking = {
        event: "view_promotion",
        landing_page: landing_page,
        section: "campaign_detal",
        event_action: "view",
        promotion_name: promotionData.name,
        promotion_start: promotionData.start,
        promotion_end: promotionData.end,
        property_brand: promotionData.brand,
        project_label: promotionData.label,
        property_type: promotionData.type,
        property_location: promotionData.location,
        property_price: promotionData.price,
    }
    setDataLayer(tracking);
}
function socialMediaShare(ev) {
    var tracking = {
        event: "share_promotion",
        landing_page: landing_page,
        section: "campaign_detal",
        event_action: "share",
        button: ev.dataset["button"],
        promotion_name: promotionData.name,
        promotion_start: promotionData.start,
        promotion_end: promotionData.end,
        property_brand: promotionData.brand,
        project_label: promotionData.label,
        property_type: promotionData.type,
        property_location: promotionData.location,
        property_price: promotionData.price,
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
        promotion_name: promotionData.name,
        promotion_start: promotionData.start,
        promotion_end: promotionData.end,
        property_brand: promotionData.brand,
        project_label: promotionData.label,
        property_type: promotionData.type,
        property_location: promotionData.location,
        property_price: promotionData.price,
    }
    setDataLayer(tracking);
}
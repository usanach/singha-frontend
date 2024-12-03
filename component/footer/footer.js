
const FooterComponent = defineComponent({
    name: 'FooterComponent',
    template: `<section id="footer" v-html="template"></section>`,

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
                const dataset = await axios.get('/data/footer.json');
                const data = await dataset.data;
                let lang = getLanguageFromPath();

                const productData = await axios.get('/data/discovery.json');
                const products = await productData.data;

                const templateResponse = await axios.get('/component/footer/template.html');
                let templateContent = templateResponse.data;

                const follow = {
                    en: "Follow us on Social Media",
                    th: "ติดตาม Social Media"
                }
                const address = {
                    en: `SINGHA ESTATE <br>PUBLIC COMPANY LIMITED <br>SUNTOWERS Building B, 40th Floor, 
                        <br>123 Vibhavadi-Rangsit Road, Chom Phon, <br>Chatuchak, Bangkok 10900`,
                    th: `บริษัท สิงห์ เอสเตท จำกัด (มหาชน) <br> อาคารซันทาวเวอร์ส บี, ชั้น 40 เลขที่ 123 <span
                                class="text-nowrap">ถนนวิภาวดีรังสิต</span> <span class="text-nowrap">แขวงจอมพล</span>
                            เขตจตุจักร​ กรุงเทพมหานคร 10900`
                }
                const cookies = {
                    en: `We use cookies on this site to enhance your browsing experience and for marketing objectives, you can choose to
If you choose to decline, close this banner, or continue browsing, we will only process necessary cookies for website’s functionality.
To find out more about our cookies policy, please read our <a href="https://www.singhaestate.co.th/en/privacy-notice?_ga=2.208709083.818239197.1729073385-816229951.1729073385" class="underline">PRIVACY NOTICE</a>.`,
                    th: `บริษัทใช้งานคุกกี้ เพื่อมอบประสบการณ์การใช้งานเว็บไซต์ของบริษัทที่ดีขึ้น
            รวมถึงใช้ในการทำการตลาดได้ตรงตามความสนใจของท่านมากที่สุด โดยท่านสามารถเลือก
            หากท่านไม่ยอมรับ กดปิดข้อความนี้ หรือยังคงใช้งานเว็บไซต์ต่อไป
            บริษัทจะยังคงเก็บคุกกี้ที่มีความจำเป็นต่อการใช้งานเว็บไซต์ของท่านเท่านั้น
            ท่านสามารถเข้าไปศึกษารายละเอียดนโยบายคุกกี้ของบริษัทได้ที่ <a
                href="https://www.singhaestate.co.th/en/privacy-notice?_ga=2.208709083.818239197.1729073385-816229951.1729073385"
                class="underline">ประกาศความเป็นส่วนตัว</a>.`,
                    btn: {
                        decline: {
                            en: "Decline",
                            th: "ปฏิเสธคุกกี้"
                        },
                        accept: {
                            en: "Accept",
                            th: "ยอมรับ"
                        }
                    }
                }

                // Replace placeholders with actual data
                templateContent = templateContent
                template.value = templateContent
                    .replace(/{{follow.text}}/g, follow[lang])
                    .replace(/{{cookies.text}}/g, cookies[lang])
                    .replace(/{{cookies.btn.accept}}/g, cookies.btn.accept[lang])
                    .replace(/{{cookies.btn.decline}}/g, cookies.btn.decline[lang])
                    .replace(/{{address.text}}/g, address[lang])
                    .replace(/{{#section}}([\s\S]*?){{\/section}}/, (match, sectionsList) => {
                        return data.map((section, i) => {
                            return sectionsList
                                .replace(/{{#section.category}}([\s\S]*?){{\/section.category}}/, (match, categoryList) => {
                                    let cate = section.items
                                    return cate.map((cate, i) => {
                                        if (cate.items) {
                                            return categoryList
                                                .replace(/{{section.category.title}}/g, cate.title[lang])
                                                .replace(/{{section.category.pad}}/g, i > 0 ? 'lg:mt-[20px]' : '')
                                                .replace(/{{#section.category.list}}([\s\S]*?){{\/section.category.list}}/, (match, category) => {
                                                    return category
                                                        .replace(/{{#section.category.list.brands}}([\s\S]*?){{\/section.category.list.brands}}/, (match, brandList) => {
                                                            return cate.items.map((brand, i) => {
                                                                if (brand.url) {
                                                                    return brandList
                                                                        .replace(/{{#section.category.brands.link}}([\s\S]*?){{\/section.category.brands.link}}/, (match, brandTitle) => {
                                                                            return brandTitle
                                                                                .replace(/{{section.category.brands.title}}/g, brand.title[lang])
                                                                                .replace(/{{section.category.brands.link.url}}/g, brand.url[lang])
                                                                                .replace(/{{section.category.brands.link.price}}/g, brand.price)
                                                                                .replace(/{{section.category.brands.link.label}}/g, brand.label)
                                                                                .replace(/{{section.category.brands.link.location}}/g, brand.title[lang])
                                                                                .replace(/{{section.category.brands.link.type}}/g, cate.title[lang])
                                                                        }).replace(/{{#section.category.brands.list}}([\s\S]*?){{\/section.category.brands.list}}/, (match, brandList) => {
                                                                            return ""
                                                                        })
                                                                } else {
                                                                    return brandList
                                                                        .replace(/{{#section.category.brands.list}}([\s\S]*?){{\/section.category.brands.list}}/, (match, brandList) => {
                                                                            return brandList
                                                                                .replace(/{{section.category.brands.title}}/g, brand.title[lang])
                                                                                .replace(/{{#section.category.brands.link.sub}}([\s\S]*?){{\/section.category.brands.link.sub}}/, (match, subBrand) => {
                                                                                    return brand.items.map((sub, i) => {
                                                                                        return subBrand
                                                                                            .replace(/{{section.category.brands.link.sub.title}}/g, sub.title[lang])
                                                                                            .replace(/{{section.category.brands.link.sub.url}}/g, sub.url[lang])
                                                                                            .replace(/{{section.category.brands.link.sub.price}}/g, sub.price == "" ? "" : sub.price)
                                                                                            .replace(/{{section.category.brands.link.sub.location}}/g, sub.title[lang])
                                                                                            .replace(/{{section.category.brands.link.sub.label}}/g, sub.label)
                                                                                            .replace(/{{section.category.brands.link.type}}/g, cate.title[lang])
                                                                                    }).join("")
                                                                                })
                                                                        })
                                                                        .replace(/{{#section.category.brands.link}}([\s\S]*?){{\/section.category.brands.link}}/, (match, brandTitle) => {
                                                                            return ""
                                                                        })
                                                                }
                                                            }).join("")
                                                        })
                                                })
                                                .replace(/{{#section.category.link}}([\s\S]*?){{\/section.category.link}}/, "")
                                        } else {
                                            return categoryList
                                                .replace(/{{#section.category.list}}([\s\S]*?){{\/section.category.list}}/, "")
                                                .replace(/{{#section.category.link}}([\s\S]*?){{\/section.category.link}}/, (match, brandList) => {
                                                    return brandList
                                                        .replace(/{{section.category.title}}/g, cate.title[lang])
                                                        .replace(/{{section.category.link.url}}/g, cate.url[lang])

                                                })
                                        }
                                    }).join("")
                                })

                        }).join("")
                    })
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

function expandFooter(ev) {
    ev.classList.toggle('expanded');
}

function selectFooterSubHeader(ev) {
    var tracking = {
        event: "click_sub_header",
        landing_page: landing_page,
        section: "footer",
        event_action: "click",
    }
    ev.dataset["sub_header"] != undefined ? tracking.sub_header = ev.dataset["sub_header"] : "";

    let target = tracking.sub_header == ("แผนผังเว็บไซต์" || "SITEMAP") ? "_self" : "_blank"
    setDataLayer(tracking);
    window.open(ev.dataset['href'], target);

}
function selectFooterProperty(ev) {
    var tracking = {
        event: "select_property",
        landing_page: landing_page,
        section: "footer",
        event_action: "click",
    }
    tracking.property_brand = ev.dataset["property_brand"] != undefined ? ev.dataset["property_brand"] : "";
    tracking.project_label = ev.dataset["project_label"] != undefined ? ev.dataset["project_label"].toLowerCase().replace(/ /g, "_") : "";
    tracking.property_type = ev.dataset["property_type"] != undefined ? ev.dataset["property_type"] : "";
    tracking.property_location = ev.dataset["property_location"] != undefined ? ev.dataset["property_location"] : "";
    tracking.property_price = ev.dataset["property_price"] != undefined ? ev.dataset["property_price"] : "";

    // console.log(tracking);

    setDataLayer(tracking);
    window.open(ev.dataset['href'], '_blank');
}

// Function to set the cookie when user accepts
function acceptCookies() {
    document.cookie = "cookiesAccepted=true; path=/; max-age=31536000";
    hideCookieBanner();
}

// Function to check if cookies have already been accepted
function checkCookieConsent() {
    return document.cookie.split('; ').some(cookie => cookie.trim().startsWith('cookiesAccepted='));
}

// Function to hide the cookie banner
function hideCookieBanner() {
    if (document.getElementById('cookies')) {
        document.getElementById('cookies').style.display = 'none';
    }
}
// Check cookie consent status when the page loads
window.onload = function () {
    if (checkCookieConsent()) {
        hideCookieBanner();
    }
};
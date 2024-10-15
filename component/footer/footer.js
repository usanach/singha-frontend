
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

                // Replace placeholders with actual data
                templateContent = templateContent
                template.value = templateContent
                    .replace(/{{#section}}([\s\S]*?){{\/section}}/, (match, sectionsList) => {
                        return data.map((section, i) => {
                            return sectionsList
                                .replace(/{{#section.category}}([\s\S]*?){{\/section.category}}/, (match, categoryList) => {
                                    let cate = section.items
                                    return cate.map((cate,i) => {
                                        if (cate.items) {
                                            return categoryList
                                                .replace(/{{section.category.title}}/g, cate.title[lang])
                                                .replace(/{{section.category.margin}}/g,i >0 ? 'mt-[20px]':'')
                                                .replace(/{{#section.category.list}}([\s\S]*?){{\/section.category.list}}/, (match, category) => {
                                                    return category.replace(/{{#section.category.list.brands}}([\s\S]*?){{\/section.category.list.brands}}/, (match, brandList) => {
                                                        return cate.items.map(brand => {
                                                            if (brand.url) {
                                                                return brandList
                                                                    .replace(/{{#section.category.brands.link}}([\s\S]*?){{\/section.category.brands.link}}/, (match, brandTitle) => {
                                                                        return brandTitle
                                                                            .replace(/{{section.category.brands.title}}/g, brand.title[lang])
                                                                            .replace(/{{section.category.brands.link.url}}/g, brand.url[lang])
                                                                            .replace(/{{section.category.brands.link.price}}/g, brand.price)
                                                                            .replace(/{{section.category.brands.link.label}}/g, brand.label)
                                                                            .replace(/{{section.category.brands.link.location}}/g, brand.title[lang])
                                                                    }).replace(/{{#section.category.brands.list}}([\s\S]*?){{\/section.category.brands.list}}/, (match, brandList) => {
                                                                        return ""
                                                                    })
                                                            } else {
                                                                return brandList
                                                                    .replace(/{{#section.category.brands.list}}([\s\S]*?){{\/section.category.brands.list}}/, (match, brandList) => {
                                                                        return brandList
                                                                            .replace(/{{section.category.brands.title}}/g, brand.title[lang])
                                                                            .replace(/{{#section.category.brands.link.sub}}([\s\S]*?){{\/section.category.brands.link.sub}}/, (match, subBrand) => {
                                                                                return brand.items.map(sub => {
                                                                                    return subBrand
                                                                                        .replace(/{{#section.category.brands.link.sub.title}}/g, sub.title[lang])
                                                                                        .replace(/{{section.category.brands.link.sub.url}}/g, sub.url[lang])
                                                                                        .replace(/{{section.category.brands.link.sub.price}}/g, sub.price == "" ? "-" : sub.price)
                                                                                        .replace(/{{section.category.brands.link.sub.location}}/g, sub.title[lang])
                                                                                        .replace(/{{section.category.brands.link.sub.label}}/g, sub.label)
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
                                                .replace(/{{section.category.margin}}/g,'')
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
    
    setDataLayer(tracking);
    window.open(ev.dataset['href'], '_blank');

}
function selectFooterProperty(ev) {
    var tracking = {
        event: "select_property",
        landing_page: landing_page,
        section: "footer",
        event_action: "click",
    }
    ev.dataset["property_brand"] != undefined ? tracking.property_brand = ev.dataset["property_brand"] : "";
    ev.dataset["project_label"] != undefined ? tracking.project_label = ev.dataset["project_label"] : "";
    ev.dataset["property_type"] != undefined ? tracking.property_type = ev.dataset["property_type"] : "";
    ev.dataset["property_location"] != undefined ? tracking.property_location = ev.dataset["property_location"] : "";
    ev.dataset["property_price"] != undefined ? tracking.property_price = ev.dataset["property_price"] : "";
    setDataLayer(tracking);
    window.location.href = ev.dataset['href']
}

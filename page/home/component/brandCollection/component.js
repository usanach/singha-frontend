
// Define the Header component
const BrandCollectionComponent = defineComponent({
    name: 'BrandCollectionComponent',
    template: `<section v-html="template" id="BrandCollectionComponent" class="trigger-brand-collection"></section>`,
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
                    en: "OUR PROPERTIES <br/>BRAND COLLECTION ",
                    th: "<br/>แนะนำโครงการ​<br/>"
                }
                const brandData = await axios.get('/data/brand-collection.json');
                const data = await brandData.data;


                const templateResponse = await axios.get('/page/home/component/brandCollection/template.html');
                let templateContent = templateResponse.data;

                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{#projects}}([\s\S]*?){{\/projects}}/, (match, projects) => {
                        return data.map((data, i) => {
                            return projects
                                .replace(/{{projects.name}}/g, data.name)
                                .replace(/{{projects.active}}/g, i == 0 ? 'active' : '')
                        }).join("")
                    })
                    .replace(/{{#productsList}}([\s\S]*?){{\/productsList}}/, (match, productsList) => {
                        return data.map((data, i) => {
                            return productsList
                                .replace(/{{productsList.name}}/g, data.name)
                                .replace(/{{productsList.active}}/g, i == 0 ? '' : 'hidden')
                                .replace(/{{#productsList.item}}([\s\S]*?){{\/productsList.item}}/, (match, items) => {
                                    return data.data.map((item, i) => {
                                        return items
                                            .replace(/{{productsList.item.name}}/g, item.name)
                                            .replace(/{{productsList.item.brands}}/g, item.brands)
                                            .replace(/{{productsList.item.label}}/g, item.label)
                                            .replace(/{{productsList.item.type}}/g, data.name)
                                            .replace(/{{productsList.item.location}}/g, item.location)
                                            .replace(/{{productsList.item.price}}/g, item.price)
                                            .replace(/{{productsList.item.link}}/g, item.link)
                                            .replace(/{{productsList.item.active}}/g, i == 0 ? 'link-active' : '')
                                    }).join("")
                                })
                        }).join("")
                    })
                    .replace(/{{#imageList}}([\s\S]*?){{\/imageList}}/, (match, imageList) => {
                        return data.map((data, i) => {
                            return imageList
                                .replace(/{{imageList.name}}/g, data.name)
                                .replace(/{{imageList.css.hidden}}/g, i == 0 ? "" : "hidden")
                                .replace(/{{#imageList.item}}([\s\S]*?){{\/imageList.item}}/, (match, items) => {
                                    return data.data.map((item, i) => {
                                        const border = item.name.replace('’', "'").toLowerCase() == "santiburi" ? "border-[#46111B]" :
                                            item.name.replace('’', "'").toLowerCase() == "la soie de s" ? "border-[#57893a]" :
                                                item.name.replace('’', "'").toLowerCase() == "smyth's" ? "border-[#945E4D]" :
                                                    item.name.replace('’', "'").toLowerCase() == "siraninn" ? "border-[#b49a81]" :
                                                        item.name.replace('’', "'").toLowerCase() == "s'rin" ? "border-[#003b5E]" :
                                                            item.name.replace('’', "'").toLowerCase() == "shawn" ? "border-[#5c4580]" :
                                                                item.name.replace('’', "'").toLowerCase() == "sentre" ? "border-[#7F8372]" :
                                                                    item.name.replace('’', "'").toLowerCase() == "esse" ? "border-[#182A45]" :
                                                                        item.name.replace('’', "'").toLowerCase() == "extro" ? "border-[#bf6c29]" : ""
                                        return items
                                            .replace(/{{imageList.item.name}}/g, item.name)
                                            .replace(/{{imageList.item.l}}/g, item.l)
                                            .replace(/{{imageList.item.logo}}/g, item.logo)
                                            .replace(/{{imageList.item.border}}/g, border)
                                            .replace(/{{imageList.item.link}}/g, item.link)
                                            .replace(/{{imageList.item.active}}/g, i == 0 ? 'active' : '')
                                            .replace(/{{#imageList.item.tag.div}}([\s\S]*?){{\/imageList.item.tag.div}}/, (match, tagDiv) => {
                                                if (item.label.toLowerCase() == 'sold out') {
                                                    return tagDiv
                                                } else {
                                                    return ""
                                                }
                                            })
                                    }).join("")
                                })
                        }).join("")
                    })
                    .replace(/{{language}}/g, lang)
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
                    .replace(/{{title}}/g, lang == 'en' ? title['en'] : title['th'])
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
function selectProjects(ev) {
    var projectList = document.querySelectorAll('#BrandCollectionComponent .project-list button');
    for (let index = 0; index < projectList.length; index++) {
        const element = projectList[index];
        element.classList.remove('active');
    }

    ev.classList.add('active');
    var productList = document.querySelectorAll(`#BrandCollectionComponent .product-list`);
    var imgList = document.querySelectorAll(`#BrandCollectionComponent .img-list`);
    for (let index = 0; index < productList.length; index++) {
        productList[index].classList.add('hidden');
        imgList[index].classList.add('hidden');

        if (ev.dataset['projects'] == productList[index].dataset['projects']) {
            var productLink = document.querySelectorAll(`#BrandCollectionComponent .product-list[data-projects="${productList[index].dataset['projects']}"] li`);
            var imgCard = document.querySelectorAll(`#BrandCollectionComponent .img-list[data-projects="${productList[index].dataset['projects']}"] li`);
            for (let i = 0; i < productLink.length; i++) {
                i == 0 ? productLink[0].classList.add('link-active') : productLink[i].classList.remove('link-active');
                i == 0 ? imgCard[0].classList.add('active') : imgCard[i].classList.remove('active');
            }
        }
    }
    document.querySelector(`#BrandCollectionComponent .product-list[data-projects="${ev.dataset['projects']}"]`).classList.remove('hidden');
    document.querySelector(`#BrandCollectionComponent .img-list[data-projects="${ev.dataset['projects']}"]`).classList.remove('hidden');
}

function selectProductsCard(ev) {
    var activeLink = document.querySelectorAll('#BrandCollectionComponent .product-list li.link-active');
    for (let index = 0; index < activeLink.length; index++) {
        const element = activeLink[index];
        element.classList.remove('link-active')
    }
    ev.classList.add('link-active');
    var imgList = document.querySelectorAll(`#BrandCollectionComponent .img-list li`);
    for (let index = 0; index < imgList.length; index++) {
        const element = imgList[index];
        element.classList.remove('active');
    }
    document.querySelector(`#BrandCollectionComponent .img-list li[data-name="${ev.dataset['name']}"]`).classList.add('active');
    // var img = document.querySelector(`#BrandCollectionComponent .img-list li img[alt="${ev.dataset['name']}"]`).src;
    // document.querySelector(`#BrandCollectionComponent .brand-collection-bg`).style.backgroundImage = `url('${img}')`;

}

function selectBrandCollection(ev) {
    var tracking = {
        event: "select_property",
        landing_page: "home_page",
        section: "property_collection",
        event_action: "click",
        property_brand: ev.dataset["property_brand"],
        project_label: ev.dataset["project_label"],
        property_type: ev.dataset["property_type"],
        property_location: ev.dataset["property_location"],
        property_price: ev.dataset["property_price"]
    }
    // console.log(tracking);
    
    window.location.href = ev.dataset['href'];
    setDataLayer(tracking);
}
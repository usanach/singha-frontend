var filterNumber = 0;
var cardNum = 4;

function toggleView() {
    document.querySelector('#discovery').setAttribute('attr-list-type', event.target.getAttribute("attr-icon"));
}
function expandMoreFilter(ev) {
    var cardList = document.querySelectorAll('#filter ul.card-list li');

    for (let index = 0; index < cardList.length; index++) {
        const element = cardList[index];
        if (index < filterNumber) {
            element.classList.remove('hidden');
        }
    }

    filterNumber += cardNum;

    setDataLayer(propertyLoadMore);

    if (ev) {
        filterNumber >= cardList.length ? ev.classList.add('hidden') : ev.classList.remove('hidden');
    }
    document.querySelector('#productShow').innerHTML = visibleCard();
}


function selectFilter(ev) {
    document.querySelector('#' + ev.dataset["type"] + ' ' + 'p').innerHTML = ev.innerHTML;
    document.querySelector('#' + ev.dataset["type"]).setAttribute('value', ev.value);
    var property_brand, property_type, property_brand, filter_section;
    filter_section = [];
    property_brand = document.querySelector('#property_brand').getAttribute('value');
    property_type = document.querySelector('#property_type').getAttribute('value');
    property_location = document.querySelector('#property_location').getAttribute('value');
    if (ev.dataset["type"] == "property_brand") {
        document.querySelector('#property_brand').setAttribute('data-project_label', ev.dataset["project_label"]);
    }

    if (property_brand != null) {
        filter_section.push('property_brand');
    }
    if (property_type != null) {
        filter_section.push('property_type');
    }
    if (property_location != null) {
        filter_section.push('property_location');
    }


    var tracking = {
        event: property_filter.event,
        landing_page: landing_page,
        section: property_filter.section,
        event_action: property_filter.event_action,
        filter_section: filter_section.toString(),
        property_brand: property_brand == null ? "non_selected" : property_brand,
        project_label: document.querySelector('#property_brand').dataset["project_label"] == null ? "non_selected" : document.querySelector('#property_brand').dataset["project_label"],
        property_type: property_type == null ? "non_selected" : property_type,
        property_location: property_location == null ? "non_selected" : property_location,
    }
    setDataLayer(tracking);
    filterCard(ev.dataset["type"]);
}
function filterCard(select) {
    let brand = document.querySelector('#property_brand').getAttribute('value');
    let type = document.querySelector('#property_type').getAttribute('value');
    let location = document.querySelector('#property_location').getAttribute('value');
    let btn = document.querySelector('#filter button.btn');

    let cardList = document.querySelectorAll('#filter .card-list li');
    switch (select) {
        case "property_type":
            for (let index = 0; index < cardList.length; index++) {
                const element = cardList[index];
                if (element.dataset['property_type'].toLowerCase() == type.toLowerCase()) {
                    element.classList.remove('hidden')
                } else {
                    element.classList.add('hidden')
                }
            }
            break;

        case "property_location":
            for (let index = 0; index < cardList.length; index++) {
                const element = cardList[index];
                if (element.dataset['property_location'].toLowerCase() == location.toLowerCase()) {
                    element.classList.remove('hidden')
                } else {
                    element.classList.add('hidden')
                }
            }
            break;


        case "property_brand":
            for (let index = 0; index < cardList.length; index++) {
                const element = cardList[index];

                if (element.dataset['property_brand'].toLowerCase() == brand.toLowerCase()) {
                    element.classList.remove('hidden')
                } else {
                    element.classList.add('hidden')
                }
            }
            break;
        default:
            break;
    }
    btn.classList.add('hidden');
    document.querySelector('#productShow').innerHTML = visibleCard();
    if (visibleCard() == 0) {
        document.querySelector('.no-data').classList.remove('hidden');
        document.querySelector('.no-data').innerHTML = `no projects found`;
    } else {
        document.querySelector('.no-data').classList.add('hidden');
    }
}
function visibleCard() {
    let cardList = document.querySelectorAll('#filter .card-list li');
    let visibleCards = 0;
    for (let index = 0; index < cardList.length; index++) {
        const element = cardList[index];
        if (!element.classList.contains('hidden')) {
            visibleCards++;
        }
    }
    return visibleCards;
}
function selectPropertyCard(ev) {
    var tracking = {
        event: propertyTrack.event,
        landing_page: landing_page,
        section: propertyTrack.section,
        event_action: propertyTrack.event_action,
        property_brand: ev.dataset["property_brand"],
        project_label: ev.dataset["project_label"],
        property_type: ev.dataset["property_type"],
        property_location: ev.dataset["property_location"],
        property_price: ev.dataset["property_price"]
    }
    setDataLayer(tracking);
}

// Define the Header component
const FilterComponent = defineComponent({
    name: 'FilterComponent',
    template: `<section id="filter" class="relative" v-html="template"></section>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const checkDuplicateLocations = (locations) => {
            // Create an empty set to track titles
            const seenTitles = new Set();
            const duplicates = [];

            // Filter locations for duplicates based on title
            locations.forEach(location => {
                if (seenTitles.has(location.title)) {
                    // If title is already in the set, it's a duplicate
                    duplicates.push(location);
                } else {
                    // Otherwise, add it to the set
                    seenTitles.add(location.title);
                }
            });

            return seenTitles;
        }
        const loadTemplate = async (lang) => {
            try {
                const title = {
                    en: "RESIDENCE DISCOVERY",
                    th: "ค้นหาโครงการ"
                }
                const detail = {
                    th: `​โครงการที่พักอาศัยจาก สิงห์ เอสเตท มอบความหลากหลายให้คุณ ด้วย บ้านเดี่ยว ไพรเวทเอสเตท โฮมออฟฟิศ และคอนโดมิเนียม ผ่านความตั้งใจที่จะตอบโจทย์ทุกความต้องการด้วยแบรนด์ที่แตกต่าง ที่สะท้อนเอกลักษณ์ของเจ้าของบ้าน​`,
                    en: `
                        Singha Estate's varied residential development, from high-rise to low-rise projects, features a
                        range of properties-single detached houses, private estates, home offices, and condominiums.
                        <br />Tailored to luxury customers across different brands, these
                        distinctive offering
                        s not only
                        define Singha Estate homes but also embody the company's commitment "Best - in - class" to
                        excellence across all segments.`
                }
                const expandBtn = {
                    th: "ดูโครงการเพิ่มเติม​",
                    en: "Explore more"
                }
                const dataset = lang == 'en' ? await axios.get('/data/discovery.json') : await axios.get('/data/discovery.json');
                const data = await dataset.data;

                const templateResponse = await axios.get('/page/home/component/filter/template.html');
                let templateContent = templateResponse.data;
                filterNumber += cardNum;
                // Replace placeholders with actual data
                let cards = new Array();
                let propertyType = new Array();
                let locationArray = new Array();
                let locations = new Array();
                let brandsArray = new Array();
                let brands = new Array();
                data.map(types => {
                    propertyType.push({ title: types.title[lang] })
                    return types.items.map(brands => {
                        if (!brands.items) {
                            locationArray.push({ title: brands.location });
                            brandsArray.push({ title: brands.title[lang] });
                            cards.push({
                                image: brands.thumb,
                                brands: brands.title[lang],
                                price: brands.price,
                                location: [brands.location, brands.title[lang]],
                                label: brands.label,
                                type: types.title[lang],
                                url: brands.url[lang],
                                theme: brands.title['en']
                            })
                        } else {
                            brands.items.map(sub => {
                                locationArray.push({ title: sub.location });
                                brandsArray.push({ title: brands.title[lang] });
                                cards.push({
                                    image: sub.thumb,
                                    brands: brands.title[lang],
                                    price: sub.price,
                                    location: [sub.location, sub.title[lang]],
                                    label: sub.label,
                                    type: types.title[lang],
                                    url: sub.url[lang],
                                    theme: brands.title['en']
                                })
                            })
                        }
                    })
                })

                checkDuplicateLocations(locationArray).forEach(l => {
                    locations.push({ title: l })
                })
                checkDuplicateLocations(brandsArray).forEach(b => {
                    brands.push({ title: b })
                })

                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, lang == 'en' ? title['en'] : title['th'])
                    .replace(/{{detail}}/g, lang == 'en' ? detail['en'] : detail['th'])
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
                    .replace(/{{projectsPage}}/g, cards.length)
                    .replace(/{{productShow}}/g, visibleCard())
                    .replace(/{{expandBtn}}/g, lang == 'en' ? expandBtn['en'] : expandBtn['th'])
                    .replace(/{{#propertyType}}([\s\S]*?){{\/propertyType}}/, (match, type) => {
                        return propertyType.map(d => {
                            return type.replace(/{{propertyType.title}}/g, d.title)
                        }).join("")
                    })
                    .replace(/{{#location}}([\s\S]*?){{\/location}}/, (match, location) => {
                        return locations.map(d => {
                            return location.replace(/{{location.title}}/g, d.title)
                        }).join("")
                    })
                    .replace(/{{#brands}}([\s\S]*?){{\/brands}}/, (match, brand) => {
                        return brands.map(d => {
                            return brand.replace(/{{brands.title}}/g, d.title)
                        }).join("")
                    })
                    .replace(/{{#cardList}}([\s\S]*?){{\/cardList}}/, (match, card) => {
                        return cards.map((c, i) => {
                            const border = c.theme == "SANTIBURI THE RESIDENCES" ? "bg-[#46111B]" :
                                c.theme == "LA SOIE de S SUKHUMVIT 43" ? "bg-[#57893a]" :
                                    c.theme == "SMYTH\"S " ? "bg-[#945E4D]" :
                                        c.theme == "SIRANINN RESIDENCES" ? "bg-[#b49a81]" :
                                            c.theme == "S'RIN" ? "bg-[#003b5E]" :
                                                c.theme == "SHAWN" ? "bg-[#5c4580]" :
                                                    c.theme == "SENTRE Pattanakarn" ? "bg-[#7F8372]" :
                                                        c.theme == "THE ESSE" ? "bg-[#182A45]" :
                                                            c.theme == "THE EXTRO" ? "bg-[#bf6c29]" : ""
                            if (c.image != "") {
                                return card.replace(/{{cardList.item.label}}/g, c.label ? c.label : "")
                                    .replace(/{{cardList.item.type}}/g, c.type ? c.type : "")
                                    .replace(/{{cardList.item.image}}/g, c.image ? c.image : "")
                                    .replace(/{{cardList.item.brands}}/g, c.brands ? c.brands : "")
                                    .replace(/{{cardList.item.location}}/g, c.location[1] ? c.location[1] : "")
                                    .replace(/{{cardList.item.price}}/g, c.price ? c.price : "-")
                                    .replace(/{{cardList.item.theme}}/g, border)
                                    .replace(/{{cardList.item.url}}/g, c.url)
                                    .replace(/{{cardList.item.project.location}}/g, c.location[0] ? c.location[0] : "")
                                    .replace(/{{cardList.item.active}}/g, i > 3 ? "hidden" : "")
                            }
                        }).join("")
                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        const init = () => {
            AOS.init();
            expandMoreFilter();
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

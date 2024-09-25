var filterNumber = 0;
var cardNum = 4;
let projects = [
    {
        "name": "House Project",
        "details": [
            {
                "location": "Ramintra",
                "brands": [
                    {
                        "brand": "SHAWN",
                        "project": "Wongwaen – Chatuchot"
                    },
                    {
                        "brand": "SHAWN",
                        "project": "Panya Indra"
                    },
                    {
                        "brand": "SMYTH’S",
                        "project": "Ramintra"
                    }
                ],
            }, {

                "location": "Ratchaphruek",
                "brands": [
                    {
                        "brand": "S’RIN",
                        "project": "Ratchaphruek-Sai1"
                    }
                ]
            }, {
                "location": "Pattanakarn",
                "brands": [
                    {
                        "brand": "SIRANINN Residences",
                        "project": "Pattanakarn"
                    },
                    {
                        "brand": "SENTRE",
                        "project": "Pattanakarn"
                    },
                    {
                        "brand": "SANTIBURI The Residences",
                        "project": "Pattanakarn"
                    },
                ]
            }, {
                "location": "Sukhumvit",
                "brands": [
                    {
                        "brand": "LA SOIE de S",
                        "project": "SUKHUMVIT 43"
                    }
                ]
            }
        ]
    },
    {
        "name": "Condominium",
        "details": []
    }
]

function toggleView() {
    document.querySelector('#discovery').setAttribute('attr-list-type', event.target.getAttribute("attr-icon"));
}
function expandMoreFilter(ev) {
    var cardList = document.querySelectorAll('#filter ul.card-list li');
    document.querySelector('#productShow').innerHTML = filterNumber;
    for (let index = 0; index < cardList.length; index++) {
        const element = cardList[index];
        if (index < filterNumber) {
            element.classList.remove('hidden');
        }
    }
    var type = document.querySelector("#filter").dataset['card'] != (undefined || "" || null) ? document.querySelector("#filter").dataset['card'] : "";

    filterNumber += cardNum;

    setDataLayer(propertyLoadMore);

    if (ev) {
        filterNumber >= cardList.length ? ev.classList.add('hidden') : ev.classList.remove('hidden');
    }
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

    if (ev.dataset["type"] == "property_type") {
        document.querySelector('#property_location options').innerHTML = "";
        projects.filter((p, i) => p.name == property_type).map((p, i) => {
            p.details.map((d, i) => {
                let option = document.createElement('option');
                option.setAttribute('data-type', "property_location");
                option.setAttribute('value', d.location);
                option.setAttribute('onclick', "selectFilter(this)");
                option.innerHTML = d.location;
                document.querySelector('#property_location options').appendChild(option);
                document.querySelector('#property_location p').innerHTML = "Location";
            })
        })
    }

    if (ev.dataset["type"] == "property_location") {
        document.querySelector('#property_brand options').innerHTML = "";
        const addedValues = new Set();
        projects.filter((p, i) => p.name == property_type).map((p, i) => {
            p.details.filter((d, i) => d.location == property_location).map((d, i) => {
                d.brands.map((b, i) => {

                    if (!addedValues.has(b.brand)) {
                        let option = document.createElement('option');
                        option.setAttribute('data-type', "property_brand");
                        option.setAttribute('value', b.brand);
                        option.setAttribute('onclick', "selectFilter(this)");
                        option.innerHTML = b.brand;
                        document.querySelector('#property_brand options').appendChild(option);
                        document.querySelector('#property_brand p').innerHTML = "Brands";

                        addedValues.add(b.brand);
                    }
                })
            })
        })
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
                if (element.dataset['property_type'].toLowerCase() == type.toLowerCase()
                    && element.dataset['property_location'].toLowerCase() == location.toLowerCase()) {
                    element.classList.remove('hidden')
                } else {
                    element.classList.add('hidden')
                }
            }
            break;


        case "property_brand":
            for (let index = 0; index < cardList.length; index++) {
                const element = cardList[index];

                if (element.dataset['property_type'].toLowerCase() == type.toLowerCase()
                    && element.dataset['property_location'].toLowerCase() == location.toLowerCase()
                    && element.dataset['property_brand'].toLowerCase() == brand.toLowerCase()) {
                    element.classList.remove('hidden')
                } else {
                    element.classList.add('hidden')
                    console.log(type, element.dataset['property_type']);
                    console.log(brand, element.dataset['property_brand']);
                    console.log(location, element.dataset['property_location']);
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
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, lang == 'en' ? title['en'] : title['th'])
                    .replace(/{{detail}}/g, lang == 'en' ? detail['en'] : detail['th'])
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
                    .replace(/{{projectsPage}}/g, data.length)
                    .replace(/{{productShow}}/g, visibleCard())
                    .replace(/{{expandBtn}}/g, lang == 'en' ? expandBtn['en'] : expandBtn['th'])
                    .replace(/{{locationText}}/g, lang == 'en' ? "Location" : "Location")
                    .replace(/{{brandsText}}/g, lang == 'en' ? "Brands" : "Brands")
                    .replace(/{{#type.options}}([\s\S]*?){{\/type.options}}/, (match, options) => {
                        return projects.map((p, i) => options.replace(/{{type.options.name}}/g, p.name)).join("")
                    })
                    .replace(/{{#cardList}}([\s\S]*?){{\/cardList}}/, (match, slide) => {
                        return data.map((item, i) => {
                            const border = item.data.brands.replace('’', "'").toLowerCase() == "santiburi" ? "bg-[#46111B]" :
                                item.data.brands.replace('’', "'").toLowerCase() == "la soie de s" ? "bg-[#57893a]" :
                                    item.data.brands.replace('’', "'").toLowerCase() == "smyth's" ? "bg-[#945E4D]" :
                                        item.data.brands.replace('’', "'").toLowerCase() == "siraninn" ? "bg-[#b49a81]" :
                                            item.data.brands.replace('’', "'").toLowerCase() == "s'rin" ? "bg-[#003b5E]" :
                                                item.data.brands.replace('’', "'").toLowerCase() == "shawn" ? "bg-[#5c4580]" :
                                                    item.data.brands.replace('’', "'").toLowerCase() == "sentre" ? "bg-[#7F8372]" :
                                                        item.data.brands.replace('’', "'").toLowerCase() == "esse" ? "bg-[#182A45]" :
                                                            item.data.brands.replace('’', "'").toLowerCase() == "extro" ? "bg-[#bf6c29]" : ""

                            return slide
                                .replace(/{{cardList.delay}}/g, i * 100)
                                .replace(/{{cardList.brands}}/g, item.data['name'])
                                .replace(/{{cardList.location.name}}/g, item.data.location['name'])
                                .replace(/{{cardList.location.detail}}/g, item.data.location['detail'])
                                .replace(/{{cardList.link}}/g, item.data['link'])
                                .replace(/{{cardList.price}}/g, item.data['price'])
                                .replace(/{{cardList.s}}/g, item.data['s'])
                                .replace(/{{cardList.type}}/g, item.data['type'])
                                .replace(/{{cardList.label}}/g, item.data['label'])
                                .replace(/{{cardList.border}}/g, border)
                                .replace(/{{cardList.show}}/g, i > (filterNumber - 1) ? 'hidden' : '')
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

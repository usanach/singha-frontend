var filterNumber = 4;
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

    var cardNum = type == "promotion" ? 6 : 4;
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
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, lang == 'en' ? title['en'] : title['th'])
                    .replace(/{{detail}}/g, lang == 'en' ? detail['en'] : detail['th'])
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
                    .replace(/{{projectsPage}}/g, data.length)
                    .replace(/{{productShow}}/g, filterNumber)
                    .replace(/{{expandBtn}}/g, lang == 'en' ? expandBtn['en'] : expandBtn['th'])
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
                                .replace(/{{cardList.brands}}/g, item.data['brands'])
                                .replace(/{{cardList.location}}/g, item.data['location'])
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

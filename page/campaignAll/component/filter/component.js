

// Define the Header component
const FilterComponent = defineComponent({
    name: 'FilterComponent',
    template: `<section id="filter" class="relative" v-html="template" ></section>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const getBorderColor = (theme) => {
            const themeColors = {
                "SANTIBURI THE RESIDENCES": "bg-[#712135]",
                "LA SOIE de S": "bg-[#bc9e68]",
                "SMYTH'S ": "bg-[#945E4D]",
                "SIRANINN RESIDENCES": "bg-[#b49a81]",
                "S'RIN": "bg-[#003b5E]",
                "SHAWN": "bg-[#5c4580]",
                "SENTRE": "bg-[#7F8372]",
                "THE ESSE": "bg-[#182A45]",
                "THE EXTRO": "bg-[#bf6c29]",
            };
            return themeColors[theme] ?? ""; // Default to empty string if theme is not found
        };


        const loadTemplate = async (lang) => {
            try {
                const title = {
                    en: "ALL privileges and promotions",
                    th: "รวมสิทธิพิเศษเฉพาะคุณ​"
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
                    en: "Explore more property"
                }
                const dataset = await axios.get('/data/promotion.json');
                const data = await dataset.data;

                const templateResponse = await axios.get('/page/campaignAll/component/filter/template.html');
                let templateContent = templateResponse.data;
                // Replace placeholders with actual data
                if (data.length > cardNum) {
                    filterNumber += cardNum;
                } else {
                    filterNumber = data.length;
                }
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, title[lang])
                    .replace(/{{detail}}/g, detail[lang])
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
                    .replace(/{{projectsPage}}/g, data.filter((d, i) => !d.end).length)
                    .replace(/{{productShow}}/g, visibleCard())
                    .replace(/{{expandBtn}}/g, expandBtn[lang])
                    .replace(/{{#cardList}}([\s\S]*?){{\/cardList}}/, (match, slide) => {
                        return data.filter((d, i) => !d.end).map((d, i) => {
                            let border;
                            if (d.data.product != undefined) {
                                border = getBorderColor(d.data.product.brands);
                            } else {
                                 border = "";
                            }
                            const tracking = {
                                promotion_name: d.data.campaign['en'],
                                property_type: d.data.type,
                            }
                            if (d.data.brand != "") {
                                tracking.property_brand = d.data.brand;
                                tracking.property_location = d.data.product.location;
                                tracking.project_label = d.data.product.label;
                                tracking.property_price = d.data.product.price[lang];
                            }
                            return slide
                                .replace(/{{tracking.promotion_name}}/g, tracking.promotion_name)
                                .replace(/{{tracking.property_brand}}/g, tracking.property_brand)
                                .replace(/{{tracking.project_label}}/g, tracking.project_label)
                                .replace(/{{tracking.property_type}}/g, tracking.property_type)
                                .replace(/{{tracking.property_location}}/g, tracking.property_location)
                                .replace(/{{tracking.property_price}}/g, tracking.property_price)
                                .replace(/{{cardList.delay}}/g, i * 100)
                                .replace(/{{cardList.title}}/g, d.data.card.title[lang])
                                .replace(/{{cardList.location}}/g, d.data.card.subtitle[lang])
                                .replace(/{{cardList.link}}/g, `/${lang}/campaigns/${d.data.link}`)
                                .replace(/{{cardList.price}}/g, d.data.card.detail[lang])
                                .replace(/{{cardList.s}}/g, d.data.image.s)
                                .replace(/{{cardList.type}}/g, d.type)
                                .replace(/{{cardList.label}}/g, d.type)
                                .replace(/{{cardList.border}}/g, border)
                                .replace(/{{cardList.last}}/g, i == (data.filter((d, i) => !d.end).length - 1) ? "mr-auto" : "")
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


            const dataset = language.value == 'en' ? await axios.get('/data/promotion.json') : await axios.get('/data/promotion.json');
            const data = await dataset.data;
            let btn = document.querySelector('#filter button.btn');

            if (visibleCard() == data.length) {
                btn.classList.add('hidden');
            }
            nextTick(() => {
                init();
            })
        });

        return { template, language };
    }
});
var filterNumber = 0;
var cardNum = 6;
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
    document.querySelector('#productShow').innerHTML = visibleCard();
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
        event: propertySelect.event,
        landing_page: landing_page,
        section: propertySelect.section,
        event_action: propertySelect.event_action,
        promotion_name: ev.dataset["promotion_name"],
        property_brand: ev.dataset["property_brand"],
        project_label: ev.dataset["project_label"].toLowerCase().replace(/ /g, "_"),
        property_type: ev.dataset["property_type"],
        property_location: ev.dataset["property_location"],
        property_price: ev.dataset["property_price"]
    }
    // console.log(tracking);


    setDataLayer(tracking);
    window.open(ev.dataset['href'], '_self');
}
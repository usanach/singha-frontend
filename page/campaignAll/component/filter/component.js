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
                    .replace(/{{projectsPage}}/g, data.length)
                    .replace(/{{productShow}}/g, visibleCard())
                    .replace(/{{expandBtn}}/g, expandBtn[lang])
                    .replace(/{{#cardList}}([\s\S]*?){{\/cardList}}/, (match, slide) => {
                        return data.map((d, i) => {
                            console.log(d);
                            const border = d.data.brand.replace('’', "'").toLowerCase() == "santiburi" ? "bg-[#46111B]" :
                                d.data.brand.replace('’', "'").toLowerCase() == "la soie de s" ? "bg-[#57893a]" :
                                    d.data.brand.replace('’', "'").toLowerCase() == "smyth's" ? "bg-[#945E4D]" :
                                        d.data.brand.replace('’', "'").toLowerCase() == "siraninn" ? "bg-[#b49a81]" :
                                            d.data.brand.replace('’', "'").toLowerCase() == "s'rin" ? "bg-[#003b5E]" :
                                                d.data.brand.replace('’', "'").toLowerCase() == "shawn" ? "bg-[#5c4580]" :
                                                    d.data.brand.replace('’', "'").toLowerCase() == "sentre" ? "bg-[#7F8372]" :
                                                        d.data.brand.replace('’', "'").toLowerCase() == "esse" ? "bg-[#182A45]" :
                                                            d.data.brand.replace('’', "'").toLowerCase() == "extro" ? "bg-[#bf6c29]" : ""

                            return slide
                                .replace(/{{cardList.delay}}/g, i * 100)
                                .replace(/{{cardList.room}}/g, d.data.detail.room[lang])
                                .replace(/{{cardList.location}}/g, d.data.location)
                                .replace(/{{cardList.link}}/g, `/${lang}/campaigns/${d.data.link}`)
                                .replace(/{{cardList.price}}/g, d.data.detail.price[lang])
                                .replace(/{{cardList.s}}/g, d.data.image.s)
                                .replace(/{{cardList.type}}/g, d.type)
                                .replace(/{{cardList.label}}/g, d.type)
                                .replace(/{{cardList.border}}/g, border)
                                .replace(/{{cardList.last}}/g, i == (data.length - 1) ? "mr-auto" : "")
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
            AOS.init(
                // { once: true }
            );
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
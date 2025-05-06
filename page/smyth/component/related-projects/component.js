
// Define the Header component
const RelatedProjectsComponent = defineComponent({
    name: 'RelatedProjectsComponent',
    template: `<section id="filter" class="relative onview" v-html="template" data-section="related_projects"></section>`,

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

        const sortList = () => {
            const list = document.getElementById('myList');
            const items = Array.from(list.getElementsByTagName('li'));

            // Sort the list items by the data-id attribute
            items.sort((a, b) => {
                return a.getAttribute('data-id') - b.getAttribute('data-id');
            });

            // Remove all items from the list
            list.innerHTML = '';

            // Add the sorted items back to the list
            items.forEach(item => list.appendChild(item));
        }
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
                    en: "SMYTH’S Projects",
                    th: "SMYTH’S Projects"
                }
                const detail = {
                    th: ``,
                    en: ``
                }
                const expandBtn = {
                    th: "ดูโครงการเพิ่มเติม​",
                    en: "Explore more"
                }
                const dataset = await axios.get('/page/smyth/component/related-projects/data.json');
                const data = await dataset.data;

                const templateResponse = await axios.get('/page/smyth/component/related-projects/template.html');
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
                    return types.items.map((brands, i) => {
                        if (brands.items) {
                            brands.items.map(sub => {
                                locationArray.push({ title: sub.location[lang] });
                                brandsArray.push({ title: brands.title[lang] });
                                cards.push({
                                    image: sub.thumb,
                                    brands: brands.title[lang],
                                    price: sub.price == "" ? "-" : sub.price[lang],
                                    location: [sub.location[lang], sub.title[lang], sub.location.detail[lang]],
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
                // 10px 25px 25px 25px
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{propertyType}}/g, lang == "en" ? "Property type" : "ประเภทโครงการ")
                    .replace(/{{location.text}}/g, lang == "en" ? "Location" : "ทำเล")
                    .replace(/{{brands.text}}/g, lang == "en" ? "Brands" : "แบรนด์")
                    .replace(/{{title}}/g, lang == 'en' ? title['en'] : title['th'])
                    .replace(/{{detail}}/g, lang == 'en' ? detail['en'] : detail['th'])
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Gotham']" : "font-['Gotham']")
                    .replace(/{{projectsPage}}/g, cards.length)
                    .replace(/{{all_text}}/g, lang == 'en' ? 'All' : 'ทั้งหมด')
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

                        cards.sort((a, b) => {
                            const labelA = a.label ? a.label.toLowerCase() : ""; // Convert label to lowercase for case-insensitive comparison
                            const labelB = b.label ? b.label.toLowerCase() : "";

                            const getPriority = (label) => {
                                if (label.toLowerCase() === 'latest project') return 1;            // Highest priority
                                if (label.toLowerCase() === 'ready to move') return 2;         // Second priority
                                if (label.toLowerCase() === 'sold out') return 3;               // Third priority
                                return 4;                                         // Any other labels come last
                            };

                            return getPriority(labelA) - getPriority(labelB);
                        });

                        return cards.map((c, i) => {
                            const border = getBorderColor(c.theme);
                            if (c.image != "") {
                                return card.replace(/{{cardList.item.label}}/g, c.label ? c.label : "")
                                    .replace(/{{cardList.item.label.check}}/g, c.label == "" ? "!hidden" : "")
                                    .replace(/{{cardList.item.type}}/g, c.type ? c.type : "")
                                    .replace(/{{cardList.item.image}}/g, c.image ? c.image : "")
                                    .replace(/{{cardList.item.brands}}/g, c.brands ? c.brands : "")
                                    .replace(/{{cardList.item.location}}/g, c.location[2] ? c.location[2] : "")
                                    .replace(/{{cardList.item.price}}/g, c.price ? c.price : "-")
                                    .replace(/{{cardList.item.theme}}/g, border)
                                    .replace(/{{cardList.item.url}}/g, c.url)
                                    .replace(/{{cardList.item.project.location}}/g, c.location[2] ? c.location[2] : "")
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

                init();// Select all the list items and convert the NodeList to an array
                // Select all the list items and convert the NodeList to an array
            })
        });

        return { template, language };
    }
});
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
    if (ev) {
        filterNumber >= cardList.length ? ev.classList.add('hidden') : ev.classList.remove('hidden');
    } else {
        filterNumber >= cardList.length ? document.querySelector('#expandBtn').classList.add('hidden') : document.querySelector('#expandBtn').classList.remove('hidden');
    }

    filterNumber += cardNum;

    setDataLayer(propertyLoadMore);
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

    filterCard(ev.dataset["type"]);

    let cardList = document.querySelectorAll('#filter .card-list li');
    let project_label = []
    cardList.forEach(e => {
        if (!e.classList.contains('hidden')) {
            project_label.push(e.dataset['project_label']);
        }
    })


    var tracking = {
        event: property_filter.event,
        landing_page: landing_page,
        section: property_filter.section,
        event_action: property_filter.event_action,
        filter_section: filter_section.toString(),
        project_label: project_label.toString(),
        property_type: property_type == null ? "non_selected" : property_type,
        property_brand: property_brand == null ? "non_selected" : property_brand,
        property_location: property_location == null ? "non_selected" : property_location,
    }

    setDataLayer(tracking);
}
function filterCard(select) {
    let btn = document.querySelector('#filter button.btn');
    let cards = document.querySelectorAll('#filter .card-list li');

    const categoryFilter = document.getElementById('property_type').getAttribute('value');
    const locationFilter = document.getElementById('property_location').getAttribute('value');
    const brandFilter = document.getElementById('property_brand').getAttribute('value');
    // console.log(categoryFilter);wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww

    Array.from(cards).find(li => {
        if ((categoryFilter != null && categoryFilter == li.dataset["property_type"])
            && (locationFilter != null && locationFilter == li.dataset["property_location"])
            && (brandFilter != null && brandFilter == li.dataset["property_brand"])) {
            li.classList.remove('hidden')
        } else if ((categoryFilter != null && categoryFilter == li.dataset["property_type"])
            && (locationFilter != null && locationFilter == li.dataset["property_location"])
            && (brandFilter == null || brandFilter == "all")) {
            li.classList.remove('hidden')
        } else if ((categoryFilter != null && categoryFilter == li.dataset["property_type"])
            && (locationFilter == null || locationFilter == "all")
            && (brandFilter == null || brandFilter == "all")) {
            li.classList.remove('hidden')
        } else if ((categoryFilter == null || categoryFilter == "all")
            && (locationFilter == null || locationFilter == "all")
            && (brandFilter == null || brandFilter == "all")) {
            li.classList.remove('hidden')
        } else if ((categoryFilter == null || categoryFilter == "all")
            && (locationFilter != null && locationFilter == li.dataset["property_location"])
            && (brandFilter != null && brandFilter == li.dataset["property_brand"])) {
            li.classList.remove('hidden')
        } else if ((categoryFilter == null || categoryFilter == "all")
            && (locationFilter != null && locationFilter == li.dataset["property_location"])
            && (brandFilter == null || brandFilter == "all")) {
            li.classList.remove('hidden')
        } else if ((categoryFilter != null && categoryFilter == li.dataset["property_type"])
            && (locationFilter == null || locationFilter == "all")
            && (brandFilter != null && brandFilter == li.dataset["property_brand"])) {
            li.classList.remove('hidden')
        } else if ((categoryFilter == null || categoryFilter == "all")
            && (locationFilter == null || locationFilter == "all")
            && (brandFilter != null && brandFilter == li.dataset["property_brand"])) {
            li.classList.remove('hidden')
        } else {
            li.classList.add('hidden')
        }
    })



    btn.classList.add('hidden');
    document.querySelector('#productShow').innerHTML = visibleCard();

    const getLanguageFromPath = () => {
        const path = window.location.pathname;
        const match = path.match(/\/(th|en)(\/|$)/);
        return match ? match[1] : 'th'; // Default to 'th' if not found
    };

    if (visibleCard() == 0) {
        document.querySelector('.no-data').classList.remove('hidden');
        document.querySelector('.no-data').innerHTML = getLanguageFromPath() == "en" ? `no projects found` : "ไม่พบโครงการ";
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
        event: propertySelect.event,
        landing_page: landing_page,
        section: propertySelect.section,
        event_action: propertySelect.event_action,
        property_brand: ev.dataset["property_brand"],
        project_label: ev.dataset["project_label"].toLowerCase().replace(/ /g, "_"),
        property_type: ev.dataset["property_type"],
        property_location: ev.dataset["property_location"],
        property_price: ev.dataset["property_price"]
    }
    setDataLayer(tracking);
    
    window.open(ev.dataset['href'], '_blank');
}
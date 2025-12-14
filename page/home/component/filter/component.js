// Define the Header component
const FilterComponent = defineComponent({
    name: 'FilterComponent',
    template: `
    <section id="filter" class="relative">
        <div class="md:bg-[url('./../assets/image/story/bg.svg')] bg-[url('./../assets/image/story/bg-m.svg')] bg-no-repeat bg-cover bg-center py-10">
            <div class="container">
                <h2 class=" text-[#2C2C2C] text-[35px] uppercase text-center">
                    ค้นหาโครงการ
                </h2>
            </div>
            <div class="container max-w-[1265px] py-5 lg:pt-5 pt-0 md:pb-5 pb-0">
                <div class="discovery-filter lg:w-3/4 mx-auto">
                    <div class="flex lg:flex-row flex-col lg:gap-10 gap-3">
                        <div class="lg:hidden block ml-auto mb-2 mt-14">
                            <button type="button" onclick="hideModal('discovery-filter')">
                                <img src="/assets/icon/close.svg" alt="icon">
                            </button>
                        </div>

                        <!-- PROPERTY TYPE (ตายตัว 4 ตัวเลือก) -->
                        <custom-selection id="property_type" class="selection-group"
                            onclick="this.classList.toggle('selected')"
                            onmouseleave="this.classList.remove('selected')">
                            <div class="relative border border-1 border-[#948668] bg-white h-[40px]">
                                <div class="absolute left-0 top-0 w-full h-full">
                                    <span class="absolute right-0 top-1/2 -translate-y-1/2 mr-3">
                                        <img src="/assets/icon/dropdown.svg" class="w-[20px]" alt="icon">
                                    </span>
                                    <p class="p-2 relative text-[16px]">ประเภทโครงการ</p>
                                </div>
                            </div>
                            <options>
                                <option value="all" class="uppercase border border-l-0 border-r-0 border-t-0"
                                        data-type="property_type" onclick="selectFilter(this)">
                                    ทั้งหมด
                                </option>
                                <option value="ไพรเวท เอสเตท" class="uppercase"
                                        data-type="property_type" onclick="selectFilter(this)">
                                    ไพรเวท เอสเตท
                                </option>
                                <option value="บ้านเดี่ยว" class="uppercase"
                                        data-type="property_type" onclick="selectFilter(this)">
                                    บ้านเดี่ยว
                                </option>
                                <option value="คอนโดมิเนียม" class="uppercase"
                                        data-type="property_type" onclick="selectFilter(this)">
                                    คอนโดมิเนียม
                                </option>
                                <option value="โฮม ออฟฟิศ" class="uppercase"
                                        data-type="property_type" onclick="selectFilter(this)">
                                    โฮม ออฟฟิศ
                                </option>
                            </options>
                        </custom-selection>

                        <!-- LOCATION (จะเติม option จาก API) -->
                        <custom-selection id="property_location" class="selection-group"
                            onclick="this.classList.toggle('selected')"
                            onmouseleave="this.classList.remove('selected')">
                            <div class="relative border border-1 border-[#948668] bg-white h-[40px]">
                                <div class="absolute left-0 top-0 w-full h-full">
                                    <span class="absolute right-0 top-1/2 -translate-y-1/2 mr-3">
                                        <img src="/assets/icon/dropdown.svg" class="w-[20px]" alt="icon">
                                    </span>
                                    <p class="p-2 relative text-[16px]">ทำเล</p>
                                </div>
                            </div>
                            <options>
                                <option value="all" class="uppercase border border-l-0 border-r-0 border-t-0"
                                        data-type="property_location" onclick="selectFilter(this)">
                                    ทั้งหมด
                                </option>
                                <!-- will be appended by JS -->
                            </options>
                        </custom-selection>

                        <!-- BRAND (จะเติม option จาก API) -->
                        <custom-selection id="property_brand" class="selection-group"
                            onclick="this.classList.toggle('selected')"
                            onmouseleave="this.classList.remove('selected')">
                            <div class="relative border border-1 border-[#948668] bg-white  h-[40px]">
                                <div class="absolute left-0 top-0 w-full h-full">
                                    <span class="absolute right-0 top-1/2 -translate-y-1/2 mr-3">
                                        <img src="/assets/icon/dropdown.svg" class="w-[20px]" alt="icon">
                                    </span>
                                    <p class="p-2 relative text-[16px]">แบรนด์</p>
                                </div>
                            </div>
                            <options>
                                <option value="all" class="uppercase border border-l-0 border-r-0 border-t-0"
                                        data-type="property_brand" onclick="selectFilter(this)">
                                    ทั้งหมด
                                </option>
                                <!-- will be appended by JS -->
                            </options>
                        </custom-selection>
                    </div>
                </div>
                <div class="mt-5 lg:w-3/4 mx-auto">
                    <div class="flex justify-end lg:flex-row flex-col">
                        <div class="flex justify-between">
                            <div class="my-auto">
                                <p class="text-[#797E81] text-[16px]">
                                    <span class="text-black font-normal" id="totalProjects">0</span>
                                    <span class="text-black font-normal">โครงการ</span>
                                    (<span id="productShow">0</span>/<span id="totalProjects2">0</span>)
                                </p>
                            </div>
                            <div class="flex lg:hidden">
                                <button type="button" onclick="showModal('discovery-filter')" class="flex gap-2">
                                    <p class="text-black font-normal font-[#958568]">Filter</p>
                                    <span class="w-[18px] my-auto mb-2"><img src="/assets/icon/filter.svg" alt="icon"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CARD LIST (จะเติม li จาก API) -->
            <div class="container min-h-[800px] lg:mt-0 mt-4">
                <ul class="card-list grid grid-cols-1 lg:grid-cols-2 gap-5 md:w-fit w-full mx-auto justify-items-center items-center">
                    <p class="no-data hidden uppercase"></p>
                    <!-- li will be appended by JS -->
                </ul>
                <div class="flex">
                    <button type="button" class="btn mt-10 mx-auto" onclick="expandMoreFilter(this)">
                        ดูเพิ่มเติม​
                    </button>
                </div>
            </div>
        </div>
    </section>`,

    setup() {
        const language = ref('th'); // Default language
        const apiBaseUrl = window.APP_CONFIG?.apiBaseUrl || '';
        const storageUrl = window.APP_CONFIG?.storageUrl || '';
        const propertyTypeList = {
            th: [
                { value: "all", label: "ทั้งหมด" },
                { value: "ไพรเวท เอสเตท", label: "ไพรเวท เอสเตท" },
                { value: "บ้านเดี่ยว", label: "บ้านเดี่ยว" },
                { value: "คอนโดมิเนียม", label: "คอนโดมิเนียม" },
                { value: "โฮม ออฟฟิศ", label: "โฮม ออฟฟิศ" }
            ],
            en: [
                { value: "all", label: "All" },
                { value: "ไพรเวท เอสเตท", label: "PRIVATE ESTATE" },
                { value: "บ้านเดี่ยว", label: "DETACHED HOUSE" },
                { value: "คอนโดมิเนียม", label: "CONDOMINIUM" },
                { value: "โฮม ออฟฟิศ", label: "HOME OFFICE" }
            ]
        };
        const renderPropertyTypeOptions = (lang) => {
            const selection = document.querySelector('#property_type options');
            if (!selection) return;

            selection.innerHTML = ""; // ล้างก่อน

            propertyTypeList[lang].forEach(item => {
                const opt = document.createElement('option');
                opt.value = item.value;
                opt.textContent = item.label;
                opt.className = "uppercase";
                opt.dataset.type = "property_type";
                opt.onclick = function() { selectFilter(this); };
                selection.appendChild(opt);
            });
        };
        const getDefaultPropertyTypeFromPath = () => {
            const path = window.location.pathname.toLowerCase();

            // ถ้ามี /house ให้เซ็ตเป็น บ้านเดี่ยว
            if (path.includes('/house')) {
                return 'บ้านเดี่ยว';
            }

            // ถ้ามี /condominium ให้เซ็ตเป็น คอนโดมิเนียม
            if (path.includes('/condominium')) {
                return 'คอนโดมิเนียม';
            }

            // ค่าอื่น ๆ หรือไม่ตรง ให้เป็น all (คือไม่ฟิลเตอร์)
            return 'all';
        };


        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        const getBorderColor = (theme) => {
            const themeColors = {
                "SANTIBURI THE RESIDENCES": "bg-[#712135]",
                "LA SOIE de S": "bg-[#bc9e68]",
                "SMYTH'S": "bg-[#945E4D]",
                "SIRANINN RESIDENCES": "bg-[#b49a81]",
                "S'RIN": "bg-[#003b5E]",
                "SHAWN": "bg-[#5c4580]",
                "SENTRE": "bg-[#7F8372]",
                "THE ESSE": "bg-[#182A45]",
                "THE EXTRO": "bg-[#bf6c29]",
            };
            return themeColors[theme] ?? "";
        };

        const labelTextMap = {
            new_project: {
                th: 'New Project',
                en: 'New Project',
            },
            ready_to_move: {
                th: 'Ready to Move',
                en: 'Ready to Move',
            },
            ready_to_move_in: {
                th: 'Ready to Move',
                en: 'Ready to Move',
            },
            sold_out: {
                th: 'Sold Out',
                en: 'Sold Out',
            }
        };

        const loadFromApi = async (lang) => {
        try {
            // ดึงข้อมูลจาก API
            const [brandRes, locationRes] = await Promise.all([
            axios.get(`${apiBaseUrl}/global/project-brand`),
            axios.get(`${apiBaseUrl}/global/project-location`),
            ]);

            const brandData = (brandRes.data && brandRes.data.data) || [];
            const locationData = (locationRes.data && locationRes.data.data) || [];

            // ✅ map brand ด้วย id (สำคัญมาก)
            const brandMapById = {};
            brandData.forEach(b => {
            if (b && b.id != null) {
                brandMapById[String(b.id)] = b;
            }
            });

            // ------------ เติม option BRAND / LOCATION จาก API -------------
            const brandOptionsContainer = document.querySelector('#property_brand options');
            const locationOptionsContainer = document.querySelector('#property_location options');

            // ✅ BRAND: แสดงจาก brandData (value = brand.id)
            if (brandOptionsContainer) {
            const allOption = brandOptionsContainer.querySelector('option[value="all"]');
            brandOptionsContainer.innerHTML = '';
            if (allOption) brandOptionsContainer.appendChild(allOption);

            brandData.forEach(b => {
                const label = b?.title?.[lang] || b?.title?.th || '';
                if (!label) return;

                const opt = document.createElement('option');
                opt.value = String(b.id); // ✅ id
                opt.className = 'uppercase';
                opt.dataset.type = 'property_brand';
                opt.setAttribute('onclick', 'selectFilter(this)');
                opt.textContent = label; // ✅ ชื่อแบรนด์ตามภาษา
                brandOptionsContainer.appendChild(opt);
            });
            }

            // ✅ LOCATION: แสดงจาก locationData (value = location name)
            if (locationOptionsContainer) {
            const allOptionL = locationOptionsContainer.querySelector('option[value="all"]');
            locationOptionsContainer.innerHTML = '';
            if (allOptionL) locationOptionsContainer.appendChild(allOptionL);

            const seenLocations = new Set();
            locationData.forEach(item => {
                const locName = item?.location?.[lang] || item?.location?.th || '';
                if (!locName || seenLocations.has(locName)) return;
                seenLocations.add(locName);

                const opt = document.createElement('option');
                opt.value = locName;
                opt.className = 'uppercase';
                opt.dataset.type = 'property_location';
                opt.setAttribute('onclick', 'selectFilter(this)');
                opt.textContent = locName;
                locationOptionsContainer.appendChild(opt);
            });
            }

            // ----------------- สร้าง CARD LIST จาก project-location ----------------
            const cardListEl = document.querySelector('#filter .card-list');
            if (!cardListEl) return;

            const noDataEl = cardListEl.querySelector('p.no-data');
            cardListEl.innerHTML = '';
            if (noDataEl) cardListEl.appendChild(noDataEl);

            const getPriority = (label) => {
            const l = (label || '').toLowerCase();
            if (l === 'new_project') return 1;
            if (l === 'ready_to_move' || l === 'ready_to_move_in') return 2;
            if (l === 'sold_out') return 3;
            return 4;
            };

            // ✅ cards: location.filter_component_item_l2_id = brandId -> map ไป brandMapById
            const cards = locationData.map(item => {
            const brandId = String(item.filter_component_item_l2_id || ''); // ✅ brand id FK
            const brandObj = brandMapById[brandId] || null;

            const propertyType = brandObj ? brandObj.filter_component_item_l1_id : '';
            const themeEn = brandObj?.title?.en || '';
            const border = getBorderColor(themeEn);

            const labelCode = item.label || '';
            const labelDisplay =
                (labelTextMap[labelCode] && labelTextMap[labelCode][lang]) || '';

            const locName = item?.location?.[lang] || item?.location?.th || '';
            const priceText = item?.price?.[lang] || item?.price?.th || '';
            const url = item?.url?.[lang] || item?.url?.th || '#';

            // ✅ ชื่อแบรนด์สำหรับโชว์
            const brandLabel = brandObj?.title?.[lang] || brandObj?.title?.th || '';

            const thumbPath = item.thumb
                ? `${storageUrl}uploads/filter_component_item/${item.thumb}`
                : '';

            return {
                propertyType,
                brandId,        // ✅ ใช้ filter
                brandLabel,     // ✅ ใช้แสดง
                themeEn,
                border,
                labelCode,
                labelDisplay,
                locName,
                priceText,
                url,
                thumbPath,
            };
            });

            // sort brand → label priority
            cards.sort((a, b) => {
            const themeA = (a.themeEn || '').toLowerCase();
            const themeB = (b.themeEn || '').toLowerCase();
            const themeCmp = themeA.localeCompare(themeB);
            if (themeCmp !== 0) return themeCmp;
            return getPriority(a.labelCode) - getPriority(b.labelCode);
            });

            // custom theme order (ตามของเดิมคุณ)
            const themeOrder = ["smyth's ", "s'rin", "shawn", "the esse"];
            const themeIndex = themeOrder.reduce((m, t, i) => {
            m[t.toLowerCase()] = i;
            return m;
            }, {});

            cards.sort((a, b) => {
            const idxA = themeIndex[a.themeEn?.toLowerCase()] ?? Infinity;
            const idxB = themeIndex[b.themeEn?.toLowerCase()] ?? Infinity;
            if (idxA !== idxB) return idxA - idxB;
            return getPriority(a.labelCode) - getPriority(b.labelCode);
            });

            // inject li ลงใน UL
            cards.forEach((c, index) => {
            if (!c.thumbPath) return;

            const li = document.createElement('li');
            li.className =
                'relative cursor-pointer card-relate w-full overflow-hidden' +
                (index > 3 ? ' hidden' : '');

            // ✅ สำคัญ: brand filter ใช้ id
            li.dataset.property_brand = c.brandId || '';
            li.dataset.project_label = c.labelCode || '';
            li.dataset.property_type = c.propertyType || '';
            li.dataset.property_location = c.locName || '';
            li.dataset.property_price = c.priceText || '';
            li.dataset.href = c.url || '#';

            li.onclick = function () {
                selectPropertyCard(this);
            };

            const labelMobileHidden = c.labelDisplay ? '' : '!hidden';
            const labelDesktopHidden = c.labelDisplay ? '' : '!hidden';
            const priceHtml = c.priceText && c.priceText !== " " ? c.priceText : '<br/>';

            li.innerHTML = `
                <div class=" block lg:hidden text-[15px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-5 lg:left-auto left-0 lg:mr-5 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white font-bold text-center ${labelMobileHidden}">
                ${c.labelDisplay}
                </div>

                <div class="w-full md:h-[270px] h-[220px] md:w-[450px]  bg-cover bg-center">
                <div class="w-full h-full bg-cover bg-center hover:scale-110 transition-all"
                    style="background-image: url('${c.thumbPath}');"></div>
                </div>

                <div class="flex w-full relative -mt-5 bg-white/50 max-h-[120px] overflow-hidden">
                <div class="bg-white/25 absolute top-0 left-0 w-full h-full backdrop-blur-md"></div>
                <div class="relative lg:w-[15px] w-[11px] ${c.border}"></div>

                <div class="flex flex-col p-5 lg:py-2 py-2 w-full relative">
                    <div class="${labelDesktopHidden}">
                    <div class="hidden lg:block text-[15px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-2 lg:left-auto left-0 lg:mr-2 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white text-center">
                        ${c.labelDisplay}
                    </div>
                    </div>

                    <h3>
                    <span class="text-[22px] uppercase font-bold">
                        ${c.brandLabel || ''}
                    </span>
                    <br>
                    <span class="font-[200] text-[16px] w-3/4">${c.locName || ''}</span>
                    </h3>

                    <div class="lg:mt-3 uppercase text-[#707070] text-[15px]">
                    ${priceHtml}
                    </div>
                </div>
                </div>
            `;

            cardListEl.appendChild(li);
            });

            // update จำนวนโครงการทั้งหมด
            const total = cards.length;
            const totalEls = document.querySelectorAll('#totalProjects, #totalProjects2');
            totalEls.forEach(el => {
            if (el) el.textContent = total;
            });

            document.querySelector('#productShow').innerHTML = visibleCard();

        } catch (error) {
            console.error('Failed to load data from API:', error);
        }
        };

        const init = () => {
            AOS.init();
            expandMoreFilter();
        };

        onMounted(async () => {
            language.value = getLanguageFromPath();

            // ⭐ สร้าง Property Type ตามภาษา
            renderPropertyTypeOptions(language.value);

            await loadFromApi(language.value);

            // ⭐ หลังจากโหลดการ์ดเรียบร้อยแล้ว ค่อยเช็ค default property type จาก URL
            const defaultType = getDefaultPropertyTypeFromPath(); // 'บ้านเดี่ยว' / 'คอนโดมิเนียม' / 'all'

            if (defaultType !== 'all') {
                const typeConfig = propertyTypeList[language.value] || [];
                const found = typeConfig.find(item => item.value === defaultType);

                if (found) {
                    const container = document.getElementById('property_type');
                    if (container) {
                        // เซ็ต value ที่ custom-selection
                        container.setAttribute('value', found.value);

                        // เปลี่ยน label บนหัว dropdown
                        const labelEl = container.querySelector('p');
                        if (labelEl) {
                            labelEl.textContent = found.label;
                        }
                    }

                    // ฟิลเตอร์การ์ดตาม property_type ที่เซ็ตไว้
                    filterCard('property_type');
                }
            }

            nextTick(() => {
                init();
            });
        });

        return { language };
    }
});

// ตัวแปร + ฟังก์ชัน global เดิม ใช้ต่อได้เลย
var filterNumber = 0;
var cardNum = 4;

function toggleView() {
    document.querySelector('#discovery')
        .setAttribute('attr-list-type', event.target.getAttribute("attr-icon"));
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
    }

    filterNumber += cardNum;

    setDataLayer(propertyLoadMore);

    document.querySelector('#productShow').innerHTML = visibleCard();
}

function selectFilter(ev) {
    document.querySelector('#' + ev.dataset["type"] + ' ' + 'p').innerHTML = ev.innerHTML;
    document.querySelector('#' + ev.dataset["type"]).setAttribute('value', ev.value);
    var property_brand, property_type, property_location, filter_section;
    filter_section = [];
    property_brand = document.querySelector('#property_brand').getAttribute('value');
    property_type = document.querySelector('#property_type').getAttribute('value');
    property_location = document.querySelector('#property_location').getAttribute('value');
    if (ev.dataset["type"] == "property_brand") {
        document.querySelector('#property_brand').setAttribute('data-project_label', ev.dataset["project_label"] || '');
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
    let project_label = [];
    cardList.forEach(e => {
        if (!e.classList.contains('hidden')) {
            project_label.push(e.dataset['project_label']);
        }
    });

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
    });

    btn.classList.add('hidden');
    document.querySelector('#productShow').innerHTML = visibleCard();

    const getLanguageFromPath = () => {
        const path = window.location.pathname;
        const match = path.match(/\/(th|en)(\/|$)/);
        return match ? match[1] : 'th';
    };

    if (visibleCard() == 0) {
        document.querySelector('.no-data').classList.remove('hidden');
        document.querySelector('.no-data').innerHTML =
            getLanguageFromPath() == "en" ? `no projects found` : "ไม่พบโครงการ";
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
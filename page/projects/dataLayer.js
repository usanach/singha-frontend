// =========================
// CONFIG & PROJECT META
// =========================


const getLanguageFromPath = () => {
    const path = window.location.pathname;
    const match = path.match(/\/(th|en)(\/|$)/);
    return match ? match[1] : 'th';
};

const lang = getLanguageFromPath();
const currentPath = window.location.pathname;

// เก็บค่าที่จะใช้กับ dataLayer ทุก event ในหน้านี้
let projectMeta = {
    property_brand: '',
    project_label: '',
    property_type: '',
    property_location: '',
    property_price: '-'
};

/**
 * initProjectMeta
 * - โหลดข้อมูลจาก
 *   - /api/global/project-location
 *   - /api/global/project-brand
 * - หา record ที่ url[lang] ตรงกับ path ปัจจุบัน
 * - map brand, type, location, price, label
 */
async function initProjectMeta() {
    try {
        const [locationRes, brandRes] = await Promise.all([
            axios.get(`${apiBaseUrl}/global/project-location`),
            axios.get(`${apiBaseUrl}/global/project-brand`)
        ]);

        const locationData = (locationRes.data && locationRes.data.data) || [];
        const brandData = (brandRes.data && brandRes.data.data) || [];

        // หา location record จาก url ตามภาษา
        const locRow = locationData.find(item => {
            return item.url && item.url[lang] === currentPath;
        });
        // console.log(locationData);

        if (locRow) {
            // หา brand จาก filter_component_item_l2_id (ชื่อแบรนด์ฝั่ง TH ที่ผูกกับ location)
            let brandObj = null;

            if (locRow.filter_component_item_l2_id) {
                // match แบบตรงตัวก่อน
                brandObj = brandData.find(b =>
                    b.title &&
                    b.title.th &&
                    b.title.th === locRow.filter_component_item_l2_id
                );

                // ถ้าไม่เจอ ลองใช้ contains (กรณีชื่อไม่ตรง 100%)
                if (!brandObj) {
                    brandObj = brandData.find(b =>
                        b.title &&
                        b.title.th &&
                        locRow.filter_component_item_l2_id.includes(b.title.th)
                    );
                }
            }

            // ชื่อแบรนด์ตามภาษาเว็บ
            const brandName =
                (brandObj && brandObj.title && brandObj.title[lang]) ||
                (brandObj && brandObj.title && (brandObj.title.en || brandObj.title.th)) ||
                locRow.filter_component_item_l2_id ||
                '';

            // ประเภทโครงการจาก filter_component_item_l1_id (บ้านเดี่ยว, คอนโดฯ ฯลฯ)
            const propertyType = brandObj ? (brandObj.filter_component_item_l1_id || '') : '';

            // ทำเลตามภาษา
            const propertyLocation =
                (locRow.location && locRow.location[lang]) ||
                (locRow.location && (locRow.location.en || locRow.location.th)) ||
                '';

            // ราคา ตามภาษา ถ้าไม่มีให้ใช้ "-"
            const propertyPrice =
                (locRow.price && locRow.price[lang]) ||
                (locRow.price && (locRow.price.en || locRow.price.th)) ||
                '-';

            projectMeta = {
                property_brand: brandName,
                project_label: locRow.label || '',
                property_type: propertyType,
                property_location: propertyLocation,
                property_price: propertyPrice
            };
        }

        // console.log('PROJECT META from API:', projectMeta);
    } catch (err) {
        console.error('initProjectMeta error:', err);
        // ถ้า error ค่า projectMeta จะยังเป็น default
    }
}

// =========================
// GA / DATALAYER FUNCTIONS
// =========================

// function page on load
function pageLoad() {
    var tracking = {
        event: "view_project",
        landing_page: landing_page,
        section: "property_introduction",
        event_action: "view",
        property_brand: projectMeta.property_brand,
        project_label: projectMeta.project_label,
        property_type: projectMeta.property_type,
        property_location: projectMeta.property_location,
        property_price: projectMeta.property_price
    };

    thisSection = "property_introduction";
    setDataLayer(tracking);
}

//  function to push section scroll on view each section
function pushDataOnView(sectionOnView) {
    tracking = {
        event: "view_project",
        landing_page: landing_page,
        section: sectionOnView,
        event_action: "view",
        property_brand: projectMeta.property_brand,
        project_label: projectMeta.project_label,
        property_type: projectMeta.property_type,
        property_location: projectMeta.property_location,
        property_price: projectMeta.property_price
    };
    // console.log(tracking)
    // console.log(sectionOnView);
    setDataLayer(tracking);
}

// function to push data from sub-header after clicked
function headerOnclick(sectionOnGo) {
    const toSection = sectionOnGo;
    tracking = {
        event: "click_header",
        landing_page: landing_page,
        section: "header",
        event_action: "click",
        header: toSection,
        property_brand: projectMeta.property_brand,
        project_label: projectMeta.project_label,
        property_type: projectMeta.property_type,
        property_location: projectMeta.property_location,
        property_price: projectMeta.property_price
    };
    // console.log(`Section ${toSection} on Click`);
    setDataLayer(tracking);
}

// function to push data from sub-header (register) after clicked
function registerHeaderOnclick(sectionOnGo) {
    const toSection = sectionOnGo;
    tracking = {
        event: "lead_register",
        landing_page: landing_page,
        section: "header",
        event_action: "click",
        button: "register",
        property_brand: projectMeta.property_brand,
        project_label: projectMeta.project_label,
        property_type: projectMeta.property_type,
        property_location: projectMeta.property_location,
        property_price: projectMeta.property_price
    };
    // console.log(thisSection)
    // console.log(`Section ${toSection} on Click`);
    setDataLayer(tracking);
}

// function to push data from project info section menu
function projectDetailOnclick(sproject_detail_selected) {
    tracking = {
        event: "view_project_details",
        landing_page: landing_page,
        section: "project_details",
        event_action: "click",
        project_detail_selected: sproject_detail_selected,
        property_brand: projectMeta.property_brand,
        project_label: projectMeta.project_label,
        property_type: projectMeta.property_type,
        property_location: projectMeta.property_location,
        property_price: projectMeta.property_price
    };
    // console.log(tracking)
    setDataLayer(tracking);
}


// function to push data if user click download map in location section
function locationDownloadMap() {
    tracking = {
        event: "click_get_direction",
        landing_page: landing_page,
        section: "property_location",
        event_action: "click",
        button: "download_map",
        property_brand: projectMeta.property_brand,
        project_label: projectMeta.project_label,
        property_type: projectMeta.property_type,
        property_location: projectMeta.property_location,
        property_price: projectMeta.property_price
    };
    // console.log('download_map');
    setDataLayer(tracking);
}

// function to push data if user click get direction in location section
function locationGetDirection() {
    tracking = {
        event: "click_get_direction",
        landing_page: landing_page,
        section: "property_location",
        event_action: "click",
        button: "view_map",
        property_brand: projectMeta.property_brand,
        project_label: projectMeta.project_label,
        property_type: projectMeta.property_type,
        property_location: projectMeta.property_location,
        property_price: projectMeta.property_price
    };
    // console.log('get_direction');
    setDataLayer(tracking);
}

// s-life expand btn mobile
function sLifeExpandMobile() {
    tracking = {
        event: "click_readmore",
        landing_page: landing_page,
        section: "s_lifestyle",
        event_action: "click",
        button: "readmore",
        property_brand: projectMeta.property_brand,
        project_label: projectMeta.project_label,
        property_type: projectMeta.property_type,
        property_location: projectMeta.property_location,
        property_price: projectMeta.property_price
    };
    // console.log('readmore');
    setDataLayer(tracking);
}

// stickyMenu
function stikyMenu(sbutton) {
    tracking = {
        event: "click_sticky_menu",
        landing_page: landing_page,
        section: "sticky_menu",
        event_action: "click",
        button: sbutton,
        property_brand: projectMeta.property_brand,
        project_label: projectMeta.project_label,
        property_type: projectMeta.property_type,
        property_location: projectMeta.property_location,
        property_price: projectMeta.property_price
    };
    // console.log(sbutton);
    setDataLayer(tracking);
}

// function to push data if user click related project
function relateSelect(data) {
    tracking = {
        event: "select_property",
        landing_page: landing_page,
        section: "related_project",
        event_action: "click",
        property_brand: data[0].project_band,
        project_label: data[0].project_label,
        property_type: data[0].project_type,
        property_location: data[0].project_location,
        property_price: data[0].project_price
    };
    // console.log(data);
    // setDataLayer(tracking);
}

// =========================
// FORM TRACKING
// =========================

document.addEventListener("change", function (event) {
    handleFieldChange(event);
});

document.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission for demonstration purposes
    handleFormSubmit(event);
});

// Helper function to handle field changes
function handleFieldChange(event) {
    if (["INPUT", "SELECT", "TEXTAREA"].includes(event.target.tagName)) {
        const fieldName = event.target.name || event.target.id; // Get the field's name or id
        const fieldValue = event.target.value; // Get the field's value
        const selectedText = event.target.tagName === "SELECT"
            ? event.target.options[event.target.selectedIndex]?.text.trim()
            : ""; // Get the selected text for select elements

        // Helper function to get input or select values by name
        const getInputValueByName = (name) => {
            const input = document.querySelector(`[name="${name}"]`);
            return input ? input.value.trim() : undefined;
        };

        // Helper function to get selected text for a select field
        const getSelectedTextByName = (name) => {
            const select = document.querySelector(`[name="${name}"]`);
            return select ? select.options[select.selectedIndex]?.text.trim() : undefined;
        };

        // Define the dataLayer event
        const dataLayerEvent = {
            event: "form_start",
            landing_page: landing_page,
            section: "lead_register",
            event_action: "fill_info",
            property_brand: projectMeta.property_brand,
            project_label: projectMeta.project_label,
            property_type: projectMeta.property_type,
            property_location: projectMeta.property_location,
            property_price: projectMeta.property_price,
            mobile: getInputValueByName("tel"), // Encode the value of the "tel" input
            email: getInputValueByName("email"), // Encode the value of the "email" input
            budget: getSelectedTextByName("budget"), // Selected text for budget
            province: getSelectedTextByName("province"), // Selected text for province
            district: getSelectedTextByName("district"), // Selected text for district
        };

        // Remove undefined values
        Object.keys(dataLayerEvent).forEach((key) => {
            if (dataLayerEvent[key] === undefined) {
                delete dataLayerEvent[key];
            }
        });

        setDataLayer(dataLayerEvent);
        // console.log("DataLayer Event Pushed (Field Change):");
    }
}

// Helper function to handle form submission
function handleFormSubmit(event) {
    const form = event.target;

    // Helper function to get input or select values by name
    const getInputValueByName = (name) => {
        const input = form.querySelector(`[name="${name}"]`);
        return input ? input.value.trim() : undefined;
    };

    // Helper function to get selected text for a select field
    const getSelectedTextByName = (name) => {
        const select = form.querySelector(`[name="${name}"]`);
        return select ? select.options[select.selectedIndex]?.text.trim() : undefined;
    };

    const getInputDataValueByName = (name) => {
        const input = form.querySelector(`[name="${name}"]`);
        return input ? input.dataset["value"].trim() : undefined;
    };

    // Define the dataLayer event
    const dataLayerEvent = {
        event: "submit_lead",
        landing_page: landing_page,
        section: "lead_register",
        event_action: "click",
        button: "submit_lead",
        consent_get_information: getInputDataValueByName("consents") == "true" ? "accept" : "not accept",
        property_brand: projectMeta.property_brand,
        project_label: projectMeta.project_label,
        property_type: projectMeta.property_type,
        property_location: projectMeta.property_location,
        property_price: projectMeta.property_price,
        mobile: getInputValueByName("tel"), // Encode the value of the "tel" input
        email: getInputValueByName("email"), // Encode the value of the "email" input
        budget: getSelectedTextByName("budget"), // Selected text for budget
        province: getSelectedTextByName("province"), // Selected text for province
        district: getSelectedTextByName("district"), // Selected text for district
    };

    // Remove undefined values
    Object.keys(dataLayerEvent).forEach((key) => {
        if (dataLayerEvent[key] === undefined) {
            delete dataLayerEvent[key];
        }
    });
    setDataLayer(dataLayerEvent);
    // console.log("DataLayer Event Pushed (Form Submit):", dataLayerEvent);
}

// =========================
// DOM READY: INIT OBSERVER & BIND EVENTS
// =========================

document.addEventListener('DOMContentLoaded', async function () {

    // 1) โหลด projectMeta จาก API ให้เสร็จก่อน
    await initProjectMeta();

    // 2) ยิง view แรกของหน้า
    pageLoad();

    //  this part is scroll on view each section --------------------------------------------------
    const sectionsOnview = document.querySelectorAll('.onview');
    // console.log(sectionsOnview);
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // thisSection = entry.target.getAttribute('data-section');
                let viewSection = entry.target.getAttribute('data-section');
                // console.log(`Section ${entry.target.getAttribute('data-section')} is in view`);
                if (viewSection !== undefined || viewSection !== 'null' || viewSection !== '') {
                    pushDataOnView(entry.target.getAttribute('data-section'));

                } else {
                    console.log('null block');
                }

            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    sectionsOnview.forEach(section => {
        observer.observe(section);
    });

    // --------------------------------------------------

    const projectDetailButtonList = document.querySelectorAll('#project_detail .project-detail-button-list');
    projectDetailButtonList.forEach((button, index) => {
        button.addEventListener('click', (d, i) => {
            projectDetailOnclick(button.dataset['name']);
        });
    });
    const projectDetailButtonListM = document.querySelectorAll('#project_detail .project-detail-button-listM');
    projectDetailButtonListM.forEach((button, index) => {
        button.addEventListener('click', () => {
            projectDetailOnclick(button.dataset['name']);
        });
    });
    // if(mobile size)
    if (window.innerWidth < 1024 || window.screen.width < 1024) {
        const expandBtn = document.getElementById('expand-div');
        if (expandBtn) {
            expandBtn.addEventListener('click', () => {
                sLifeExpandMobile();
            });
        }
    }

    const morInfo = document.querySelector('#more-info');
    if (morInfo) {
        morInfo.querySelectorAll('a').forEach((menu, index) => {
            menu.addEventListener('click', () => {
                let sbutton;
                switch (index) {
                    case 0:
                        sbutton = "click_phone";
                        break;
                    case 1:
                        sbutton = "click_chat";
                        break;
                    case 2:
                        sbutton = "click_email";
                        break;
                    default:
                        sbutton = "click_phone";
                }
                stikyMenu(sbutton);
            });
        });
    }

    const subMenuButton = document.querySelectorAll('.sub-header a');
    subMenuButton.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let sectionOnGo = btn.attributes['data-header-click'].value;

            sectionOnGo = sectionOnGo
                .toLowerCase()
                .replace(/#/g, '');

            if (sectionOnGo == "register") {
                registerHeaderOnclick(sectionOnGo);
            } else {
                headerOnclick(sectionOnGo);
            }
        });
    });

    const getLocationBtn = document.querySelectorAll('.get-location');
    getLocationBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            locationGetDirection();
        });
    });

    const downloadMapBtn = document.querySelectorAll('.map-download');
    downloadMapBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            locationDownloadMap();
        });
    });

    // const cardRelate = document.querySelectorAll('.card-relate');
    // console.log('data-property_brand ',cardRelate[0].attributes['data-property_brand'].value);
    // cardRelate.forEach(btn => {
    //     btn.addEventListener('click', () => {
    //         let data = [
    //             {
    //                 project_band: btn.attributes['data-property_brand'].value || "unknow data",
    //                 project_label: btn.attributes['data-project_label'].value || "unknow data",
    //                 project_type: btn.attributes['data-project_type'].value || "unknow data",
    //                 property_location: btn.attributes['data-property_location'].value || "unknow data",
    //                 property_price: btn.attributes['data-property_price'].value || "unknow data",
    //             }
    //         ]
    //         console.log(data);
    //         relateSelect(data);
    //     })
    // })
});

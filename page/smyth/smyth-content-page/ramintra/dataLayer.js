
pageLoad()
// function page on load
function pageLoad() {
    var tracking = {
        event: "view_project",
        landing_page : "project_smyth's_ramintra_page",
        section: "property_introduction",
        event_action: "view",
        property_brand: "SMYTH'S ",
        project_label: "coming_soon",
        property_type: "PRIVATE ESTATE",
        property_location: "SMYTH'S Ramintra",
        property_price: "Start 120 MB. "
    }

    thisSection = "property_introduction";
    setDataLayer(tracking);
}

//  function to push section scroll on view each section
function pushDataOnView(sectionOnView) {
    tracking = {
        event: "view_project",
        landing_page : "project_smyth's_ramintra_page",
        section: sectionOnView,
        event_action: "view",
        property_brand: "SMYTH'S ",
        project_label: "coming_soon",
        property_type: "PRIVATE ESTATE",
        property_location: "SMYTH'S Ramintra",
        property_price: "Start 120 MB. "
    }
    console.log(sectionOnView)
    setDataLayer(tracking);
}

// function to push data from sub-header after clicked
function headerOnclick(sectionOnGo) {
    const toSection = sectionOnGo;
    tracking = {
        event: "click_header",
        landing_page : "project_smyth's_ramintra_page",
        section: "header",
        event_action: "click",
        header: toSection,
        property_brand: "SMYTH'S ",
        project_label: "coming_soon",
        property_type: "PRIVATE ESTATE",
        property_location: "SMYTH'S Ramintra",
        property_price: "Start 120 MB. "
    }
    console.log(`Section ${toSection} on Click`);
    setDataLayer(tracking);
}


// function to push data from sub-header (register) after clicked
function registerHeaderOnclick(sectionOnGo) {
    const toSection = sectionOnGo;
    tracking = {
        event: "lead_register",
        landing_page : "project_smyth's_ramintra_page",
        section: "header",
        event_action: "click",
        button: "register",
        property_brand: "SMYTH'S ",
        project_label: "coming_soon",
        property_type: "PRIVATE ESTATE",
        property_location: "SMYTH'S Ramintra",
        property_price: "Start 120 MB. "
    }
    // console.log(thisSection)
    console.log(`Section ${toSection} on Click`);
    
    setDataLayer(tracking);
}

// function to push data from project info section menu
function projectDetailOnclick(sproject_detail_selected) {
    tracking = {
        event: "view_project_details",
        landing_page : "project_smyth's_ramintra_page",
        section: "project_details",
        event_action: "click",
        project_detail_selected: sproject_detail_selected,
        property_brand: "SMYTH'S ",
        project_label: "coming_soon",
        property_type: "PRIVATE ESTATE",
        property_location: "SMYTH'S Ramintra",
        property_price: "Start 120 MB. ",
    }
    console.log(sproject_detail_selected)
    setDataLayer(tracking);
}


// function projectDetail360Onclick() {
//     tracking = {
//         event: "view_project",
//         landing_page : "project_smyth's_ramintra_page",
//         section: "360_experience",
//         event_action: "view",
//         property_brand: "SMYTH'S ",
//         project_label: "coming_soon",
//         property_type: "PRIVATE ESTATE",
//         property_location: "SMYTH'S Ramintra",
//         property_price: "Start 120 MB. "
//     }
//     // console.log('360_experience')
//     // setDataLayer(tracking);
// }


// function to push data if user click download brochure in project info section
function projectDetailDownloadBrochure() {
    tracking = {
        event: "view_project_details",
        landing_page : "project_smyth's_ramintra_page",
        section: "project_details",
        event_action: "click",
        button: "download_brochure",
        property_brand: "SMYTH'S ",
        project_label: "coming_soon",
        property_type: "PRIVATE ESTATE",
        property_location: "SMYTH'S Ramintra",
        property_price: "Start 120 MB. ",
    }
    console.log('download_brochure')
    setDataLayer(tracking);
    const brochureUrl = "/assets\/image\/page-smyth-ramintra\/E-brochure SMYTH'S Ramintra.pdf"; // Replace with your actual brochure URL
    const link = document.createElement('a');
    link.href = brochureUrl;
    link.download = "E-brochure SMYTH'S Ramintra.pdf";
    link.click();
}

// function to push data if user click download map in location section
function locationDownloadMap() {
    tracking = {
        event: "click_get_direction",
        landing_page : "project_smyth's_ramintra_page",
        section: "property_location",
        event_action: "click",
        button: "download_map",
        property_brand: "SMYTH'S ",
        project_label: "coming_soon",
        property_type: "PRIVATE ESTATE",
        property_location: "SMYTH'S Ramintra",
        property_price: "Start 120 MB. ",
    }
    console.log('download_map')
    setDataLayer(tracking);
}

// function to push data if user click get direction in location section
function locationGetDirection() {
    tracking = {
        event: "click_get_direction",
        landing_page : "project_smyth's_ramintra_page",
        section: "property_location",
        event_action: "click",
        button: "map_location",
        property_brand: "SMYTH'S ",
        project_label: "coming_soon",
        property_type: "PRIVATE ESTATE",
        property_location: "SMYTH'S Ramintra",
        property_price: "Start 120 MB. ",
    }
    console.log('get_direction')
    setDataLayer(tracking);
}

// s-life expand btn mobile
function sLifeExpandMobile() {
    tracking = {
        event: "click_readmore",
        landing_page : "project_smyth's_ramintra_page",
        section: "s_lifestyle",
        event_action: "click",
        button: "readmore",
        property_brand: "SMYTH'S ",
        project_label: "coming_soon",
        property_type: "PRIVATE ESTATE",
        property_location: "SMYTH'S Ramintra",
        property_price: "Start 120 MB. ",
    }
    console.log('readmore')
    setDataLayer(tracking);
}

// stickyMenu
function stikyMenu(sbutton) {
    tracking = {
        event: "click_sticky_menu",
        landing_page : "project_smyth's_ramintra_page",
        section: "sticky_menu",
        event_action: "click",
        button: sbutton,
        property_brand: "SMYTH'S ",
        project_label: "coming_soon",
        property_type: "PRIVATE ESTATE",
        property_location: "SMYTH'S Ramintra",
        property_price: "Start 120 MB. "
    }
    console.log(sbutton)
    setDataLayer(tracking);
}

// function to push data if user click related project
function relateSelect(data) {
    tracking = {
        event: "select_property",
        landing_page : "project_smyth's_ramintra_page",
        section: "related_project",
        event_action: "click",
        property_brand: data[0].project_band,
        project_label: data[0].project_label,
        property_type: data[0].project_type,
        property_location: data[0].project_location,
        property_price: data[0].project_price
    }
    console.log(data);
    // setDataLayer(tracking);
}
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
            landing_page : "project_smyth's_ramintra_page",
            section: "lead_register",
            event_action: "fill_info",
            property_brand: "SMYTH'S ",
            project_label: "coming_soon",
            property_type: "PRIVATE ESTATE",
            property_location: "SMYTH'S Ramintra",
            property_price: "Start 120 MB. ",
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

        setDataLayer(dataLayerEvent)
        console.log("DataLayer Event Pushed (Field Change):");
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
        landing_page : "project_smyth's_ramintra_page",
        section: "lead_register",
        event_action: "click",
        button: "submit_lead",
        consent_get_information: getInputDataValueByName("consents") == "true" ? "accept" : "not accept",
        property_brand: "SMYTH'S ",
        project_label: "coming_soon",
        property_type: "PRIVATE ESTATE",
        property_location: "SMYTH'S Ramintra",
        property_price: "Start 120 MB. ",
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
    setDataLayer(dataLayerEvent)
    // console.log("DataLayer Event Pushed (Form Submit):", dataLayerEvent);
}



document.addEventListener('DOMContentLoaded', function () {

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
                let viewSection = entry.target.getAttribute('data-section')
                
                // console.log(`Section ${entry.target.getAttribute('data-section')} is in view`);
                if (viewSection !== undefined || viewSection !== 'null' || viewSection !== '') {
                    pushDataOnView(entry.target.getAttribute('data-section'));

                } else {
                    console.log('null block')
                }

            }
        });
    };

    const observer = new IntersectionObserver(callback, options);
    sectionsOnview.forEach(section => {
        observer.observe(section);
    });

    // --------------------------------------------------

    const projectDetailButtonList = document.querySelectorAll('#ProjectInformationComponent .project-detail-button-list');
    projectDetailButtonList.forEach((button, index) => {
        button.addEventListener('click', (d,i) => {
            projectDetailOnclick(button.dataset['name']);
        });
    });
    const projectDetailButtonListM = document.querySelectorAll('#ProjectInformationComponent .project-detail-button-listM');
    projectDetailButtonListM.forEach((button, index) => {
        button.addEventListener('click', () => {
            projectDetailOnclick(button.dataset['name']);
        });
    });

    // if(mobile size)
    if (window.innerWidth < 1024 || window.screen.width < 1024) {
        const expandBtn = document.getElementById('expand-div');
        expandBtn.addEventListener('click', () => {
            sLifeExpandMobile();
        })
    }

    const morInfo = document.querySelector('#more-info');
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
            stikyMenu(sbutton)
        });
    })

    const subMenuButton = document.querySelectorAll('.sub-header a');
    subMenuButton.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            let sectionOnGo = btn.attributes['data-header-click'].value
            if (sectionOnGo == "register") {
                registerHeaderOnclick(sectionOnGo)
            } else {
                headerOnclick(sectionOnGo);
            }
        })
    })

    const getLocationBtn = document.querySelectorAll('.get-location');
    getLocationBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            locationGetDirection();
        })
    })

    const downloadMapBtn = document.querySelectorAll('.map-download');
    downloadMapBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            locationDownloadMap();
        })
    })

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
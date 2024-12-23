
// function page on load
function pageLoad() {
    var tracking = {
        event: "view_project",
        landing_page: "project_s'rin_prannok_page",
        section: "property_introduction",
        event_action: "view",
        property_brand: "S'RIN",
        project_label: "coming_soon",
        property_type: "DETACHED HOUSE",
        property_location: "S'RIN Prannok - Kanchana",
        property_price: "45-80 MB."
    }

    thisSection = "property_introduction";
    // setDataLayer(tracking);
}

//  function to push section scroll on view each section
function pushDataOnView(sectionOnView) {
    tracking = {
        event: "view_project",
        landing_page: "project_s'rin_prannok_page",
        section: sectionOnView,
        event_action: "view",
        property_brand: "S'RIN",
        project_label: "coming_soon",
        property_type: "DETACHED HOUSE",
        property_location: "S'RIN Prannok - Kanchana",
        property_price: "45-80 MB."
    }
    console.log(sectionOnView)
    // setDataLayer(tracking);
}

// function to push data from sub-header after clicked
function headerOnclick(sectionOnGo) {
    const toSection = sectionOnGo.querySelector('a').getAttribute('data-header-click');
    tracking = {
        event: "click_header",
        landing_page: "project_s'rin_prannok_page",
        section: "header",
        event_action: "click",
        header: toSection,
        property_brand: "S'RIN",
        project_label: "coming_soon",
        property_type: "DETACHED HOUSE",
        property_location: "S'RIN Prannok - Kanchana",
        property_price: "45-80 MB."
    }
    console.log(`Section ${toSection} on Click`);
    // setDataLayer(tracking);
}

// function to push data from sub-header (register) after clicked
function registerHeaderOnclick(sectionOnGo) {
    const toSection = sectionOnGo.querySelector('.register-btn-sticky-wrapper a').getAttribute('data-header-click');
    tracking = {
        event: "lead_register",
        landing_page: "project_s'rin_prannok_page",
        section: "header",
        event_action: "click",
        button: "register",
        property_brand: "S'RIN",
        project_label: "coming_soon",
        property_type: "DETACHED HOUSE",
        property_location: "S'RIN Prannok - Kanchana",
        property_price: "45-80 MB."
    }
    // console.log(thisSection)
    console.log(`Section ${toSection} on Click`);
    // setDataLayer(tracking);
}

// function to push data from project info section menu
function projectDetailOnclick(project_detail_selected) {
    tracking = {
        event: "view_project_details",
        landing_page: "project_s'rin_prannok_page",
        section: "project_details",
        event_action: "click",
        project_detail_selected: project_detail_selected,
        property_brand: "S'RIN",
        project_label: "coming_soon",
        property_type: "DETACHED HOUSE",
        property_location: "S'RIN Prannok - Kanchana",
        property_price: "45-80 MB.",
    }
    console.log(project_detail_selected)
    // setDataLayer(tracking);
}


// function projectDetail360Onclick() {
//     tracking = {
//         event: "view_project",
//         landing_page: "project_s'rin_prannok_page",
//         section: "360_experience",
//         event_action: "view",
//         property_brand: "S'RIN",
//         project_label: "coming_soon",
//         property_type: "DETACHED HOUSE",
//         property_location: "S'RIN Prannok - Kanchana",
//         property_price: "45-80 MB."
//     }
//     // console.log('360_experience')
//     // setDataLayer(tracking);
// }


// function to push data if user click download brochure in project info section
function projectDetailDownloadBrochure() {
    tracking = {
        event: "view_project_details",
        landing_page: "project_s'rin_prannok_page",
        section: "project_details",
        event_action: "click",
        button: "download_brochure",
        property_brand: "S'RIN",
        project_label: "coming_soon",
        property_type: "DETACHED HOUSE",
        property_location: "S'RIN Prannok - Kanchana",
        property_price: "45-80 MB.",
    }
    console.log('download_brochure')
    // setDataLayer(tracking);
}

// function to push data if user click download map in location section
function locationDownloadMap() {
    tracking = {
        event: "click_get_direction",
        landing_page: "project_s'rin_prannok_page",
        section: "property_location",
        event_action: "click",
        button: "download_map",
        property_brand: "S'RIN",
        project_label: "coming_soon",
        property_type: "DETACHED HOUSE",
        property_location: "S'RIN Prannok - Kanchana",
        property_price: "45-80 MB.",
    }
    console.log('download_map')
    // setDataLayer(tracking);
}

// function to push data if user click get direction in location section
function locationGetDirection() {
    tracking = {
        event: "click_get_direction",
        landing_page: "project_s'rin_prannok_page",
        section: "property_location",
        event_action: "click",
        button: "map_location",
        property_brand: "S'RIN",
        project_label: "coming_soon",
        property_type: "DETACHED HOUSE",
        property_location: "S'RIN Prannok - Kanchana",
        property_price: "45-80 MB.",
    }
    console.log('get_direction')
    // setDataLayer(tracking);
}

// s-life expand btn mobile
function sLifeExpandMobile() {
    tracking = {
        event: "click_readmore",
        landing_page: "project_s'rin_prannok_page",
        section: "s_lifestyle",
        event_action: "click",
        button: "readmore",
        property_brand: "S'RIN",
        project_label: "coming_soon",
        property_type: "DETACHED HOUSE",
        property_location: "S'RIN Prannok - Kanchana",
        property_price: "45-80 MB.",
    }
    console.log('readmore')
    // setDataLayer(tracking);
}

// stickyMenu
function stikyMenu(sbutton) {
    tracking = {
        event: "click_sticky_menu",
        landing_page: "project_s'rin_prannok_page",
        section: "sticky_menu",
        event_action: "click",
        button: sbutton,
        property_brand: "S'RIN",
        project_label: "coming_soon",
        property_type: "DETACHED HOUSE",
        property_location: "S'RIN Prannok - Kanchana",
        property_price: "45-80 MB."
    }
    console.log(sbutton)
    // setDataLayer(tracking);
}

// function to push data if user click related project
function relateSelect(data) {
    tracking = {
        event: "select_property",
        landing_page: "project_s'rin_prannok_page",
        section: "related_project",
        event_action: "click",
        property_brand: data.project_band,
        project_label: data.project_label,
        property_type: data.project_type,
        property_location: data.project_location,
        property_price: data.project_price
    }
    console.log(data)
    // setDataLayer(tracking);
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
        button.addEventListener('click', () => {
            let project_detail_selected;
            switch (index) {
                case 0:
                    project_detail_selected = "project_detail";
                    break;
                case 1:
                    project_detail_selected = "floor_plan";
                    break;
                case 2:
                    project_detail_selected = "facility";
                    break;
                case 3:
                    project_detail_selected = "service";
                    break;
                default:
                    project_detail_selected = "project_detail";
            }

            projectDetailOnclick(project_detail_selected);
        });
    });

    const cardRelate = document.querySelectorAll('.card-relate');
    cardRelate.forEach(btn => {
        btn.addEventListener('click', () => {
            data = [
                {
                    project_band: btn.attributes['data-property_brand'],
                    project_label: btn.attributes['data-project_label'],
                    project_type: btn.attributes['data-project_type'],
                    property_location: btn.attributes['data-property_location'],
                    property_price: btn.attributes['data-property_price'],
                }
            ]
            relateSelect(data);
        })
    })

    // if(mobile size)
    if(window.innerWidth < 1024 || window.screen.width < 1024) {
        const expandBtn = document.getElementById('expand-div');
        expandBtn.addEventListener('click', () => {
            sLifeExpandMobile();
        })
    }
    
    const morInfo = document.querySelector('.more-info');
    morInfo.querySelectorAll('.info-menu').forEach((menu, index) => {
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
});
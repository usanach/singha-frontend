function pageLoad() {
    var tracking = {
        click_sub_header: "view_project",
        landing_page: "project_the_extro_page",
        section: "property_introduction",
        event_action: "view",
        property_brand: "The EXTRO",
        project_label: "new_project",
        property_type: "condo",
        property_location: "Phayathai-Rangnam ",
        property_price: "STARTS 5.99 MB"
    }
    // thisSection = "property_introduction";
    // setDataLayer(tracking);
}

function pushDataOnView(sectionOnView) {
    tracking = {
        event: "view_project",
        landing_page: "project_the_extro_page",
        section: sectionOnView,
        event_action: "view",
        property_brand: "The EXTRO",
        project_label: "new_project",
        property_type: "condo",
        property_location: "Phayathai-Rangnam ",
        property_price: "STARTS 5.99 MB"
    }
    // console.log(sectionOnView)
    // setDataLayer(tracking);
}

function headerOnclick(sectionOnGo) {
    const toSection = sectionOnGo.querySelector('a').getAttribute('data-header-click');
    tracking = {
        click_sub_header: "click_header",
        landing_page: "project_the_extro_page",
        section: "header",
        event_action: "click",
        header: toSection,
        property_brand: "The EXTRO",
        project_label: "new_project",
        property_type: "condo",
        property_location: "Phayathai-Rangnam ",
        property_price: "STARTS 5.99 MB"
    }
    // console.log(`Section ${toSection} on Click`);
    // setDataLayer(tracking);
}

function registerHeaderOnclick(sectionOnGo) {
    const toSection = sectionOnGo.querySelector('.register-btn-sticky-wrapper a').getAttribute('data-header-click');
    tracking = {
        click_sub_header: "click_header",
        landing_page: "project_the_extro_page",
        section: "header",
        event_action: "click",
        button: "register",
        property_brand: "The EXTRO",
        project_label: "new_project",
        property_type: "condo",
        property_location: "Phayathai-Rangnam ",
        property_price: "STARTS 5.99 MB"
    }
    // console.log(thisSection)
    // console.log(`Section ${toSection} on Click`);
    // setDataLayer(tracking);
}

function projectDetailOnclick(project_detail_selected) {
    tracking = {
        click_sub_header: "view_project_details",
        landing_page: "project_the_extro_page",
        section: "project_details",
        event_action: "click",
        project_detail_selected: project_detail_selected,
        property_brand: "The EXTRO",
        project_label: "new_project",
        property_type: "condo",
        property_location: "Phayathai-Rangnam ",
        property_price: "STARTS 5.99 MB"
    }
    // console.log(project_detail_selected)
    // setDataLayer(tracking);
}

function projectDetail360Onclick() {
    tracking = {
        click_sub_header: "view_project_details",
        landing_page: "project_the_extro_page",
        section: "project_details",
        event_action: "click",
        button: "360_experience",
        property_brand: "The EXTRO",
        project_label: "new_project",
        property_type: "condo",
        property_location: "Phayathai-Rangnam ",
        property_price: "STARTS 5.99 MB"
    }
    // console.log('360_experience')
    // setDataLayer(tracking);
}

function projectDetailDownloadBrochure() {
    tracking = {
        click_sub_header: "view_project_details",
        landing_page: "project_the_extro_page",
        section: "project_details",
        event_action: "click",
        button: "download_brochure",
        property_brand: "The EXTRO",
        project_label: "new_project",
        property_type: "condo",
        property_location: "Phayathai-Rangnam ",
        property_price: "STARTS 5.99 MB"
    }
    // console.log('download_brochure')
    // setDataLayer(tracking);
}

function locationDownloadMap() {
    tracking = {
        click_sub_header: "click_get_direction",
        landing_page: "project_the_extro_page",
        section: "property_location",
        event_action: "click",
        button: "download_map",
        property_brand: "The EXTRO",
        project_label: "new_project",
        property_type: "condo",
        property_location: "Phayathai-Rangnam ",
        property_price: "STARTS 5.99 MB"
    }
    // console.log('download_map')
    // setDataLayer(tracking);
}

function locationGetDirection() {
    tracking = {
        click_sub_header: "click_get_direction",
        landing_page: "project_the_extro_page",
        section: "property_location",
        event_action: "click",
        button: "get_direction",
        property_brand: "The EXTRO",
        project_label: "new_project",
        property_type: "condo",
        property_location: "Phayathai-Rangnam ",
        property_price: "STARTS 5.99 MB"
    }
    // console.log('get_direction')
    // setDataLayer(tracking);
}

function relateSelect() {
    tracking = {
        click_sub_header: "select_property",
        landing_page: "project_the_extro_page",
        section: "related_project",
        event_action: "click",
        property_brand: "The EXTRO",
        project_label: "new_project",
        property_type: "condo",
        property_location: "Phayathai-Rangnam ",
        property_price: "STARTS 5.99 MB"
    }
    // console.log('related_project')
    // setDataLayer(tracking);
}

document.addEventListener('DOMContentLoaded', function () {
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
});
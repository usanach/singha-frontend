
function showModal(name) {
    document.querySelector('.' + name).classList.add('show');
}

function hideModal(name) {
    document.querySelector('.' + name).classList.remove('show');
}

function exploreMore(ev) {
    var tracking = {
        event: "click_view_promotion",
        landing_page: "campaign_page",
        section: "promotion_banner",
        event_action: "click",
    }
    ev.dataset["promotion_name"] != undefined ? tracking.promotion_name = ev.dataset["promotion_name"] : "";
    ev.dataset["promotion_start"] != undefined ? tracking.promotion_start = ev.dataset["promotion_start"] : "";
    ev.dataset["promotion_end"] != undefined ? tracking.promotion_end = ev.dataset["promotion_end"] : "";
    console.log(tracking);
    // setDataLayer(tracking);
}

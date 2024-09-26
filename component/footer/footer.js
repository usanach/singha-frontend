exportFooter();

function expandFooter(ev) {
    ev.classList.toggle('expanded');
}
async function exportFooter() {
    const resp = await getFooterData();
    const social =  getSocialMedia();
    
    var temp = `<div class="bg-[#E9E2DC] lg:pt-5 pb-0 text-[#1A2F4D] font-['Gotham']">
                    <div class="container">
                        <div class="flex flex-wrap "> 
                            <div class="lg:w-3/4 w-full flex flex-wrap lg:flex-nowrap pt-10 gap-1">
                                ${resp != undefined
            ? resp.map(tab => {
                return `<div class="flex flex-col lg:w-1/3 w-full gap-10 relative">
                            <div class="w-full">
                                <ul class="flex flex-col gap-1">
                                    ${tab.data != undefined
                        ? tab.data.map((data, index) => {
                            return `<li class="relative ${tab.tab == 3 ? "expanded" : "expand"}" ${tab.tab == 3 ? "" : 'onclick="expandFooter(this)"'}>
                                        <div>
                                        ${data.name != "" ? ` <button type="button" class="relative w-full text-left" >
                                                <p class="font-['IBM_Plex_Sans_Thai'] text-[16px] font-bold">${data.name}</p>
                                                ${data.brands != undefined ? `
                                                <div class="footer-expand-icon ${tab.tab == 3 ? "!hidden" : ""}">
                                                    <img src="${window.location.origin}/assets/icon/plus-black.svg" class="w-full open">
                                                    <img src="${window.location.origin}/assets/icon/minus-black.svg" class="w-full close">
                                                </div> `: ""}
                                            </button>`: ``}
                                            ${data.brands != undefined ? `
                                            <ul class=" flex-col lg:gap-1 gap-2 list ${index == 0 ? "mt-1" : ""}">
                                                ${data.brands.map(
                                brands => {
                                    return `
                                                <li class="flex flex-col gap-1">
                                                    ${brands.name == "" ? "" : `
                                                    <a ${brands.link != "" && brands.link != undefined ? `href="${brands.link}"` : ""}  ${tab.tab == 3 ? 'onclick="selectFooterSubHeader(this)"' : 'onclick="selectFooterProperty(this)"'}
                                                    class="font-['IBM_Plex_Sans_Thai'] text-[14px] "
                                                        ${tab.tab == 3 ? `data-sub_header="${brands.name}"` : ''}
                                                        ${brands.name != undefined ? `data-property_brand="${brands.name}"` : ''}
                                                        ${brands.label != undefined ? `data-project_label="${brands.label}"` : ''}
                                                        ${brands.type != undefined ? `data-property_type="${brands.type}"` : ''}
                                                        ${brands.name != undefined ? `data-property_location="${brands.name}"` : ''}
                                                        ${brands.price != undefined ? `data-property_price="${brands.price}"` : ''}
                                                    >
                                                        <b class="${brands.link != "" && brands.link != undefined ? `` : ""}">${brands.name}</b>
                                                    </a>
                                                    `}
                                                    ${brands.location != undefined ? `
                                                    <ul class="flex flex-col gap-1">
                                                        ${brands.location.map(
                                        location => {
                                            return `
                                                        <li>
                                                            <a href="${location.link}" onclick="selectFooterProperty(this)" class="font-['IBM_Plex_Sans_Thai'] text-[14px] "
                                                                ${brands.name != undefined ? `data-property_brand="${brands.name}"` : ''}
                                                                ${location.label != undefined ? `data-project_label="${location.label}"` : ''}
                                                                ${location.type != undefined ? `data-property_type="${location.type}"` : ''}
                                                                ${location.name != undefined ? `data-property_location="${location.name}"` : ''}
                                                                ${location.price != undefined ? `data-property_price="${location.price}"` : ''}
                                                            >
                                                                ${location.name}
                                                            </a>
                                                        </li>` }).join("")
                                            }
                                                    </ul>
                                                    ` : ""}
                                                </li>`}).join("")}
                                            </ul>` : ""}
                                        </div>
                                    </li>`;
                        }).join("") : ""}
                                </ul>
                            </div>
                        </div>`;
            }).join("") : ""}
                            </div>
                            <div class="flex flex-col lg:w-1/4 w-full gap-5 lg:pt-0 pt-5">
                                <div class="w-full">
                                    <div class="flex flex-col gap-5"><img src="${window.location.origin}/assets/image/residential/logo-footer.svg" class="lg:w-[170px] w-[150px]">
                                        <!-- <p class="uppercase mt-5 md:text-left text-center"><b>singha estate pcl.</b></p> -->
                                        <p class="text-left font-['IBM_Plex_Sans_Thai'] text-[14px]">
                                           บริษัท สิงห์ เอสเตท จำกัด (มหาชน) <br/> อาคารซันทาวเวอร์ส บี, ชั้น 40 เลขที่ 123 <span class="text-nowrap">ถนนวิภาวดีรังสิต</span> <span class="text-nowrap">แขวงจอมพล</span> เขตจตุจักร​ กรุงเทพมหานคร 10900
                                        </p>
                                    </div>
                                </div>
                                <div class="w-full flex flex-col gap-3">
                                    <div>
                                        <p class="uppercase text-[30px] font-['IBM_Plex_Sans_Thai']"><b>call 1221</b></p>
                                    </div>
                                    <div>
                                        <p class="text-left font-['IBM_Plex_Sans_Thai'] text-[14px]">
                                            ติดตาม Social Media
                                        </p>
                                    </div>
                                    <div class="flex gap-5">
                                    ${social != undefined
            ? social.data.map(
                (data) => {
                    return `<a href="${data.attributes.url}"><img src="${data.attributes.image.data.attributes.url}" class="w-[30px]"></a>`;
                }).join("") : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="border border-[#D1BFAF] my-5 mb-0">
                        <div class="flex justify-between flex-wrap gap-3 py-2">
                            <div class="md:text-right text-center md:mr-0 mr-auto text-[12px]">Copyright © 2024, Singha Estate
                                Public
                                Company Limited.</div>
                        </div>
                    </div>
                </div>`;

    document.getElementById('footer').innerHTML = temp;
}

function selectFooterSubHeader(ev) {
    var tracking = {
        event: "click_sub_header",
        landing_page: "home_page",
        section: "footer",
        event_action: "click",
    }
    ev.dataset["sub_header"] != undefined ? tracking.sub_header = ev.dataset["sub_header"] : "";
    setDataLayer(tracking);
}
function selectFooterProperty(ev) {
    var tracking = {
        event: "select_property",
        landing_page: "home_page",
        section: "footer",
        event_action: "click",
    }
    ev.dataset["property_brand"] != undefined ? tracking.property_brand = ev.dataset["property_brand"] : "";
    ev.dataset["project_label"] != undefined ? tracking.project_label = ev.dataset["project_label"] : "";
    ev.dataset["property_type"] != undefined ? tracking.property_type = ev.dataset["property_type"] : "";
    ev.dataset["property_location"] != undefined ? tracking.property_location = ev.dataset["property_location"] : "";
    ev.dataset["property_price"] != undefined ? tracking.property_price = ev.dataset["property_price"] : "";
    setDataLayer(tracking);
}
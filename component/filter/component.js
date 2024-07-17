var filterNumber = 0;
window.onload = function () {
    setFilterTemp();
}

function selectOptions(id) {
    document.querySelector('#' + id + ' ' + 'p').innerHTML = event.target.innerHTML;
    document.querySelector('#' + id).setAttribute('value', event.target.value);
}
function toggleView() {
    document.querySelector('#discovery').setAttribute('attr-list-type', event.target.getAttribute("attr-icon"));
}

async function setFilterTemp(ev) {
    var type = document.querySelector("#filter").dataset['card'] != (undefined || "" || null) ? document.querySelector("#filter").dataset['card'] : "";
    var path = type == "" ? "/data/discovery.json"
        : type == "promotion" ? "/data/promotion.json" : "";
    var cardNum = type == "promotion" ? 6 : 4;
    const resp = await getData(`${window.location.origin}${path}`);
    filterNumber += cardNum;
    var temp = `
    <div
    class="md:bg-[url('./../assets/image/story/bg.svg')] bg-[url('./../assets/image/story/bg-m.svg')] bg-no-repeat bg-cover bg-center py-10">
        <div class="container">
            <h2 class="font-['Cinzel'] text-[#2C2C2C] lg:text-[30px] text-[24px] uppercase text-center">
                ${document.querySelector("#filter").dataset['title'].match(/\b(\w)/g).map((char, index) => {
        return `<span class="lg:text-[35px] text-[28px]">${char}</span>${document.querySelector("#filter").dataset['title'].split(" ")[index].replace(/\b(\w)/g, '')} `
    }).join('')}
                
            </h2>
        </div>
        <div class="container py-5 ${document.querySelector('#filter').dataset['filter'] == "true" ? "lg:pt-5" : ""} pt-0 lg:pb-5 pb-0">
        ${document.querySelector('#filter').dataset['filter'] == "true" ? `<div class="discovery-filter ${type == "promotion" ? "lg:w-full" : "lg:w-3/4"} mx-auto">
                <div class="flex lg:flex-row flex-col lg:gap-10 gap-3">
                    <div class="lg:hidden block ml-auto mb-2 mt-14">
                        <button type="button" onclick="hideModal('discovery-filter')">
                            <img src="./assets/icon/close.svg" alt="icon">
                        </button>
                    </div>
                    <custom-selection id="property_type" class="selection-group"
                        onclick="this.classList.toggle('selected')"
                        onmouseleave="this.classList.remove('selected')">
                        <div class="relative border border-1 border-[#948668] bg-white h-[40px]">
                            <div class="absolute left-0 top-0 w-full h-full">
                                <span class="absolute right-0 top-1/2 -translate-y-1/2 mr-3">
                                    <img src="./assets/icon/dropdown.svg" class="w-[20px]" alt="icon">
                                </span>
                                <p class="p-2 relative text-[14px]">Property type</p>
                            </div>
                        </div>
                        <options>
                            <option value="1" onclick="selectOptions('property_type')">Option 1</option>
                            <option value="2" onclick="selectOptions('property_type')">Option 2</option>
                            <option value="3" onclick="selectOptions('property_type')">Option 3</option>
                            <option value="4" onclick="selectOptions('property_type')" disabled>Option 4
                            </option>
                        </options>
                    </custom-selection>
                    <custom-selection id="location" class="selection-group"
                        onclick="this.classList.toggle('selected')"
                        onmouseleave="this.classList.remove('selected')">
                        <div class="relative border border-1 border-[#948668] bg-white h-[40px]">
                            <div class="absolute left-0 top-0 w-full h-full">
                                <span class="absolute right-0 top-1/2 -translate-y-1/2 mr-3">
                                    <img src="./assets/icon/dropdown.svg" class="w-[20px]" alt="icon">
                                </span>
                                <p class="p-2 relative text-[14px]">Location</p>
                            </div>
                        </div>
                        <options>
                            <option value="1" onclick="selectOptions('location')">Option 1</option>
                            <option value="2" onclick="selectOptions('location')">Option 2</option>
                            <option value="3" onclick="selectOptions('location')">Option 3</option>
                            <option value="4" onclick="selectOptions('location')" disabled>Option 4
                            </option>
                        </options>
                    </custom-selection>
                    <custom-selection id="brands" class="selection-group"
                        onclick="this.classList.toggle('selected')"
                        onmouseleave="this.classList.remove('selected')">
                        <div class="relative border border-1 border-[#948668] bg-white  h-[40px]">
                            <div class="absolute left-0 top-0 w-full h-full">
                                <span class="absolute right-0 top-1/2 -translate-y-1/2 mr-3">
                                    <img src="./assets/icon/dropdown.svg" class="w-[20px]" alt="icon">
                                </span>
                                <p class="p-2 relative text-[14px]">Brands</p>
                            </div>
                        </div>
                        <options>
                            <option value="1" onclick="selectOptions('brands')">Option 1</option>
                            <option value="2" onclick="selectOptions('brands')">Option 2</option>
                            <option value="3" onclick="selectOptions('brands')">Option 3</option>
                            <option value="4" onclick="selectOptions('brands')" disabled>Option 4
                            </option>
                        </options>
                    </custom-selection>
                </div>
            </div>` : ``}
            <div class="mt-5 ${type == "promotion" ? "lg:w-full" : "lg:w-3/4"} mx-auto">
                <div class="flex justify-between lg:flex-row flex-col">
                    <div class="flex justify-between">
                        <div class="my-auto">
                            <p class="text-[#797E81]">
                                <span class="text-black">${resp.length}</span> <span
                                    class="text-black">PROJECTS</span> (<span>${filterNumber}</span>/<span>${resp.length}</span>)
                            </p>
                        </div>
                        <div class="flex lg:hidden">
                            <button type="button" onclick="showModal('discovery-filter')" class="flex gap-2">
                                <p class="text-[#797E81]">Filter</p>
                                <span><img src="${window.location.origin}/assets/icon/filter.svg" alt="icon"></span>
                            </button>
                        </div>
                    </div>
                    <hr class="border border-[#D1BFAF] lg:my-10 my-7 w-full md:hidden">
                    <div>
                        <ul class="flex gap-3">
                            <li class="show-tiles" attr-icon="show-tiles" onclick="toggleView()"></li>
                            <li class="show-list " attr-icon="show-list" onclick="toggleView()"></li>
                            <li class="map-view " attr-icon="map-view" onclick="toggleView()">
                                <b class="my-auto" attr-icon="map-view">Map view</b>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <ul class="flex flex-wrap gap-5 card-list ${type == "promotion" ? "lg:w-full" : "lg:w-3/4"} w-full mx-auto justify-between">
            ${resp.map((data, index) => {
        border = data.data.name.replace('’', "'").toLowerCase() == "santiburi" ? "bg-[#46111B]" :
            data.data.name.replace('’', "'").toLowerCase() == "la soie de s" ? "bg-[#57893a]" :
                data.data.name.replace('’', "'").toLowerCase() == "smyth's" ? "bg-[#945E4D]" :
                    data.data.name.replace('’', "'").toLowerCase() == "siraninn" ? "bg-[#b49a81]" :
                        data.data.name.replace('’', "'").toLowerCase() == "s'rin" ? "bg-[#003b5E]" :
                            data.data.name.replace('’', "'").toLowerCase() == "shawn" ? "bg-[#5c4580]" :
                                data.data.name.replace('’', "'").toLowerCase() == "sentre" ? "bg-[#7F8372]" :
                                    data.data.name.replace('’', "'").toLowerCase() == "esse" ? "bg-[#182A45]" :
                                        data.data.name.replace('’', "'").toLowerCase() == "extro" ? "bg-[#bf6c29]" : ""
        return `
                                <li class="${type == "" ? "lg:w-[48.9%]" : "lg:w-[32%]"} w-full hidden ${resp.length % cardNum != 0 && index == resp.length - 1 ? "mr-auto" : ""}" 
                                data-aos="fade-up" data-aos-duration="800" data-aos-easing="linear" data-aos-delay="${index * 100}">
                                    <div
                                        class="${data.data.new == true ? 'block lg:hidden' : 'hidden'} lg:text-[16px] text-[12px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-5 lg:left-auto left-0 lg:mr-5 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white font-bold text-center">
                                        New Project</div>
                                    <div>
                                        <img src="${window.location.origin}${data.data.s}" alt="${data.brands}" class="w-full">
                                    </div>
                                    <div class="flex w-full relative -mt-10 bg-white/50 max-h-[95px] overflow-hidden">
                                        <div class="bg-white/25 absolute top-0 left-0 w-full h-full backdrop-blur-md"></div z-0>
                                        <div class="relative lg:w-[15px] w-[11px] ${border}">
                                        </div>
                                        <div class="flex flex-col p-5 lg:py-2 py-2 w-full relative">
                                            <div
                                                class="${data.data.new == true ? 'hidden lg:block' : 'hidden'} text-[12px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-2 lg:left-auto left-0 lg:mr-2 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white text-center">
                                                New Project</div>
                                            <h3 class="text-[14px] uppercase font-bold">${data.data.brands}</h3>
                                            <h3 class="font-normal text-[14px]">${data.data.location}</h3>
                                            ${type == "" ? `<div class="lg:mt-3 uppercase text-[#707070] text-[12px]">
                                            ${data.data.price}</div>` : type == "promotion" ? `<div class="flex gap-1 lg:mt-3 uppercase text-[#707070]">
                                                <img src="${window.location.origin}/assets/icon/clock.svg" alt="icon" class="w-[15px]">
                                                <p class="text-[#A3A3A3] text-[12px] mt-1">${data.data.date}</p>
                                            </div>`: ``}
                                        </div>
                                    </div>
                                </li>`
    }).join('')
        }
            </ul>
            <div class="flex">
                <button type="button" class="btn mt-10 mx-auto" onclick="expandMoreFilter(this)">
                    Explore more property
                </button>
            </div>
        </div>
    </div>`
    document.querySelector('#filter').innerHTML = temp;
    expandMoreFilter();
    AOS.init();
}
function expandMoreFilter(ev) {
    var cardList = document.querySelectorAll('#filter ul.card-list li');
    for (let index = 0; index < filterNumber; index++) {
        const element = cardList[index];
        element.classList.remove('hidden')
    }
    var type = document.querySelector("#filter").dataset['card'] != (undefined || "" || null) ? document.querySelector("#filter").dataset['card'] : "";

    var cardNum = type == "promotion" ? 6 : 4;
    filterNumber += cardNum;

    if (ev) {
        filterNumber >= cardList.length ? ev.classList.add('hidden') : ev.classList.remove('hidden');
    }
}
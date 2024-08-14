brandCollectionTemplate();
function selectProjects(ev) {
    var projectList = document.querySelectorAll('#our_properties_brand_collection .project-list button');
    for (let index = 0; index < projectList.length; index++) {
        const element = projectList[index];
        element.classList.remove('active');
    }

    ev.classList.add('active');
    var productList = document.querySelectorAll(`#our_properties_brand_collection .product-list`);
    var imgList = document.querySelectorAll(`#our_properties_brand_collection .img-list`);
    for (let index = 0; index < productList.length; index++) {
        productList[index].classList.add('hidden');
        imgList[index].classList.add('hidden');

        if (ev.dataset['projects'] == productList[index].dataset['projects']) {
            var productLink = document.querySelectorAll(`#our_properties_brand_collection .product-list[data-projects="${productList[index].dataset['projects']}"] li`);
            var imgCard = document.querySelectorAll(`#our_properties_brand_collection .img-list[data-projects="${productList[index].dataset['projects']}"] li`);
            for (let i = 0; i < productLink.length; i++) {
                i == 0 ? productLink[0].classList.add('link-active') : productLink[i].classList.remove('link-active');
                i == 0 ? imgCard[0].classList.add('active') : imgCard[i].classList.remove('active');
            }
        }
    }
    document.querySelector(`#our_properties_brand_collection .product-list[data-projects="${ev.dataset['projects']}"]`).classList.remove('hidden');
    document.querySelector(`#our_properties_brand_collection .img-list[data-projects="${ev.dataset['projects']}"]`).classList.remove('hidden');
}

function selectProductsCard(ev) {
    var activeLink = document.querySelectorAll('#our_properties_brand_collection .product-list li.link-active');
    for (let index = 0; index < activeLink.length; index++) {
        const element = activeLink[index];
        element.classList.remove('link-active')
    }
    ev.classList.add('link-active');
    var imgList = document.querySelectorAll(`#our_properties_brand_collection .img-list li`);
    for (let index = 0; index < imgList.length; index++) {
        const element = imgList[index];
        element.classList.remove('active');
    }
    document.querySelector(`#our_properties_brand_collection .img-list li[data-name="${ev.dataset['name']}"]`).classList.add('active');
    // var img = document.querySelector(`#our_properties_brand_collection .img-list li img[alt="${ev.dataset['name']}"]`).src;
    // document.querySelector(`#our_properties_brand_collection .brand-collection-bg`).style.backgroundImage = `url('${img}')`;

}
async function brandCollectionTemplate() {
    const our_properties_brand_collection = document.getElementById('our_properties_brand_collection');
    const resp = await brandCollectionData();
    var temp = `
            <div
                class="relative bg-no-repeat bg-center bg-cover py-10 brand-collection-bg bg-[url('./../assets/image/brand/santiburi-bg.webp')]">
                <div class="bg-[#E9E2DC]/75 absolute top-0 left-0 w-full h-full backdrop-blur-md"></div>
                <div class="relative ">
                    <div class="container pb-5">
                        <h2 class="lg:text-[34px] text-[26px] lg:text-start text-center uppercase  font-['Cinzel'] leading-tight"
                            data-aos="fade-up" data-aos-duration="800" data-aos-easing="linear" data-aos-anchor=".trigger-brand-collection" >
                            Our
                            properties brand
                            <br /> Collection
                        </h2>
                        <ul class="flex gap-10 lg:text-[18px] lg:justify-start justify-center project-list mt-3">
                        ${resp != undefined ? resp.map((res, index) => {
        return `
                            <li data-aos="fade-up" data-aos-duration="800" data-aos-easing="linear" data-aos-anchor=".trigger-brand-collection" >
                                <button type="button" data-projects="${res.name}" class="text-nowrap ${index == 0 ? "active" : ""} animate-border-line capitalize" onclick="selectProjects(this)">
                                 <h3 class="font-normal">${res.name}</h3>
                                </button>
                            </li>`
    }).join("") : ""
        }
                        </ul>
                    </div>
                </div>
                <div class="relative">
                    <div class="container">
                        <div class="flex lg:flex-row flex-col-reverse gap-10">
                            <div class="flex-[1_1_40%]">
                             ${resp != undefined ? resp.map((res, index) => {
            return `
                                <div class="${index != 0 ? "hidden" : ""} flex flex-col gap-2 product-list" data-projects="${res.name}">
                                    <ul>
                                        ${res.data != undefined ? res.data.map((data, i) => {
                return `
                                                    <li onmouseenter="selectProductsCard(this)" data-name="${data.name}" class="${i == 0 ? "link-active" : ""} cursor-pointer transition-all duration-300 opacity-50 lg:px-10 px-5 cursor-pointer transition-all duration-300">
                                                        <div class="flex gap-10" data-aos="fade-up" data-aos-duration="800"
                                                            data-aos-anchor=".trigger-brand-collection" data-aos-easing="linear">
                                                            <div class="my-auto">
                                                                <h4 class="lg:text-[30px] text-[26px] font-['Cinzel']">${data.name}</h4>
                                                            </div>
                                                            <a href="${data.link}" target="_blank" onclick="selectBrandCollection(this)"
                                                                data-property_brand="${data.brands}" 
                                                                data-project_label="${data.label}" 
                                                                data-property_type="${data.type}" 
                                                                data-property_location="${data.location}" 
                                                                data-property_price="${data.price}"
                                                                class="border hover:scale-110 hover:bg-black/10 hidden border-1 border-black px-3 py-2 my-auto cursor-pointer transition-all duration-300">
                                                                Explore More
                                                            </a>
                                                        </div>
                                                    </li>`
            }).join("") : ""
                }
                                    </ul>
                                </div>`
        }).join("") : ""
        }
                            </div>
                            <div class="flex-[1_1_60%] lg:-mt-[8rem]">
                                ${resp != undefined ? resp.map((res, i) => {
            return `
                                        <ul class="img-list" data-projects="${res.name}" data-aos="fade-in" data-aos-duration="800"
                                            data-aos-anchor=".trigger-brand-collection" data-aos-easing="linear">
                                                ${res.data != undefined ? res.data.map(((data, index) => {
                return `
                                                        <li class="${index == 0 && i == 0 ? 'active' : ''}" data-name="${data.name}">
                                                            <img src="${window.location.origin}${data.l}" alt="${data.name}">
                                                            <div
                                                                class="py-3 border border-[1rem] ${data.name == "santiburi" ? "border-[#46111B]" : data.name == "la soie de s" ? "border-[#57893a]" : data.name == "smyth’s" ? "border-[#945E4D]" : data.name == "SIRANINN" ? "border-[#b49a81]" : data.name == "s’rin" ? "border-[#003b5E]" : data.name == "shawn" ? "border-[#5c4580]" : data.name == "sentre" ? "border-[#7F8372]" : data.name == "esse" ? "border-[#182A45]" : data.name == "extro" ? "border-[#bf6c29]" : ""} border-t-0 border-r-0 border-b-0 relative">
                                                                <div
                                                                    class="bg-[#E4DCD5]/50 absolute top-0 left-0 w-full h-full backdrop-blur-md brightness-125">
                                                                </div>
                                                                <img src="${window.location.origin}${data.s}" alt="${data.name}"
                                                                    class="mx-auto md:w-[200px] w-[160px] relative">
                                                            </div>
                                                        </li>`
            })).join("") : ""
                }
                                            </ul>`
        }).join("") : ""
        }
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    our_properties_brand_collection.innerHTML = temp;
    AOS.init();
}

function selectBrandCollection(ev) {
    var tracking = {
        event: "select_property",
        landing_page: "home_page",
        section: "property_collection",
        event_action: "click",
        property_brand: ev.dataset["property_brand"],
        project_label: ev.dataset["project_label"],
        property_type: ev.dataset["property_type"],
        property_location: ev.dataset["property_location"],
        property_price: ev.dataset["property_price"]
    }
    setDataLayer(tracking);
}
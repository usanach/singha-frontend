var discoveryNum = 0;
async function setTotalProjects() {
    const data = await getDiscovery();
    document.querySelector('#discovery [name="tt_projects"]').innerHTML = data.length;
    document.querySelector('#discovery [name="max_projects"]').innerHTML = data.length;
}
window.onload = function () {
    setTotalProjects();
    setDiscoveryHtml();
}

function selectOptions(id) {
    document.querySelector('#' + id + ' ' + 'p').innerHTML = event.target.innerHTML;
    document.querySelector('#' + id).setAttribute('value', event.target.value);
}
function toggleView() {
    document.querySelector('#discovery').setAttribute('attr-list-type', event.target.getAttribute("attr-icon"));
}

async function setDiscoveryHtml(ev) {
    const resp = await getDiscovery();
    var cardList = document.querySelector('.card-list');
    cardList.innerHTML = ''
    var temp = resp.slice(0, discoveryNum + 4).map((data, index) => {
        border = data.data.brands.replace('’', "'").toLowerCase() == "shawn" ? "./assets/discovery/border/shawn.svg" :
            data.data.brands.replace('’', "'").toLowerCase() == "s'rin" ? "./assets/discovery/border/srin.svg" :
                data.data.brands.replace('’', "'").toLowerCase() == "siraninn" ? "./assets/discovery/border/siraninn.svg" :
                    data.data.brands.replace('’', "'").toLowerCase() == "santiburi the residences" ? "./assets/discovery/border/santiburi_the_residences.svg" :
                        data.data.brands.replace('’', "'").toLowerCase() == "smyth's" ? "./assets/discovery/border/smyths.svg" :
                            data.data.brands.replace('’', "'").toLowerCase() == "sentre" ? "./assets/discovery/border/sentre.svg" :
                                data.data.brands.replace('’', "'").toLowerCase() == "la soie de s" ? "./assets/discovery/border/la_soie_de_s.svg" : "";
        return `
                    <div class="lg:flex-[1_1_40%] flex-[1_1_100%]" 
                    data-aos="fade-up" data-aos-duration="800" data-aos-easing="linear" data-aos-delay="${index * 100}">
                        <div
                            class="${data.data.new == true ? 'block lg:hidden' : 'hidden'} lg:text-[16px] text-[12px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-5 lg:left-auto left-0 lg:mr-5 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white font-bold text-center">
                            New Project</div>
                        <div>
                            <img src="${data.data.s}" alt="" class="w-full">
                        </div>
                        <div class=" flex w-full relative -mt-10 bg-white/50">
                            <div class="bg-white/75 absolute top-0 left-0 w-full h-full backdrop-blur-md"></div z-0>
                            <div class="relative">
                                <img src="${border}" alt="" class="lg:w-[15px] w-[11px]">
                            </div>
                            <div class="flex flex-col p-5 lg:py-5 py-2 w-full relative">
                                <div
                                    class="${data.data.new == true ? 'hidden lg:block' : 'hidden'} lg:text-[16px] text-[12px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-5 lg:left-auto left-0 lg:mr-5 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white font-bold text-center">
                                    New Project</div>
                                <div class="text-[20px] uppercase font-bold">${data.data.brands}</div>
                                <div>${data.data.location}</div>
                                <div class="lg:mt-3 uppercase text-[#707070] text-[14px]">start ${data.data.price}</div>
                            </div>
                        </div>
                    </div>`
    }).join('');
    discoveryNum += 4;
    if (discoveryNum >= resp.length) {
        ev.classList.add('hidden');
    }
    cardList.innerHTML = temp;
}
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

async function setDiscoveryHtml() {
    const resp = await getDiscovery();
    var cardList = document.querySelector('.card-list');
    cardList.innerHTML = ''
    var temp = resp.slice(0, discoveryNum + 4).map((data, index) => {
        border = data.data.brands == "SHAWN"
            ? "./assets/discovery/border/1.svg" : data.data.brands == "S'RIN"
                ? "./assets/discovery/border/2.svg" : data.data.brands == "SMYTH'S"
                    ? "./assets/discovery/border/3.svg" : data.data.brands == "SIRANINN Residences"
                        ? "./assets/discovery/border/4.svg" : "";
        return `
                    <div class="lg:flex-[1_1_40%] flex-[1_1_100%]" 
                    data-aos="fade-up" data-aos-duration="800" data-aos-easing="linear" data-aos-delay="${index * 100}">
                        <div>
                            <img src="${data.data.s}" alt="" class="w-full">
                        </div>
                        <div class=" flex w-full lg:relative">
                            <div>
                                <img src="${border}" alt="">
                            </div>
                            <div class="flex flex-col p-5 bg-white w-full">
                                <div
                                    class="${data.data.new == true ? '' : 'hidden'} bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 mt-5 lg:left-auto left-0 ml-5 lg:mr-5 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white font-bold text-center">
                                    New Project</div>
                                <div class="text-[20px] uppercase font-bold">${data.data.brands}</div>
                                <div>${data.data.location}</div>
                                <div class="mt-3 uppercase">start ${data.data.price}</div>
                            </div>
                        </div>
                    </div>`
    }).join('');

    discoveryNum += 4;
    cardList.innerHTML = temp;
}
exportFooter();

function expandFooter(ev){
    ev.classList.toggle('expanded');
}

async function exportFooter() {
    const resp = await getFooterData();
    var temp = `
             <div class="bg-[#E9E2DC] pt-20 pb-5 text-[#1A2F4D] font-['Gotham']">
                 <div class="container">
                     <div class="flex flex-wrap "> 
                        <div class="lg:w-3/4 w-full flex flex-wrap lg:flex-nowrap pt-10 gap-5">
                        ${
                            resp != undefined  ? resp.map(res=>{
                                return `
                                <div class="flex flex-col lg:w-1/3 w-full gap-5 relative">
                                    <div class="w-full">
                                        <ul class="flex flex-col gap-5">
                                        ${
                                        res.data.map(res=>{
                                            return `
                                            <li class="relative expand" onclick="expandFooter(this)">
                                                <div class="relative">
                                                    <a href="${res.link}" class="font-['IBM_Plex_Sans_Thai'] text-[18px]  animate-border-line">
                                                        <b>${res.name}</b>
                                                    </a>
                                                    ${
                                                    res.name != "" ?
                                                    `<div class="footer-expand-icon">
                                                        <img src="./assets/icon/plus-black.svg" class="w-full open">
                                                        <img src="./assets/icon/minus-black.svg" class="w-full close">
                                                    </div>`:""
                                                    }
                                                </div>
                                                <ul class=" flex-col gap-2 ${res.name != "" ?"list":""}">
                                                        ${
                                                    res.data !=undefined  ? res.data.map(data=>{
                                                            return`
                                                                <li>
                                                                    <a href="${data.link}" class="font-['IBM_Plex_Sans_Thai'] text-[16px] animate-border-line">
                                                                        <b>${data.name}</b>
                                                                    </a>
                                                                    <ul class="flex flex-col">
                                                                            ${
                                                                        data.data != undefined  ? data.data.map(data=>{
                                                                                return`
                                                                                    <li>
                                                                                        <a href="${data.link}" class="font-['IBM_Plex_Sans_Thai'] text-[16px] animate-border-line">
                                                                                            ${data.name}
                                                                                        </a>
                                                                                    </li>
                                                                                `
                                                                                }).join(''):""
                                                                            }
                                                                    </ul>
                                                                </li>
                                                            `
                                                            }).join(''):""
                                                        }
                                                </ul>
                                            </li>`
                                            }).join('')
                                        }
                                        </ul>
                                    </div>
                                </div>
                                `;
                            }).join(''):""
                        }
                        </div>
                         <div class="flex flex-col lg:w-1/4 w-full gap-5">
                             <div class="w-full">
                                 <div class="flex flex-col gap-5"><img src="./assets/image/residential/logo-footer.svg"
                                         class="w-[220px] lg:mx-auto">
                                     <!-- <p class="uppercase mt-5 md:text-left text-center"><b>singha estate pcl.</b></p> -->
                                     <p class="text-left lg:text-center font-['IBM_Plex_Sans_Thai']">
                                         บริษัท สิงห์ เอสเตท จำกัด (มหาชน)
                                         123 อาคารซันทาวเวอร์ส บี ชั้น 22 ถนนวิภาวดีรังสิต แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร
                                         10900
                                     </p>
                                 </div>
                             </div>
                             <div class="w-full flex flex-col gap-3">
                                 <div>
                                     <h2 class="uppercase text-[35px]"><b>call 1221</b></h2>
                                 </div>
                                 <div>
                                     <p class="text-left lg:text-center font-['IBM_Plex_Sans_Thai']">
                                         ติดตาม Social Media
                                     </p>
                                 </div>
                                 <div class="flex gap-5">
                                     <div><img src="./assets/line.svg" class="w-[30px]"></div>
                                     <div><img src="./assets/facebook.svg" class="w-[30px]"></div>
                                     <div><img src="./assets/ig.svg" class="w-[30px]"></div>
                                     <div><img src="./assets/youtube.svg" class="w-[30px]"></div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <hr class="border border-[#D1BFAF] my-10 mb-5">
                     <div class="flex justify-between flex-wrap gap-3">
                         <div class="md:text-right text-center md:mr-0 mr-auto">Copyright © 2023, Singha Estate
                             Public
                             Company Limited.</div>
                     </div>
                 </div>
             </div>`;

    document.getElementById('footer').innerHTML = temp;
}
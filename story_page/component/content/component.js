function setContentPageNumber() {
    const div = document.querySelector(".pagination p")
    div.innerHTML = `<span>${articleData.length}</span> contents <span class="text-white/50">(${ parseInt(articleData.length / 3)*3}/${articleData.length})</span>`;
    // div.innerHTML = `<span>${articleData.length}</span> contents `;
}

setContent();
function setContent() {
    setContentPageNumber()
    var lists = document.querySelector('#content_list');
    let dataSet = new Array();
    let start = 0;

    for (let index = 0; index < parseInt(articleData.length / 3); index++) {
        dataSet.push(articleData.slice(start, start + 3));
        start += 3;
    }
    var temp = articleData.length > 0 ? `
                ${dataSet.map((d, index) => {
        return `<div class="w-full">
                    <div class="flex gap-5 lg:gap-10 lg:flex-row flex-col-reverse mt-2">
                        <div class="lg:w-1/2 w-full flex flex-col gap-5">
                        ${d.slice(0, 2).map((c, i) => {
            return `<div class="flex flex-col gap-2">
                        <div class="flex gap-5 lg:gap-0 relative">
                            <div class="w-2/5">
                                <img src="${c.thumb}" alt="${c.topic}" data-aos="fade-in"
                                    data-aos-duration="1000" data-aos-easing="linear"
                                    data-aos-delay="700" data-aos-anchor=".content-trigger-pin">
                            </div>
                            <div class="w-3/5">
                                <div class="flex flex-col h-full">
                                    <div
                                        class="lg:px-5 lg:pb-2 flex flex-col lg:gap-3 gap-2 h-full mb-0">
                                        <div>
                                            <p data-aos="fade-up" data-aos-duration="1000"
                                                data-aos-easing="linear" data-aos-delay="0"
                                                data-aos-anchor=".content-trigger-pin"
                                                class="uppercase text-[14px] border border-[3px] border-[#786028] border-r-0 border-t-0 border-b-0 leading-tight pl-3 text-white">
                                                ${c.cate}
                                            </p>
                                        </div>
                                        <div>
                                            <a href="#"
                                                data-article_title="5 Office Design Trends For A Happy Work Life"
                                                onclick="selectArticle(this)">
                                                <h3 data-aos="fade-up" data-aos-duration="1000"
                                                    data-aos-easing="linear" data-aos-delay="100"
                                                    data-aos-anchor=".content-trigger-pin"
                                                    class="text-white font-normal lg:text-[18px] text-[16px]">
                                                    ${c.title}
                                                </h3>

                                            </a>
                                        </div>
                                        <div>
                                            <p data-aos="fade-up" data-aos-duration="1000"
                                                data-aos-easing="linear" data-aos-delay="200"
                                                data-aos-anchor=".content-trigger-pin"
                                                class="text-white text-[14px] ">
                                                ${c.description.slice(0, 100)}....
                                            </p>
                                        </div>
                                        <div class="gap-5 pb-0 relative lg:flex hidden">
                                            <div class="flex gap-1 hidden">
                                                <img src="./assets/icon/hearth.svg" alt=""
                                                    class="w-[15px] -top-[2px] relative"
                                                    data-aos="fade-up" data-aos-duration="1000"
                                                    data-aos-easing="linear"
                                                    data-aos-anchor=".content-trigger-pin"
                                                    data-aos-delay="300">
                                                <p class="text-[#A3A3A3] text-[12px]" data-aos="fade-up"
                                                    data-aos-duration="1000"
                                                    data-aos-anchor=".content-trigger-pin"
                                                    data-aos-easing="linear" data-aos-delay="400">232
                                                </p>
                                            </div>
                                            <div class="flex gap-1">
                                                <img src="./assets/icon/clock.svg" alt=""
                                                    class="w-[15px] -top-[2px] relative"
                                                    data-aos="fade-up" data-aos-duration="1000"
                                                    data-aos-anchor=".content-trigger-pin"
                                                    data-aos-easing="linear" data-aos-delay="500">
                                                <p class="text-[#A3A3A3] text-[12px]" data-aos="fade-up"
                                                    data-aos-duration="1000"
                                                    data-aos-anchor=".content-trigger-pin"
                                                    data-aos-easing="linear" data-aos-delay="600">
                                                    ${c.date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="gap-5 pb-0 relative lg:hidden flex">
                            <div class="flex gap-1 hidden">
                                <img src="./assets/icon/hearth.svg" alt="" data-aos="fade-up"
                                    class="w-[15px] -top-[2px] relative" data-aos-duration="1000"
                                    data-aos-easing="linear" data-aos-delay="300"
                                    data-aos-anchor=".content-trigger-pin">
                                <p class="text-[#A3A3A3] text-[12px]" data-aos="fade-up"
                                    data-aos-duration="1000" data-aos-easing="linear"
                                    data-aos-delay="400" data-aos-anchor=".content-trigger-pin">232</p>
                            </div>
                            <div class="flex gap-1">
                                <img src="./assets/icon/clock.svg" alt="" data-aos="fade-up"
                                    class="w-[15px] -top-[2px] relative" data-aos-duration="1000"
                                    data-aos-easing="linear" data-aos-delay="500"
                                    data-aos-anchor=".content-trigger-pin">
                                <p class="text-[#A3A3A3] text-[12px]" data-aos="fade-up"
                                    data-aos-duration="1000" data-aos-easing="linear"
                                    data-aos-delay="600" data-aos-anchor=".content-trigger-pin">
                                        ${c.date}
                                </p>
                            </div>
                        </div>
                        <hr class="border  border-t-0 border-l-0 border-r-0 border-white/30" />
                    </div>`;
        }).join("")
            }
                        </div>
                        <div class="lg:w-1/2 w-full flex flex-col gap-5">
                        ${d.slice(2, 3).map((c, i) => {
                return `<div class="flex flex-col gap-2">
                                <div class="flex flex-col gap-5 lg:w-[90%]">
                                    <div class="w-full">
                                        <img src="${c.thumb}" alt="${c.topic}" data-aos="fade-up" data-aos-duration="700"
                                            data-aos-easing="linear" data-aos-anchor=".content-trigger-pin">
                                    </div>
                                    <div class="w-full">
                                        <div class="flex flex-col h-full">
                                            <div class="lg:mb-5 flex flex-col gap-2 h-full">
                                                <div>
                                                    <p data-aos="fade-up" data-aos-duration="1000"
                                                        data-aos-easing="linear" data-aos-delay="0"
                                                        data-aos-anchor=".content-trigger-pin"
                                                        class="uppercase text-[14px] border border-[3px] border-[#786028] border-r-0 border-t-0 border-b-0 leading-tight pl-3 text-white">
                                                            ${c.cate}
                                                        </p>
                                                </div>
                                                <div class="">
                                                    <a href="#"
                                                        data-article_title=" Make Your Dream Honeymoon A Reality At CROSSROADS Maldives"
                                                        onclick="selectArticle(this)">
                                                        <h3 data-aos="fade-up" data-aos-duration="1000"
                                                            data-aos-easing="linear" data-aos-delay="100"
                                                            data-aos-anchor=".content-trigger-pin"
                                                            class="text-white  font-normal  lg:text-[18px] text-[16px] ">
                                                                ${c.title}
                                                        </h3>
                                                    </a>
                                                </div>
                                                <div>
                                                    <p data-aos="fade-up" data-aos-duration="1000"
                                                        data-aos-easing="linear" data-aos-delay="200"
                                                        data-aos-anchor=".content-trigger-pin"
                                                        class="text-white text-[14px]">
                                                            ${c.description.slice(0, 100)}....
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex gap-5 pb-0 relative">
                                    <div class="flex gap-1 hidden">
                                        <img src="./assets/icon/hearth.svg" alt="" data-aos="fade-up"
                                            class="w-[15px] -top-[2px] relative" data-aos-duration="1000"
                                            data-aos-easing="linear" data-aos-delay="300"
                                            data-aos-anchor=".content-trigger-pin">
                                        <p class="text-[#A3A3A3] text-[12px]" data-aos="fade-up"
                                            data-aos-duration="1000" data-aos-easing="linear"
                                            data-aos-delay="400" data-aos-anchor=".content-trigger-pin">232</p>
                                    </div>
                                    <div class="flex gap-1">
                                        <img src="./assets/icon/clock.svg" alt="" data-aos="fade-up"
                                            data-aos-duration="1000" data-aos-easing="linear"
                                            class="w-[15px] -top-[2px] relative" data-aos-delay="500"
                                            data-aos-anchor=".content-trigger-pin">
                                        <p class="text-[#A3A3A3] text-[12px]" data-aos="fade-up"
                                            data-aos-duration="1000" data-aos-easing="linear"
                                            data-aos-delay="600" data-aos-anchor=".content-trigger-pin">
                                            ${c.date}
                                        </p>
                                    </div>
                                </div>
                                <hr class="border  border-t-0 border-l-0 border-r-0 border-white/30" />
                            </div>`;
            })}
                        </div>
                    </div>
                </div>`
    }).join("")}`
        : "";

    lists.innerHTML = temp;
}
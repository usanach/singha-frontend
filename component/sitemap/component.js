setSidemapPage();
async function setSidemapPage() {
    const data = await getFooterData();
    console.log(data);
    document.querySelector('#sitemap').innerHTML = `
                <div class="container">
                    <div>
                        <h1 class="uppercase text-[40px] text-center">
                            Sitemap
                        </h1/>
                    </div>
                    <ul class="title">
                        <li class="border border-l-0 border-t-0 border-r-0 py-5 border-[#D1BFAF]">
                            <a href="index.html">
                                หน้าหลักสิงห์เอสเตท
                            </a>
                        </li>
                        ${data.lenght != 0 ? data.map(tab => {
        return `
                        <li class="">
                            <ul class="subtitle">
                        ${tab.data != undefined ? tab.data.map(type => {
            return `
                                <li class="${tab.tab != 3 ? "border border-l-0 border-t-0 border-r-0 py-5 border-[#D1BFAF]" : ""}">
                                    <a ${type.link != undefined || "" ? `href="${type.link}"` : ""}>
                                        ${type.name}
                                    </a>
                                    <ul class="detail">
${type.brands != undefined ? type.brands.map(brands => {
                return `
                                        <li class="${tab.tab == 3 ? "border border-l-0 border-t-0 border-r-0 py-5 border-[#D1BFAF]" : ""}">
                                            <a ${brands.link != undefined || "" ? `href="${brands.link}"` : ""}" class="${tab.tab == 3 ? "subtitle" : ""}">${brands.name}</a>
                                        <ul class="link">
${brands.location != undefined ? brands.location.map(location => {
                    return `                <li>
                                                <a ${location.link != undefined || "" ? `href="${location.link}"` : ""}>
                                                    ${location.name}
                                                </a>
                                            </li>`
                }).join("") : ""}
                                           
                                        </ul>
                                        
                                            </li>`;
            }).join("") : ""}
                                    </ul>
                                </li>`
        }).join("") : ""}
                                
                            </ul>
                        </li>
                            `
    }).join("") : ""}
                    </ul>
                </div>
        `;
}
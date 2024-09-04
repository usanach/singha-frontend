
var hightLightSwipe = new Swiper(".highlight-story-slide", {
    allowTouchMove: false,
    effect: "fade",
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: ".highlight-story-slide .custom-pagination-square",
        clickable: true
    },
});

function highlightSelect(ev) {
    var tracking = {
        event: "click_highlight_stories",
        landing_page: landing_page,
        section: "highlight_stories",
        event_action: "click",
        article_name: ev.dataset["article_title"]
    }
    hightLightSwipe.slideTo(ev.dataset["slide"]);
    setDataLayer(tracking);
}
function selectArticle(ev) {
    var tracking = {
        event: "click_content",
        landing_page: landing_page,
        section: "content_container",
        event_action: "click",
        article_name: ev.dataset["article_title"]
    }
    setDataLayer(tracking);
}
function exploreMore(ev) {
    var tracking = {
        event: "explore_more_content",
        landing_page: landing_page,
        section: "content_container",
        event_action: "click",
        button: "explore_more_content"
    }
    setDataLayer(tracking);
}
setHighlightStoriesTemp();

hightLightSwipe.on('slideChange', function () {
    const lists = document.querySelectorAll(`#highlight_list [data-slide]`);
    for (let index = 0; index < lists.length; index++) {
        if (index == hightLightSwipe.realIndex) {
            const element = lists[index];
            element.classList.add('text-black');
            element.classList.add('border-black');
            element.classList.remove('text-black/40');
            element.classList.remove('border-black/40');

        } else {
            const element = lists[index];
            element.classList.remove('text-black');
            element.classList.remove('border-black');
            element.classList.add('text-black/40');
            element.classList.add('border-black/40');
        }
    }

    // Do something when slide changes
});
function setHighlightStoriesTemp() {
    const listDesktop = document.querySelector("#highlight_list");

    var slidesTemp = articleData ? articleData.slice(0,3).map((d, index) => {
        return `
                <div class="swiper-slide">
                    <div class="w-full overflow-hidden relative">
                        <img src="${d.thumb}"
                            alt="${d.topic}"
                            class="w-full hover:scale-110 transition-all duration-1000">
                        <div
                            class="absolute bottom-0 left-0 w-full p-5 lg:hidden block bg-gradient-to-t from-black/75 to-transparent text-white">
                            <h3 class="text-[24px]  font-normal"
                                data-aos="fade-up" data-aos-duration="1000"
                                data-aos-easing="linear" data-aos-delay="${(index + 1) * 200}"
                                data-aos-anchor=".section-1-trigger">
                                ${d.title}
                            </h3>
                            <p class="text-[14px]" data-aos="fade-up" data-aos-duration="1000"
                                data-aos-easing="linear" data-aos-delay="300"
                                data-aos-anchor=".section-1-trigger">
                                ${d.description}
                            </p>
                        </div>
                    </div>
                </div>`
    }) : "";

    hightLightSwipe.appendSlide(slidesTemp);

    listDesktop.innerHTML = `
                            ${articleData != undefined
            ? articleData.slice(0,3).map((d, index) => {
                return `
                <div>
                    <div onmouseenter="highlightSelect(this)" onclick="highlightSelect(this)"
                        data-article_title="${d.title}"
                        data-slide="${index}" data-aos="fade-up" data-aos-duration="1000"
                        data-aos-easing="linear" data-aos-anchor=".section-1-trigger"
                        class="cursor-pointer flex flex-col border border-1 border-b-0 border-l-0 border-r-0  p-5 py-2 ${index > 0 ? "text-black/40  border-black/40" : "text-black  border-black"} hover:text-black  hover:border-black">
                        <h3 class="text-[24px] font-normal" data-aos="fade-up"
                            data-aos-duration="1000" data-aos-easing="linear" data-aos-delay="${(index + 1) * 200}"
                            data-aos-anchor=".section-1-trigger">
                            ${d.title}
                        </h3>
                        <p class="text-[14px]" data-aos="fade-up" data-aos-duration="1000"
                            data-aos-easing="linear" data-aos-delay="${(index + 1.5) * 200}"
                            data-aos-anchor=".section-1-trigger">
                            ${d.description}
                        </p>
                    </div>
                </div>
`
            }).join("")
            : ``}`;
}
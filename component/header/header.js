
// ``
var headerSwiper, headerSubmenuSwiper, headerSwiperM;

function toggleSubmenu() {
    document.querySelector('body').classList.add('overflow-hidden');
    document.querySelector('#header .wrapper').classList.add('wrapped');
    toggleHeaderSubmenu();
    headerSubmenuSwiper = new Swiper("#header-sub-menu .header-swiper", {
        slidesPerView: 4,
        spaceBetween: 40,
        freeMode: true
    });
    setSlideData(header.dataset['submenu'], headerSubmenuSwiper);
    checkModalOpen();
}
function toggleMenuList() {
    document.querySelector('body').classList.add('overflow-hidden');
    document.querySelector('#header .wrapper').classList.add('wrapped');
    toggleHeaderMenu();
    checkModalOpen();
    headerSwiper = new Swiper("#header-menu .header-swiper", {
        slidesPerView: 3,
        spaceBetween: 40,
        freeMode: true
    });
    setSlideData(header.dataset['submenu'], headerSwiper);
    const headerMenu = document.querySelectorAll('#header-menu .header-menu-list li');
    for (var i = 0; i < headerMenu.length; i++) {
        headerMenu[i].addEventListener('mouseenter', function (event) {
            for (var i = 0; i < headerMenu.length; i++) {
                headerMenu[i].classList.remove('active');
            }
            setSlideData(event.target.dataset['swipe'], headerSwiper);
            event.target.classList.add('active');
            event.preventDefault();
        });
    }
    const headerMenuMobile = document.querySelectorAll('#header #header-menu-m .header-menu-list li');
    const divMobileSwipe = document.querySelectorAll('#header-menu-m .header-menu-list li .swiper');
    var mobileSwipe = Array()
    if (divMobileSwipe.length > 0) {
        for (let index = 0; index < divMobileSwipe.length; index++) {
            mobileSwipe[index] = new Swiper(`#header-menu-m .header-menu-list li .header-swiper-${index}`, {
                slidesPerView: 1,
                spaceBetween: 40,
                freeMode: true
            });
            mobileSwipe[index].removeAllSlides();
            setSlideData(divMobileSwipe[index].parentNode.parentNode.dataset['swipe'], mobileSwipe[index]);
        }
    }
    if (headerMenuMobile) {
        for (var i = 0; i < headerMenuMobile.length; i++) {
            headerMenuMobile[i].addEventListener('click', function (event) {
                for (var i = 0; i < headerMenuMobile.length; i++) {
                    headerMenuMobile[i].classList.remove('active');
                }
                for (let index = 0; index < divMobileSwipe.length; index++) {
                    mobileSwipe[index].removeAllSlides();
                    if (this.dataset['swipe'] != "") {
                        setSlideData(this.dataset['swipe'], mobileSwipe[index]);
                    }
                    mobileSwipe[index].init();
                }
                this.classList.add('active');
                // event.preventDefault();
            });
        }
    }
}
function toggleLang() {
    openLang();
}
function checkModalOpen() {
    if (document.getElementById('header-sub-menu').classList.contains('open')
        || document.getElementById('header-menu-m').classList.contains('open')
        || document.getElementById('header-menu').classList.contains('open')) {
        document.querySelector('body').classList.add('overflow-hidden');
        document.querySelector('#header .wrapper').classList.add('wrapped');
    } else {
        document.querySelector('body').classList.remove('overflow-hidden');
        setTimeout(() => {
            document.querySelector('#header .wrapper').classList.remove('wrapped');
        }, 1000);
    }
}
function toggleHeaderMenu() {
    document.getElementById('header-menu').classList.toggle('open');
    document.getElementById('header-menu-m').classList.toggle('open');
    document.querySelector('.burgerbar').classList.toggle('open');


    document.getElementById('header-sub-menu').classList.remove('open');
    const arrow = document.querySelector('#header .submenu svg')
    arrow.classList.remove('rotate-180');

    var headerMenu = document.querySelectorAll('#header-menu .header-menu-list li');
    for (var i = 0; i < headerMenu.length; i++) {
        headerMenu[i].classList.remove('active');
        event.preventDefault();
    }
    setTimeout(() => {
        headerMenu[0].classList.add('active');
    }, 300);
}

function toggleHeaderSubmenu() {
    document.getElementById('header-menu').classList.remove('open');
    document.getElementById('header-menu-m').classList.remove('open');
    document.querySelector('.burgerbar').classList.remove('open');
    document.getElementById('header-sub-menu').classList.toggle('open');
    const arrow = document.querySelector('#header .submenu svg')
    arrow.classList.toggle('rotate-180');
}

async function filterData(name) {
    const resp = await getHeaderData();
    return resp.filter((data) => {
        return data.name.toLowerCase() == name.toLowerCase();
    });
}
function setSlideData(name, swipe) {
    swipe.removeAllSlides();
    filterData(name).then(res => {
        res[0].data.map(data => {
            swipe.appendSlide(slideTemplate(data));
        })
    });
}
function slideTemplate(data) {
    return `<div class="swiper-slide">
                <a href="${data.data.link}" onclick="selectCard(this)" 
                data-property_brand="${data.data.brands}" 
                data-project_label="${data.data.label}" 
                data-property_type="${data.data.type}" 
                data-property_location="${data.data.location}" 
                data-property_price="${data.data.price}">
                    <div class="flex flex-col text-white gap-1">
                        <div class="w-[300px] overflow-hidden">
                            <img src="${window.location.origin}${data.data.s}" alt="${data.data.brands}"
                            class="w-full hover:scale-125 transition-all duration-[2000ms]">
                        </div>
                        <div>
                            <small class="leading-tight text-[12px] font-thin uppercase">
                                ${data.data.type}
                            </small>
                            <p class="text-[16px] leading-tight">
                            ${data.data.brands}
                            </p>
                        </div>
                    </div>
                </a>
            </div>
            `
}

async function tempMenuList(resp) {
    var temp = resp.map(data => {
        return `
            <li class="${header.dataset["submenu"].toLowerCase() == data.name.toLowerCase() ? "active" : ""}" data-swipe="${data.name.toLowerCase()}">
                <button type="button" class="link w-full my-auto text-[14px]" data-sub_header="${data.name}" onclick="selectMenu(this)">
                   ${data.name}
                </button>
            </li>
            `
    }).join('');
    return temp;
}

async function tempMenulistMobile(resp) {
    return resp.map((res, index) => {
        var temp =
            `<li class="${header.dataset["submenu"].toLowerCase() == res.name.toLowerCase() ? "active" : ""} border border-white/30 border-1 border-t-0 border-r-0 border-l-0" data-swipe="${res.data.length > 0 ? res.name.toLowerCase() : ""}">
                
                ${res.data.length > 0
                ? `<button type="button"
                    class="my-auto link relative hover:!bg-transparent w-full flex justify-between w-full" data-sub_header="${res.name}" onclick="selectMenu(this)"">
                        <p class="text-[20px] w-full text-start">${res.name}</p>
                        <svg width="16" class="transition-all duration-1000 my-auto ${res.data.length > 0 ? "" : "!rotate-90"}"
                            height="10" viewBox="0 0 16 10" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.29289 0.792893C7.68342 0.402369 8.31658 0.402369 8.70711 0.792893L15.7071 7.79289C16.0976 8.18342 16.0976 8.81658 15.7071 9.20711C15.3166 9.59763 14.6834 9.59763 14.2929 9.20711L8 2.91421L1.70711 9.20711C1.31658 9.59763 0.683417 9.59763 0.292893 9.20711C-0.0976311 8.81658 -0.0976311 8.18342 0.292893 7.79289L7.29289 0.792893Z"
                                fill="#948668" />
                        </svg>
                </button>`
                : `<a href="${res.link}"
                    class="my-auto link relative hover:!bg-transparent w-full flex justify-between w-full" data-sub_header="${res.name}" onclick="selectMenu(this)">
                        <p class="text-[20px] w-full text-start">${res.name}</p>
                </a>`}
            
                ${res.data.length > 0
                ? `<div class="relative mt-5 menu-expand pb-5">
                        <div class="swiper header-swiper-${index} pr-20">
                            <div class="swiper-wrapper">
                            </div>
                        </div>
                    </div>`
                : ""}
            </li>`
        return temp;
    }).join('');
}

function openLang() {
    document.querySelector('.lang-expand').classList.toggle('hidden');
    document.querySelector('.lang-btn .icon').classList.toggle('rotate-180');
}

headerTemplate().then(() => {

    // SmoothScroll({ stepSize: 50 })

    gsap.registerPlugin(ScrollTrigger);

    let st = ScrollTrigger.create({
        trigger: "body",
        pin: "#header .wrapper",
        start: "top top",
        pinSpacing: false,
        scrub: 1
    });
});
async function headerTemplate() {
    const header = document.getElementById('header');
    const resp = await getHeaderData();
    var temp = `
            <div class="wrapper ">
                <div class="bg-bottom bg-cover bg-no-repeat relative"
                    style="background-image:url('${window.location.origin}/assets/image/residential/header-bg.svg')">
                    <div class="container">
                        <div class="flex pt-2 pb-3 relative justify-between">
                            <div class="absolute top-0 left-0 w-full h-full flex">
                                <div class="m-auto">
                                    <p class="uppercase text-white mb-2 font-['Cinzel'] text-[14px]"><span
                                            class="text-[16px]">R</span>esidential</p>
                                </div>
                            </div>
                            <div class=" relative">
                                <a href="/index.html">
                                    <img class="w-[110px] md:block hidden"
                                        src="${window.location.origin}/assets/image/residential/logo singha estate.svg" />
                                    <img class="w-[15px] md:hidden" src="${window.location.origin}/assets/image/residential/logo-mobile-header.svg" />
                                </a>
                            </div>
                            <div class="flex my-auto gap-3  relative ml-auto">
                                <button type="button" class="xl:flex hidden submenu" onclick="toggleSubmenu()">
                                    <div class="my-auto">
                                        <a href="${header.dataset['sublink']}">
                                            <p class="uppercase text-white leading-tight text-[12px]">${header.dataset['submenu']}</p>
                                        </a>
                                    </div>
                                    <div class="my-auto ml-2">
                                        <svg class="transition-all duration-3000 w-[15px]" width="20" height="20"
                                            viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M3.57757 6.91009C3.90301 6.58466 4.43065 6.58466 4.75609 6.91009L10.0002 12.1542L15.2442 6.91009C15.5697 6.58466 16.0973 6.58466 16.4228 6.91009C16.7482 7.23553 16.7482 7.76317 16.4228 8.0886L10.5894 13.9219C10.264 14.2474 9.73634 14.2474 9.41091 13.9219L3.57757 8.0886C3.25214 7.76317 3.25214 7.23553 3.57757 6.91009Z"
                                                fill="white"></path>
                                        </svg>
                                    </div>
                                </button>
                                <span class="text-white xl:block hidden opacity-[50%]">|</span>
                                <div class="relative px-2">
                                    <div class=" xl:flex gap-2 hidden lang-btn cursor-pointer" onclick="toggleLang()">
                                        <div class="my-auto">
                                            <svg class="w-[15px]" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_3558_4163)">
                                                    <path
                                                        d="M10.165 0.00213162C10.1384 0.00118423 10.1119 0 10.0851 0C10.0759 0 10.0667 0.000473707 10.0574 0.000710538C10.0383 0.000473707 10.0193 0 10.0001 0C4.4861 0 0 4.48587 0 9.99988C0 15.5139 4.4861 20 10.0001 20C10.0193 20 10.0383 19.9995 10.0574 19.9993C10.0667 19.9995 10.0759 20 10.0851 20C10.1119 20 10.1384 19.9988 10.165 19.9979C15.6032 19.9095 20 15.4589 20 9.99988C20 4.54105 15.6032 0.0904752 10.165 0.00213162ZM17.3279 6.36358H14.3415C14.1501 5.21133 13.8666 4.14931 13.5007 3.23413C13.3889 2.95466 13.27 2.69247 13.1452 2.44709C14.9647 3.20761 16.4528 4.60713 17.3279 6.36358ZM18.182 9.99988C18.182 10.6247 18.1112 11.2331 17.978 11.8181H14.5606C14.6068 11.2244 14.6307 10.6164 14.6307 9.99988C14.6307 9.38361 14.6068 8.77562 14.5606 8.18185H17.978C18.1112 8.76686 18.182 9.37532 18.182 9.99988ZM10.1171 18.1803C10.1003 18.1805 10.0837 18.1808 10.0671 18.181C9.52903 18.163 8.86041 17.3468 8.35806 16.0906C8.07006 15.3708 7.84032 14.5284 7.67382 13.6243H12.4967C12.3302 14.5284 12.1005 15.3708 11.8125 16.0906C11.3141 17.3364 10.6526 18.1493 10.1171 18.1803ZM7.43389 11.8181C7.38415 11.2279 7.35786 10.6197 7.35786 9.99988C7.35786 9.38029 7.38415 8.77207 7.43389 8.18185H12.7366C12.7864 8.77207 12.8124 9.38029 12.8124 9.99988C12.8124 10.6197 12.7864 11.2279 12.7366 11.8181H7.43389ZM1.81827 9.99988C1.81827 9.37532 1.88885 8.75454 2.02219 8.16977H5.61018C5.56399 8.76355 5.53983 9.38361 5.53983 9.99988C5.53983 10.6164 5.56399 11.2244 5.61018 11.8181H2.02219C1.88885 11.2331 1.81827 10.6247 1.81827 9.99988ZM10.0671 1.81898C10.0837 1.81922 10.1003 1.81945 10.1171 1.81969C10.6526 1.85072 11.3141 2.66357 11.8125 3.90938C12.1005 4.62916 12.3302 5.45954 12.4967 6.36358H7.67382C7.84032 5.45954 8.07006 4.62916 8.35806 3.90938C8.86041 2.65315 9.52903 1.83698 10.0671 1.81898ZM7.06962 2.36112C6.92846 2.63089 6.79488 2.92173 6.66982 3.23413C6.3039 4.14931 6.02063 5.21133 5.82902 6.36358H2.67234C3.58159 4.53868 5.15259 3.09913 7.06962 2.36112ZM2.6721 13.6364H5.82902C6.02039 14.7887 6.3039 15.8507 6.66982 16.7659C6.79488 17.0783 6.92846 17.3691 7.06962 17.6389C5.15259 16.9009 3.58159 15.4616 2.6721 13.6364ZM13.1452 17.5529C13.27 17.3075 13.3889 17.0453 13.5007 16.7659C13.8666 15.8507 14.1499 14.7766 14.3415 13.6243H17.3279C16.4528 15.3808 14.9647 16.7924 13.1452 17.5529Z"
                                                        fill="white"></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_3558_4163">
                                                        <rect width="20" height="20" fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div class="my-auto">
                                            <p class="uppercase text-white  pt-1 text-[12px]">eng</p>
                                        </div>
                                        <div class="my-auto">
                                            <svg class="icon transition-all duration-500 w-[15px]" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M3.57757 6.91009C3.90301 6.58466 4.43065 6.58466 4.75609 6.91009L10.0002 12.1542L15.2442 6.91009C15.5697 6.58466 16.0973 6.58466 16.4228 6.91009C16.7482 7.23553 16.7482 7.76317 16.4228 8.0886L10.5894 13.9219C10.264 14.2474 9.73634 14.2474 9.41091 13.9219L3.57757 8.0886C3.25214 7.76317 3.25214 7.23553 3.57757 6.91009Z"
                                                    fill="white"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="lang-expand hidden absolute top-100 mt-2 left-0 w-full h-fit flex flex-col gap-2 bg-[#1A2F4D] p-2 z-[60] scale-up-ver-top">
                                        <button type="button" class="uppercase text-white text-center hover:bg-[#162842]">th</button>
                                        <button type="button" class="uppercase text-white text-center hover:bg-[#162842]">en</button>
                                    </div>
                                </div>
                                <button type="button" class="my-auto burgerbar" onclick="toggleMenuList()">
                                    <div class="icon-open">
                                        <svg class="w-[15px]" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M2.5 4.99935C2.5 4.53911 2.8731 4.16602 3.33333 4.16602H16.6667C17.1269 4.16602 17.5 4.53911 17.5 4.99935C17.5 5.45959 17.1269 5.83268 16.6667 5.83268H3.33333C2.8731 5.83268 2.5 5.45959 2.5 4.99935ZM2.5 9.99935C2.5 9.53911 2.8731 9.16602 3.33333 9.16602H16.6667C17.1269 9.16602 17.5 9.53911 17.5 9.99935C17.5 10.4596 17.1269 10.8327 16.6667 10.8327H3.33333C2.8731 10.8327 2.5 10.4596 2.5 9.99935ZM2.5 14.9993C2.5 14.5391 2.8731 14.166 3.33333 14.166H16.6667C17.1269 14.166 17.5 14.5391 17.5 14.9993C17.5 15.4596 17.1269 15.8327 16.6667 15.8327H3.33333C2.8731 15.8327 2.5 15.4596 2.5 14.9993Z"
                                                fill="white"></path>
                                        </svg>
                                    </div>
                                    <div class="icon-close">
                                        <svg class="w-[15px]" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M4.41107 4.41009C4.73651 4.08466 5.26414 4.08466 5.58958 4.41009L10.0003 8.82084L14.4111 4.41009C14.7365 4.08466 15.2641 4.08466 15.5896 4.41009C15.915 4.73553 15.915 5.26317 15.5896 5.5886L11.1788 9.99935L15.5896 14.4101C15.915 14.7355 15.915 15.2632 15.5896 15.5886C15.2641 15.914 14.7365 15.914 14.4111 15.5886L10.0003 11.1779L5.58958 15.5886C5.26414 15.914 4.73651 15.914 4.41107 15.5886C4.08563 15.2632 4.08563 14.7355 4.41107 14.4101L8.82181 9.99935L4.41107 5.5886C4.08563 5.26317 4.08563 4.73553 4.41107 4.41009Z"
                                                fill="white" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal" id="header-menu">
                    <div class="w-full relative py-5">
                        <div class="modal-bg bg-[#1A2F4D]"></div>
                        <div class="modal-content">
                            <div class="container">
                                <div class="flex gap-10 relative">
                                    <div class="min-w-[270px]">
                                        <div class="block">
                                            <ul class="header-menu-list">
                                                ${await tempMenuList(resp)}
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="absolute left-[300px] w-full pr-[20rem] overflow-hidden">
                                        <div class="swiper header-swiper !overflow-visible">
                                            <div class="swiper-wrapper">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal" id="header-sub-menu">
                    <div class="w-full relative pb-10 pt-2">
                        <div class="modal-bg bg-[#1A2F4D]"></div>
                        <div class="modal-content">
                            <div class="container">
                                <div class="flex relative flex-col">
                                    <div class="min-w-[270px]">
                                        <div class="block">
                                            <ul class="header-menu-list">
                                                <li class="active" data-swipe="${header.dataset["submenu"].toLowerCase()}">
                                                    <p class="my-auto text-[16px] link capitalize">${header.dataset["submenu"].toLowerCase()}
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="relative">
                                        <div class="swiper header-swiper">
                                            <div class="swiper-wrapper">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal modal-m " id="header-menu-m">
                    <div class="w-full relative py-10 h-full">
                        <div class="modal-bg bg-[#1A2F4D]"></div>
                        <div class="modal-content">
                            <div class="container max-h-[75vh] overflow-y-scroll">
                                <div class="flex gap-10 relative flex-col">
                                    <div class="w-full">
                                        <div class="block">
                                            <ul class="header-menu-list">
                                                ${await tempMenulistMobile(resp)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container mt-5 bg-[#1A2F4D] fixed bottom-0 left-0 py-3 border-1 border-l-0 border-r-0 border-b-0">
                                <div class="flex gap-10 relative flex-col">
                                    <div class="flex mt-auto justify-between">
                                        <div>
                                            <img class="w-[100px] md:hidden block" src="${window.location.origin}/assets/image/residential/logo-desktop-header.svg" />
                                        </div>
                                        <div class="flex mt-auto gap-2">
                                            <div>
                                                <a href="#eng" class="text-white uppercase">
                                                    eng
                                                </a>
                                            </div>
                                            <div class="text-white">
                                                <b>|</b>
                                            </div>
                                            <div>
                                                <a href="#th" class="text-white uppercase">
                                                    th
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> `;
    document.querySelector('#header').innerHTML = temp;
}

function selectCard(ev) {
    var tracking = {
        event: "select_property",
        landing_page: LANDING_PAGE,
        section: "header",
        event_action: "click",
        property_brand: ev.dataset["property_brand"],
        project_label: ev.dataset["project_label"],
        property_type: ev.dataset["property_type"],
        property_location: ev.dataset["property_location"],
        property_price: ev.dataset["property_price"]
    }
    setDataLayer(tracking);
}
function selectMenu(ev) {
    var tracking = {
        event: "click_sub_header",
        landing_page: LANDING_PAGE,
        section: "header",
        event_action: "click",
        sub_header: ev.dataset["sub_header"]
    }
    setDataLayer(tracking);
}
function setDataLayer(data) {
    dataLayer.push(data);
}

var headerSwiper = new Swiper("#header-menu .header-swiper", {
    slidesPerView: 3,
    spaceBetween: 40,
    freeMode: true
});

var headerSubmenuSwiper = new Swiper("#header-sub-menu .header-swiper", {
    slidesPerView: 4,
    spaceBetween: 40,
    freeMode: true
});
// ``
window.addEventListener("DOMContentLoaded", (event) => {
    const header = document.getElementById('header');
    const burgerbar = document.querySelector('.burgerbar');

    if (burgerbar) {
        burgerbar.addEventListener('click', () => {
            document.querySelector('body').classList.add('overflow-hidden');
            toggleHeaderMenu();
            tempMenuList();
            tempMenulistMobile();
            setHeaderSwipeDATA("property collection");
            checkModalOpen();
            setTimeout(() => {
                var headerSwiperMobile = new Swiper("#header-menu-m .header-swiper-m", {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    freeMode: true
                });
            }, 1000);
        }, false);

    }

    if (header.dataset['submenu']) {
        const submenu = document.querySelector('.submenu');

        document.querySelector('#header .submenu').dataset['name'] = header.dataset["submenu"];
        document.querySelector('#header .submenu p').innerHTML = header.dataset["submenu"];
        document.querySelector('#header #header-sub-menu .header-menu-list li').dataset['swipe'] = header.dataset["submenu"];
        document.querySelector('#header #header-sub-menu .header-menu-list li p').innerHTML = header.dataset["submenu"];
        if (submenu) {
            submenu.addEventListener('click', () => {
                document.querySelector('body').classList.add('overflow-hidden');
                toggleHeaderSubmenu();
                setHeaderSwipeDATA(header.dataset['submenu']);
                checkModalOpen();
            }, false);
        }
    }
});
function checkModalOpen() {
    if (document.getElementById('header-sub-menu').classList.contains('open')
        || document.getElementById('header-menu-m').classList.contains('open')
        || document.getElementById('header-menu').classList.contains('open')) {
        document.querySelector('body').classList.add('overflow-hidden');
    }else{
        document.querySelector('body').classList.remove('overflow-hidden');
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
    const button = document.querySelector('#header .submenu');
    const arrow = document.querySelector('#header .submenu svg')
    arrow.classList.toggle('rotate-180');
}

async function setHeaderSwipeDATA(name) {
    const resp = await getHeaderData();
    headerSwiper.removeAllSlides();
    headerSubmenuSwiper.removeAllSlides();
    resp.map(data => {
        if (data.name.toLowerCase() == name) {
            data.data.map(res => {
                var temp = `
                <div class="swiper-slide">
                    <a href="">
                        <div class="flex flex-col text-white gap-3">
                            <div class="w-[300px] overflow-hidden">
                                <img src="${res.data.s}" alt=""
                                class="w-full hover:scale-125 transition-all duration-[2000ms]">
                            </div>
                            <div>
                                <small class="text-[18px] leading-none text-[16px]">
                               ${res.data.type}
                                </small>
                                <p class="text-[30px] leading-none">
                                ${res.data.brands}
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
                `
                headerSwiper.appendSlide(temp);
                headerSubmenuSwiper.appendSlide(temp);
            })
        }
    })
}
function hoverMenu() {
    const headerMenu = document.querySelectorAll('#header-menu .header-menu-list li');
    for (var i = 0; i < headerMenu.length; i++) {
        headerMenu[i].addEventListener('mouseenter', function (event) {
            for (var i = 0; i < headerMenu.length; i++) {
                headerMenu[i].classList.remove('active');
            }
            setHeaderSwipeDATA(event.target.dataset['swipe'].toLowerCase());
            event.target.classList.add('active');
            event.preventDefault();
        });
    }
}
function selectMenu() {
    const headerMenu = document.querySelectorAll('#header-menu-m .header-menu-list li');
    for (var i = 0; i < headerMenu.length; i++) {
        headerMenu[i].addEventListener('click', function (event) {
            for (var i = 0; i < headerMenu.length; i++) {
                headerMenu[i].classList.remove('active');
            }
            event.target.parentNode.parentNode.classList.add('active');
            event.preventDefault();
        });
    }
}
async function tempMenuList() {
    const resp = await getHeaderData();
    const menu = document.querySelector('#header #header-menu .header-menu-list');
    const header = document.getElementById('header');
    menu.innerHTML = "";
    menu.innerHTML = resp.map(data => {
        return `
        <li class="${header.dataset["submenu"].toLowerCase() == data.name.toLowerCase() ? "active" : ""}" data-swipe="${data.name}">
            <button type="button" class="link w-full my-auto text-[20px]">
               ${data.name}
            </button>
        </li>
        `
    }).join('');
    hoverMenu();
}

async function tempMenulistMobile() {
    const resp = await getHeaderData();
    const menu = document.querySelector('#header #header-menu-m .header-menu-list');

    menu.innerHTML = "";
    menu.innerHTML = resp.map((res, index) => {
        var temp =
            `<li class="${header.dataset["submenu"].toLowerCase() == res.name.toLowerCase() ? "active" : ""} border border-white/30 border-1 border-t-0 border-r-0 border-l-0" data-swipe="swipe-menu-m-${index}">
                <button type="button"
                    class="my-auto link relative hover:!bg-transparent w-full flex justify-between w-full">
                        <p class="text-[20px] w-full text-start">${res.name}</p>
                        <svg width="16" class="transition-all duration-1000 my-auto"
                            height="10" viewBox="0 0 16 10" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.29289 0.792893C7.68342 0.402369 8.31658 0.402369 8.70711 0.792893L15.7071 7.79289C16.0976 8.18342 16.0976 8.81658 15.7071 9.20711C15.3166 9.59763 14.6834 9.59763 14.2929 9.20711L8 2.91421L1.70711 9.20711C1.31658 9.59763 0.683417 9.59763 0.292893 9.20711C-0.0976311 8.81658 -0.0976311 8.18342 0.292893 7.79289L7.29289 0.792893Z"
                                fill="#948668" />
                        </svg>
                </button>
            <div class="relative mt-5 menu-expand pb-5">
                <div class="swiper header-swiper-m pr-20">
                    <div class="swiper-wrapper">
                        ${res.data.map((data, index) => {
                return ` <div class="swiper-slide">
                                    <a href="">
                                        <div class="flex flex-col text-white gap-3">
                                            <div class="w-[300px] overflow-hidden">
                                                <img src="${data.data.s}"
                                                    alt=""
                                                    class="w-full hover:scale-125 transition-all duration-[2000ms] w-full">
                                            </div>
                                            <div>
                                                <small
                                                    class="text-[18px] leading-none text-[16px]">
                                                    ${data.data.type}
                                                </small>
                                                <p class="text-[30px] leading-none">
                                                    ${data.data.brands}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>`
            })
            }
                    </div>
                </div>
            </div>
            </li>`
        return temp;
    }).join('');


    selectMenu();
}
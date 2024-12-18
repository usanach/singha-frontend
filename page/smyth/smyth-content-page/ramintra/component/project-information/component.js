// Define the Header component
const ProjectInformationComponent = defineComponent({
    name: 'ProjectInformationComponent',
    template: `<section class="" v-html="template" id="ProjectInformationComponent" ></section>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const loadTemplate = async (lang) => {
            try {
                const templateResponse = await axios.get('/page/smyth/smyth-content-page/ramintra/component/project-information/template.html');
                let templateContent = templateResponse.data;
                // Replace placeholders with actual data
                templateContent = templateContent
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        const init = () => {
            AOS.init();
        }
        onMounted(async () => {
            language.value = getLanguageFromPath();
            await loadTemplate(language.value);

            nextTick(() => {
                init();

                const planList = new Swiper(".floor-plan-list", {
                    spaceBetween: 10,
                    slidesPerView: 3,
                    freeMode: true,
                    // Responsive Breakpoints
                    breakpoints: {
                        0: { // Screens 0px and larger (mobile)
                            slidesPerView: 2.2,
                            spaceBetween: 10,
                        },
                        768: { // Screens 768px and larger (tablets)
                            slidesPerView: 2.2,
                            spaceBetween: 15,
                        },
                        1024: { // Screens 1024px and larger (desktops)
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    },
                });

                const thumbsSwiper0 = new Swiper("#residenceI .thumbs-container", {
                    spaceBetween: 10,
                    slidesPerView: 3,
                    freeMode: true,
                    watchSlidesProgress: true,
                    // Responsive Breakpoints
                    breakpoints: {
                        0: { // Screens 0px and larger (mobile)
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: { // Screens 768px and larger (tablets)
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1024: { // Screens 1024px and larger (desktops)
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    },
                });
                const mainSwiper0 = new Swiper("#residenceI .main-container", {
                    spaceBetween: 10,
                    navigation: {
                        nextEl: "#info #residenceI .next",
                        prevEl: "#info #residenceI .prev",
                    },
                    thumbs: {
                        swiper: thumbsSwiper0,
                    },
                });
                const bigimageSwiper0 = new Swiper("#residenceI-modal .floorplan-image-swiper", {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    loop: true,
                    navigation: {
                        nextEl: "#residenceI-modal .floorplan-image-next",
                        prevEl: "#residenceI-modal .floorplan-image-prev",
                    },
                });


                const thumbsSwiper1 = new Swiper("#residenceII .thumbs-container", {
                    spaceBetween: 10,
                    slidesPerView: 3,
                    freeMode: true,
                    watchSlidesProgress: true,
                    // Responsive Breakpoints
                    breakpoints: {
                        0: { // Screens 0px and larger (mobile)
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: { // Screens 768px and larger (tablets)
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1024: { // Screens 1024px and larger (desktops)
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    },
                });
                const mainSwiper1 = new Swiper("#residenceII .main-container", {
                    spaceBetween: 10,
                    navigation: {
                        nextEl: "#info #residenceII .next",
                        prevEl: "#info #residenceII .prev",
                    },
                    thumbs: {
                        swiper: thumbsSwiper1,
                    },
                });
                const bigimageSwiper1 = new Swiper("#residenceII-modal .floorplan-image-swiper", {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    loop: true,
                    navigation: {
                        nextEl: "#residenceII-modal .floorplan-image-next",
                        prevEl: "#residenceII-modal .floorplan-image-prev",
                    },
                });

                const thumbsSwiper2 = new Swiper("#residenceIII .thumbs-container", {
                    spaceBetween: 10,
                    slidesPerView: 3,
                    freeMode: true,
                    watchSlidesProgress: true,
                    // Responsive Breakpoints
                    breakpoints: {
                        0: { // Screens 0px and larger (mobile)
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: { // Screens 768px and larger (tablets)
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1024: { // Screens 1024px and larger (desktops)
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    },
                });
                const mainSwiper2 = new Swiper("#residenceIII .main-container", {
                    spaceBetween: 10,
                    navigation: {
                        nextEl: "#info #residenceIII .next",
                        prevEl: "#info #residenceIII .prev",
                    },
                    thumbs: {
                        swiper: thumbsSwiper2,
                    },
                });
                const bigimageSwiper2 = new Swiper("#residenceIII-modal .floorplan-image-swiper", {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    loop: true,
                    navigation: {
                        nextEl: "#residenceIII-modal .floorplan-image-next",
                        prevEl: "#residenceIII-modal .floorplan-image-prev",
                    },
                });
            });
        });

        return { template, language };
    }
});
function toggleFloorPlantList(id, el) {
    const listItems = document.querySelectorAll('.floor-plan-list .swiper-slide button');
    const sectionItems = document.querySelectorAll('.plan-item');
    listItems.forEach((item) => {
        item.classList.remove('underline');
        item.classList.remove('font-bold');
    });
    el.classList.add('underline');
    el.classList.add('font-bold');

    sectionItems.forEach((item, i) => {
        item.classList.add('hidden');
    });
    document.querySelector(`#${id}`).classList.remove('hidden');
}
function toggleDiv(sectionId, element) {
    // Find all `li` elements within the same parent container
    const listItems = element.parentNode.querySelectorAll('li');

    // Remove 'active' class and reset 'font-light' for all items
    listItems.forEach((item) => {
        item.classList.remove('active');
        const header = item.querySelector('h3');
        if (header) {
            header.classList.remove('font-normal');
            header.classList.add('font-light');
        }
    });

    // Add 'active' class and apply 'font-normal' to the clicked element
    element.classList.add('active');
    const activeHeader = element.querySelector('h3');
    if (activeHeader) {
        activeHeader.classList.remove('font-light');
        activeHeader.classList.add('font-normal');
    }

    // Toggle visibility of sections (using Tailwind's 'hidden' and 'block' utilities)
    const sections = document.querySelectorAll('.section'); // Adjust selector as needed
    sections.forEach((section) => {
        if (section.id === sectionId) {
            section.classList.remove('hidden');
            section.classList.add('block');
        } else {
            section.classList.remove('block');
            section.classList.add('hidden');
        }
    });
    const expBtnText = document.querySelector('#expand-button p')
    expBtnText.innerHTML = element.textContent

    const expDiv = document.querySelector('.expand-div');
    if (expDiv) {
        expDiv.classList.add('hidden')
    }
}
function toggleExpand() {
    const div = document.querySelector('.expand-div');
    div.classList.remove('hidden');
}
function openBigImage(id) {
    // Show modal
    document.querySelector('.show-image-modal').classList.remove('hidden');
    
    // Hide all modal-div elements
    const modalDivs = document.querySelectorAll('.show-image-modal .modal-div');
    modalDivs.forEach((item) => {
        item.classList.add('hidden');
    });

    // Show the target modal
    document.getElementById(`${id}-modal`).classList.remove('hidden');

    // Get active slide index
    const activeSlide = document.querySelector(`#${id} .swiper-slide-active`);
    const activeIndex = parseInt(activeSlide?.dataset['item'], 10);

    // Initialize or retrieve Swiper instance
    let swiperInstance;
    switch (id) {
        case "residenceI":
            swiperInstance = new Swiper("#residenceI-modal .floorplan-image-swiper", {
                slidesPerView: 1,
                spaceBetween: 10,
                loop: true,
                navigation: {
                    nextEl: "#residenceI-modal .floorplan-image-next",
                    prevEl: "#residenceI-modal .floorplan-image-prev",
                },
            });
            break;

        case "residenceII":
            swiperInstance = new Swiper("#residenceII-modal .floorplan-image-swiper", {
                slidesPerView: 1,
                spaceBetween: 10,
                loop: true,
                navigation: {
                    nextEl: "#residenceII-modal .floorplan-image-next",
                    prevEl: "#residenceII-modal .floorplan-image-prev",
                },
            });
            break;

        case "residenceIII":
            swiperInstance = new Swiper("#residenceIII-modal .floorplan-image-swiper", {
                slidesPerView: 1,
                spaceBetween: 10,
                loop: true,
                navigation: {
                    nextEl: "#residenceIII-modal .floorplan-image-next",
                    prevEl: "#residenceIII-modal .floorplan-image-prev",
                },
            });
            break;

        default:
            console.error('Invalid ID provided:', id);
            return;
    }

    // Navigate to the active slide
    if (!isNaN(activeIndex)) {
        setTimeout(() => {
            swiperInstance.slideTo(activeIndex);
        }, 100); // Delay to ensure Swiper is initialized before sliding
    } else {
        console.error('Active slide index could not be determined.');
    }
}

function closeMaximizeModal() {
    document.querySelector('.show-image-modal').classList.add('hidden');

}
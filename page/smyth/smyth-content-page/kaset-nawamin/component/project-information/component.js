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
                const templateResponse = await axios.get('/page/smyth/smyth-content-page/kaset-nawamin/component/project-information/template.html');
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
                            slidesPerView: 2.5, 
                            spaceBetween: 10,
                        },
                        768: { // Screens 768px and larger (tablets)
                            slidesPerView: 2.5,
                            spaceBetween: 15,
                        },
                        1024: { // Screens 1024px and larger (desktops)
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    },
                });

                // Initialize the thumbnail swiper
                const thumbsSwiper0 = new Swiper(".plan-item .thumbs-container", {
                    spaceBetween: 10,
                    slidesPerView: 3,
                    freeMode: true,
                    watchSlidesProgress: true,
                    // Responsive Breakpoints
                    breakpoints: {
                        0: { // Screens 0px and larger (mobile)
                            slidesPerView:2, 
                            spaceBetween: 10,
                        },
                        768: { // Screens 768px and larger (tablets)
                            slidesPerView:2,
                            spaceBetween: 15,
                        },
                        1024: { // Screens 1024px and larger (desktops)
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    },
                });

                // Initialize the main swiper
                const mainSwiper0 = new Swiper(".plan-item .main-container", {
                    spaceBetween: 10,
                    navigation: {
                        nextEl: "#info .next",
                        prevEl: "#info .prev",
                    },
                    thumbs: {
                        swiper: thumbsSwiper0,
                    },
                });
            });
        });

        return { template, language };
    }
});
function toggleFloorPlantList(num, el) {
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
    sectionItems[num].classList.remove('hidden');
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
function openBigImage() {
    
}
const SubHeaderComponent = defineComponent({
    name: 'SubHeaderComponent',
    template: `
    <div>
        <!-- Desktop Navigation -->
        <nav class="sub-header top-[63px] w-full absolute left-0 z-10 border border-b-1 border-l-0 border-r-0 border-t-0 border-white/50 lg:block hidden">
            <div class="container mx-auto py-3 relative">
                <div class="flex">
                    <div class="w-full flex justify-center my-auto gap-5">
                        <div v-for="(link, index) in links" :key="link.id">
                            <a :href="link.url[language]" @click="setActive(index)" data-header-click="house_projects">
                                <!-- Link text is centered; active link uses bold style -->
                                <p :class="activeIndex === index ? 'text-white font-bold text-center' : 'text-white font-normal text-center'">
                                    {{ link.name[language] }}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Mobile/Tablet Dropdown Navigation -->
        <nav class="sub-header-mobile w-full fixed left-0 z-10 lg:hidden block bg-transparent/50 backdrop-blur md:top-[63px] top-[50px]">
            <div class="container mx-auto py-3 relative flex items-center justify-center">
                <!-- Active link text displayed in the mobile header -->
                <b class="text-white text-center">
                    {{ links[activeIndex].name[language] }}
                </b>
                <button @click="toggleDropdown" class="text-white focus:outline-none absolute right-0 mr-5">
                    <!-- Chevron Down Icon in white with rotation when open -->
                    <svg :class="{'rotate-180': showDropdown}" class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
            <!-- Dropdown Menu showing only non-active links -->
            <div v-if="showDropdown" class="container mx-auto py-2">
                <div class="flex flex-col gap-2">
                    <div v-for="(link, index) in links" :key="link.id" >
                        <a :href="link.url[language]" v-if="activeIndex !== index" 
                           @click="setActive(index); toggleDropdown()" 
                           class="block px-4 py-2" data-header-click="house_projects">
                            <p class="text-white font-normal text-center">
                                {{ link.name[language] }}
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    `,
    setup() {
        const template = ref('');
        const language = ref('th'); // Default language
        const logo = ref('');
        const links = ref([
            {
                id: 0,
                name: {
                    en: "House Projects",
                    th: "House Projects"
                },
                url: {
                    en:"/en/house_and_condo/house",
                    th:"/th/house_and_condo/house"
                }
            },
            {
                id: 1,
                name: {
                    en: "Condominium Projects",
                    th: "Condominium Projects"
                },
                url: {
                    en:"/en/house_and_condo/condo",
                    th:"/th/house_and_condo/condo"
                }
            }
        ]);

        // Set the default active link using index 0
        const activeIndex = ref(0);
        const setActive = (index) => {
            activeIndex.value = index;
        };

        // Reactive state to show/hide mobile dropdown
        const showDropdown = ref(false);
        const toggleDropdown = () => {
            showDropdown.value = !showDropdown.value;
            // When opening the dropdown, scroll the active element (if needed)
            if (showDropdown.value) {
                nextTick(() => {
                    const activeEl = document.getElementById('activeLink');
                    if (activeEl) {
                        activeEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
                    }
                });
            }
        };

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        // Smooth scroll with offset
        const smoothScrollWithOffset = (target) => {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - 50;
                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth',
                });
            }
        };

        onMounted(async () => {
            language.value = getLanguageFromPath();
            gsap.registerPlugin(ScrollTrigger);

            const init = () => {
                AOS.init();
            };

            nextTick(() => {
                init();
                const anchorLinks = document.querySelectorAll('a[href^="#"]');
                anchorLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        const href = link.getAttribute('href');
                        if (href && href.startsWith('#') && href.length > 1) {
                            e.preventDefault();
                            smoothScrollWithOffset(href);
                        }
                    });
                });
                gsap.registerPlugin(ScrollTrigger);
                ScrollTrigger.create({
                    trigger: "body",
                    start: "+=70 top",
                    scrub: 1,
                    onUpdate: (self) => {
                        if (self.progress > 0) {
                            document.querySelector('.sub-header').classList.add('!backdrop-blur-xl');
                            document.querySelector('.sub-header').classList.add('!bg-white/50');
                            document.querySelector('.sub-header').classList.add('!fixed');
                            document.querySelector('.sub-header .logo').src = '';
                            document.querySelector('.sub-header').classList.add('!top-0');
                            if (window.innerWidth > 768) {
                                document.querySelector('#header').classList.add('!opacity-0');
                                document.querySelector('#header').classList.add('!-z-50');
                                document.querySelector('.sub-header-mobile').classList.add('!top-0');
                            }
                            var item = document.querySelectorAll('.sub-header a p');
                            item.forEach(e => {
                                e.classList.add('!text-black');
                            });
                        } else {
                            document.querySelector('.sub-header').classList.remove('!backdrop-blur-xl');
                            document.querySelector('.sub-header').classList.remove('!bg-white/50');
                            document.querySelector('.sub-header').classList.remove('!fixed');
                            document.querySelector('.sub-header .logo').src = '';
                            document.querySelector('.sub-header').classList.remove('!top-0');
                            if (window.innerWidth > 768) {
                                document.querySelector('#header').classList.remove('!opacity-0');
                                document.querySelector('#header').classList.remove('!-z-50');
                                document.querySelector('.sub-header-mobile').classList.remove('!top-0');
                            }
                            var item = document.querySelectorAll('.sub-header a p');
                            item.forEach(e => {
                                e.classList.remove('!text-black');
                            });
                        }
                    }
                });
            });
        });

        return { template, language, logo, links, activeIndex, setActive, showDropdown, toggleDropdown };
    }
});

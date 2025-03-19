const SubHeaderComponent = defineComponent({
    name: 'SubHeaderComponent',
    template: `
      <div>
        <!-- Desktop Navigation -->
        <nav class="sub-header top-[60px] w-full absolute left-0 z-[99] border border-b-1 border-l-0 border-r-0 border-t-0 border-white/50 lg:block hidden">
            <div class="container mx-auto py-3 relative">
                <div class="flex">
                <div class="w-full flex justify-center my-auto gap-5">
                    <div v-for="(link, index) in links" :key="link.id" class="w-[200px]">
                    <a :href="link.url[language]" @click="setActive(index)" data-header-click="house_projects">
                        <p :class="[
                            activeIndex === index ? 'text-white font-bold' : 'text-white font-normal',
                            index === 0 ? 'text-right' : index === 1 ? 'text-left' : 'text-center'
                            ]">
                        {{ link.name[language] }}
                        </p>
                    </a>
                    </div>
                </div>
                </div>
            </div>
        </nav>

  
        <!-- Mobile/Tablet Dropdown Navigation -->
        <nav class="sub-header-mobile w-full fixed left-0  z-[99] lg:hidden block bg-transparent/50 backdrop-blur top-[60px]">
          <div class="container mx-auto py-3 relative flex items-center justify-center">
            <!-- Active link text displayed in the mobile header -->
            <b class="text-white text-center">
              {{ links[activeIndex].name[language] }}
            </b>
            <button @click="toggleDropdown" class="text-white focus:outline-none absolute right-0 mr-5">
              <!-- Chevron Down Icon rotates when open -->
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
              <div v-for="(link, index) in links" :key="link.id">
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
        const logo = ref('/assets/image/page-the-extro/the-extro/20190730_EXTRO_LOGO_FINAL white.png');
        const links = ref([
            {
                id: 0,
                name: {
                    en: "คอนเซ็ปต์",
                    th: "คอนเซ็ปต์"
                },
                url: {
                    en:"#design-concept",
                    th:"#design-concept"
                }
            },
            {
                id: 1,
                name: {
                    en: "จุดเด่นโครงการ",
                    th: "จุดเด่นโครงการ"
                },
                url: {
                    en:"#ProjectsHighlightComponent",
                    th:"#ProjectsHighlightComponent"
                }
            },
            {
                id: 2,
                name: {
                    en: "ข้อมูลโครงการ",
                    th: "ข้อมูลโครงการ"
                },
                url: {
                    en:"#ProjectInformationComponent",
                    th:"#ProjectInformationComponent"
                }
            },
            {
                id: 3,
                name: {
                    en: "แกลอรี่",
                    th: "แกลอรี่"
                },
                url: {
                    en:"#gallery",
                    th:"#gallery"
                }
            },
            {
                id: 4,
                name: {
                    en: "ที่ตั้งโครงการ",
                    th: "ที่ตั้งโครงการ"
                },
                url: {
                    en:"#location",
                    th:"#location"
                }
            },
            {
                id: 5,
                name: {
                    en: "S LIFESTYLE",
                    th: "S LIFESTYLE"
                },
                url: {
                    en:"#lifestyle",
                    th:"#lifestyle"
                }
            }
        ]);

        const activeIndex = ref(1); // Set default active link
        const showDropdown = ref(false);
    
        // Set the active navigation link
        const setActive = (index) => {
          activeIndex.value = index;
        };
    
        // Toggle mobile dropdown menu
        const toggleDropdown = () => {
          showDropdown.value = !showDropdown.value;
          if (showDropdown.value) {
            nextTick(() => {
              const activeEl = document.getElementById('activeLink');
              if (activeEl) {
                activeEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
              }
            });
          }
        };
    
        // Extract language from URL (defaults to 'th')
        const getLanguageFromPath = () => {
          const path = window.location.pathname;
          const match = path.match(/\/(th|en)(\/|$)/);
          return match ? match[1] : 'th';
        };
    
        // Smooth scrolling for anchor links with a fixed offset
        const smoothScrollWithOffset = (target) => {
          const targetElement = document.querySelector(target);
          if (targetElement) {
            const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - 50;
            window.scrollTo({ top: topPosition, behavior: 'smooth' });
          }
        };
    
        // Initialize AOS animations
        const initAOS = () => {
          AOS.init();
        };
    
        // Set up smooth scrolling for anchor links
        const setupAnchorScrolling = () => {
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
        };
    
        // Update sub-header style based on scroll progress
        const updateSubHeaderStyle = (progress) => {
          const subHeader = document.querySelector('.sub-header');
          const subHeaderMobile = document.querySelector('.sub-header-mobile');
          const header = document.querySelector('#header');
          const linkTexts = document.querySelectorAll('.sub-header a p');
    
          if (progress > 0) {
            subHeader.classList.add('!backdrop-blur-xl', '!bg-white/50', '!fixed', '!top-[70px]');
            subHeaderMobile.classList.add('md:!top-[70px]');
            linkTexts.forEach(el => el.classList.add('!text-black'));
          } else {
            subHeader.classList.remove('!backdrop-blur-xl', '!bg-white/50', '!fixed', '!top-[70px]');
            subHeaderMobile.classList.remove('md:!top-[70px]');
            linkTexts.forEach(el => el.classList.remove('!text-black'));
          }
        };
    
        // Set up ScrollTrigger for sub-header animations
        const setupScrollTrigger = () => {
          gsap.registerPlugin(ScrollTrigger);
          ScrollTrigger.create({
            trigger: "body",
            start: "+=70 top",
            scrub: 1,
            onUpdate: (self) => updateSubHeaderStyle(self.progress)
          });
        };
    
        // onMounted hook to initialize language, animations, and scroll behavior
        onMounted(() => {
          language.value = getLanguageFromPath();
          gsap.registerPlugin(ScrollTrigger);
          
          nextTick(() => {
            initAOS();
            setupAnchorScrolling();
            setupScrollTrigger();
          });
        });
    
        return { language, logo, links, activeIndex, setActive, showDropdown, toggleDropdown };
      }
});

const SubHeaderComponent = defineComponent({
    name: 'SubHeaderComponent',
    template: `
      <div>
        <!-- Desktop Navigation -->
        <nav ref="subHeader" class="sub-header top-[60px] w-full absolute left-0 z-[99] border-b border-white/50 lg:block hidden">
          <div class="container mx-auto py-3 relative flex items-center">
            <div class="my-auto">
              <img ref="logoRef" :src="logo" alt="logo" class="w-[100px] logo">
            </div>
            <div class="w-full flex justify-center my-auto gap-5">
              <div v-for="(link, index) in links" :key="link.id">
                <a :href="link.url[language]" @click="setActive(index)" data-header-click="house_projects">
                  <p class="text-white" :class="activeIndex === index ? 'font-bold' : 'font-normal'">
                    {{ link.name[language] }}
                  </p>
                </a>
              </div>
            </div>
            <div class="my-auto">
              <a href="#register" data-header-click="register">
                <button class="border border-white px-5 py-1" type="button">
                  <p class="text-nowrap font-normal text-white">ลงทะเบียน</p>
                </button>
              </a>
            </div>
          </div>
        </nav>
  
        <!-- Mobile/Tablet Dropdown Navigation -->
        <nav ref="subHeaderMobile" class="sub-header-mobile w-full fixed left-0 z-[99] lg:hidden block bg-transparent/50 backdrop-blur top-[60px]">
          <div class="container mx-auto py-3 relative flex items-center justify-center">
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
          <div v-if="showDropdown" class="container mx-auto py-2">
            <div class="flex flex-col gap-2">
              <div v-for="(link, index) in links" :key="link.id">
                <a v-if="activeIndex !== index" :href="link.url[language]" @click="handleMobileLinkClick(index)" data-header-click="house_projects" class="block px-4 py-2">
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
      const language = ref('th'); // Default language
      const logo = ref('/assets/image/page-smyth-ramintra/banner/ramintra-logo.png');
      const links = ref([
        {
          id: 0,
          name: { en: "คอนเซ็ปต์", th: "คอนเซ็ปต์" },
          url: { en: "#design-concept", th: "#design-concept" }
        },
        {
          id: 1,
          name: { en: "จุดเด่นโครงการ", th: "จุดเด่นโครงการ" },
          url: { en: "#ProjectsHighlightComponent", th: "#ProjectsHighlightComponent" }
        },
        {
          id: 2,
          name: { en: "ข้อมูลโครงการ", th: "ข้อมูลโครงการ" },
          url: { en: "#ProjectInformationComponent", th: "#ProjectInformationComponent" }
        },
        {
          id: 3,
          name: { en: "แกลอรี่", th: "แกลอรี่" },
          url: { en: "#gallery", th: "#gallery" }
        },
        {
          id: 4,
          name: { en: "ที่ตั้งโครงการ", th: "ที่ตั้งโครงการ" },
          url: { en: "#location", th: "#location" }
        },
        {
          id: 5,
          name: { en: "S LIFESTYLE", th: "S LIFESTYLE" },
          url: { en: "#lifestyle", th: "#lifestyle" }
        }
      ]);
      const activeIndex = ref(0);
      const showDropdown = ref(false);
      const subHeader = ref(null);
      const subHeaderMobile = ref(null);
      const logoRef = ref(null);
      const isScrolled = ref(false);
  
      // Set active link manually
      const setActive = (index) => {
        activeIndex.value = index;
      };
  
      // Toggle mobile dropdown menu
      const toggleDropdown = () => {
        showDropdown.value = !showDropdown.value;
      };
  
      // Handle mobile link click: set active link and close dropdown
      const handleMobileLinkClick = (index) => {
        setActive(index);
        toggleDropdown();
      };
  
      // Extract language from URL (defaults to 'th')
      const getLanguageFromPath = () => {
        const path = window.location.pathname;
        const match = path.match(/\/(th|en)(\/|$)/);
        return match ? match[1] : 'th';
      };
  
      // Smooth scrolling for anchor links with fixed offset
      const smoothScrollWithOffset = (target) => {
        const targetElement = document.querySelector(target);
        if (targetElement) {
          const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - 50;
          window.scrollTo({ top: topPosition, behavior: 'smooth' });
        }
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
  
      // Update sub-header style manually based on scroll progress
      const updateSubHeaderStyle = (progress) => {
        if (subHeader.value && subHeaderMobile.value && logoRef.value) {
          if (progress > 0) {
            subHeader.value.classList.add('!backdrop-blur-xl', '!bg-white/50', '!fixed', '!top-[70px]');
            subHeaderMobile.value.classList.add('md:!top-[70px]');
            const linkTexts = subHeader.value.querySelectorAll('a p');
            linkTexts.forEach(el => el.classList.add('!text-black'));
            logoRef.value.src ='/assets/image/page-smyth-ramintra/banner/ramintra-logo-color.png';
          } else {
            subHeader.value.classList.remove('!backdrop-blur-xl', '!bg-white/50', '!fixed', '!top-[70px]');
            subHeaderMobile.value.classList.remove('md:!top-[70px]');
            const linkTexts = subHeader.value.querySelectorAll('a p');
            linkTexts.forEach(el => el.classList.remove('!text-black'));
            logoRef.value.src = '/assets/image/page-smyth-ramintra/banner/ramintra-logo.png';
          }
        }
      };
  
      // Set up GSAP ScrollTrigger to update scroll state and styles
      const setupScrollTrigger = () => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
          trigger: 'body',
          start: "+=70 top",
          scrub: 1,
          onUpdate: (self) => {
            isScrolled.value = self.progress > 0;
            updateSubHeaderStyle(self.progress);
          }
        });
      };
  
      onMounted(() => {
        language.value = getLanguageFromPath();
        AOS.init();
        gsap.registerPlugin(ScrollTrigger);
        setupAnchorScrolling();
        setupScrollTrigger();
      });
  
      return { language, logo, links, activeIndex, setActive, showDropdown, toggleDropdown, handleMobileLinkClick, subHeader, subHeaderMobile, logoRef };
    }
  });
  
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
      </div>
    `,
  setup() {
    const language = ref('th'); // Default language
    const logo = ref('/assets/image/page-shawn-wongwaen/banner/shawn-logo.png');
    const links = ref([
      {
        id: 0,
        name: { en: "CONCEPT", th: "คอนเซ็ปต์" },
        url: { en: "#design-concept", th: "#design-concept" }
      },
      {
        id: 1,
        name: { en: "PROJECT SIGNATURES", th: "จุดเด่นโครงการ" },
        url: { en: "#ProjectsHighlightComponent", th: "#ProjectsHighlightComponent" }
      },
      {
        id: 2,
        name: { en: "PROJECT INFORMATION", th: "ข้อมูลโครงการ" },
        url: { en: "#ProjectInformationComponent", th: "#ProjectInformationComponent" }
      },
      {
        id: 3,
        name: { en: "GALLERY", th: "แกลอรี่" },
        url: { en: "#gallery", th: "#gallery" }
      },
      {
        id: 4,
        name: { en: "LOCATION", th: "ที่ตั้งโครงการ" },
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
      if (subHeader.value && logoRef.value) {
        const header = document.querySelector('#header .wrapper');
        if (progress > 0) {
          subHeader.value.classList.add('!backdrop-blur-xl', '!bg-white/50', '!fixed', '!top-[0]');
          const linkTexts = subHeader.value.querySelectorAll('a p');
          const registerLink = subHeader.value.querySelectorAll('a button');
          registerLink.forEach(el => el.classList.add('!border-black'));
          linkTexts.forEach(el => el.classList.add('!text-black'));
          logoRef.value.src = '/assets/image/page-shawn-wongwaen/banner/shawn-logo-color.png';
          header.classList.add('lg:!translate-y-[-70px]');
        } else {
          subHeader.value.classList.remove('!backdrop-blur-xl', '!bg-white/50', '!fixed', '!top-[0]');
          const linkTexts = subHeader.value.querySelectorAll('a p');
          const registerLink = subHeader.value.querySelectorAll('a button');
          registerLink.forEach(el => el.classList.remove('!border-black'));
          linkTexts.forEach(el => el.classList.remove('!text-black'));
          logoRef.value.src = '/assets/image/page-shawn-wongwaen/banner/shawn-logo.png';
          header.classList.remove('lg:!translate-y-[-70px]');
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

    return { language, logo, links, activeIndex, setActive, showDropdown, toggleDropdown, handleMobileLinkClick, subHeader, logoRef };
  }
});

const SubHeaderComponent = defineComponent({
  name: 'SubHeaderComponent',
  template: `
      <div class="lg:block hidden">
        <!-- Desktop Navigation -->
        <nav ref="subHeader" class="sub-header top-[65px] w-full absolute left-0 z-[99] border-b border-white/50 lg:block hidden">
          <div class="container mx-auto py-3 relative flex items-center justify-between">
            <div class="my-auto">
              <img ref="logoRef" :src="logo" alt="logo" class="w-[70px] logo">
            </div>
            <div class="w-full grid grid-cols-[repeat(auto-fit,minmax(0,0.09fr))] justify-center my-auto gap-5 absolute inset-0">
              <div v-for="(link, index) in links" :key="link.id" class="my-auto">
                <a :href="link.url[language]" @click="setActive(index)" :data-header-click="link.url['en']" class="cursor-pointer">
                  <p class="text-white uppercase text-center transition-colors" :class="activeIndex === index ? 'font-bold' : 'font-normal'" v-html="link.name[language]">
                  </p>
                </a>
              </div>
            </div>
            <div class="my-auto relative" v-if="registerForm">
              <a href="#register" data-header-click="register">
                <button class="border border-white px-6 py-1 -mr-1" type="button">
                  <p class="text-nowrap font-normal text-white">{{register}}</p>
                </button>
              </a>
            </div>
          </div>
        </nav>
      </div>
    `,
  setup() {
    const language = ref('th'); // Default language
    const logo = ref('/assets\/image\/page-the-esse-complex\/logo.svg');
    const register = ref('ลงทะเบียน');
    const registerForm = ref(false);
    const links = ref([
      {
        id: 0,
        name: { en: "CONCEPT", th: "คอนเซ็ปต์" },
        url: { en: "#design_concept", th: "#design_concept" }
      },
      {
        id: 1,
        name: { en: "PROJECT SIGNATURES", th: "จุดเด่นโครงการ" },
        url: { en: "#project_signature", th: "#project_signature" }
      },
      {
        id: 2,
        name: { en: "PROJECT INFORMATION", th: "ข้อมูลโครงการ" },
        url: { en: "#project_detail", th: "#project_detail" }
      },
      {
        id: 3,
        name: { en: "GALLERY", th: "แกลเลอรี" },
        url: { en: "#gallery", th: "#gallery" }
      },
      {
        id: 4,
        name: { en: "LOCATION", th: "ที่ตั้งโครงการ" },
        url: { en: "#location", th: "#location" }
      },
      // {
      //   id: 5,
      //   name: { en: "S LIFESTYLE", th: "S LIFESTYLE" },
      //   url: { en: "#s_lifestyle", th: "#s_lifestyle" }
      // }
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

    // —————————————— ใหม่ เพิ่ม ScrollSpy ——————————————
    const setupScrollSpy = () => {
      links.value.forEach((link, index) => {
        // เลือก section ตาม href ของลิงก์
        const selector = link.url[language.value]
        const section = document.querySelector(selector)
        if (!section) return

        ScrollTrigger.create({
          trigger: section,
          start: 'top center+=-50',    // หรือปรับจุดเริ่มตามต้องการ
          end: 'bottom center',
          onEnter: () => activeIndex.value = index,
          onEnterBack: () => activeIndex.value = index,
        })
      })
    }
    // Update sub-header style manually based on scroll progress
    const updateSubHeaderStyle = (progress) => {
      if (subHeader.value && logoRef.value) {
        const header = document.querySelector('header');
        if (progress > 0) {
          subHeader.value.classList.add('!backdrop-blur-xl', '!bg-white/50', '!fixed', '!top-[0]');
          const linkTexts = subHeader.value.querySelectorAll('a p');
          const registerLink = subHeader.value.querySelectorAll('a button');
          registerLink.forEach(el => el.classList.add('!border-black'));
          linkTexts.forEach(el => el.classList.add('!text-black'));
          logoRef.value.src = '/assets\/image\/page-the-esse-complex\/log-color.png';
          header.classList.add('lg:!translate-y-[-70px]');
        } else {
          subHeader.value.classList.remove('!backdrop-blur-xl', '!bg-white/50', '!fixed', '!top-[0]');
          const linkTexts = subHeader.value.querySelectorAll('a p');
          const registerLink = subHeader.value.querySelectorAll('a button');
          registerLink.forEach(el => el.classList.remove('!border-black'));
          linkTexts.forEach(el => el.classList.remove('!text-black'));
          logoRef.value.src = '/assets\/image\/page-the-esse-complex\/logo.svg';
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
      setupScrollSpy()   // เรียกใช้ ScrollSpy หลังตั้ง ScrollTrigger
      register.value = language.value == 'th' ? 'ลงทะเบียน' : 'Register';
    });

    return { language, logo, links, activeIndex, setActive, showDropdown, toggleDropdown, handleMobileLinkClick, subHeader, logoRef, register, registerForm };
  }
});

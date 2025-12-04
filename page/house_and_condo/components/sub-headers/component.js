const SubHeaderComponent = defineComponent({
  name: 'SubHeaderComponent',
  template: `
    <div>
      <!-- Desktop Navigation -->
      <nav class="sub-header top-[65px] w-full absolute left-0 z-[99] border border-b-1 border-l-0 border-r-0 border-t-0 border-white/50 ">
        <div class="container mx-auto py-3 relative">
          <div class="flex">
            <div class="w-full flex justify-center my-auto md:gap-5">
              <div
                v-for="(link, index) in links"
                :key="link.id"
                class="md:w-[300px] w-full"
              >
                <a
                  :data-href="link.url[language]"
                  @click="setActive(index)"
                  :data-header-click="link.name['en']"
                  class="cursor-pointer"
                >
                  <p
                    :class="[
                      activeIndex === index ? 'text-white font-bold' : 'text-white font-normal'
                    ]"
                    class="text-center"
                  >
                    {{ link.name[language] }}
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  `,
  setup() {
    const language = ref('th'); // Default language
    const logo = ref('');

    const links = ref([
      {
        id: 0,
        name: { en: "House Projects", th: "บ้านและที่อยู่อาศัย" },
        url: { en: "/en/house", th: "/th/house" }
      },
      {
        id: 1,
        name: { en: "Condominium Projects", th: "คอนโดมิเนียม" },
        url: { en: "/en/condominium", th: "/th/condominium" }
      }
    ]);

    const activeIndex = ref(1); // default ให้เป็น condo ไว้ก่อน
    const showDropdown = ref(false);

    // set active ตอนคลิก
    const setActive = (index) => {
      activeIndex.value = index;
    };

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

    // language จาก path
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    // ตรวจว่าอยู่หน้า house หรือ condo จาก URL
    const detectPageTypeFromPath = () => {
      const path = window.location.pathname.toLowerCase();

      if (path.includes('/house')) {
        return 'house';
      }
      if (path.includes('/condominium') || path.includes('/condo')) {
        return 'condo';
      }

      // default
      return 'condo';
    };

    // smooth scroll anchor (ถ้ามี hash)
    const smoothScrollWithOffset = (target) => {
      const targetElement = document.querySelector(target);
      if (targetElement) {
        const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - 50;
        window.scrollTo({ top: topPosition, behavior: 'smooth' });
      }
    };

    const initAOS = () => {
      AOS.init();
    };

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

    const updateSubHeaderStyle = (progress) => {
      const subHeader = document.querySelector('.sub-header');
      const linkTexts = document.querySelectorAll('.sub-header a p');

      if (progress > 0) {
        subHeader.classList.add('!backdrop-blur-xl', '!bg-white/50', '!fixed', '!top-[70px]');
        linkTexts.forEach(el => el.classList.add('!text-black'));
      } else {
        subHeader.classList.remove('!backdrop-blur-xl', '!bg-white/50', '!fixed', '!top-[70px]');
        linkTexts.forEach(el => el.classList.remove('!text-black'));
      }
    };

    const setupScrollTrigger = () => {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({
        trigger: "body",
        start: "+=70 top",
        scrub: 1,
        onUpdate: (self) => updateSubHeaderStyle(self.progress)
      });
    };

    onMounted(() => {
      language.value = getLanguageFromPath();

      // ตั้ง active tab จาก URL
      const pageType = detectPageTypeFromPath();
      activeIndex.value = pageType === 'house' ? 0 : 1;

      gsap.registerPlugin(ScrollTrigger);

      nextTick(() => {
        initAOS();
        setupAnchorScrolling();
        setupScrollTrigger();
      });
    });

    return {
      language,
      logo,
      links,
      activeIndex,
      setActive,
      showDropdown,
      toggleDropdown,
    };
  }
});

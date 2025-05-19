const SubHeaderComponent = defineComponent({
    name: 'SubHeaderComponent',
    template: `
      <div>
        <!-- Desktop Navigation -->
        <nav class="sub-header top-[60px] w-full absolute left-0 z-[99] border border-b-1 border-l-0 border-r-0 border-t-0 border-white/50 ">
            <div class="container mx-auto py-3 relative">
                <div class="flex">
                <div class="w-full flex justify-center my-auto gap-5">
                    <div v-for="(link, index) in links" :key="link.id" class="w-[200px]">
                      <a :data-href="link.url[language]" @click="setActive(index)" :data-header-click="link.name['en']" class="cursor-pointer">
                          <p :class="[
                              activeIndex === index ? 'text-white font-bold' : 'text-white font-normal',
                              index === 0 ? 'md:text-right text-center' : index === 1 ? 'md:text-left text-center' : 'text-center'
                              ]">
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
      // Reactive state
      const language = ref('th'); // Default language
      const logo = ref('');
      const links = ref([
        {
          id: 0,
          name: { en: "House Projects", th: "House Projects" },
          url: { en:"/en/house_and_condo/house", th:"/th/house_and_condo/house" }
        },
        {
          id: 1,
          name: { en: "Condominium Projects", th: "Condominium Projects" },
          url: { en:"/en/condominium", th:"/th/condominium" }
        }
      ]);
      const activeIndex = ref(0); // Set default active link
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
        const header = document.querySelector('#header');
        const linkTexts = document.querySelectorAll('.sub-header a p');
  
        if (progress > 0) {
          subHeader.classList.add('!backdrop-blur-xl', '!bg-white/50', '!fixed', 'md:!top-[70px]','!top-[60px]');
          linkTexts.forEach(el => el.classList.add('!text-black'));
        } else {
          subHeader.classList.remove('!backdrop-blur-xl', '!bg-white/50', '!fixed', 'md:!top-[70px]','!top-[60px]');
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
  
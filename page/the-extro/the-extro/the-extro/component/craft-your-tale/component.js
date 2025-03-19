const CraftYourTaleComponent = defineComponent({
  name: 'CraftYourTaleComponent',
  template: `
    <section class="craft-your-tale-component relative overflow-hidden md:h-[900px] h-[450px] onview" data-section="craft_your_tales">
      <div class="bg-[url('/assets/image/page-the-extro/the-extro/bg2.png')] bg-cover h-full w-full bg-center flex">
        <div class="m-auto lg:w-3/5 w-full h-1/2">
          <img class="w-full h-full object-cover panorama" src="/assets/image/page-the-extro/the-extro/_VPX5685 Panorama.png" alt="Tale Image"/>
        </div>
        <div class="absolute translate-x-1/4">
          <img src="/assets/image/page-the-extro/the-extro/Live EXTRA.png" class="live-extra" alt="Live Extra"/>
        </div>
      </div>
    </section>
  `,
  setup() {
    const language = ref('th'); // Default language
  
    // Function to extract language from the URL
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };
  
    onMounted(async () => {
      language.value = getLanguageFromPath();
      gsap.registerPlugin(ScrollTrigger);
  
      const init = () => {
        AOS.init();
      };
  
      nextTick(() => {
        init();
  
        // GSAP animation for the "Live EXTRA" image
        gsap.fromTo(
          ".live-extra",
          { y: 100 }, // Start 100px lower than its natural position
          { y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".live-extra",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
  
        // GSAP animation for the panorama image to create a parallax effect
        gsap.fromTo(
          ".panorama",
          { y: -100 }, // Start 100px above its natural position
          { y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".craft-your-tale-component",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
  
        // Additional animation: Fade in the whole section as you scroll
        gsap.fromTo(
          ".craft-your-tale-component",
          { opacity: 0 },
          { opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".craft-your-tale-component",
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            }
          }
        );
  
        // Additional animation: Slight zoom effect on the background container
        gsap.fromTo(
          ".craft-your-tale-component > div",
          { scale: 1.1 },
          { scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".craft-your-tale-component",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });
    });
  
    return {  language };
  }
});

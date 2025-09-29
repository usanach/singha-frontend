const CraftYourTaleComponent = defineComponent({
  name: 'CraftYourTaleComponent',
  template: `
    <section class="craft-your-tale-component relative overflow-hidden md:h-[700px] h-[600px] onview" data-section="property_introduction">
      <div class="bg-[url('/assets/image/page-the-extro/the-extro/bg2.webp')] bg-cover h-full w-full bg-center flex">
        <div class="absolute translate-x-[17%] -top-10">
          <img src="/assets/image/page-the-extro/the-extro/Live EXTRA.webp" class="live-extra" alt="Live Extra"/>
        </div>
        
        <div class="absolute bottom-10  -translate-x-[17%]">
          <img src="/assets/image/page-the-extro/the-extro/Live-EXTRA.webp" class="live-extra2" alt="Live Extra"/>
        </div>
        <div class="m-auto lg:w-3/5 w-full md:h-[500px] h-[400px] relative">
          <img class="w-full h-full object-cover panorama" src="/assets/image/page-the-extro/the-extro/_VPX5685 Panorama.webp" alt="Tale Image"/>
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
          { y: window.innerWidth > 768 ? 100 : 200 }, // Start 100px lower than its natural position
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".live-extra",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          ".live-extra2",
          { y: 100}, // Start 100px lower than its natural position
          {
            y: 0,
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
        // gsap.fromTo(
        //   ".panorama",
        //   { y: 100 }, // Start 100px above its natural position
        //   { y: 0,
        //     ease: "none",
        //     scrollTrigger: {
        //       trigger: ".craft-your-tale-component",
        //       start: "top bottom",
        //       end: "bottom top",
        //       scrub: true,
        //     },
        //   }
        // );

        // Additional animation: Fade in the whole section as you scroll
        gsap.fromTo(
          ".craft-your-tale-component",
          { opacity: 0 },
          {
            opacity: 1,
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
          {
            scale: 1,
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

    return { language };
  }
});

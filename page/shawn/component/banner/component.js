const BannerComponent = defineComponent({
    name: 'BannerComponent',
    template: `
      <section class="banner onview font-['IBM_Plex_Sans_Thai']" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear" data-section="property_introduction">
        <div class="relative overflow-hidden h-[100dvh]">
          <div class="swiper mySwiper h-full">
            <div class="swiper-wrapper">
              <!-- Render slides dynamically using v-for -->
              <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
                <!-- Desktop Slide -->
                <div class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center lg:block hidden" 
                     :style="{ backgroundImage: 'url(' + slide.image.l + ')' }">
                  <div class="absolute top-0 left-0 flex w-full h-full">
                    <div :class="slide.theme.text.css + ' m-auto flex justify-center flex-col gap-5'">
                      <div class="m-auto">
                        <!-- Dynamic desktop logo -->
                        <img :src="slide.image.logo" alt="logo">
                      </div>
                      <div>
                        <p class="uppercase text-[35px] text-white text-center leading-tight font-normal" v-html="slide.title[language]">
                        </p>
                      </div>
                      <div class="mx-auto mt-5">
                        <a href="#filter">
                          <button type="button" class="border border-1 border-white px-10 py-2 hover:bg-black/30 hover:scale-105 transition-all duration-300">
                            <p class=" uppercase text-[16px] text-white text-center leading-tight">
                              {{ slide.button[language] }}
                            </p>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Mobile Slide -->
                <div class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center lg:hidden block" 
                     :style="{ backgroundImage: 'url(' + slide.image.s + ')' }">
                  <div class="absolute top-0 left-0 flex w-full h-full">
                    <div class="flex justify-center flex-col gap-5">
                      <div class="mt-auto px-10">
                        <!-- Dynamic mobile logo -->
                        <img :src="slide.image.logo" alt="logo">
                      </div>
                      <div>
                        <p class="uppercase text-[20px] text-white text-center leading-tight font-normal" v-html="slide.title[language]">
                        </p>
                      </div>
                      <div class="mx-auto mt-auto mb-20">
                        <a href="#filter">
                          <button type="button" class="border border-1 border-white px-10 py-2 hover:bg-black/30 hover:scale-105 transition-all duration-300">
                            <p class="uppercase text-[18px] text-white text-center leading-tight">
                              {{ slide.button[language] }}
                            </p>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Navigation & Progress -->
            <div class="absolute bottom-0 w-full z-10 my-5">
              <div class="container">
                <div class="flex justify-end gap-5">
                  <div class="flex gap-5">
                    <div class="w-[150px] relative h-[2px] my-auto overflow-hidden">
                      <div class="hero-progress-bar h-full"></div>
                    </div>
                    <div class="flex text-white leading-0 md:text-[14px] text-[11px]">
                      <div class="page-number leading-tight my-auto whitespace-nowrap"></div>
                    </div>
                  </div>
                  <div class="flex gap-5">
                    <span class="prev w-[30px]">
                      <img src="/assets/image/residential/Button-Icon.png" alt="prev icon" class="rotate-180">
                    </span>
                    <span class="next w-[30px]">
                      <img src="/assets/image/residential/Button-Icon.png" alt="next icon">
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    setup() {
      const language = ref('th'); // Default language
  
      // Extract language from URL (expects '/th/' or '/en/')
      const getLanguageFromPath = () => {
        const path = window.location.pathname;
        const match = path.match(/\/(th|en)(\/|$)/);
        return match ? match[1] : 'th';
      };
  
      // Slide data is maintained as a reactive object
      const slides = ref([
        {
          title: {
            en: "A Residence that Reflects Your Distinctive Success​",
            th: "บ้านที่สะท้อนความสำเร็จของคุณที่ไม่เหมือนใคร​"
          },
          button: {
            en: "See all locations​",
            th: "ดูโครงการทั้งหมด​"
          },
          theme: {
            text: {
              css: ""
            }
          },
          image: {
            l: "/assets/image/page-shawn-home/banner/1.png",
            s: "/assets/image/page-shawn-home/banner/1-m.png",
            logo:"/assets/image/page-shawn-home/banner/logo.png"
          }
        },
      ]);
  
      // Smooth scroll function for anchor links
      const smoothScrollWithOffset = (target) => {
        const targetElement = document.querySelector(target);
        if (targetElement) {
          const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - 50;
          window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
          });
        }
      };
  
      // Initialize AOS, Swiper, and other plugins
      const init = () => {
        AOS.init();
  
        // Initialize the main Swiper for banner slides
        const heroBannerSwiper = new Swiper(".banner .mySwiper", {
          pagination: {
            el: ".banner .mySwiper .hero-progress-bar",
            type: "progressbar"
          },
          navigation: {
            nextEl: ".mySwiper .next",
            prevEl: ".mySwiper .prev"
          }
        });
  
        // Initialize fraction pagination Swiper
        const heroBannerPagingSwiper = new Swiper(".banner .mySwiper", {
          pagination: {
            el: ".banner .mySwiper .page-number",
            type: "fraction"
          }
        });
  
        // Link the two swipers
        heroBannerSwiper.controller.control = heroBannerPagingSwiper;
  
        // Smooth scroll for in-page anchors
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
  
        // Register GSAP ScrollTrigger if needed (example provided, currently commented)
        gsap.registerPlugin(ScrollTrigger);
        // Example GSAP parallax effect (uncomment to use)
        // gsap.to(".banner .swiper-slide img", {
        //   y: "+=50",
        //   scrollTrigger: {
        //     trigger: ".banner .swiper-slide img",
        //     start: "top top",
        //     scrub: true
        //   }
        // });
      };
  
      onMounted(() => {
        language.value = getLanguageFromPath();
        nextTick(() => {
          init();
        });
      });
  
      return { language, slides };
    }
  });
  
const BannerComponent = defineComponent({
  name: 'BannerComponent',
  props: {
    dataset: {
      type: Array,
      default: () => []
    }
  },
  template: `
      <section class="banner onview" data-section="property_introduction" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear">
        <div class="relative overflow-hidden lg:h-screen h-[800px]">
          <div class="swiper mySwiper h-full">
            <div class="swiper-wrapper pt-12">
              <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
                <!-- Desktop Slide -->
                <div class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center lg:block hidden"
                  :style="{ backgroundImage: 'url(' + slide.image.l[language] + ')' }">
                </div>
                <!-- Mobile Slide -->
                <div class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center lg:hidden block"
                  :style="{ backgroundImage: 'url(' + slide.image.s[language] + ')' }">
                </div>
              </div>
            </div>
            <!-- Pagination and Navigation -->
            <div class="absolute bottom-0 w-full z-10 my-5">
              <div class="container">
                <div class="flex lg:justify-center justify-center gap-5">
                  <div class="flex gap-5">
                    <div class="lg:w-[300px] w-[150px] relative h-[2px] my-auto overflow-hidden">
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
  setup(props) {
    const language = ref('th'); // Default language

    // Extract language from the URL
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'en';
    };

    // Default slide data in case no dataset is provided via props
    const defaultSlides = [{
      title: {
        en: "",
        th: "​"
      },
      theme: {
        text: {
          css: ""
        }
      },
      font: {
        en: "font-['Gotham']",
        th: ""
      },
      description: {
        en: "​​",
        th: ""
      },
      image: {
        l: { en: "/assets/image/page-shawn-panya/banner/shawn_py_th.jpg", th: "/assets/image/page-shawn-panya/banner/shawn_py_th.jpg" },
        s: { en: "/assets/image/page-shawn-panya/banner/shawn_py_th_m.jpg", th: "/assets/image/page-shawn-panya/banner/shawn_py_th_m.jpg" },
        logo: "/assets/image/page-shawn-panya/banner/shawn-logo.png"
      }
    },];

    // Use the provided dataset if available; otherwise, fallback to defaultSlides.
    const slides = ref(props.dataset && props.dataset.length ? props.dataset : defaultSlides);

    const init = () => {
      AOS.init();
      const heroBannerSwiper = new Swiper(".banner .mySwiper", {
        autoplay: {
          delay: 10000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".banner .mySwiper .hero-progress-bar",
          type: "progressbar"
        },
        navigation: {
          nextEl: ".mySwiper .next",
          prevEl: ".mySwiper .prev"
        }
      });
      const heroBannerPagingSwiper = new Swiper(".banner .mySwiper", {
        pagination: {
          el: ".banner .mySwiper .page-number",
          type: "fraction"
        }
      });
      heroBannerSwiper.controller.control = heroBannerPagingSwiper;
    };

    onMounted(() => {
      language.value = getLanguageFromPath();
      nextTick(() => {
        init(); // Initialize AOS and Swiper after the DOM is updated
      });
    });

    return {
      language,
      slides,
    };
  }
});

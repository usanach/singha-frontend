const BannerComponent = defineComponent({
  name: 'BannerComponent',
  props: {
    dataset: {
      type: Array,
      default: () => []
    }
  },
  template: `
    <section
      v-if="hasSlides"
      class="banner onview"
      data-section="property_introduction"
      data-aos="fade-in"
      data-aos-duration="1000"
      data-aos-easing="linear"
    >
      <div class="relative overflow-hidden lg:h-screen h-[800px]">
        <div class="swiper mySwiper h-full">
          <div class="swiper-wrapper pt-12">
            <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
              <!-- Desktop Slide -->
              <div class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center lg:flex hidden"
                :style="{ backgroundImage: 'url(' + slide.image.l + ')' }">
                <div class="mx-auto mb-auto my-auto space-y-2">
                  <img v-if="slide.image.logo" :src="slide.image.logo" class="w-[180px] mx-auto" />
                  <h2
                    v-if="slide.title"
                    v-html="slide.title[language]"
                    :class="slide.font[language]"
                    :style="[language=='th'?'fontSize:70px':'fontSize:70px']"
                    class="text-white text-[70px] text-center uppercase"
                  ></h2>
                  <p
                    v-if="slide.subtitle"
                    class="text-white text-[16px] text-center"
                    v-html="slide.subtitle[language]"
                  ></p>
                </div>
              </div>

              <!-- Mobile Slide -->
              <div class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center lg:hidden flex"
                :style="{ backgroundImage: 'url(' + slide.image.s + ')' }">
                <div class="mx-auto mb-auto mt-20 space-y-2">
                  <img v-if="slide.image.logo" :src="slide.image.logo" class="w-[180px] mx-auto" />
                  <h2
                    v-if="slide.title"
                    v-html="slide.title[language]"
                    :class="slide.font[language]"
                    class="text-white text-[35px] uppercase text-center"
                  ></h2>
                  <p
                    v-if="slide.subtitle"
                    class="text-white text-[16px] text-center"
                    v-html="slide.subtitle[language]"
                  ></p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination and Navigation -->
          <div class="absolute bottom-0 w-full z-10 my-5">
            <div class="container">
              <div class="flex lg:justify-end justify-center gap-5">
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
                    <img src="/assets/image/residential/Button-Icon.webp" alt="prev icon" class="rotate-180">
                  </span>
                  <span class="next w-[30px]">
                    <img src="/assets/image/residential/Button-Icon.webp" alt="next icon">
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
    const language = ref('th');
    const slides   = ref([]);

    const hasSlides = computed(() => Array.isArray(slides.value) && slides.value.length > 0);

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const cfg        = window.APP_CONFIG || {};
    const storageUrl = cfg.storageUrl || '';

    const isBannerActive = (item) => {
      const now   = new Date();
      const start = item.date_start ? new Date(item.date_start) : null;
      const end   = item.date_end   ? new Date(item.date_end)   : null;

      if (start && now < start) return false;
      if (end && now > end) return false;
      return true;
    };

    const mapBannerToSlide = (item) => ({
      title: {
        th: item.title_th || '',
        en: item.title_en || '',
      },
      subtitle: {
        th: item.sub_th || '',
        en: item.sub_en || '',
      },
      font: {
        th: item.font_th || '',
        en: item.font_en || '',
      },
      image: {
        l: item.banner_l ? (storageUrl + item.banner_l) : '',
        s: item.banner_s ? (storageUrl + item.banner_s) : '',
        logo: item.banner_logo ? (storageUrl + item.banner_logo) : '',
      },
    });

    // ✅ ใช้ api.js แทน fetch
    const loadSlidesFromApi = async () => {
      try {
        const res = await getHomeBanner();

        // axios => res.data = { data: [...] } หรือบางทีอาจเป็น [...]
        const payload = res?.data ?? {};
        let items = [];

        if (Array.isArray(payload)) {
          items = payload;
        } else if (Array.isArray(payload.data)) {
          items = payload.data;
        }

        // filter banner active
        items = items.filter(isBannerActive);

        // optional: sort ให้คงที่ (ถ้า sort_order เท่ากัน ใช้ id)
        items.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || (a.id ?? 0) - (b.id ?? 0));

        slides.value = items.map(mapBannerToSlide);
      } catch (err) {
        console.error('error ระหว่างดึง banner:', err);
        slides.value = [];
      }
    };

    const init = () => {
      AOS.init();
      const heroBannerSwiper = new Swiper(".banner .mySwiper", {
        autoplay: { delay: 10000, disableOnInteraction: false },
        pagination: { el: ".banner .mySwiper .hero-progress-bar", type: "progressbar" },
        navigation: { nextEl: ".mySwiper .next", prevEl: ".mySwiper .prev" }
      });

      const heroBannerPagingSwiper = new Swiper(".banner .mySwiper", {
        pagination: { el: ".banner .mySwiper .page-number", type: "fraction" }
      });

      heroBannerSwiper.controller.control = heroBannerPagingSwiper;
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();

      if (props.dataset && props.dataset.length) {
        slides.value = props.dataset;
      } else {
        await loadSlidesFromApi();
      }

      // ✅ ถ้าไม่มี slides ไม่ต้อง init swiper/aos
      if (!slides.value.length) return;

      nextTick(() => init());
    });

    return { language, slides, hasSlides };
  }
});

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

    // อ่านภาษาจาก path /th/... หรือ /en/...
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    // default ถ้าไม่มี dataset และ API error หรือไม่มี banner ที่ active
    const defaultSlides = [{
      title: {
        en: "Mastering <br class='lg:hidden block'/> The Luxury",
        th: "Mastering <br class='lg:hidden block'/> The Luxury"
      },
      subtitle: {
        en: "",
        th: ""
      },
      font: {
        en: "",
        th: ""
      },
      image: {
        l: "/assets/image-new/home/home-1.webp",
        s: "/assets/image-new/home/home1-1.webp",
        logo: ""
      }
    }];

    const cfg        = window.APP_CONFIG || {};
    const storageUrl = cfg.storageUrl || '';

    // เช็คว่า banner ตัวนี้ active ไหม ตาม date_start / date_end
    const isBannerActive = (item) => {
      const now   = new Date();
      const start = item.date_start ? new Date(item.date_start) : null;
      const end   = item.date_end   ? new Date(item.date_end)   : null;

      // ถ้ามี start → now ต้อง >= start
      if (start && now < start) return false;
      // ถ้ามี end → now ต้อง <= end
      if (end && now > end) return false;

      return true;
    };

    // แปลง structure จาก DB banner → slide ที่ component ใช้
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
        l: item.banner_l   ? (storageUrl + item.banner_l)   : '',
        s: item.banner_s   ? (storageUrl + item.banner_s)   : '',
        logo: item.banner_logo ? (storageUrl + item.banner_logo) : '',
      },
    });

    // ดึงข้อมูลจาก API
    const loadSlidesFromApi = async () => {
      try {
        const cfg      = window.APP_CONFIG || {};
        const baseUrl  = cfg.apiBaseUrl || '';
        const endpoint = cfg.bannerEndpoint || '/home/banner';

        if (!baseUrl) {
          console.warn('APP_CONFIG.apiBaseUrl ยังไม่ได้ตั้งค่า ใช้ defaultSlides แทน');
          slides.value = defaultSlides;
          return;
        }

        const res = await fetch(baseUrl + endpoint, {
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!res.ok) {
          console.error('โหลด banner ล้มเหลว: HTTP', res.status);
          slides.value = defaultSlides;
          return;
        }

        const json = await res.json();

        // รองรับได้ทั้งแบบ: [ {...}, {...} ] หรือ { data: [ {...} ] }
        let items = [];
        if (Array.isArray(json)) {
          items = json;
        } else if (Array.isArray(json.data)) {
          items = json.data;
        }

        // filter ตามช่วงวันที่เปิดใช้งาน
        items = items.filter(isBannerActive);

        if (!items.length) {
          // ถ้าไม่มี banner ที่ active เลย → fallback
          slides.value = defaultSlides;
          return;
        }

        slides.value = items.map(mapBannerToSlide);

        if (cfg.debug) {
          console.log('Banner items (raw):', items);
          console.log('Banner slides (mapped):', slides.value);
        }
      } catch (err) {
        console.error('error ระหว่างดึง banner:', err);
        slides.value = defaultSlides;
      }
    };

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

    onMounted(async () => {
      language.value = getLanguageFromPath();

      // ถ้า parent ส่ง dataset มา → ใช้ dataset ก่อน (เชื่อว่า parent filter มาแล้ว)
      if (props.dataset && props.dataset.length) {
        slides.value = props.dataset;
      } else {
        await loadSlidesFromApi();
      }

      nextTick(() => {
        init();
      });
    });

    return {
      language,
      slides
    };
  }
});

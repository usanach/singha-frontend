const BannerComponent = defineComponent({
  name: 'BannerComponent',
  props: {
    dataset: {
      type: Array,
      default: () => []
    }
  },
  template: `
      <section class="banner onview " data-section="property_introduction" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear">
        <div class="relative overflow-hidden lg:h-screen h-[800px] pt-12">
          <div class="swiper mySwiper h-full">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
                <!-- Desktop Slide -->
                <div class="h-full w-full flex overflow-hidden bg-cover bg-no-repeat bg-center lg:block hidden"
                  :style="{ backgroundImage: 'url(' + slide.image.l + ')' }">
                  <div class="mx-auto mb-auto mt-20 pt-10">
                    <h2 v-html="slide.title[language]" :style="[language=='th' ? {fontSize:'70px'} : {fontSize:'70px'}]" class="text-white text-[70px] text-center font-[400]"></h2>
                  </div>
                </div>
                <!-- Mobile Slide -->
                <div class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center lg:hidden block"
                  :style="{ backgroundImage: 'url(' + slide.image.s + ')' }">
                  <div class="mx-auto mb-auto mt-20">
                    <h2 v-html="slide.title[language]" class="text-white text-[35px] text-center font-[400]"></h2>
                  </div>
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
    const language = ref('th'); // Default language
    const apiBaseUrl = window.APP_CONFIG?.apiBaseUrl || '';
    const storageUrl = window.APP_CONFIG?.storageUrl || '';

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    
    // เช็คจาก URL ว่าอยู่หน้า condo หรือ house
    const detectBannerTypeFromPath = () => {
      const path = window.location.pathname.toLowerCase();

      if (path.includes('/condominium') || path.includes('/condo')) {
        return 'condo';
      }
      if (path.includes('/house') || path.includes('/home-residence')) {
        return 'house';
      }

      // default
      return 'condo';
    };

    // Default slide data (fallback)
    const defaultSlides = [{
      title: {
        en: "Condominium Projects <br/> From Singha Estate",
        th: "รวมแบรนด์โครงการ<br class='lg:hidden'/>คอนโดมิเนียม <br/> จากสิงห์ เอสเตท"
      },
      image: {
        l: "/assets/image/page-condo/banner/banner.webp",
        s: "/assets/image/page-condo/banner/banner-m.webp",
        logo: ""
      },
    }];

    const slides = ref(
      props.dataset && props.dataset.length ? props.dataset : defaultSlides
    );

    const mapApiToSlides = (items, bannerType) => {
      // เลือกโฟลเดอร์รูปตามประเภท
      const folder =
        bannerType === 'house'
          ? 'uploads/house_banner'
          : 'uploads/condo_banner';

      return items.map(item => {
        const titleObj = { th: '', en: '' };
        ['th', 'en'].forEach(lang => {
          const raw = item.title && item.title[lang] ? item.title[lang] : '';
          titleObj[lang] = raw.replace(/\r\n|\n/g, '<br/>');
        });

        return {
          title: titleObj,
          image: {
            // storageUrl = "http://127.0.0.1:8000/storage/"
            // => http://127.0.0.1:8000/storage/uploads/house_banner/...
            l: item.image_l ? `${storageUrl}${folder}/${item.image_l}` : '',
            s: item.image_s ? `${storageUrl}${folder}/${item.image_s}` : '',
            logo: item.image_logo ? `${storageUrl}${folder}/${item.image_logo}` : ''
          }
        };
      });
    };

    const loadBannerFromApi = async () => {
      try {
        if (!apiBaseUrl) {
          console.error('APP_CONFIG หรือ apiBaseUrl ไม่มีค่า');
          return;
        }

        const bannerType = detectBannerTypeFromPath(); // 'condo' หรือ 'house'
        const endpoint =
          bannerType === 'house'
            ? `${apiBaseUrl}/house-banner`
            : `${apiBaseUrl}/condo-banner`;

        // console.log('Banner type:', bannerType, 'Endpoint:', endpoint);

        const res = await axios.get(endpoint);
        const data = (res.data && res.data.data) || [];

        if (!data.length) return;

        data.sort((a, b) => {
          const ao = a.sort_order ?? Number.MAX_SAFE_INTEGER;
          const bo = b.sort_order ?? Number.MAX_SAFE_INTEGER;
          return ao - bo;
        });

        // ส่ง bannerType เข้าไปให้เลือกโฟลเดอร์ให้ถูก
        slides.value = mapApiToSlides(data, bannerType);
      } catch (e) {
        console.error('Failed to load banner:', e);
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
      await loadBannerFromApi(); // ดึงจาก API (condo หรือ house ตาม URL)

      nextTick(() => {
        init();
      });
    });

    return {
      language,
      slides,
    };
  }
});

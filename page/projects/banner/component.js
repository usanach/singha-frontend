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
                  <div class="bg-[#00000061] absolute inset-0"></div>
                  <div class="mx-auto mb-auto mt-24 pt-10 flex flex-col gap-3 relative">
                    <img v-if="slide.image.logo" :src="slide.image.logo" class="w-[220px] mx-auto lg:mt-5" />
                    <h2
                      v-if="slide.title"
                      v-html="slide.title[language]"
                      :style="{
                        fontSize: '35px',
                        fontFamily: typeof slide.font === 'string'
                          ? slide.font
                          : (slide.font && slide.font[language]) || undefined
                      }"
                      class="pt-5 text-white text-[70px] text-center font-[400] uppercase mt-5"
                    ></h2>
                    <p
                      v-if="slide.subtitle"
                      class="text-white text-[20px] text-center"
                      v-html="slide.subtitle[language]"
                    ></p>
                  </div>
                </div>

                <!-- Mobile Slide -->
                <div class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center lg:hidden flex"
                  :style="{ backgroundImage: 'url(' + slide.image.s + ')' }">
                  <div class="bg-[#00000061] absolute inset-0"></div>
                  <div class="mx-auto mb-auto mt-20 space-y-3 relative px-5">
                    <img v-if="slide.image.logo" :src="slide.image.logo" class="w-[180px] mx-auto" />
                    <h2
                      v-if="slide.title"
                      v-html="slide.title[language]"
                      :style="{
                        fontFamily: typeof slide.font === 'string'
                          ? slide.font
                          : (slide.font && slide.font[language]) || undefined
                      }"
                      class="text-white text-[20px] text-center font-[400] uppercase"
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
            <div class="absolute bottom-0 w-full z-10 my-5" v-if="slides.length">
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
    const language = ref('th');
    const slides   = ref([]);

    // base จาก APP_CONFIG (ถ้าไม่มีใช้ default local)
    const API_BASE     = window.APP_CONFIG?.apiBaseUrl   || 'http://127.0.0.1:8000/api';
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl   || `${window.location.origin}/storage/`;

    // language จาก path
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    // build path รูปจาก storage
    const buildFullPath = (imagePath) => {
      if (!imagePath) return '';
      if (/^https?:\/\//i.test(imagePath)) return imagePath;
      return `${STORAGE_BASE}/uploads/projects/${imagePath.replace(/^\/+/, '')}`;
    };

    // default เผื่อใช้งานตอน API ใช้ไม่ได้ + ไม่มี props.dataset
    const defaultSlides = [
      {
        title: {
          en: "LIVE HIGHEST, LIVE FINEST​",
          th: "LIVE HIGHEST, LIVE FINEST​"
        },
        // ตอนนี้ใช้เป็นชื่อฟอนต์ตรง ๆ
        font: "Gotham",
        subtitle: {
          en: "Sukhumvit’s Tallest Condominium, Offering the Pinnacle of Refined Living",
          th: "ที่สุด...แห่งคุณภาพชีวิต ตึกที่สูงที่สุดย่านสุขุมวิทที่คุณสามารถใช้ชีวิตได้อย่างหรูหราและสะดวกสบาย​"
        },
        image: {
          l: "/assets/image/page-the-esse-asoke/banner/The-ESSE-Asoke_exterior-11-lowres.png",
          s: "/assets/image/page-the-esse-asoke/banner/the-esse-m.png",
          logo: "/assets/image/page-the-esse-asoke/logo.svg"
        }
      }
    ];

    // ดึง SEO → project_id → banner
    const fetchSlidesFromApi = async () => {
      try {
        const currentPath = window.location.pathname;
        const lang = language.value;

        // 1) GET /project/seo
        const seoRes = await axios.get(`${API_BASE}/project/seo`);
        const seoRows = Array.isArray(seoRes.data?.data) ? seoRes.data.data : [];

        // filter disabled
        const enabledRows = seoRows.filter(r => (r.seo_disabled ?? 0) != 1);

        const field = lang === 'en' ? 'seo_url_en' : 'seo_url_th';

        const matchedSeo = enabledRows.find(row => row[field] === currentPath);

        if (!matchedSeo || !matchedSeo.project_id) {
          console.warn('No SEO row matched current URL for banner');
          return null;
        }

        const projectId = matchedSeo.project_id;

        // 2) GET /project/banner/{project_id}
        const bannerRes = await axios.get(`${API_BASE}/project/banner/${projectId}`);
        const bannerRows = Array.isArray(bannerRes.data?.data) ? bannerRes.data.data : [];

        if (!bannerRows.length) {
          console.warn('No banner rows for project_id', projectId);
          return null;
        }
        // 3) map banner → slides format
        const mappedSlides = bannerRows.map(row => {
          return {
            title: row.banner_title || { th: '', en: '' },
            subtitle: row.banner_subtitle || { th: '', en: '' },
            // สมมติ banner_font สามารถเป็น string หรือ object แยกภาษาได้
            font: row.banner_font || null,
            image: {
              l: buildFullPath(row.banner_image_l),
              s: buildFullPath(row.banner_image_s),
              logo: buildFullPath(row.banner_image_logo)
            }
          };
        });

        return mappedSlides;
      } catch (err) {
        console.error('fetchSlidesFromApi error:', err);
        return null;
      }
    };

    // เลือก source ของ slides ตาม priority:
    // 1) props.dataset
    // 2) API seo+banner
    // 3) defaultSlides
    const loadSlides = async () => {
      // ถ้ามี dataset จาก props ให้ใช้ก่อน
      if (props.dataset && props.dataset.length) {
        slides.value = props.dataset;
        return;
      }

      // ลองเรียกจาก API
      const apiSlides = await fetchSlidesFromApi();
      if (apiSlides && apiSlides.length) {
        slides.value = apiSlides;
        return;
      }

      // ถ้ายังไม่มีอะไรเลย → fallback default
      slides.value = defaultSlides;
    };

    const initSwiper = () => {
      if (!slides.value.length) return;

      if (!window.Swiper) {
        console.warn('Swiper is not loaded');
        return;
      }

      if (window.AOS) {
        AOS.init();
      }

      // main swiper (autoplay + progress bar + nav)
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
          nextEl: ".banner .mySwiper .next",
          prevEl: ".banner .mySwiper .prev"
        }
      });

      // fraction page number
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
      await loadSlides();
      nextTick(() => {
        initSwiper();
      });
    });

    return {
      language,
      slides
    };
  }
});

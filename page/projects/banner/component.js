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

                <!-- =================== DESKTOP =================== -->
                <div class="h-full w-full lg:flex hidden relative overflow-hidden">

                  <!-- VIDEO TYPE เป็นพื้นหลัง -->
                  <template v-if="slide.displayType === 'video' && slide.video">
                    <!-- วิดีโอพื้นหลัง -->
                    <video
                      class="absolute inset-0 w-full h-full object-cover scale-150"
                      :src="slide.video"
                      autoplay
                      muted
                      loop
                      playsinline
                    ></video>

                    <!-- overlay ดำ -->
                    <div class="absolute inset-0 bg-[#00000061]"></div>

                    <!-- เนื้อหา -->
                    <div class="relative mx-auto mb-auto mt-24 pt-10 flex flex-col gap-3 items-center px-5">
                      <img
                        v-if="slide.image.logo"
                        :src="slide.image.logo"
                        class="w-[220px] mx-auto lg:mt-5"
                      />
                      <h2
                        v-if="slide.title && slide.title[language]"
                        v-html="slide.title[language]"
                        :style="{
                          fontSize: '70px',
                          fontFamily: typeof slide.font === 'string'
                            ? slide.font
                            : (slide.font && slide.font[language]) || undefined
                        }"
                        class="pt-5 text-white text-[70px] text-center font-[400] uppercase mt-5"
                      ></h2>
                      <p
                        v-if="slide.subtitle && slide.subtitle[language]"
                        class="text-white text-[20px] text-center"
                        v-html="slide.subtitle[language]"
                      ></p>
                    </div>
                  </template>

                  <!-- IMAGE TYPE (เดิม) -->
                  <template v-else>
                    <div
                      class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center flex"
                      :style="{ backgroundImage: 'url(' + slide.image.l + ')' }"
                    >
                      <div class="bg-[#00000061] absolute inset-0"></div>
                      <div class="mx-auto mb-auto mt-24 pt-10 flex flex-col gap-3 relative items-center px-5">
                        <img
                          v-if="slide.image.logo"
                          :src="slide.image.logo"
                          class="w-[220px] mx-auto lg:mt-5"
                        />
                        <h2
                          v-if="slide.title && slide.title[language]"
                          v-html="slide.title[language]"
                          :style="{
                            fontSize: '70px',
                            fontFamily: typeof slide.font === 'string'
                              ? slide.font
                              : (slide.font && slide.font[language]) || undefined
                          }"
                          class="pt-5 text-white text-[70px] text-center font-[400] uppercase mt-5"
                        ></h2>
                        <p
                          v-if="slide.subtitle && slide.subtitle[language]"
                          class="text-white text-[20px] text-center"
                          v-html="slide.subtitle[language]"
                        ></p>
                      </div>
                    </div>
                  </template>
                </div>

                <!-- =================== MOBILE =================== -->
                <div class="h-full w-full lg:hidden flex relative overflow-hidden">

                  <!-- VIDEO TYPE พื้นหลัง -->
                  <template v-if="slide.displayType === 'video' && slide.video">
                    <video
                      class="absolute inset-0 w-full h-full object-cover scale-[1.6]"
                      :src="slide.video"
                      autoplay
                      muted
                      loop
                      playsinline
                    ></video>

                    <div class="absolute inset-0 bg-[#00000061]"></div>

                    <div class="mx-auto mb-auto mt-20 space-y-3 relative px-5 flex flex-col items-center">
                      <img
                        v-if="slide.image.logo"
                        :src="slide.image.logo"
                        class="w-[180px] mx-auto mt-3"
                      />
                      <h2
                        v-if="slide.title && slide.title[language]"
                        v-html="slide.title[language]"
                        :style="{
                          fontFamily: typeof slide.font === 'string'
                            ? slide.font
                            : (slide.font && slide.font[language]) || undefined
                        }"
                        class="text-white text-[35px] text-center font-[400] leading-none pt-8 w-3/4"
                      ></h2>
                      <p
                        v-if="slide.subtitle && slide.subtitle[language]"
                        class="text-white text-[16px] text-center"
                        v-html="slide.subtitle[language]"
                      ></p>
                    </div>
                  </template>

                  <!-- IMAGE TYPE (เดิม) -->
                  <template v-else>
                    <div
                      class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center flex"
                      :style="{ backgroundImage: 'url(' + slide.image.s + ')' }"
                    >
                      <div class="bg-[#00000061] absolute inset-0"></div>
                      <div class="mx-auto mb-auto mt-20 space-y-3 relative px-5">
                        <img
                          v-if="slide.image.logo"
                          :src="slide.image.logo"
                          class="w-[180px] mx-auto"
                        />
                        <h2
                          v-if="slide.title && slide.title[language]"
                          v-html="slide.title[language]"
                          :style="{
                            fontFamily: typeof slide.font === 'string'
                              ? slide.font
                              : (slide.font && slide.font[language]) || undefined
                          }"
                          class="text-white text-[35px] text-center font-[400] leading-none pt-8"
                        ></h2>
                        <p
                          v-if="slide.subtitle && slide.subtitle[language]"
                          class="text-white text-[16px] text-center"
                          v-html="slide.subtitle[language]"
                        ></p>
                      </div>
                    </div>
                  </template>
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

    const API_BASE     = window.APP_CONFIG?.apiBaseUrl || 'http://127.0.0.1:8000/api';
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl || `${window.location.origin}/storage`;

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const buildFullPath = (filePath) => {
      if (!filePath) return '';
      if (/^https?:\/\//i.test(filePath)) return filePath;
      return `${STORAGE_BASE}/uploads/projects/${filePath.replace(/^\/+/, '')}`;
    };

    const defaultSlides = [
      {
        displayType: 'image',
        video: '',
        title: {
          en: "LIVE HIGHEST, LIVE FINEST​",
          th: "LIVE HIGHEST, LIVE FINEST​"
        },
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

    const fetchSlidesFromApi = async () => {
      try {
        const currentPath = window.location.pathname;
        const lang = language.value;

        // 1) หา project_id จาก SEO
        const seoRes  = await axios.get(`${API_BASE}/project/seo`);
        const seoRows = Array.isArray(seoRes.data?.data) ? seoRes.data.data : [];
        const enabled = seoRows.filter(r => (r.seo_disabled ?? 0) != 1);
        const field   = lang === 'en' ? 'seo_url_en' : 'seo_url_th';
        const matchedSeo = enabled.find(row => row[field] === currentPath);

        if (!matchedSeo || !matchedSeo.project_id) {
          console.warn('Banner: no SEO row matched current URL');
          return null;
        }

        const projectId = matchedSeo.project_id;

        // 2) ดึง banner ตาม project_id
        const bannerRes  = await axios.get(`${API_BASE}/project/banner/${projectId}`);
        const bannerRows = Array.isArray(bannerRes.data?.data) ? bannerRes.data.data : [];

        if (!bannerRows.length) {
          console.warn('Banner: no data for project_id', projectId);
          return null;
        }

        const mappedSlides = bannerRows.map(row => {
          // รองรับได้ทั้งเคสที่ backend รวมเป็น object แล้ว
          const title = row.banner_title
            ? row.banner_title
            : {
                th: row.banner_title_th || '',
                en: row.banner_title_en || ''
              };

          const subtitle = row.banner_subtitle
            ? row.banner_subtitle
            : {
                th: row.banner_subtitle_th || '',
                en: row.banner_subtitle_en || ''
              };

          const font = row.banner_font
            ? row.banner_font
            : {
                th: row.banner_font_th || '',
                en: row.banner_font_en || ''
              };

          const displayType = row.banner_display_type === 'video' ? 'video' : 'image';

          return {
            displayType,
            video: displayType === 'video' ? buildFullPath(row.banner_video) : '',
            title,
            subtitle,
            font,
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

    const loadSlides = async () => {
      if (props.dataset && props.dataset.length) {
        slides.value = props.dataset;
        return;
      }

      const apiSlides = await fetchSlidesFromApi();
      if (apiSlides && apiSlides.length) {
        slides.value = apiSlides;
        return;
      }

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

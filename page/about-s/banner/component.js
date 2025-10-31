const BannerComponent = defineComponent({
  name: 'BannerComponent',
  template: `
  <section class="banner onview font-['IBM_Plex_Sans_Thai']" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear" data-section="property_introduction">
    <div class="relative overflow-hidden lg:h-[100dvh]">
      <div class="swiper mySwiper h-full">
        <div class="swiper-wrapper">
          <!-- Render slides dynamically -->
          <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
            <!-- ===== Desktop ===== -->
            <div class="h-full w-full overflow-hidden lg:block hidden relative">
              <!-- Video desktop -->
              <video v-if="slide.type==='video'"
                     class="absolute inset-0 w-full h-full object-cover"
                     autoplay muted loop playsinline preload="auto"
                     :poster="slide.poster || ''"
                     :src="videoSrc(slide, 'desktop')">
                <source v-for="(s,i) in (slide.sources||[])" :key="'dv'+i" :src="s.src" :type="s.type" />
              </video>
              <!-- Image desktop -->
              <div v-else
                   class="absolute inset-0 bg-cover bg-no-repeat bg-center"
                   :style="{ backgroundImage: 'url(' + (slide.image?.l || slide.image) + ')' }"></div>

              <!-- Overlay contents -->
              <div class="absolute inset-0 flex w-full h-full bg-black/50" v-if="slide.title">
                <div :class="(slide.theme?.text?.css || 'container') + ' m-auto flex justify-center flex-col gap-5'">
                  <div class="m-auto" v-if="slide.image?.logo">
                    <img :src="slide.image.logo" alt="logo">
                  </div>
                  <div v-if="slide.title">
                    <p class="uppercase text-[35px] text-white text-center leading-tight font-normal" v-html="slide.title[language]"></p>
                  </div>
                  <div class="mx-auto mt-5" v-if="slide.button">
                    <a href="#filter">
                      <button type="button" class="border border-1 border-white px-10 py-2 hover:bg-black/30 hover:scale-105 transition-all duration-300">
                        <p class="uppercase text-[16px] text-white text-center leading-tight">
                          {{ slide.button[language] }}
                        </p>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- ===== Mobile ===== -->
            <div class="h-full w-full overflow-hidden lg:hidden block relative mt-10">
              <!-- Video mobile -->
              <video v-if="slide.type==='video'"
                     class="relative"
                     autoplay muted loop playsinline preload="auto"
                     :poster="slide.poster || ''"
                     :src="videoSrc(slide, 'mobile')">
                <source v-for="(s,i) in (slide.sources||[])" :key="'mv'+i" :src="s.src" :type="s.type" />
              </video>
              <!-- Image mobile -->
              <div v-else
                   class="absolute inset-0 bg-cover bg-no-repeat bg-center"
                   :style="{ backgroundImage: 'url(' + (slide.image?.s || slide.image) + ')' }"></div>

              <!-- Overlay contents -->
              <div class="absolute inset-0 flex w-full h-full bg-black/50">
                <div class="flex justify-center flex-col gap-5">
                  <div class="mt-auto px-10" v-if="slide.image?.logo">
                    <img :src="slide.image.logo" alt="logo">
                  </div>
                  <div v-if="slide.title">
                    <p class="uppercase text-[20px] text-white text-center leading-tight font-normal" v-html="slide.title[language]"></p>
                  </div>
                  <div class="mx-auto mt-auto mb-20" v-if="slide.button">
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
          </div><!-- /swiper-slide -->
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
                  <img src="/assets/image/residential/Button-Icon.webp" alt="prev icon" class="rotate-180">
                </span>
                <span class="next w-[30px]">
                  <img src="/assets/image/residential/Button-Icon.webp" alt="next icon">
                </span>
              </div>
            </div>
          </div>
        </div>
      </div><!-- /.swiper -->
    </div>
  </section>
`,
  setup() {
    const language = ref('th');

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    // ตัวอย่างโครงสร้าง slides:
    // - type: 'image' ใช้ image.l (desktop), image.s (mobile)
    // - type: 'video' ใช้ poster + sources[] หรือ video.desktop / video.mobile
    const slides = ref([
      // ตัวอย่างสไลด์เป็นภาพ
      // {
      //   type: 'image',
      //   image: {
      //     l: "/assets/image/about-s/banner.png",
      //     s: "/assets/image/about-s/banner.png",
      //     // logo: "/assets/logo.svg"
      //   },
      //   // title: { th: "หัวข้อ", en:"TITLE" },
      //   // button: { th: "ค้นหาโครงการ", en: "Find Project" },
      //   // theme: { text: { css: "container" } }
      // },
      // ตัวอย่างสไลด์เป็นวิดีโอ
      {
        type: 'video',
        poster: "/assets/image/about-s/banner.png",
        // แยกไฟล์ตามจอก็ได้
        video: { desktop: '/assets\/image\/about-s\/THE-ESSE-ASOKE-LIVE-HIGHEST-LIVE-FINEST2.mp4', mobile: '/assets\/image\/about-s\/THE-ESSE-ASOKE-LIVE-HIGHEST-LIVE-FINEST2.mp4' },
        // หรือระบุหลาย format ไว้ใน sources
        sources: [
          { src: '/assets\/image\/about-s\/THE-ESSE-ASOKE-LIVE-HIGHEST-LIVE-FINEST2.mp4',  type: 'video/mp4' }
        ],
      },
    ]);

    // helper: คืน src ของ video ตาม device
    const videoSrc = (slide, device /* 'desktop' | 'mobile' */) => {
      if (slide.type !== 'video') return '';
      const file = slide.video?.[device];
      return file || ''; // ถ้าไม่แยก ใช้ <source> list แทน
    };

    // Smooth scroll function
    const smoothScrollWithOffset = (target) => {
      const targetElement = document.querySelector(target);
      if (targetElement) {
        const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - 50;
        window.scrollTo({ top: topPosition, behavior: 'smooth' });
      }
    };

    // จัดการเล่น/หยุดวิดีโอตามสไลด์ที่กำลังแอคทีฟ
    const pauseAllVideos = () => {
      document.querySelectorAll('.banner video').forEach(v => {
        try { v.pause(); } catch { }
      });
    };
    const playActiveVideo = () => {
      const active = document.querySelector('.banner .swiper-slide-active video');
      if (active) {
        try { active.play(); } catch { }
      }
    };

    const init = () => {
      AOS.init();

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

      const heroBannerPagingSwiper = new Swiper(".banner .mySwiper", {
        pagination: {
          el: ".banner .mySwiper .page-number",
          type: "fraction"
        }
      });

      heroBannerSwiper.controller.control = heroBannerPagingSwiper;

      // เล่น/หยุดวิดีโอเมื่อสไลด์เปลี่ยน
      heroBannerSwiper.on('init', () => {
        pauseAllVideos();
        playActiveVideo();
      });
      heroBannerSwiper.on('slideChange', () => {
        pauseAllVideos();
        playActiveVideo();
      });

      // trigger init handlers
      heroBannerSwiper.init && heroBannerSwiper.init();

      // Smooth scroll for anchor links
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

      gsap.registerPlugin(ScrollTrigger);
    };

    onMounted(() => {
      language.value = getLanguageFromPath();
      nextTick(() => {
        init();
      });
    });

    return { language, slides, videoSrc };
  }
});

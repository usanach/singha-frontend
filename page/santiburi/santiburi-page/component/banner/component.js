const BannerComponent = defineComponent({
  name: 'BannerComponent',
  props: {
    dataset: { type: Array, default: () => [] }
  },
  template: `
  <section class="banner onview" data-section="property_introduction" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear">
    <div class="relative overflow-hidden lg:h-screen h-[800px]">
      <div class="swiper mySwiper h-full">
        <div class="swiper-wrapper pt-12">
          <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
            <!-- ========== IMAGE DESKTOP ========== -->
            <div v-if="slide.type === 'image'" class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center lg:flex hidden"
                 :style="{ backgroundImage: \`url(\${slide.image.l})\` }">
              <div class="bg-[#00000061] absolute inset-0"></div>
              <div class="mx-auto mb-auto mt-24 pt-10 space-y-3 relative">
                <img v-if="slide.image.logo" :src="slide.image.logo" class="w-[220px] mx-auto" />
                <h2 v-if="slide.title"
                    v-html="slide.title[language]"
                    :style="{ fontFamily: slide.font?.[language] }"
                    class="pt-5 text-white text-[70px] text-center font-[400]"></h2>
                <p v-if="slide.subtitle" class="text-white text-[20px] text-center" v-html="slide.subtitle[language]"></p>
              </div>
            </div>

            <!-- ========== IMAGE MOBILE ========== -->
            <div v-if="slide.type === 'image'" class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center lg:hidden flex"
                 :style="{ backgroundImage: \`url(\${slide.image.s})\` }">
              <div class="bg-[#00000061] absolute inset-0"></div>
              <div class="mx-auto mb-auto mt-20 space-y-2 relative">
                <img v-if="slide.image.logo" :src="slide.image.logo" class="w-[180px] mx-auto" />
                <h2 v-if="slide.title"
                    v-html="slide.title[language]"
                    :style="{ fontFamily: slide.font?.[language] }"
                    class="text-white text-[35px] text-center font-[400]"></h2>
                <p v-if="slide.subtitle" class="text-white text-[16px] text-center" v-html="slide.subtitle[language]"></p>
              </div>
            </div>

            <!-- ========== VIDEO DESKTOP ========== -->
            <div v-if="slide.type === 'video'" class="h-full w-full relative lg:flex hidden">
              <video
                class="absolute inset-0 w-full h-full object-cover scale-150"
                :src="slide.video?.l"
                :poster="slide.video?.posterL || ''"
                autoplay muted playsinline loop preload="metadata">
              </video>
              <div class="bg-[#00000061] absolute inset-0"></div>
              <div class="mx-auto mb-auto mt-24 pt-10 space-y-3 relative">
                <img v-if="slide.image?.logo" :src="slide.image.logo" class="w-[220px] mx-auto" />
                <h2 v-if="slide.title"
                    v-html="slide.title[language]"
                    :style="{ fontFamily: slide.font?.[language] }"
                    class="pt-5 text-white text-[70px] text-center font-[400]"></h2>
                <p v-if="slide.subtitle" class="text-white text-[20px] text-center" v-html="slide.subtitle[language]"></p>
              </div>
            </div>

            <!-- ========== VIDEO MOBILE ========== -->
            <div v-if="slide.type === 'video'" class="h-full w-full relative lg:hidden flex">
              <video
                class="absolute inset-0 w-full h-full object-cover scale-150"
                :src="slide.video?.s || slide.video?.l"
                :poster="slide.video?.posterS || slide.video?.posterL || ''"
                autoplay muted playsinline loop preload="metadata">
              </video>
              <div class="bg-[#00000061] absolute inset-0"></div>
              <div class="mx-auto mb-auto mt-20 space-y-2 relative">
                <img v-if="slide.image?.logo" :src="slide.image.logo" class="w-[180px] mx-auto" />
                <h2 v-if="slide.title"
                    v-html="slide.title[language]"
                    :style="{ fontFamily: slide.font?.[language] }"
                    class="text-white text-[35px] text-center font-[400]"></h2>
                <p v-if="slide.subtitle" class="text-white text-[16px] text-center" v-html="slide.subtitle[language]"></p>
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
    const language = ref('th');

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    // ตัวอย่างสไลด์เริ่มต้น (มี image 1 ชุด)
    const defaultSlides = [
      {
        type: 'video',
        title: {
          en: "CONNOISSEUR OF PLEASANT LIVING",
          th: "CONNOISSEUR OF PLEASANT LIVING"
        },
        font: { en: "Gotham", th: "DB OnUma" },
        subtitle: { en: "เข้าถึงทุกความสุขของชีวิต​", th: "เข้าถึงทุกความสุขของชีวิต​" },
        video: {
          l: "/assets/image/santiburi-page/banner/CONNOISSEUR%20OF%20PLEASANT%20LIVING.mp4",
          s: "/assets/image/santiburi-page/banner/CONNOISSEUR%20OF%20PLEASANT%20LIVING.mp4",
          posterL: '',
          posterS: ''
        },
        image: { logo: "/assets/image/santiburi-page/logo.png" },  // โลโก้ (ถ้ามี)
      }];

    // ใช้ dataset ที่ส่งเข้ามา ถ้าไม่มีใช้ default
    const slides = ref(props.dataset && props.dataset.length ? props.dataset : defaultSlides);

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

      // (ออปชัน) หยุด/เล่นวิดีโอตามสไลด์ที่แอคทีฟ
      const getVideos = () => Array.from(document.querySelectorAll(".banner video"));
      const pauseAll = () => getVideos().forEach(v => { v.pause?.(); });
      const playActive = () => {
        const idx = heroBannerSwiper.realIndex;
        const slideEl = heroBannerSwiper.slides[idx];
        const video = slideEl?.querySelector?.("video");
        if (video) { video.play?.(); }
      };

      heroBannerSwiper.on('slideChangeTransitionStart', pauseAll);
      heroBannerSwiper.on('slideChangeTransitionEnd', playActive);

      // เล่นวิดีโอของสไลด์แรกหากเป็นวิดีโอ
      playActive();
    };

    onMounted(() => {
      language.value = getLanguageFromPath();
      nextTick(init);
    });

    return { language, slides };
  }
});

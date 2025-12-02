// VideoBannerComponent.js
// ต้องแน่ใจว่าโหลด config.js ก่อนไฟล์นี้
// <script src="/js/config.js"></script>

const VideoBannerComponent = defineComponent({
  name: 'VideoBannerComponent',

  template: `
    <section
      class="pin-hero-banner lg:pt-14 pt-10"
      v-if="items.length"
    >
      <div class="bg-[url('./../assets/image/story/banner/detail-bg.svg')] bg-cover bg-no-repeat bg-bottom relative overflow-hidden">
        <div class="absolute left-0 top-0 w-screen flex h-full">
          <div class="relative h-full w-full lg:w-[28vw] lg:block hidden bg-[#b8a797]"></div>
          <div class="relative lg:w-[72vw] w-full lg:mb-0 -mb-[70px] overflow-hidden">
            <div class="absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[90vw] w-full lg:bottom-auto bottom-[140px]">
              <div class="swiper banner-swipe lg:scale-100 scale-[2] swiper-horizontal swiper-watch-progress swiper-backface-hidden swiper-thumbs">
                <div class="swiper-wrapper">
                  <!-- COVER VIDEO SLIDES -->
                  <div
                    class="swiper-slide"
                    v-for="(item, index) in items"
                    :key="'cover-' + index"
                  >
                    <video
                      :id="'hero-slide-cover-vdo-' + index"
                      class="w-full"
                      autoplay
                      muted
                      playsinline
                      webkit-playsinline
                    >
                      <source :src="item.video" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CONTENT -->
        <div class="container relative lg:pt-10 pt-3 lg:pb-10 md:pb-[50dvh] pb-[20rem]">
          <div class="flex lg:flex-row flex-col lg:ml-10">
            <div class="relative z-20">
              <div class="py-5">
                <!-- TITLE -->
                <h1
                  class="text-[#564B40] text-[35px] uppercase leading-tight"
                  :class="fontClass"
                  v-html="mainTitle"
                ></h1>

                <!-- DETAIL ใต้ TITLE (ถ้ามี) -->
                <div class="mt-2 lg:block hidden" v-if="mainDetail">
                  <p class="text-[22px] font-thin" v-html="mainDetail"></p>
                </div>

                <!-- DETAIL CARD SLIDER -->
                <div class="mt-3 relative">
                  <div class="left-0 lg:w-[350px] w-full z-10">
                    <div class="shadow-xl bg-[#b8a797] p-5 relative bg-[#dfd1c3]">
                      <div class="swiper banner-detail-swipe lg:pb-10 pb-5 swiper-horizontal swiper-backface-hidden">
                        <div class="swiper-wrapper">
                          <!-- DETAIL SLIDES -->
                          <div
                            class="swiper-slide"
                            v-for="(item, index) in items"
                            :key="'detail-' + index"
                          >
                            <a
                              :href="item.url[language] || '#'"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div class="flex">
                                <img
                                  :src="item.thumb"
                                  :alt="item.title[language]"
                                  class="w-full"
                                />
                              </div>
                              <div class="mt-5">
                                <div class="flex flex-col">
                                  <div>
                                    <h2
                                      class="text-[22px] uppercase text-center text-[#564B40]"
                                      :class="fontClass"
                                      v-html="item.title[language]"
                                    ></h2>
                                  </div>
                                  <div>
                                    <p
                                      class="text-[16px] mt-3 text-center text-[#564B40]"
                                      v-html="item.subtitle[language]"
                                    ></p>
                                  </div>
                                  <div class="mt-2" v-if="item.detail">
                                    <p
                                      class="text-[16px] text-center text-[#564B40]"
                                      v-html="item.detail"
                                    ></p>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>

                        <!-- PAGINATION -->
                        <div class="custom-pagination-square swiper-pagination-bullets swiper-pagination-horizontal"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- END DETAIL CARD -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  setup() {
    const items = ref([]);
    const mainTitle = ref('');
    const mainDetail = ref('');
    const language = ref('th');

    const fontClass = computed(() =>
      language.value === 'en' ? "font-['SinghaEstate']" : ''
    );

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const normalizeText = (text) => {
      if (!text) return '';
      return String(text)
        .replace(/\r\n/g, '<br/>')
        .replace(/\n/g, '<br/>');
    };

    const loadDataFromApi = async (lang) => {
      try {
        const apiBaseUrl = window.APP_CONFIG?.apiBaseUrl || '';
        const storageUrl = window.APP_CONFIG?.storageUrl || '';

        if (!apiBaseUrl) {
          console.error('APP_CONFIG.apiBaseUrl is not defined');
          return;
        }

        const res = await axios.get(
          `${apiBaseUrl}/collection-page/banner-collection-video`
        );

        const data = res.data || {};
        const mainData =
          Array.isArray(data.data) && data.data.length ? data.data[0] : null;
        const subData = Array.isArray(data['sub-data']) ? data['sub-data'] : [];

        console.log(subData);
        
        // TITLE / DETAIL
        if (mainData) {
          mainTitle.value = normalizeText(
            mainData.title?.[lang] || mainData.title?.th || ''
          );
          mainDetail.value = normalizeText(
            mainData.detail?.[lang] || mainData.detail?.th || ''
          );
        } else {
          mainTitle.value = '';
          mainDetail.value = '';
        }

        // ITEMS
        items.value = subData.map((item) => ({
          title: {
            th: normalizeText(item.title_th),
            en: normalizeText(item.title_en || item.title_th),
          },
          subtitle: {
            th: normalizeText(item.subtitle_th),
            en: normalizeText(item.subtitle_en || item.subtitle_th),
          },
          url: {
            th: item.url_th || '#',
            en: item.url_en || '#',
          },
          detail: normalizeText(item.detail),
          video: item.video ? storageUrl + item.video : '',
          thumb: item.thumb ? storageUrl + item.thumb : '',
        }));
      } catch (err) {
        console.error('Error fetching banner collection video:', err);
      }
    };

    const initSwipers = () => {
      AOS.init();

      if (window.innerWidth > 1024) {
        ScrollTrigger.create({
          trigger: '.pin-hero-banner',
          pin: '.pin-hero-banner',
          start: 'top top',
          pinSpacing: false,
          scrub: 1,
        });
      }

      const bannerSwipe = new Swiper('.banner-swipe', {
        loop: true,
        allowTouchMove: false,
        watchSlidesProgress: true,
      });

      const bannerDetailSwipe = new Swiper('.banner-detail-swipe', {
        loop: true,
        pagination: {
          el: '.banner-detail-swipe .custom-pagination-square',
          clickable: true,
        },
        thumbs: {
          swiper: bannerSwipe,
        },
        on: {
          init: (e) => {
            const vdo = document.querySelector(
              `#hero-slide-cover-vdo-${e.activeIndex}`
            );
            if (!vdo) return;

            vdo.play();
            vdo.addEventListener('timeupdate', () => {
              const refVdo = document.querySelector(
                '#hero-slide-cover-vdo-' + e.realIndex
              );
              if (!refVdo || !refVdo.duration) return;

              const totalLength = refVdo.duration % 60 || refVdo.duration;
              const percentageCompleted =
                (refVdo.currentTime / totalLength) * 100;

              const activeBullet = document.querySelector(
                '.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active'
              );
              if (!activeBullet) return;

              if (percentageCompleted < 100) {
                activeBullet.style.setProperty(
                  '--vdo-width',
                  percentageCompleted + '%'
                );
              } else {
                activeBullet.style.setProperty('--vdo-width', '0%');
                bannerDetailSwipe.slideNext();
              }
            });
          },
          slideChangeTransitionStart: () => {
            const collectionVdo = document.querySelectorAll('video');
            collectionVdo.forEach((v) => {
              v.currentTime = 0;
            });
          },
          slideChangeTransitionEnd: (e) => {
            const vdo = document.querySelector(
              `#hero-slide-cover-vdo-${e.activeIndex}`
            );
            if (!vdo) return;

            vdo.play();
            vdo.addEventListener('timeupdate', () => {
              const refVdo = document.querySelector(
                '#hero-slide-cover-vdo-' + e.realIndex
              );
              if (!refVdo || !refVdo.duration) return;

              const totalLength = refVdo.duration % 60 || refVdo.duration;
              const percentageCompleted =
                (refVdo.currentTime / totalLength) * 100;

              const activeBullet = document.querySelector(
                '.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active'
              );
              if (!activeBullet) return;

              if (percentageCompleted < 100) {
                activeBullet.style.setProperty(
                  '--vdo-width',
                  percentageCompleted + '%'
                );
              } else {
                activeBullet.style.setProperty('--vdo-width', '0%');
                bannerDetailSwipe.slideNext();
              }
            });
          },
        },
      });
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();
      await loadDataFromApi(language.value);

      await nextTick();
      if (items.value.length) {
        initSwipers();
      }

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 1000);
    });

    return {
      items,
      mainTitle,
      mainDetail,
      language,
      fontClass,
    };
  },
});

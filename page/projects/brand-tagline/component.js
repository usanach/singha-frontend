// Craft Your Tale (Template 1 = Video, Template 2 = Text/Parallax)
const CraftYourTaleComponent = defineComponent({
  name: 'CraftYourTaleComponent',
  template: `
    <!-- render เฉพาะเมื่อโหลดข้อมูลแล้วและเปิดใช้งาน -->
    <section
      v-if="isReady && isEnabled"
      class="craft-your-tale-component onview"
      data-section="craft_your_tales"
    >

      <!-- ================= TEMPLATE 2 : TEXT / PARALLAX ================= -->
      <template v-if="templateType === 2">
        <div class="relative overflow-hidden h-[900px] w-full cyt-desktop-pin">
          <!-- Layout 2 : BG + Text -->
          <div
            id="layout-2"
            class="layout-2 bg-cover bg-center bg-no-repeat absolute inset-0 flex items-center justify-center w-full cty-pallax -top-[10rem]"
            :style="{
              backgroundImage: 'url(' + (isMobile ? craft.images.bg.mobile : craft.images.bg.desktop) + ')'
            }"
          >
            <div v-if="isComplex||isAsoke" class="absolute inset-0 w-full h-full bg-black/50"></div>
            <div class="w-full h-full">
              <div class="absolute top-0 left-0 h-full w-full flex">
                <div class="flex flex-col m-auto px-4"
                  :class="isSiraninn?'mt-[20dvh]':''"
                >
                  <div v-if="isComplex" class="mt-3 text-center">
                    <p class="font-light lg:text-[100px] text-[40px] text-center cyt-desc text-white" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="500" style="font-family: 'Saol Display'">
                      <span class="capitalize">The</span> <span class="lg:text-[200px] text-[70px] italic font-light">Value</span> <br> <span>Beyond Generations</span>
                    ​</p>
                  </div>
                  <div v-else class="mt-3 text-center">
                    <p
                      v-if="craft.title[language]"
                      class="font-bold text-[45px] text-center cyt-desc tracking-wider whitespace-pre-line"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="200"
                      :class="[isSiraninn||isLasoiedes? 'text-black':'text-white', isAsoke ? 'lg:text-[70px] !font-light':'']"
                      :style="craft.fonts.title?.[language] ? { fontFamily: craft.fonts.title[language] } : null"
                    >
                      {{ craft.title[language] }}
                    </p>
                    <p
                      v-if="craft.desc[language]"
                      class="mt-2 cyt-desc whitespace-pre-line"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="400"
                      :class="[isSiraninn||isLasoiedes? 'text-black':'text-white', isPrannok||isRachapuek ? 'text-[30px]':'text-[20px]']"
                      :style="craft.fonts.desc?.[language] ? { fontFamily: craft.fonts.desc[language] } : null"
                    >
                      {{ craft.desc[language] }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Layout 1 : Foreground Overlay Image -->
          <div
            id="layout-1"
            class="layout-1 relative inset-0 flex items-center justify-center w-full transition-all duration-1000 h-[900px] bg-cover bg-center"
            :style="{
              backgroundImage: 'url(' + (isMobile ? craft.images.fg.mobile : craft.images.fg.desktop) + ')'
            }"
          ></div>
        </div>
      </template>

      <!-- ================= TEMPLATE 1 : VIDEO TEMPLATE ================= -->
      <template v-else>
        <div
          class="bg-cover bg-no-repeat bg-center"
          :style="{
            backgroundImage: 'url(' + (isMobile ? craft.images.bg.mobile : craft.images.bg.desktop) + ')'
          }"
        >
          <div class="py-20">
            <div class="container">
              <div class="flex flex-col mx-auto justify-center gap-20">
                <div class="flex flex-col justify-center">
                  <div class="mx-auto overflow-hidden relative lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]">
                    <template v-if="!showVideo">
                      <img
                        class="w-full"
                        :src="isMobile ? craft.images.fg.mobile : craft.images.fg.desktop"
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-easing="linear"
                        data-aos-delay="200"
                        alt="Craft your tale"
                      >
                      <div
                        class="absolute top-0 left-0 flex h-full w-full cursor-pointer hover:scale-105 transition"
                        @click="playVideo"
                      >
                        <svg class="m-auto" xmlns="http://www.w3.org/2000/svg" width="197" height="209" viewBox="0 0 197 209">
                          <defs>
                            <filter id="Polygon_3" x="0" y="0" width="197" height="209" filterUnits="userSpaceOnUse">
                              <feOffset dy="3" input="SourceAlpha"/>
                              <feGaussianBlur stdDeviation="20" result="blur"/>
                              <feFlood flood-opacity="0.494"/>
                              <feComposite operator="in" in2="blur"/>
                              <feComposite in="SourceGraphic"/>
                            </filter>
                          </defs>
                          <g filter="url(#Polygon_3)">
                            <path
                              id="Polygon_3-2"
                              d="M44.5,0,89,77H0Z"
                              transform="translate(137 57) rotate(90)"
                              fill="#fff"
                              opacity="0.588"
                            />
                          </g>
                        </svg>
                      </div>
                    </template>

                    <template v-else>
                      <template v-if="isMobile">
                        <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75">
                          <button
                            @click="closeModal"
                            class="absolute top-0 right-0 text-white p-2 w-[35px] h-[35px] z-40"
                          >x</button>

                          <div class="relative w-full px-4">
                            <div class="relative">
                              <iframe
                                id="player"
                                class="w-full h-[440px]"
                                :src="iframeSrc"
                                title="Craft Your Tale Video"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen
                                @load="handleIframeLoad"
                              ></iframe>

                              <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20]">
                                <div class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>

                      <template v-else>
                        <iframe
                          id="player"
                          class="lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]"
                          :src="iframeSrc"
                          title="Craft Your Tale Video"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerpolicy="strict-origin-when-cross-origin"
                          allowfullscreen
                          @load="handleIframeLoad"
                        ></iframe>

                        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20]">
                          <div class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      </template>
                    </template>
                  </div>
                </div>

                <!-- Title / Description ใต้ Video (ซ่อนตอนเล่น) -->
                <div class="lg:hidden block relative z-[10] -mt-24 text-center" :class="!showVideo ? 'opacity-100' : 'opacity-0 !hidden'">
                  <template v-if="titleType === 'image' && craft.images.titleImage">
                    <img class="w-full mx-auto" :src="craft.images.titleImage" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" alt="Craft your tale title">
                  </template>
                  <template v-else>
                    <p
                      v-if="craft.title[language]"
                      class="text-white text-[26px] mb-2 whitespace-pre-line"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      :style="craft.fonts.title?.[language] ? { fontFamily: craft.fonts.title[language] } : null"
                    >{{ craft.title[language] }}</p>
                    <p
                      v-if="craft.desc[language]"
                      class="text-white whitespace-pre-line"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="150"
                      :class="[isSiraninn||isLasoiedes? 'text-black':'text-white',isPrannok||isRachapuek ?'text-[30px]':'text-[20px]']"
                      :style="craft.fonts.desc?.[language] ? { fontFamily: craft.fonts.desc[language] } : null"
                    >{{ craft.desc[language] }}</p>
                  </template>
                </div>

                <div class="lg:block hidden relative z-[10] -mt-40 text-center" :class="!showVideo ? 'opacity-100' : 'opacity-0 !hidden'">
                  <template v-if="titleType === 'image' && craft.images.titleImage">
                    <img class="w-full mx-auto lg:max-w-full max-w-[640px]" :src="craft.images.titleImage" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" alt="Craft your tale title">
                  </template>
                  <template v-else>
                    <p
                      v-if="craft.title[language]"
                      class="text-white text-[36px] mb-3 whitespace-pre-line"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      :style="craft.fonts.title?.[language] ? { fontFamily: craft.fonts.title[language] } : null"
                    >{{ craft.title[language] }}</p>
                    <p
                      v-if="craft.desc[language]"
                      class="text-white text-[22px] whitespace-pre-line"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="150"
                      :style="craft.fonts.desc?.[language] ? { fontFamily: craft.fonts.desc[language] } : null"
                    >{{ craft.desc[language] }}</p>
                  </template>
                </div>

              </div>
            </div>
          </div>
        </div>
      </template>
    </section>
  `,

  setup() {
    const language     = ref('th');
    const templateType = ref(1);       // 1 = Video, 2 = Text
    const titleType    = ref('text');  // text | image
    const isEnabled    = ref(false);
    const isReady      = ref(false);

    const isMobile  = ref(false);
    const showVideo = ref(false);
    const isLoading = ref(false);
    const iframeSrc = ref('');
    const isSiraninn = ref(false);
    const isLasoiedes = ref(false);
    const isComplex = ref(false);
    const isAsoke = ref(false);
    const isPrannok = ref(false);
    const isRachapuek = ref(false);

    const checkRachapuekPath = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      isRachapuek.value = path.includes('/house/detached-house/srin/ratchaphruek-sai1');
    };
    const checkPrannokPath = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      isPrannok.value = path.includes('/house/detached-house/srin/prannok');
    };
    const checkLasoiedesPath = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      isLasoiedes.value = path.includes('/house/private-estate/lasoiedes/sukhumvit43');
    };
    const checkComplexPath = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      isComplex.value = path.includes('/condominium/the-esse/singha-complex');
    };
    const checkAsokePath = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      isAsoke.value = path.includes('/condominium/the-esse/asoke');
    };

    const craft = ref({
      title: { th: '', en: '' },
      desc:  { th: '', en: '' },
      fonts: {
        title: { th: '', en: '' },
        desc:  { th: '', en: '' }
      },
      images: {
        bg: { desktop: '', mobile: '' },
        fg: { desktop: '', mobile: '' },
        titleImage: ''
      },
      video: ''
    });

    const checkSiraninnPath = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      isSiraninn.value = path.includes('/house/detached-house/siraninn');
    };

    const STORAGE_BASE = window.APP_CONFIG?.storageUrl || `${window.location.origin}/storage`;

    const updateIsMobile = () => {
      isMobile.value = window.matchMedia('(max-width: 767px)').matches;
    };

    const buildImagePath = (filePath) => {
      if (!filePath) return '';
      if (/^https?:\/\//i.test(filePath)) return filePath;
      return `${STORAGE_BASE}uploads/projects/${String(filePath).replace(/^\/+/, '')}`;
    };

    const playVideo = () => {
      // ✅ ถ้าไม่มี video จริง ๆ ไม่ให้เปิด
      if (!craft.value.video) return;

      // ✅ ใส่ autoplay ตอนกดเล่น (กันบาง embed ไม่มี autoplay)
      const base = craft.value.video;
      const join = base.includes('?') ? '&' : '?';
      iframeSrc.value = base + join + 'autoplay=1';

      isLoading.value = true;
      showVideo.value = true;
    };

    const closeModal = () => {
      showVideo.value = false;
      isLoading.value = false;
      iframeSrc.value = ''; // stop video
    };

    const handleIframeLoad = () => {
      isLoading.value = false;
    };

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const initParallaxTemplate = () => {
      if (templateType.value !== 2) return;

      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        if (window.innerWidth > 768) {
          ScrollTrigger.create({
            trigger: ".craft-your-tale-component",
            start: "top top",
            pin: true,
            scrub: true,
            pinSpacing: false
          });
        }

        ScrollTrigger.create({
          trigger: "#layout-1",
          start: "top center",
          onEnter: () => {
            const layout1 = document.querySelector("#layout-1");
            if (!layout1) return;
            layout1.classList.add("opacity-0", "scale-110");
          },
          onLeaveBack: () => {
            const layout1 = document.querySelector("#layout-1");
            if (!layout1) return;
            layout1.classList.remove("opacity-0", "scale-110");
          }
        });
      }

      if (typeof Rellax !== 'undefined') {
        new Rellax('.cty-pallax');
      }
    };

    const fetchCraftData = async () => {
      try {
        // ✅ ใช้ projectIDs ที่คุณมีอยู่แล้ว
        if (!projectIDs) {
          console.warn('CraftYourTale: no projectIDs');
          isReady.value = false;
          return;
        }

        // ✅ ใช้ api.js: getProjectCaftYoursTale(projectId)
        // expected: { data: [ ... ] }
        const res = await getProjectCaftYoursTale(projectIDs);
        const rows = Array.isArray(res?.data?.data) ? res.data.data : [];

        if (!rows.length) {
          // ✅ ไม่มี data => hide (ไม่ render)
          isReady.value = false;
          return;
        }

        // ใช้ row แรก (หรือถ้าต้องการเฉพาะ enabled ก็ filter ได้)
        const row = rows[0];

        // ✅ caft_yours_tale_disabled: 1 = เปิดใช้งาน (ตามของคุณ)
        isEnabled.value = Number(row.caft_yours_tale_disabled ?? 0) === 1;
        if (!isEnabled.value) {
          isReady.value = false;
          return;
        }

        templateType.value = Number(row.carft_yours_tale_template_type ?? 1) === 2 ? 2 : 1;
        titleType.value    = row.caft_yours_tale_title_type || 'text';

        craft.value = {
          title: {
            th: row.caft_yours_tale_title_th || '',
            en: row.caft_yours_tale_title_en || ''
          },
          desc: {
            th: row.caft_yours_tale_desc_th || '',
            en: row.caft_yours_tale_desc_en || ''
          },
          fonts: {
            title: {
              th: row.caft_yours_tale_title_font_th || '',
              en: row.caft_yours_tale_title_font_en || ''
            },
            desc: {
              th: row.caft_yours_tale_des_font_th || '',
              en: row.caft_yours_tale_des_font_en || ''
            }
          },
          images: {
            bg: {
              desktop: buildImagePath(row.caft_yours_tale_image_bg_desktop),
              mobile:  buildImagePath(row.caft_yours_tale_image_bg_mobile)
            },
            fg: {
              desktop: buildImagePath(row.caft_yours_tale_image_desktop),
              mobile:  buildImagePath(row.caft_yours_tale_image_mobile)
            },
            titleImage: row.caft_yours_tale_title_image
              ? buildImagePath(row.caft_yours_tale_title_image)
              : ''
          },
          video: row.caft_yours_tale_video || ''
        };

        // ✅ ถ้าเป็น template 1 แต่ไม่มี video จริง => hide ทั้ง section
        if (templateType.value === 1 && !craft.value.video) {
          isReady.value = false;
          return;
        }

        // set iframe เริ่มต้น (ยังไม่ autoplay) เผื่อ desktop inline อยาก preload
        iframeSrc.value = craft.value.video || '';

        isReady.value = true;
      } catch (err) {
        console.error('CraftYourTale: fetch error', err);
        isReady.value = false;
      }
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();
      checkLasoiedesPath();
      checkSiraninnPath();
      checkComplexPath();
      checkAsokePath();
      checkPrannokPath();
      checkRachapuekPath();

      updateIsMobile();
      window.addEventListener('resize', updateIsMobile);

      await fetchCraftData();

      nextTick(() => {
        if (window.AOS) AOS.init();
        if (templateType.value === 2 && isReady.value && isEnabled.value) {
          initParallaxTemplate();
        }
      });
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateIsMobile);
    });

    return {
      language,
      craft,
      templateType,
      titleType,
      isEnabled,
      isReady,
      isMobile,
      showVideo,
      isLoading,
      iframeSrc,
      playVideo,
      closeModal,
      handleIframeLoad,
      isSiraninn,
      isLasoiedes,
      isComplex,
      isAsoke,
      isPrannok,
      isRachapuek
    };
  }
});

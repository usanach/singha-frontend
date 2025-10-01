const PrivateEstateComponent = defineComponent({
  name: 'PrivateEstateComponent',
  template: `
  <section id="inspire_future_living" data-section="inspire_future_living" class="onview  font-['IBM_Plex_Sans_Thai']">
    <div class="relative">
      <!-- Dynamic Background -->
      <div v-if="!isVideo"
           :style="{ backgroundImage: 'url(' + bgImage + ')' }"
           class="absolute inset-0 bg-cover bg-no-repeat bg-center filter lg:brightness-100 brightness-75 -z-10">
      </div>
      <div v-else class="absolute inset-0 -z-10">
        <video ref="bgVideoEl"
               class="w-full h-full object-cover filter lg:brightness-100 brightness-75"
               autoplay muted  playsinline preload="auto"
               :poster="videoPoster"
               :src="videoSrc">
          <source v-for="(s,i) in videoSources" :key="i" :src="s.src" :type="s.type" />
        </video>
        <div class="bg-[#FFE8BC]/30 absolute inset-0 mix-blend-multiply"></div>
      </div>

      <div class="container py-20 lg:px-5 px-0">
        <div class="flex flex-col">
          <!-- Top Image Section -->
          <div class="flex" data-aos="fade-right" data-aos-duration="1000" data-aos-easing="linear">
            <div class="lg:w-1/2 w-full">
              <img class="lg:-ml-[25%] -ml-5 lg:min-w-[742px]"
                   :src="texts.images.image1"
                   alt="">
            </div>
          </div>

          <!-- Content Section -->
          <div class="flex lg:flex-row flex-col">
            <!-- Text Content -->
            <div class="lg:w-1/2 w-full">
              <div class="lg:p-20 px-5 lg:py-20 py-10">
                <h2 class=" text-[35px] uppercase text-white font-[400]"
                    :class="[fontCss(),language=='th'?'leading-[1.5]':'leading-none']"
                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear"
                    v-html="texts.title[language]">
                </h2>
                <p class=" mt-4 text-white" data-aos="fade-up" data-aos-duration="500"
                   data-aos-easing="linear" data-aos-delay="100" v-html="description">
                </p>
              </div>
            </div>

            <!-- Bottom Image Section -->
            <div class="lg:w-1/2 w-full">
              <img class="lg:ml-[5%] ml-5 lg:min-w-[742px]" data-aos="fade-left" data-aos-duration="500"
                   data-aos-easing="linear" :src="texts.images.image2" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`,
  setup() {
    const language = ref('th'); // Default language
    const description = ref('');

    // Media state
    const isMobile = ref(false);
    const reduceMotion = ref(false);
    const bgVideoEl = ref(null);
    let mqlMobile, mqlMotion, io;

    // Extract language from URL (expects '/th/' or '/en/')
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    // Define dynamic texts and images
    // NOTE: รองรับทั้งแบบเดิม (string) และแบบ object { type:'image'|'video', ... }
    const texts = {
      title: {
        en: "THE ESSE <br/>BRAND CONCEPT ",
        th: "THE ESSE <br/>BRAND CONCEPT "
      },
      description: {
        th: `
    <b>ICONIC LOCATION</b>
    <br/>
      ตั้งอยู่ในทำเลเดินทางสะดวกใกล้ทั้งสถานี BTS และ MRT​
    <br/>
    <br/>
    <b>ICONIC DESIGN</b>
    <br/>
      การออกแบบที่มีเอกลักษณ์ เน้นการใช้งานอย่างยั่งยืน โดยดีไซเนอร์ระดับโลก​
    <br/>
    <br/>
    <b>ICONIC SPACE & SPECIFICATION​</b>
    <br/>
      ด้วยการออกแบบพื้นที่ห้องมาพร้อมฟังก์ชันครบครัน คัดสรรวัสดุระดับพรีเมียม ผสานเทคโนโลยีอัจฉริยะ พร้อมข้อเสนอที่คุ้มค่า​
    <br/>
    <br/>
    <b>ICONIC AMENITIES​​</b>
    <br/>
      สิ่งอำนวยความสะดวกหลากหลาย พร้อมกิจกรรมมากมายให้เลือกในพื้นที่ส่วนกลาง โดดเด่นด้วยทิวทัศน์จากมุมสูง พร้อมทั้งที่จอดรถรองรับได้ 80–100%​
    <br/>
    <br/>
    <b>ICONIC SERVICES​</b>
    <br/>
      บริการรักษาความปลอดภัยด้วยทีมเจ้าหน้าที่ระดับมืออาชีพ
    <br/>
  `,
        en: `
    <b>ICONIC LOCATION</b>
    <br/>
      Situated in a prime locale with effortless access to BTS/MRT stations.​
    <br/>
    <b>ICONIC DESIGN</b>
    <br/>
      Seamlessly blending aesthetics with sustainability by a world-class visionary designer.​
    <br/>
    <b>ICONIC SPACE & SPECIFICATION​</b>
    <br/>
      Smart unit planning for full functionality, featuring premium material selection, integrated smart technology, and a highly competitive offering.​
    <br/>
    <b>ICONIC AMENITIES​​</b>
    <br/>
      Exceptional amenity space, exceeding industry standards. Elevated sky-high facilities and 80–100% parking availability.​
    <br/>
    <b>ICONIC SERVICES​</b>
    <br/>
      Bespoke 5-star Concierge services provided by a dedicated professional team.​
    <br/>
  `
      }
      ,
      images: {
        // ถ้าใช้ "รูปภาพ" ให้ใช้:
        // bg: { type: 'image', desktop: '/path/bg-dt.webp', mobile: '/path/bg-mb.webp' },

        // ถ้าใช้ "วิดีโอ" ให้ใช้:
        bg: {
          type: 'video',
          poster: '/path/poster.webp',
          sources: [
            { src: '/assets\/image\/the-esse-main\/the-esse.mp4', type: 'video/mp4' }
          ],
          desktop: '/assets\/image\/the-esse-main\/the-esse.mp4',
          mobile: '/assets\/image\/the-esse-main\/the-esse.mp4'    // (ออปชัน)
        },

        // *** ใส่ค่าเริ่มต้นให้ยังทำงานกับของเดิมที่เป็นสตริงเดี่ยวได้ ***
        // bg: "/assets/image/page-shawn-home/inpire/bg.webp",

        image1: "/assets\/image\/the-esse-main\/private-estrate\/the-esse-asoke-f33-30-lowres.png",
        image2: "/assets\/image\/the-esse-main\/private-estrate\/the-esse-364120-main-selects-056.png"
      }
    };

    // Media queries
    const setupMediaQueries = () => {
      mqlMobile = window.matchMedia('(max-width: 767px)');
      mqlMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const updateMobile = () => (isMobile.value = mqlMobile.matches);
      const updateMotion = () => (reduceMotion.value = mqlMotion.matches);
      updateMobile();
      updateMotion();
      mqlMobile.addEventListener?.('change', updateMobile);
      mqlMotion.addEventListener?.('change', updateMotion);
    };
    const cleanupMediaQueries = () => {
      mqlMobile?.removeEventListener?.('change', () => { });
      mqlMotion?.removeEventListener?.('change', () => { });
    };

    // Background resolvers
    const isVideo = computed(() => {
      const bg = texts.images?.bg;
      return !!bg && typeof bg === 'object' && bg.type === 'video' && !reduceMotion.value;
    });

    const bgImage = computed(() => {
      const bg = texts.images?.bg;
      if (!bg) return '';
      if (typeof bg === 'string') return bg; // backward compatible
      if (bg.type === 'image') {
        return isMobile.value ? (bg.mobile || bg.desktop) : (bg.desktop || bg.mobile);
      }
      // video fallback → ใช้ poster
      return bg.poster || '';
    });

    const videoPoster = computed(() => {
      const bg = texts.images?.bg;
      return (typeof bg === 'object' && bg.type === 'video' && bg.poster) ? bg.poster : '';
    });

    const videoSrc = computed(() => {
      const bg = texts.images?.bg;
      if (!(typeof bg === 'object' && bg.type === 'video')) return '';
      // ถ้าแยกไฟล์ตามขนาดจอ
      if (bg.mobile || bg.desktop) {
        return isMobile.value ? (bg.mobile || bg.desktop) : (bg.desktop || bg.mobile);
      }
      // หากไม่แยก ใช้ <source> เป็นหลัก
      return '';
    });

    const videoSources = computed(() => {
      const bg = texts.images?.bg;
      if (!(typeof bg === 'object' && bg.type === 'video')) return [];
      return Array.isArray(bg.sources) ? bg.sources : [];
    });

    // Video visibility play/pause
    const setupObserver = () => {
      if (!bgVideoEl.value) return;
      io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.play?.().catch(() => { });
          } else {
            el.pause?.();
          }
        });
      }, { threshold: 0.25 });
      io.observe(bgVideoEl.value);
    };
    const cleanupObserver = () => io?.disconnect?.();

    onMounted(async () => {
      AOS.init(); // Initialize AOS animations
      language.value = getLanguageFromPath();
      description.value = language.value === 'th' ? texts.description.th : texts.description.en;

      setupMediaQueries();

      // refresh AOS หลัง DOM เสถียร
      await nextTick();
      setTimeout(() => window.AOS?.refreshHard?.(), 0);

      // ถ้าใช้วิดีโอ → พยายามเล่น และสลับพัก/เล่นตามการมองเห็น
      if (isVideo.value) {
        await nextTick();
        const v = bgVideoEl.value;
        if (v) {
          try { await v.play(); } catch { }
          setupObserver();
        }
      }
    });

    onBeforeUnmount(() => {
      cleanupObserver();
      cleanupMediaQueries();
    });

    const fontCss = () => {
      return getLanguageFromPath() == "en" ? "font-['Tenor_Sans']" : ""
    };

    return {
      language, texts, description, fontCss,
      // bg/video bindings
      isVideo, bgImage, videoPoster, videoSrc, videoSources, bgVideoEl
    };
  },

});

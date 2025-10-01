const Section2Component = defineComponent({
  name: 'Section2Component',
  template: `
  <section class="section-2 onview font-['IBM_Plex_Sans_Thai']"
           data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear"
           data-section="property_introduction">
    <div class="relative overflow-hidden h-[100dvh]">
      <!-- BG: Image -->
      <div v-if="!isVideo"
           class="absolute inset-0 bg-cover bg-no-repeat bg-center -z-10"
           :style="{ backgroundImage: 'url(' + bgUrl + ')' }">
           
      <!-- Overlay -->
      <div class="absolute inset-0 h-full w-full" :class="overlayClass"></div>
      </div>

      <!-- BG: Video -->
      <div v-else class="absolute inset-0 -z-10">
        <video class="w-full h-full object-cover"
               autoplay muted loop playsinline preload="auto"
               :poster="poster || ''" :src="videoSrc">
          <source v-for="(s,i) in videoSources" :key="i" :src="s.src" :type="s.type"/>
        </video>
      <!-- Overlay -->
      <div class="absolute inset-0 h-full w-full" :class="overlayClass"></div>
      </div>


      <!-- Content -->
      <div class="relative flex lg:px-0 px-5 h-full w-full">
        <div class="m-auto">
          <h2 class="text-white text-[35px] uppercase text-center whitespace-pre-line"
              :style="{ fontFamily: fontCss }"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-easing="ease-out"
              v-html="content.quote[language]">
          </h2>
        </div>
      </div>
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

    // ✅ ข้อมูลไดนามิกของ Section (แก้ค่าได้ตามต้องการ)
    const content = {
      // เลือกพื้นหลัง: type: 'image' | 'video'
      // --- ตัวอย่างใช้ "ภาพ" (desktop/mobile) ---
      bg: {
        type: 'image',
        desktop: '/assets/image/about-s/Screen-Shot-2567-02-27-at.png',
        mobile: '/assets/image/about-s/Screen-Shot-2567-02-27-at.png'
      },
      // --- ถ้าจะใช้ "วิดีโอ" ให้คอมเมนต์ด้านบนแล้วปลดบรรทัดด้านล่างนี้แทน ---
      // bg: {
      //   type: 'video',
      //   poster: '/assets/video/section2/poster.webp',
      //   // ใช้แยกตามจอได้ หรือไม่แยกแล้วใส่ sources ก็ได้
      //   video: { desktop: '/assets/video/section2/desktop.mp4', mobile: '/assets/video/section2/mobile.mp4' },
      //   sources: [
      //     { src: '/assets/video/section2/video.webm', type: 'video/webm' },
      //     { src: '/assets/video/section2/video.mp4',  type: 'video/mp4' }
      //   ]
      // },

      // คลาส overlay (tailwind) ปรับความทึบ/สีได้
      overlayClass: 'bg-black/50',

      // ข้อความ (รองรับหลายภาษา)
      quote: {
        en: `“At Singha Estate Residential,<br class="lg:block hidden"/> we master-craft homes that intuitively<br class="lg:block hidden"/> reflect your aspirations anticipating<br class="lg:block hidden"/> all needs, enrich all lives,<br class="lg:block hidden"/> and build legacies of humble pride.”​`,
        th: `“สิงห์ เอสเตท เราพิถีพิถันในการออกแบบบ้านทุกหลัง<br class="lg:block hidden"/> เข้าใจถึงความต้องการและรสนิยมที่แตกต่างอย่างลึกซึ้งในทุกแง่มุม<br class="lg:block hidden"/> เพื่อให้ทุกโครงการตอบสนองวิถีชีวิต และคิดเผื่อถึงความต้องการต่อไปในวันหน้า<br class="lg:block hidden"/> บ้านที่จะเป็นมรดกแห่งความภาคภูมิใจ ที่ส่งต่อได้ในอนาคต”​`
      }
    };

    // ฟอนต์ตามภาษา
    const fontCss = computed(() => (language.value === 'en' ? 'Cinzel' : ''));

    // ตรวจขนาดจอเพื่อเลือก desktop/mobile สำหรับภาพหรือวิดีโอ
    const isMobile = ref(false);
    let mql;
    const setupMQ = () => {
      mql = window.matchMedia('(max-width: 1023px)');
      const update = () => (isMobile.value = mql.matches);
      update();
      mql.addEventListener?.('change', update);
    };
    const cleanupMQ = () => mql?.removeEventListener?.('change', () => { });

    // คำนวณสถานะ BG
    const isVideo = computed(() => content.bg?.type === 'video');

    // ภาพ: คืน URL ตาม device
    const bgUrl = computed(() => {
      if (content.bg?.type !== 'image') return '';
      const d = content.bg;
      return isMobile.value ? (d.mobile || d.desktop) : (d.desktop || d.mobile);
      // ถ้ามีแค่ single path ก็ใส่ desktop ไว้ตัวเดียวได้
    });

    // วิดีโอ
    const poster = computed(() => (isVideo.value ? (content.bg.poster || '') : ''));
    const videoSrc = computed(() => {
      if (!isVideo.value) return '';
      // ถ้าแยกไฟล์ตามจอ
      const file = content.bg.video?.[isMobile.value ? 'mobile' : 'desktop'];
      return file || '';
    });
    const videoSources = computed(() => (isVideo.value ? (content.bg.sources || []) : []));

    const overlayClass = computed(() => content.overlayClass || 'bg-black/50');
    onMounted(() => {
      language.value = getLanguageFromPath();

      // AOS
      if (window.AOS?.init) {
        AOS.init();
        setTimeout(() => window.AOS?.refreshHard?.(), 0);
      }

      setupMQ();

      // ✅ Parallax effect
      if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // สำหรับ BG Image
        gsap.to(".section-2 .bg-cover", {
          y: 40,            // เลื่อนลงนิดหน่อย
          scale: 1.1,       // ซูมเข้าเล็กน้อยกันช่องว่าง
          transformOrigin: "center center",
          ease: "none",
          scrollTrigger: {
            trigger: ".section-2",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        // สำหรับ BG Video
        gsap.to(".section-2 video", {
          y: 40,
          scale: 1.1,
          transformOrigin: "center center",
          ease: "none",
          scrollTrigger: {
            trigger: ".section-2",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });

    onBeforeUnmount(() => {
      cleanupMQ();
    });

    return {
      language,
      fontCss,
      content,
      isVideo,
      bgUrl,
      poster,
      videoSrc,
      videoSources,
      overlayClass
    };
  }

});

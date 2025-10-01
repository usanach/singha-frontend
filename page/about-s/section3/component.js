const Section3Component = defineComponent({
  name: "Section3Component",
  props: {
    slides: {
      type: Array,
      default: () => ([
        {
          img: "/assets/image/about-s/section3/PANO0001-Enhanced-NR-Panorama-Retouch.png",
          title: { th: "PRIME \nLOCATION", en: "PRIME \nLOCATION" },
          desc: {
            th: "ทำเลทองใจกลางเมืองที่จะเพิ่มมูลค่าต่อเนื่องในระยะยาว พร้อมสิ่งอำนวยความสะดวกทันสมัยครบครัน",
            en: "Prestigious address in the heart of the city—offering long-term value appreciation, with a full array of modern conveniences."
          }
        },
        {
          img: "/assets/image/about-s/section3/PANO-1.png",
          title: { th: "SIGNATURE \nPLANNING & \nCRAFTED TO \nLAST DESIGN", en: "SIGNATURE \nPLANNING & \nCRAFTED TO \nLAST DESIGN" },
          desc: {
            th: "พื้นที่ใช้สอยที่ออกแบบอย่างพิถีพิถันตรงตามความต้องการใช้งาน พร้อมดีไซน์ที่เป็นเอกลักษณ์เพื่อสะท้อนตัวตนและไลฟ์สไตล์ของคุณ",
            en: "Living spaces thoughtfully tailored with refined aesthetics and unique design to reflect your character and lifestyle."
          }
        },
        {
          img: "/assets/image/about-s/section3/PANO0001-Enhanced-NR Panorama Retouch (1).png",
          title: { th: "QUALITY & \nINVISIBLE\n DETAILS", en: "QUALITY & \nINVISIBLE\n DETAILS" },
          desc: {
            th: "คัดสรรเฉพาะวัสดุพรีเมียมคุณภาพสูงสุด พร้อมความใส่ใจในรายละเอียดทุกด้าน",
            en: "Only the finest quality of premium materials—selected with care and crafted with attention to every detail."
          }
        },
        {
          img: "/assets/image/about-s/section3/PANO-2.png",
          title: { th: "SUSTAINABILITY", en: "SUSTAINABILITY" },
          desc: { th: "การออกแบบเพื่อรองรับการอยู่อาศัยอย่างยั่งยืน", en: "Designed to support enduring, sustainable living." }
        },
        {
          img: "/assets/image/about-s/section3/PANO-3.png",
          title: { th: "Service & \nLiving \nExperience", en: "SERVICE & \nLIVING \nEXPERIENCE" },
          desc: {
            th: "การบริการหลังการขายที่มุ่งมั่นเพื่อมอบประสบการณ์การอยู่อาศัยเหนือระดับ",
            en: "Exceptional after-sales service dedicated to delivering a truly elevated living experience—beyond expectations."
          }
        }
      ])
    }
  },

  template: `
  <section ref="rootEl" class="section-2 relative font-['IBM_Plex_Sans_Thai']" data-section="property_introduction">
    <div class="relative">

      <!-- แท็บ (pin ช่วงอยู่ใน section) -->
      <div
        ref="tabEl"
        class="z-30 py-5 absolute w-full"
        :style="[{fontFamily:'Cinzel'}, tabStyle]"
      >
        <div class="container mx-auto text-white uppercase">

          <!-- Desktop / Tablet: ปุ่มนำทาง -->
          <div class="hidden md:flex flex-wrap gap-x-6 gap-y-2 justify-between">
            <button
              v-for="(s, i) in slides" :key="'nav-text-'+i"
              class="transition-all border-b-2 pb-1 text-sm md:text-base"
              :class="activeIndex === i ? 'opacity-100 border-white' : 'opacity-70 border-transparent hover:opacity-100'"
              @click="goTo(i)"
              :style="[{fontFamily:'Cinzel'}]">
              {{ normalizeTitle(s.title[language]) }}
            </button>
          </div>

          <!-- Mobile: dot indicators -->
          <div class="md:hidden flex flex-col items-center justify-center gap-3">
            <button
              v-for="(s, i) in slides" :key="'nav-dot-'+i"
              class="relative inline-flex items-center justify-center transition-all"
              @click="goTo(i)"
              :aria-label="normalizeTitle(s.title[language])"
              :aria-current="activeIndex === i ? 'true' : 'false'">
              <span class="block rounded-full"
                :class="activeIndex === i ? 'w-3.5 h-3.5 bg-white' : 'w-2.5 h-2.5 bg-white/40'"></span>
              <span v-if="activeIndex === i" class="absolute inset-0 rounded-full ring-2 ring-white/80 scale-110"></span>
              <span class="sr-only">{{ normalizeTitle(s.title[language]) }}</span>
            </button>
          </div>

        </div>
      </div>

      <!-- Desktop: เวทีเดียว แทนที่วิว (ไม่สกรอลล์ระหว่างสไลด์) -->
      <div v-if="isDesktop" class="relative h-[100svh] bg-black overflow-hidden">
        <div class="absolute inset-0">
          <div
            v-for="(s, i) in slides" :key="'desk-'+i"
            class="s3-panel-abs absolute inset-0"
            :data-index="i"
            style="opacity:0; pointer-events:none;"
          >
            <img :src="s.img" class="s3-img absolute inset-0 w-full h-full object-cover" loading="lazy" draggable="false" />
            <div class="absolute inset-0 bg-black/30 z-10 flex">
              <div class="container m-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="my-auto">
                  <h3 class="s3-title text-[42px] md:text-[70px] text-white uppercase leading-[1.05] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] md:drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]" :style="{fontFamily:'Cinzel'}" style="white-space:pre-line">
                    {{ s.title[language] }}
                  </h3>
                </div>
                <div class="my-auto">
                  <div class="flex">
                    <p class="s3-desc lg:ml-auto text-[18px] md:text-[22px] text-white w-1/2" :style="{fontFamily:'IBM Plex Sans Thai'}" style="white-space:pre-line">
                      {{ s.desc[language] }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- /abs-panel -->
        </div>
      </div>

      <!-- Mobile: สแต็คเลื่อนยาว (เหมือนเดิม) -->
      <div v-else class="s3-stack">
        <div
          v-for="(s, i) in slides" :key="'mob-'+i"
          class="s3-panel relative h-[100svh] flex items-center justify-center bg-black overflow-hidden"
          :data-index="i"
        >
          <img :src="s.img" class="s3-img absolute inset-0 w-full h-full object-cover" loading="lazy" draggable="false" />
          <div class="absolute inset-0 bg-black/30 z-10 flex">
            <div class="container m-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="my-auto">
                <h3 class="s3-title text-[42px] md:text-[70px] text-white uppercase leading-[1.05] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] md:drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]" :style="{fontFamily:'Cinzel'}" style="white-space:pre-line">
                  {{ s.title[language] }}
                </h3>
              </div>
              <div class="my-auto">
                <div class="flex">
                  <p class="s3-desc lg:ml-auto text-[18px] md:text-[22px] text-white w-1/2" :style="{fontFamily:'IBM Plex Sans Thai'}" style="white-space:pre-line">
                    {{ s.desc[language] }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div><!-- /panel -->
      </div>

    </div>
  </section>
`,

  setup(props) {
    const rootEl = ref(null);
    const tabEl = ref(null);
    const activeIndex = ref(0);
    const language = ref('th');

    // โหมดหน้าจอ
    const isDesktop = ref(window.matchMedia("(min-width: 768px)").matches);

    // triggers
    let stTabPin = null;          // pin tab
    let stSnap = null;            // snap (ใช้เฉพาะ mobile)
    let stMobileFixed = null;     // fixed tab ช่วงอยู่ใน section (mobile)
    const perPanelST = [];        // triggers ย่อย (mobile)

    const normalizeTitle = (t) => (t || "").replace(/\n/g, " ").trim();

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const getHeaderOffset = () => {
      const header = document.querySelector("header");
      if (!header) return 0;
      const cs = window.getComputedStyle(header);
      return (cs.position === "fixed" || cs.position === "sticky") ? 70 : 0;
    };
    const getTabHeight = () => (tabEl.value ? tabEl.value.offsetHeight : 0);
    const isMobileScreen = () => !isDesktop.value;

    // tab style (mobile use only)
    const tabStyle = ref({});
    const baseMobilePos = () => ({
      left: "2dvw",
      top: `calc(70vh + ${getHeaderOffset()}px)`,
      width: "auto",
      zIndex: 30,
    });
    const applyTabStyle = () => {
      if (isMobileScreen()) {
        tabStyle.value = { position: "absolute", ...baseMobilePos() };
      } else {
        tabStyle.value = {};
      }
    };

    // เลื่อนไปยังสไลด์ (desktop = เปลี่ยนภาพ / mobile = สกรอลล์)
    const goTo = (i) => {
      if (isDesktop.value) {
        if (i === activeIndex.value) return;
        switchDesktopPanel(activeIndex.value, i);
        activeIndex.value = i;
      } else {
        const panel = rootEl.value?.querySelectorAll(".s3-panel")[i];
        if (!panel) return;
        const offset = getHeaderOffset() + getTabHeight();
        const rect = panel.getBoundingClientRect();
        const targetTop = window.scrollY + rect.top - offset;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    };

    // ---------- Desktop: crossfade ระหว่างพาเนล ----------
    let currentDesk = 0;
    const showDesktopAt = (index, instant = false) => {
      const panels = rootEl.value?.querySelectorAll(".s3-panel-abs");
      if (!panels?.length) return;

      panels.forEach((p, i) => {
        const img = p.querySelector(".s3-img");
        const title = p.querySelector(".s3-title");
        const desc = p.querySelector(".s3-desc");
        if (i === index) {
          if (instant || typeof gsap === "undefined") {
            p.style.opacity = 1; p.style.pointerEvents = "auto";
            img && (img.style.opacity = 1);
            title && (title.style.opacity = 1, title.style.transform = "translateY(0)");
            desc && (desc.style.opacity = 1, desc.style.transform = "translateY(0)");
          } else {
            gsap.set(p, { pointerEvents: "auto" });
            gsap.fromTo(p, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
            gsap.fromTo(img, { autoAlpha: 0, scale: 1.03 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power2.out" });
            gsap.fromTo(title, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out", delay: 0.04 });
            gsap.fromTo(desc,  { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out", delay: 0.10 });
          }
        } else {
          if (instant || typeof gsap === "undefined") {
            p.style.opacity = 0; p.style.pointerEvents = "none";
            img && (img.style.opacity = 0);
            title && (title.style.opacity = 0);
            desc && (desc.style.opacity = 0);
          } else {
            gsap.set(p, { pointerEvents: "none" });
            gsap.to(p, { autoAlpha: 0, duration: 0.28, ease: "power2.in" });
          }
        }
      });
    };

    const switchDesktopPanel = (from, to) => {
      if (typeof gsap === "undefined" || from === to) { showDesktopAt(to, true); return; }
      const panels = rootEl.value?.querySelectorAll(".s3-panel-abs");
      if (!panels?.length) return;
      const pFrom = panels[from], pTo = panels[to];
      if (!pTo) return;

      // เตรียม pTo
      const toImg = pTo.querySelector(".s3-img");
      const toTitle = pTo.querySelector(".s3-title");
      const toDesc = pTo.querySelector(".s3-desc");
      gsap.set([pTo, toImg, toTitle, toDesc], { autoAlpha: 0 });
      gsap.set(pTo, { pointerEvents: "auto" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      // out current
      if (pFrom) tl.to(pFrom, { autoAlpha: 0, duration: 0.25, ease: "power2.in" }, 0)
                   .set(pFrom, { pointerEvents: "none" }, "<");
      // in next
      tl.to(pTo, { autoAlpha: 1, duration: 0.3 }, 0.02)
        .fromTo(toImg,   { autoAlpha: 0, scale: 1.03 }, { autoAlpha: 1, scale: 1, duration: 0.42 }, 0.02)
        .fromTo(toTitle, { autoAlpha: 0, y: 18 },      { autoAlpha: 1, y: 0,   duration: 0.34 }, 0.08)
        .fromTo(toDesc,  { autoAlpha: 0, y: 16 },      { autoAlpha: 1, y: 0,   duration: 0.3  }, 0.14);

      currentDesk = to;
    };

    // ---------- Mobile: scroll triggers (คงเดิม) ----------
    const perPanelAnimST = [];
    const fadeInPanel = (panel) => {
      const img   = panel.querySelector(".s3-img");
      const title = panel.querySelector(".s3-title");
      const desc  = panel.querySelector(".s3-desc");
      if (typeof gsap === "undefined") return;
      gsap.set(img,   { autoAlpha: 0, scale: 1.04 });
      gsap.set(title, { autoAlpha: 0, y: 18 });
      gsap.set(desc,  { autoAlpha: 0, y: 16 });
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(img,   { autoAlpha: 1, scale: 1, duration: 0.5 }, 0)
        .to(title, { autoAlpha: 1, y: 0,   duration: 0.45 }, 0.05)
        .to(desc,  { autoAlpha: 1, y: 0,   duration: 0.4  }, 0.12);
      return tl;
    };
    const fadeOutPanel = (panel) => {
      const img   = panel.querySelector(".s3-img");
      const title = panel.querySelector(".s3-title");
      const desc  = panel.querySelector(".s3-desc");
      if (typeof gsap === "undefined") return;
      const tl = gsap.timeline({ defaults: { ease: "power2.in" } });
      tl.to(desc,  { autoAlpha: 0, y: -12, duration: 0.25 }, 0)
        .to(title, { autoAlpha: 0, y: -14, duration: 0.28 }, 0.02)
        .to(img,   { autoAlpha: 0, scale: 1.02, duration: 0.3 }, 0.06);
      return tl;
    };
    const buildPanelAnimationsMobile = () => {
      perPanelAnimST.splice(0).forEach(st => { try { st.kill(); } catch {} });
      const panels = Array.from(rootEl.value?.querySelectorAll(".s3-panel") || []);
      if (!panels.length || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
      panels.forEach(p => {
        const img = p.querySelector(".s3-img");
        const title = p.querySelector(".s3-title");
        const desc = p.querySelector(".s3-desc");
        gsap.set([img, title, desc], { autoAlpha: 0 });
      });
      panels.forEach((panel, i) => {
        const st = ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onEnter: () => { activeIndex.value = i; fadeInPanel(panel); },
          onEnterBack: () => { activeIndex.value = i; fadeInPanel(panel); },
          onLeave: () => { fadeOutPanel(panel); },
          onLeaveBack: () => { fadeOutPanel(panel); },
        });
        perPanelAnimST.push(st);
      });
      requestAnimationFrame(() => {
        const first = panels[0];
        if (!first) return;
        const b = first.getBoundingClientRect();
        if (b.top < innerHeight && b.bottom > 0) fadeInPanel(first);
      });
    };

    // --- Snap (เฉพาะ mobile) ---
    const buildSnap = () => {
      if (stSnap) { try { stSnap.kill(); } catch {} stSnap = null; }
      perPanelST.splice(0).forEach(st => { try { st.kill(); } catch {} });
      const panels = Array.from(rootEl.value?.querySelectorAll(".s3-panel") || []);
      if (!panels.length || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
      panels.forEach((p, i) => {
        const st = ScrollTrigger.create({
          trigger: p,
          start: "top center",
          end: "bottom center",
          onEnter: () => { activeIndex.value = i; },
          onEnterBack: () => { activeIndex.value = i; },
        });
        perPanelST.push(st);
      });
      stSnap = ScrollTrigger.create({
        trigger: rootEl.value,
        start: "top top",
        end: "bottom bottom",
        snap: {
          snapTo: (value) => {
            const steps = Math.max(1, panels.length - 1);
            return Math.round(value * steps) / steps;
          },
          duration: 0.3,
          ease: "power2.out",
          delay: 0.02,
        },
      });
      setTimeout(() => { try { ScrollTrigger.refresh(true); } catch {} }, 400);
    };

    // --- Pin tab (ทั้งสองโหมด) ---
    const buildTabPin = () => {
      if (!tabEl.value || !rootEl.value || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
      if (stTabPin) { try { stTabPin.kill(); } catch {} stTabPin = null; }
      if (isMobileScreen()) return; // pin เฉพาะเดสก์ท็อป
      const headerOffset = -getHeaderOffset();
      stTabPin = ScrollTrigger.create({
        trigger: rootEl.value,
        start: `top+=${headerOffset} top`,
        end: "bottom top",
        pin: tabEl.value,
        pinSpacing: false,
        anticipatePin: 1,
      });
    };

    // --- Mobile: fixed tab เฉพาะตอนอยู่ใน section ---
    const buildMobileFixed = () => {
      if (stMobileFixed) { try { stMobileFixed.kill(); } catch {} stMobileFixed = null; }
      if (!isMobileScreen() || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || !rootEl.value || !tabEl.value) {
        try { gsap?.set?.(tabEl.value, { clearProps: "opacity,visibility" }); tabEl.value.style.pointerEvents = ""; } catch {}
        return;
      }
      tabStyle.value = { position: "absolute", ...baseMobilePos() };
      gsap.set(tabEl.value, { autoAlpha: 0 });
      tabEl.value.style.pointerEvents = "none";
      let lastActive = false;
      const setState = (active) => {
        if (active === lastActive) return; lastActive = active;
        const topNow = `calc(70vh + ${getHeaderOffset()}px)`;
        if (active) {
          tabStyle.value = { ...tabStyle.value, position: "fixed", top: topNow };
          gsap.to(tabEl.value, { autoAlpha: 1, duration: 0.25, ease: "power2.out" });
          tabEl.value.style.pointerEvents = "auto";
        } else {
          tabStyle.value = { ...tabStyle.value, position: "absolute", top: topNow };
          gsap.to(tabEl.value, { autoAlpha: 0, duration: 0.2, ease: "power2.out" });
          tabEl.value.style.pointerEvents = "none";
        }
      };
      stMobileFixed = ScrollTrigger.create({
        trigger: rootEl.value,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => setState(self.isActive),
        onRefresh: (self) => setState(self.isActive),
      });
    };

    // ---------- rebuild per mode ----------
    const rebuildAll = () => {
      applyTabStyle();
      if (isDesktop.value) {
        // Desktop: ไม่มีสกรอลล์ระหว่างสไลด์
        try { stSnap?.kill(); } catch {} stSnap = null;
        perPanelST.splice(0).forEach(st => { try { st.kill(); } catch {} });
        perPanelAnimST.splice(0).forEach(st => { try { st.kill(); } catch {} });
        buildTabPin();
        buildMobileFixed(); // จะ return ทันทีใน desktop
        // แสดงสไลด์ปัจจุบันแบบ instant
        requestAnimationFrame(() => {
          showDesktopAt(activeIndex.value, true);
        });
      } else {
        // Mobile: ใช้สกรอลล์
        buildPanelAnimationsMobile();
        buildSnap();
        buildTabPin();      // จะ return; pin เฉพาะ desktop
        buildMobileFixed(); // ทำงานจริงใน mobile
      }
      try { ScrollTrigger?.refresh?.(); } catch {}
    };

    // ---------- watch ----------
    watch(activeIndex, (i, p) => {
      if (isDesktop.value) currentDesk = i;
    });

    // media query listener
    let mql;
    onMounted(async () => {
      language.value = getLanguageFromPath();
      await nextTick();

      mql = window.matchMedia("(min-width: 768px)");
      const applyMQ = () => { isDesktop.value = mql.matches; rebuildAll(); };
      mql.addEventListener ? mql.addEventListener("change", applyMQ) : mql.addListener(applyMQ);

      rebuildAll();

      const onResize = () => rebuildAll();
      window.addEventListener("resize", onResize, { passive: true });
      // @ts-ignore
      Section3Component.__onResize = onResize;
    });

    onBeforeUnmount(() => {
      try { window.removeEventListener("resize", /* @ts-ignore */ Section3Component.__onResize); } catch {}
      try { stTabPin?.kill(); stTabPin = null; } catch {}
      try { stSnap?.kill(); stSnap = null; } catch {}
      try { stMobileFixed?.kill(); stMobileFixed = null; } catch {}
      perPanelST.splice(0).forEach(st => { try { st.kill(); } catch {} });
      // mql cleanup
      try { mql?.removeEventListener ? mql.removeEventListener("change", rebuildAll) : mql?.removeListener?.(rebuildAll); } catch {}
    });

    return {
      // state
      activeIndex, language, isDesktop,
      // refs
      rootEl, tabEl,
      // utils
      normalizeTitle, tabStyle,
      // actions
      goTo,
    };
  },
});

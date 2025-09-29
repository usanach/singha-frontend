// (ถ้าใช้แบบ ESM ให้ uncomment และติดตั้งแพ็กเกจที่จำเป็น)
// import { defineComponent, ref, onMounted, onBeforeUnmount, nextTick } from "vue";
// import { gsap } from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// // ScrollToPlugin ไม่จำเป็นอีกต่อไปสำหรับ goTo(), แต่ใช้ได้ถ้าต้องการ
// // import ScrollToPlugin from "gsap/ScrollToPlugin";
// gsap?.registerPlugin?.(ScrollTrigger /*, ScrollToPlugin*/);

const Section3Component = defineComponent({
  name: "Section3Component",
  props: {
    slides: {
      type: Array,
      default: () => ([
        { img: "/assets/image/about-s/section3/PANO0001-Enhanced-NR-Panorama-Retouch.png",
          title: "Prime \n Location",
          desc: `ทำเลทองที่่จะสร้างมูลค่าอย่างต่อเนื่องในระยะยาว 
และมีสิ่งอำนวยความสะดวกให้ผู้อาศัย ทำเลทองที่
จะสร้างมูลค่าอย่างต่อเนื่องในระยะยาว และมีสิ่ง
อำนวยความสะดวกให้ผู้อาศัย​​`, },
        { img: "/assets/image/about-s/section3/PANO-1.png",
          title: "Signature Planning & \nCrafted to last design",
          desc: `ออกแบบพื้นที่ใช้สอยตอบสนองตรงตาม
ความต้องการของผู้อยู่อาศัย รวมถึง
งานดีไซน์ที่สวยงาม ประณีต และมีเอกลักษณ์
ออกแบบพื้นที่ใช้สอยตอบสนองตรงตาม​​​`, },
        { img: "/assets/image/about-s/section3/PANO0001-Enhanced-NR Panorama Retouch (1).png",
          title: "Quality & \nInvisible details ",
          desc: `ความพิถีพิถันเลือกใช้วัสดุคุณภาพสูง
ที่มาพร้อมความใส่ใจในรายละเอียดทุกด้าน
ความพิถีพิถันเลือกใช้วัสดุคุณภาพสูง
ที่มาพร้อมความใส่ใจในรายละเอียดทุกด้าน​​​​​`, },
        { img: "/assets/image/about-s/section3/PANO-2.png",
          title: "Sustainability ",
          desc: `การออกแบบเพื่อรองรับการอยู่อาศัยอย่างยั่งยืน​
ความพิถีพิถันเลือกใช้วัสดุคุณภาพสูง
ที่มาพร้อมความใส่ใจในรายละเอียดทุกด้าน
การออกแบบเพื่อรองรับการอยู่อาศัยอย่างยั่งยืน​​​`, },
        { img: "/assets/image/about-s/section3/PANO-3.png",
          title: "Sustainability ",
          desc: `การออกแบบเพื่อรองรับการอยู่อาศัยอย่างยั่งยืน​
ความพิถีพิถันเลือกใช้วัสดุคุณภาพสูง
ที่มาพร้อมความใส่ใจในรายละเอียดทุกด้าน
การออกแบบเพื่อรองรับการอยู่อาศัยอย่างยั่งยืน​​​`, },
      ])
    }
  },

  template: `
  <section ref="rootEl" class="section-2 relative font-['IBM_Plex_Sans_Thai']" data-section="property_introduction">
    <div class="relative">

     <!-- แท็บ (จะถูก pin ด้วย GSAP เฉพาะช่วงอยู่ใน section นี้) -->
      <div
        ref="tabEl"
        class="z-30 py-5 absolute w-full"
        :style="[{fontFamily:'Cinzel'}, tabStyle]"
      >
        <div class="container mx-auto text-white uppercase">

          <!-- Desktop / Tablet: ปุ่มชื่อแท็บ -->
          <div class="hidden md:flex flex-wrap gap-x-6 gap-y-2 justify-between">
            <button
              v-for="(s, i) in slides" :key="'nav-text-'+i"
              class="transition-all border-b-2 pb-1 text-sm md:text-base"
              :class="activeIndex === i ? 'opacity-100 border-white' : 'opacity-70 border-transparent hover:opacity-100'"
              @click="goTo(i)"
              :style="[{fontFamily:'Cinzel'}]">
              {{ normalizeTitle(s.title) }}
            </button>
          </div>

          <!-- Mobile: จุดกลม (dot indicators) -->
          <div class="md:hidden flex flex-col items-center justify-center gap-3">
            <button
              v-for="(s, i) in slides" :key="'nav-dot-'+i"
              class="relative inline-flex items-center justify-center transition-all"
              @click="goTo(i)"
              :aria-label="normalizeTitle(s.title)"
              :aria-current="activeIndex === i ? 'true' : 'false'">
              <span
                class="block rounded-full"
                :class="activeIndex === i
                  ? 'w-3.5 h-3.5 bg-white'
                  : 'w-2.5 h-2.5 bg-white/40'"></span>
              <span
                v-if="activeIndex === i"
                class="absolute inset-0 rounded-full ring-2 ring-white/80 scale-110"></span>
              <span class="sr-only">{{ normalizeTitle(s.title) }}</span>
            </button>
          </div>

        </div>
      </div>

      <!-- แผงแบบยาวลงมา -->
      <div class="s3-stack">
        <div
          v-for="(s, i) in slides" :key="i"
          class="s3-panel relative h-[100svh] flex items-center justify-center bg-black overflow-hidden">
          <img :src="s.img" class="absolute inset-0 w-full h-full object-cover" loading="lazy" draggable="false" />
          <div class="absolute inset-0 bg-black/30 z-10 flex">
            <div class="container m-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="my-auto">
                <h3 class="text-[42px] md:text-[70px] text-white uppercase leading-[1.05] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] md:drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]" :style="{fontFamily:'Cinzel'}" style="white-space:pre-line">
                  {{ s.title }}
                </h3>
              </div>
              <div class="my-auto">
                <div class="flex">
                  <p class="lg:ml-auto text-[18px] md:text-[22px] text-white" :style="{fontFamily:'IBM Plex Sans Thai'}" style="white-space:pre-line">
                    {{ s.desc }}
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

  setup() {
    const rootEl = ref(null);
    const tabEl = ref(null);
    const activeIndex = ref(0);

    let stSnap = null;            // snap ทั้งบล็อก section
    let stTabPin = null;          // pin เฉพาะแท็บบน desktop
    let stMobileFixed = null;     // ทำ fixed เฉพาะตอน section in-view (mobile)
    const perPanelST = [];        // trigger เล็ก ๆ อัปเดต active

    const normalizeTitle = (t) => (t || "").replace(/\n/g, " ").trim();

    const getHeaderOffset = () => {
      const header = document.querySelector("header");
      if (!header) return 0;
      const cs = window.getComputedStyle(header);
      return (cs.position === "fixed" || cs.position === "sticky") ? 70 : 0; // ปรับตามดีไซน์จริง
    };
    const getTabHeight = () => (tabEl.value ? tabEl.value.offsetHeight : 0);
    const isMobile = () => window.matchMedia("(max-width: 767.98px)").matches;

    // base style (mobile เริ่มเป็น absolute; fixed เฉพาะตอน in-view ผ่าน ScrollTrigger)
    const tabStyle = ref({});
    const baseMobilePos = () => ({
      left: "2dvw",
      top: `calc(70vh + ${getHeaderOffset()}px)`,
      width: "auto",
      zIndex: 30,
    });

    const applyTabStyle = () => {
      if (isMobile()) {
        tabStyle.value = {
          position: "absolute", // เริ่มต้นเป็น absolute
          ...baseMobilePos(),
        };
      } else {
        tabStyle.value = {}; // desktop ใช้คลาสเดิม (absolute w-full) และถูก pin ด้วย GSAP
      }
    };

    // เลื่อนไปยัง panel เป้าหมาย
    const goTo = (i) => {
      const panel = rootEl.value?.querySelectorAll(".s3-panel")[i];
      if (!panel) return;

      const offset = getHeaderOffset() + (isMobile() ? 0 : getTabHeight());
      const rect = panel.getBoundingClientRect();
      const targetTop = window.scrollY + rect.top - offset;

      window.scrollTo({ top: targetTop, behavior: "smooth" });
    };

    // --- Snap ---
    const buildSnap = () => {
      if (stSnap) { try { stSnap.kill(); } catch {} stSnap = null; }
      perPanelST.splice(0).forEach(st => { try { st.kill(); } catch {} });

      const panels = Array.from(rootEl.value.querySelectorAll(".s3-panel"));
      if (!panels.length || typeof gsap === "undefined") return;

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

      setTimeout(() => {
        try { ScrollTrigger.refresh(true); } catch {}
      }, 400);
    };

    // --- Pin tab (เฉพาะ desktop) ---
    const buildTabPin = () => {
      if (!tabEl.value || !rootEl.value || typeof gsap === "undefined") return;
      if (stTabPin) { try { stTabPin.kill(); } catch {} stTabPin = null; }
      if (isMobile()) return;

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

    // --- ทำให้ tab มือถือ "fixed" เฉพาะตอน section in-view + fade in/out ---
    const buildMobileFixed = () => {
      if (stMobileFixed) { try { stMobileFixed.kill(); } catch {} stMobileFixed = null; }
      if (!isMobile() || typeof gsap === "undefined" || !rootEl.value || !tabEl.value) {
        // โหมด desktop หรือไม่มี gsap: เคลียร์เอฟเฟกต์
        try {
          gsap.set(tabEl.value, { clearProps: "opacity,visibility" });
          tabEl.value.style.pointerEvents = "";
        } catch {}
        return;
      }

      // ตั้งค่าเริ่ม: อยู่นอกจอ = absolute + ซ่อน
      tabStyle.value = { position: "absolute", ...baseMobilePos() };
      gsap.set(tabEl.value, { autoAlpha: 0 });
      tabEl.value.style.pointerEvents = "none";

      let lastActive = false;
      const setState = (active) => {
        if (active === lastActive) return;
        lastActive = active;

        // อัปเดต top ทุกครั้ง เผื่อ header เปลี่ยนความสูง
        const topNow = `calc(70vh + ${getHeaderOffset()}px)`;

        if (active) {
          // เข้า view: เปลี่ยนเป็น fixed + fade in + คลิกได้
          tabStyle.value = { ...tabStyle.value, position: "fixed", top: topNow };
          gsap.to(tabEl.value, { autoAlpha: 1, duration: 0.25, ease: "power2.out" });
          tabEl.value.style.pointerEvents = "auto";
        } else {
          // ออกจาก view: กลับเป็น absolute + fade out + ปิดคลิก
          tabStyle.value = { ...tabStyle.value, position: "absolute", top: topNow };
          gsap.to(tabEl.value, { autoAlpha: 0, duration: 0.2, ease: "power2.out" });
          tabEl.value.style.pointerEvents = "none";
        }
      };

      stMobileFixed = ScrollTrigger.create({
        trigger: rootEl.value,
        start: "top bottom", // เมื่อ section แตะเข้าหน้าจอด้านล่าง
        end: "bottom top",   // จน section พ้นออกด้านบนจอ
        onUpdate: (self) => setState(self.isActive),
        onRefresh: (self) => setState(self.isActive),
        // markers: true,
      });
    };

    const rebuildAll = () => {
      applyTabStyle();      // คำนวณตำแหน่งพื้นฐาน
      buildSnap();
      buildTabPin();
      buildMobileFixed();   // ทำ fixed เฉพาะตอน in-view (mobile)
      try { ScrollTrigger.refresh(); } catch {}
    };

    onMounted(async () => {
      await nextTick();
      rebuildAll();
      const onResize = () => rebuildAll();
      window.addEventListener("resize", onResize, { passive: true });
      Section3Component.__onResize = onResize;
    });

    onBeforeUnmount(() => {
      try { window.removeEventListener("resize", Section3Component.__onResize); } catch {}
      try { stTabPin?.kill(); stTabPin = null; } catch {}
      try { stSnap?.kill(); stSnap = null; } catch {}
      try { stMobileFixed?.kill(); stMobileFixed = null; } catch {}
      perPanelST.splice(0).forEach(st => { try { st.kill(); } catch {} });
    });

    return { activeIndex, goTo, rootEl, tabEl, normalizeTitle, tabStyle };
  },
});

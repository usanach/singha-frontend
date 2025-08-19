// Define the Header component
const CraftYourTaleComponent = defineComponent({
  name: 'CraftYourTaleComponent',
  template: `
  <section
    ref="sectionEl"
    class="craft-your-tale-component relative overflow-hidden lg:h-[130dvh] h-auto onview font-['IBM_Plex_Sans_Thai']"
    data-section="craft_your_tales"
  >
    <!-- Desktop: Layers -->
    <div v-if="isDesktop" class="absolute inset-0">
      <!-- Layer 1 -->
      <div class="absolute inset-0 max-h-screen">
        <img ref="l1" class="w-full h-full object-cover pointer-events-none select-none"
             src="/assets/image/page-sentre/craft-your-tale/ly1.png" alt="layer 1" />
      </div>
      <!-- Layer 2 -->
      <div class="absolute inset-0 max-h-screen">
        <img ref="l2" class="w-full h-full object-cover pointer-events-none select-none"
             src="/assets/image/page-sentre/craft-your-tale/ly2.png" alt="layer 2" />
      </div>
      <!-- Layer 3 -->
      <div class="absolute inset-0 max-h-screen">
        <img ref="l3" class="w-full h-full object-cover pointer-events-none select-none"
             src="/assets/image/page-sentre/craft-your-tale/ly3.png" alt="layer 3" />
      </div>
      <!-- Layer 4 -->
      <div class="absolute inset-0 max-h-screen">
        <img ref="l4" class="w-full h-full object-cover pointer-events-none select-none"
             src="/assets/image/page-sentre/craft-your-tale/ly4.png" alt="layer 4" />
      </div>
    </div>

    <!-- Mobile: Single image -->
    <div v-else class="relative">
      <img class="w-full h-auto block"
           src="/assets/image/page-sentre/craft-your-tale/mobile.png"
           alt="mobile hero" />
    </div>
  </section>
  `,

  setup() {
    const template = ref('')
    const language = ref('th')

    // refs
    const sectionEl = ref(null)
    const l1 = ref(null)
    const l2 = ref(null)
    const l3 = ref(null)
    const l4 = ref(null)

    // responsive
    const isDesktop = ref(window.matchMedia('(min-width: 1024px)').matches)
    let mql
    const handleMedia = (e) => { isDesktop.value = e.matches }

    // GSAP handles
    let pinTrigger = null
    let layersTl = null
    let layout1Trigger = null // เผื่อใช้ตามโค้ดเดิม (ถ้าไม่มี element นี้ก็ไม่เป็นไร)

    const getLanguageFromPath = () => {
      const path = window.location.pathname
      const match = path.match(/\/(th|en)(\/|$)/)
      return match ? match[1] : 'th'
    }

    const initAOS = () => { if (window.AOS?.init) AOS.init() }

    const setupDesktopAnimations = () => {
      if (!sectionEl.value) return
      // Pin (ตามเงื่อนไขเดิม > 768px)
      if (window.innerWidth > 768) {
        pinTrigger = ScrollTrigger.create({
          trigger: sectionEl.value,
          start: "top top",
          pin: true,
          scrub: true,
          pinSpacing: false
        })
      }

      // Trigger เดิม (#layout-1) — จะไม่มีผลถ้า element ไม่อยู่ใน DOM
      layout1Trigger = ScrollTrigger.create({
        trigger: "#layout-1",
        start: "top center",
        onEnter: () => {
          const el = document.querySelector("#layout-1")
          el?.classList.add("opacity-0")
        },
        onLeaveBack: () => {
          const el = document.querySelector("#layout-1")
          el?.classList.remove("opacity-0")
        }
      })

      // Timeline layers: 1 fade-in, 2 left, 3 right, 4 right
      layersTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl.value,
          start: "top 75%",
          end: "50% 40%",
          scrub: true,
        }
      })
      layersTl.from(l1.value, { autoAlpha: 0, duration: 2, ease: "power2.out" }, 0)
              .from(l2.value, { autoAlpha: 0, x: -80, duration: 2, ease: "power2.out" }, ">")
              .from(l3.value, { autoAlpha: 0, x:  80, duration: 2, ease: "power2.out" }, ">")
              .from(l4.value, { autoAlpha: 0, x:  80, duration: 2, ease: "power2.out" }, ">")
    }

    const cleanupDesktopAnimations = () => {
      layersTl?.scrollTrigger?.kill?.()
      layersTl?.kill?.()
      layersTl = null
      pinTrigger?.kill?.()
      pinTrigger = null
      layout1Trigger?.kill?.()
      layout1Trigger = null
      ScrollTrigger.refresh()
    }

    onMounted(() => {
      language.value = getLanguageFromPath()
      gsap.registerPlugin(ScrollTrigger)
      initAOS()

      // media listener
      mql = window.matchMedia('(min-width: 1024px)')
      mql.addEventListener?.('change', handleMedia)

      nextTick(() => {
        if (isDesktop.value) setupDesktopAnimations()
      })
    })

    watch(isDesktop, (val) => {
      // เปลี่ยนโหมด -> เคลียร์/ตั้งค่าแอนิเมชันใหม่
      if (val) {
        nextTick(() => setupDesktopAnimations())
      } else {
        cleanupDesktopAnimations()
      }
    })

    onUnmounted(() => {
      mql?.removeEventListener?.('change', handleMedia)
      cleanupDesktopAnimations()
    })

    return {
      template,
      language,
      isDesktop,
      sectionEl,
      l1, l2, l3, l4
    }
  }
})

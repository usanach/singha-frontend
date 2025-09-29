// // Define the Header component
// const CraftYourTaleComponent = defineComponent({
//   name: 'CraftYourTaleComponent',
//   template: `
//   <section
//     ref="sectionEl"
//     class="craft-your-tale-component relative overflow-hidden lg:h-[130dvh] h-auto onview font-['IBM_Plex_Sans_Thai']"
//     data-section="craft_your_tales"
//   >
//     <!-- Desktop: Layers -->
//     <div v-if="isDesktop" class="absolute inset-0">
//       <!-- Layer 1 -->
//       <div class="absolute inset-0 max-h-screen">
//         <img ref="l1" class="w-full h-full object-cover pointer-events-none select-none"
//              src="/assets/image/page-sentre/craft-your-tale/ly1.png" alt="layer 1" />
//       </div>
//       <!-- Layer 2 -->
//       <div class="absolute inset-0 max-h-screen">
//         <img ref="l2" class="w-full h-full object-cover pointer-events-none select-none"
//              src="/assets/image/page-sentre/craft-your-tale/ly2.png" alt="layer 2" />
//       </div>
//       <!-- Layer 3 -->
//       <div class="absolute inset-0 max-h-screen">
//         <img ref="l3" class="w-full h-full object-cover pointer-events-none select-none"
//              src="/assets/image/page-sentre/craft-your-tale/ly3.png" alt="layer 3" />
//       </div>
//       <!-- Layer 4 -->
//       <div class="absolute inset-0 max-h-screen">
//         <img ref="l4" class="w-full h-full object-cover pointer-events-none select-none"
//              src="/assets/image/page-sentre/craft-your-tale/ly4.png" alt="layer 4" />
//       </div>
//     </div>

//     <!-- Mobile: Single image -->
//     <div v-else class="relative">
//       <img class="w-full h-auto block"
//            src="/assets/image/page-sentre/craft-your-tale/mobile.png"
//            alt="mobile hero" />
//     </div>
//   </section>
//   `,

//   setup() {
//     const template = ref('')
//     const language = ref('th')

//     // refs
//     const sectionEl = ref(null)
//     const l1 = ref(null)
//     const l2 = ref(null)
//     const l3 = ref(null)
//     const l4 = ref(null)

//     // responsive
//     const isDesktop = ref(window.matchMedia('(min-width: 1024px)').matches)
//     let mql
//     const handleMedia = (e) => { isDesktop.value = e.matches }

//     // GSAP handles
//     let pinTrigger = null
//     let layersTl = null
//     let layout1Trigger = null // เผื่อใช้ตามโค้ดเดิม (ถ้าไม่มี element นี้ก็ไม่เป็นไร)

//     const getLanguageFromPath = () => {
//       const path = window.location.pathname
//       const match = path.match(/\/(th|en)(\/|$)/)
//       return match ? match[1] : 'th'
//     }

//     const initAOS = () => { if (window.AOS?.init) AOS.init() }

//     const setupDesktopAnimations = () => {
//       if (!sectionEl.value) return
//       // Pin (ตามเงื่อนไขเดิม > 768px)
//       if (window.innerWidth > 768) {
//         pinTrigger = ScrollTrigger.create({
//           trigger: sectionEl.value,
//           start: "top top",
//           pin: true,
//           scrub: true,
//           pinSpacing: false
//         })
//       }

//       // Trigger เดิม (#layout-1) — จะไม่มีผลถ้า element ไม่อยู่ใน DOM
//       layout1Trigger = ScrollTrigger.create({
//         trigger: "#layout-1",
//         start: "top center",
//         onEnter: () => {
//           const el = document.querySelector("#layout-1")
//           el?.classList.add("opacity-0")
//         },
//         onLeaveBack: () => {
//           const el = document.querySelector("#layout-1")
//           el?.classList.remove("opacity-0")
//         }
//       })

//       // Timeline layers: 1 fade-in, 2 left, 3 right, 4 right
//       layersTl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionEl.value,
//           start: "top 75%",
//           end: "50% 40%",
//           scrub: true,
//         }
//       })
//       layersTl.from(l1.value, { autoAlpha: 0, duration: 2, ease: "power2.out" }, 0)
//               .from(l2.value, { autoAlpha: 0, x: -80, duration: 2, ease: "power2.out" }, ">")
//               .from(l3.value, { autoAlpha: 0, x:  80, duration: 2, ease: "power2.out" }, ">")
//               .from(l4.value, { autoAlpha: 0, x:  80, duration: 2, ease: "power2.out" }, ">")
//     }

//     const cleanupDesktopAnimations = () => {
//       layersTl?.scrollTrigger?.kill?.()
//       layersTl?.kill?.()
//       layersTl = null
//       pinTrigger?.kill?.()
//       pinTrigger = null
//       layout1Trigger?.kill?.()
//       layout1Trigger = null
//       ScrollTrigger.refresh()
//     }

//     onMounted(() => {
//       language.value = getLanguageFromPath()
//       gsap.registerPlugin(ScrollTrigger)
//       initAOS()

//       // media listener
//       mql = window.matchMedia('(min-width: 1024px)')
//       mql.addEventListener?.('change', handleMedia)

//       nextTick(() => {
//         if (isDesktop.value) setupDesktopAnimations()
//       })
//     })

//     watch(isDesktop, (val) => {
//       // เปลี่ยนโหมด -> เคลียร์/ตั้งค่าแอนิเมชันใหม่
//       if (val) {
//         nextTick(() => setupDesktopAnimations())
//       } else {
//         cleanupDesktopAnimations()
//       }
//     })

//     onUnmounted(() => {
//       mql?.removeEventListener?.('change', handleMedia)
//       cleanupDesktopAnimations()
//     })

//     return {
//       template,
//       language,
//       isDesktop,
//       sectionEl,
//       l1, l2, l3, l4
//     }
//   }
// })
// Define the Header component
const CraftYourTaleComponent = defineComponent({
  name: 'CraftYourTaleComponent',
  template: `
  <section class="craft-your-tale-component relative overflow-hidden h-[1000px] onview font-['IBM_Plex_Sans_Thai']" data-section="craft_your_tales">
    <div class="w-full overflow-hidden cyt-desktop-pin">
      <div
        id="layout-2"
        class="layout-2 bg-cover bg-center bg-no-repeat absolute inset-0 flex items-center justify-center w-full cty-pallax -top-[10rem]"
        :style="layout2Style"
      >
        <div class="absolute inset-0 w-full h-full bg-black/30"></div>
        <div class="w-full h-full">
          <div class="absolute top-0 left-0 h-full w-full flex">
            <div class="flex flex-col m-auto">
              <div class="mt-3">
                <p class="font-light text-[40px] text-center cyt-desc text-white"
                   data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="500"
                   v-html="dataset.title[language]">
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="layout-1"
        class="layout-1 relative inset-0 flex items-center justify-center w-full transition-all duration-1000 h-[900px] bg-cover bg-center bg-no-repeat"
        :style="layout1Style"
      ></div>
    </div>
  </section>
  `,

  setup() {
    const template = ref('')
    const language = ref('th')

    const dataset = ref({
      title: {
        en: '',
        th: ''
      },
      image: {
        layout2: {
          l: "/assets\/image\/page-sentre\/craft-your-tale\/ly2full.png",
          s: "/assets\/image\/page-the-esse-36\/craft-your-tale\/Lobby_266main_Selects_072.jpg",
        },
        layout1: {
          l: "/assets\/image\/page-sentre\/craft-your-tale\/ly1-full.png",
          s: "/assets\/image\/page-the-esse-36\/craft-your-tale\/c-m.png",
        },
      }
    })

    // breakpoint reactive
    const isDesktop = ref(window.matchMedia('(min-width: 1024px)').matches)
    let mql
    const handleMedia = (e) => { isDesktop.value = e.matches }

    // ✅ ใช้ .value เมื่ออ้างอิงจาก ref ใน setup()
    const layout2Style = computed(() => ({
      backgroundImage: `url(${isDesktop.value ? dataset.value.image.layout2.l : dataset.value.image.layout2.s})`,
    }))
    const layout1Style = computed(() => ({
      backgroundImage: `url(${isDesktop.value ? dataset.value.image.layout1.l : dataset.value.image.layout1.s})`,
    }))

    const getLanguageFromPath = () => {
      const path = window.location.pathname
      const match = path.match(/\/(th|en)(\/|$)/)
      return match ? match[1] : 'th'
    }

    onMounted(async () => {
      language.value = getLanguageFromPath()
      gsap.registerPlugin(ScrollTrigger)

      const init = () => { AOS.init() }

      // parallax
      const ctyPallax = new Rellax('.cty-pallax')

      // media listener
      mql = window.matchMedia('(min-width: 1024px)')
      mql.addEventListener?.('change', handleMedia)

      nextTick(() => {
        init()

        // ⬇️ คง logic trigger เดิม
        if (window.innerWidth > 768) {
          ScrollTrigger.create({
            trigger: ".craft-your-tale-component",
            start: "top top",
            pin: true,
            scrub: true,
            pinSpacing: false
          })
        }

        ScrollTrigger.create({
          trigger: "#layout-1",
          start: "top center",
          onEnter: () => {
            const layout1 = document.querySelector("#layout-1")
            layout1?.classList.add("opacity-0")
          },
          onLeaveBack: () => {
            const layout1 = document.querySelector("#layout-1")
            layout1?.classList.remove("opacity-0")
          }
        })
      })
    })

    onUnmounted(() => {
      mql?.removeEventListener?.('change', handleMedia)
    })

    // ✅ ต้อง return style ออกไปให้ template ใช้
    return {
      template,
      language,
      dataset,
      layout1Style,
      layout2Style,
    }
  }
})


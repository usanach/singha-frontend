// Define the Header component
const CraftYourTaleComponent = defineComponent({
    name: 'CraftYourTaleComponent',
    template: `
  <section class="craft-your-tale-component relative overflow-hidden h-[900px] onview font-['IBM_Plex_Sans_Thai']" data-section="craft_your_tales">
    <div class="w-full overflow-hidden cyt-desktop-pin">
      <div
        id="layout-2"
        class="layout-2 bg-cover bg-center bg-no-repeat absolute inset-0 flex items-center justify-center w-full cty-pallax -top-[10rem]"
        :style="layout2Style"
      >
        <div class="w-full h-full">
          <div class="absolute top-0 left-0 h-full w-full flex">
            <div class="flex flex-col m-auto">
              <div class="mt-3">
                <p class="font-light text-white text-[40px] text-center cyt-desc"
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
                en: 'Make every moment memorable. <br/> <span style="font-size:22px;">“สร้างความทรงจำในทุกช่วงเวลาให้เป็นที่น่าจดจำ”</span>',
                th: 'Make every moment memorable. <br/> <span style="font-size:22px;" >“สร้างความทรงจำในทุกช่วงเวลาให้เป็นที่น่าจดจำ”</span>',
            },
            image: {
                layout2: {
                    l: "/assets/image/page-siraninn/craft-yours-tale/img.png",
                    s: "/assets/image/page-siraninn/craft-yours-tale/img-m.png",
                },
                layout1: {
                    l: "/assets/image/page-siraninn/craft-yours-tale/Exclusion-10.png",
                    s: "/assets/image/page-siraninn/craft-yours-tale/Exclusion-10-m.png",
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
                        layout1?.classList.add("opacity-0", "scale-110")
                    },
                    onLeaveBack: () => {
                        const layout1 = document.querySelector("#layout-1")
                        layout1?.classList.remove("opacity-0", "scale-110")
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

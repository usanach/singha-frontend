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
        <div class="w-full h-full">
          <div class="absolute top-0 left-0 h-full w-full flex">
            <div class="flex flex-col m-auto">
              <div class="mt-3 relative px-3">
                <p class="font-light text-[40px] text-center cyt-desc leading-none"
                   data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="500"
                   :style="{fontFamily:'Cormorant Garamond'}"
                   v-html="dataset.title[language]">
                </p>
                <div class="absolute left-1/2 top-0 -mt-10 max-w-[40px]">
                  <svg class="w-full" xmlns="http://www.w3.org/2000/svg" width="54.947" height="23.477" viewBox="0 0 54.947 23.477">
                    <path id="Path_56694" data-name="Path 56694" d="M76.879,32.521a1.2,1.2,0,0,1-1.125-.831,2.9,2.9,0,0,1,.315-2.111,17.488,17.488,0,0,1,8.539-8.56c6.105-3,12.773-2.941,19.218-2.857,2.228.025,4.238.042,6.21-.034,6.294-.248,14.569-1.9,18.232-8.342a1.265,1.265,0,0,1,1.414-.709l.013,0A1.289,1.289,0,0,1,130.6,10.4a3.937,3.937,0,0,1-.571,1.939,18.164,18.164,0,0,1-9.231,7.7c-5.753,2.32-11.833,2.266-17.728,2.19-2.56-.034-5.207-.059-7.784.117-4.053.273-13.834,1.72-17.124,9.164-.394.89-.973,1.02-1.284,1.02" transform="translate(-75.654 -9.044)" fill="#646b44"/>
                  </svg>
                </div>
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
        en: `SILK <span style="color:#5A5B3F">of</span> SINGHA ESTATE <br/> <span class="lg:text-[22px] text-[16px]">A SUPER LUXURY RESIDENTIAL PROJECT, SETS A NEW STANDARD FOR EXTRAVAGANT LIVING <br/>AND ENCAPSULATES THE MEANING OF SILK WITH ITS UNWAVERING COMMITMENT TO DELIVERING <br/>A RESIDENCE THAT EXUDES OPULENCE, REFINEMENT, AND AN UNMATCHED LEVEL OF LUXURY <br/>WHILE OFFERING A LIFESTYLE THAT IS UNPARALLELED IN ITS GRANDEUR AND SPLENDOR.</span>`,
        th: `SILK <span style="color:#5A5B3F">of</span> SINGHA ESTATE <br/> <span class="lg:text-[22px] text-[16px]" style="font-family:'IBM Plex Sans Thai'" >โครงการที่พักอาศัยซูเปอร์ลักชัวรี่ ยกระดับและสร้างมาตรฐานใหม่ของการใช้ชีวิตอันหรูหรา <br/>ถ่ายทอดเอกลักษณ์และความงามเลอค่าดุจผ้าไหม ผ่านความมุ่งมั่นที่จะมอบที่พักอาศัยที่เปล่งประกายความงามสง่า ประณีต และความหรูหราเหนือระดับ <br/>พร้อมนำเสนอไลฟ์สไตล์อันเป็นเอกลักษณ์ของผู้มีรสนิยมชั้นเลิศและสรรหาแต่สิ่งที่ดีที่สุดในการใช้ชีวิต​</span>`,
      },
      image: {
        layout2: {
          l: "/assets\/image\/page-la-soie-de-s\/craft-your-tale\/ly2.png",
          s: "/assets\/image\/page-la-soie-de-s\/craft-your-tale\/ly2-m.png",
        },
        layout1: {
          l: "/assets\/image\/page-la-soie-de-s\/craft-your-tale\/ly1.png",
          s: "/assets\/image\/page-la-soie-de-s\/craft-your-tale\/ly1-m.png",
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

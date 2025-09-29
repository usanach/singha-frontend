const ProjectsHighlightComponent = defineComponent({
  name: 'ProjectsHighlightComponent',
  props: {
    // ชื่อหัวข้อหลัก (มี th/en)
    title: {
      type: Object,
      default: () => ({ en: "PROJECT SIGNATURES", th: "จุดเด่นของโครงการ" })
    },
    // ภาษา (ถ้าไม่ส่งมา จะเดาจาก URL)
    language: { type: String, default: '' },
    // พื้นหลัง (desktop / mobile) — ถ้าไม่ส่ง mobile มา จะใช้ desktop แทน
    bgImage: { type: String, default: "/assets\/image\/page-sentre\/highlight\/bg.png" },
    bgImageMobile: { type: String, default: "" },
    // รายการโปรเจกต์แบบ dynamic
    projects: {
      type: Array,
      default: () => ([
        {
          image: "/assets\/image\/page-sentre\/highlight\/_DSC7242-Enhanced-NR.png",
          title: { en: "MAXIMIZE FUNCTIONAL DESIGN​", th: "MAXIMIZE FUNCTIONAL DESIGN​" },
          description: {
            en: "Enjoy the ultimate comfort of a fully-equipped 3.5-story home office with 358 sqm of functional space. The convenience layout includes: 1 bedroom, 1 multi-purpose room, 4 bathrooms, 3 flexible spaces, 4 parking spaces with a private elevator.​",
            th: "สะดวกสบายครบทุกฟังก์ชั่นที่ต้องการทั้ง 3.5 ชั้น พื้นที่ใช้สอย 358 ตร.ม. มาพร้อม 1 ห้องนอน 1 ห้องอเนกประสงค์ 4 ห้องน้ำ 3 พื้นที่อเนกประสงค์ 4 ที่จอดรถ พร้อมลิฟต์ส่วนตัวทุกยูนิต ​​"
          }
        },
        {
          image: "/assets\/image\/page-sentre\/highlight\/KANT x SHAWN PANYA INDRA67.png",
          title: { en: "PROVISION FOR FUTURE EXPANSION WITH TIMELESS DESIGN​", th: "PROVISION FOR FUTURE EXPANSION WITH TIMELESS DESIGN​" },
          description: {
            en: "The space is designed for adaptability, allowing for diverse future uses. This place is yours perfect harmony of home office within a single sophisticated property, complemented by timeless luxurious and contemporary Modern Luxury architecture.​",
            th: "ออกแบบพื้นที่ให้ี่พร้อมปรับเปลี่ยนการใช้งานที่หลากหลายในอนาคต เป็นได้ทั้งบ้านหรือออฟฟิศในที่เดียว เอกลักษณ์ด้วยดีไซน์สถาปัตยกรรมหรูหรา ทันสมัย Modern Luxury​​​"
          }
        },
        {
          image: "/assets\/image\/page-sentre\/highlight\/INT_SPACE_CLINIC_VIEW01_FINAL_HIRES.png",
          title: { en: "SUPER PREMIUM LOCATION​", th: "SUPER PREMIUM LOCATION​" },
          description: {
            en: "Located in the prime Pattanakarn area, this luxury home office is distinguished by its proximity to business center, easy connecting to main roads for fast and convenient travel.​​",
            th: "SENTRE Pattanakarn โครงการ Luxury Home Office บนทำเลพัฒนาการ 32 โดดเด่นด้วยทำเลใกล้ย่านธุรกิจ เชื่อมออกถนนหลักหลายเส้นทาง ให้เลือกเดินทางได้สะดวกรวดเร็ว​​"
          }
        }
      ])
    },
    // ปรับแต่งพฤติกรรม animation ได้นิดหน่อย
    scrub: { type: Boolean, default: true },
    start: { type: String, default: "top 90%" },
    end: { type: String, default: "50% 60%" }
  },

  template: `
  <section class="onview" id="project_signature" data-section="project_signature">
    <div class="relative">
      <div
        class="w-full lg:h-full bg-cover bg-top pt-10 pb-20"
        :style="bgStyle"
      >
        <div class="container mx-auto lg:px-5 px-0 space-y-10 py-10">
          <div>
            <h2 class="text-[#33332F] text-[35px] font-bold text-center"
                data-aos="fade-up"
                :class="[fontCss]"
                data-aos-duration="500"
                :style="{fontFamily:fontClass}"
                data-aos-easing="linear">
              {{ titleResolved[lang] }}
            </h2>
          </div>

          <div class="mx-auto space-y-10">
            <div
              v-for="(project, index) in projects"
              :key="project.image || index"
              class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center"
            >
              <!-- Image -->
              <div
                :class="['order-1','lg:col-span-2', index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1']"
              >
                <img
                  class="object-cover project-image w-full h-auto"
                  :src="project.image"
                  :alt="stripHtml(project.title[lang])"
                  :ref="el => (imgRefs[index] = el)"
                />
              </div>

              <!-- Details -->
              <div
                class="px-5 md:px-0 text-[#2A2046] space-y-3"
                :class="['order-2', index % 2 !== 0 ? 'lg:order-1 lg:text-right' : 'lg:order-2']"
              >
                <div>
                  <p class="text-[70px] leading-none font-light project-number font-['Epilogue'] italic font-normal"
                     :ref="el => (numRefs[index] = el)">
                    {{ pad2(index + 1) }}
                  </p>
                </div>
                <div>
                  <h2 class="text-[35px] font-light project-title leading-none font-normal font-['Gotham']"
                      v-html="project.title[lang]"
                      :ref="el => (titleRefs[index] = el)"></h2>
                </div>
                <div>
                  <p class="project-description font-normal text-[#2C2C2C] text-[16px]"
                     v-html="project.description[lang]"
                     :ref="el => (descRefs[index] = el)"></p>
                </div>
              </div>
            </div>
          </div>

        </div> <!-- /container -->
      </div>
    </div>
  </section>
  `,

  setup(props) {
    // ภาษา
    const lang = ref(props.language || 'th')
    const getLanguageFromPath = () => {
      const path = window.location.pathname
      const match = path.match(/\/(th|en)(\/|$)/)
      return match ? match[1] : 'th'
    }
    onMounted(() => {
      if (!props.language) lang.value = getLanguageFromPath()
    })

    // พื้นหลัง dynamic (desktop/mobile)
    const isDesktop = ref(window.matchMedia('(min-width: 1024px)').matches)
    let mql
    const handleMedia = e => { isDesktop.value = e.matches }
    onMounted(() => {
      mql = window.matchMedia('(min-width: 1024px)')
      mql.addEventListener?.('change', handleMedia)
    })
    onUnmounted(() => {
      mql?.removeEventListener?.('change', handleMedia)
    })

    const bgStyle = computed(() => {
      const mobile = props.bgImageMobile || props.bgImage
      const src = isDesktop.value ? props.bgImage : mobile
      return { backgroundImage: `url(${src})` }
    })

    const titleResolved = computed(() => props.title || { en: '', th: '' })
    const fontCss = computed(() => (lang.value === 'en' ? "font-['Gotham']" : "font-['IBM_Plex_Sans_Thai']"))

    // Helpers
    const pad2 = (n) => String(n).padStart(2, '0')
    const stripHtml = (s = '') => s.replace(/<[^>]*>/g, '')

    // ----- Refs สำหรับ GSAP (แทนการ querySelector) -----
    const imgRefs = ref([])
    const numRefs = ref([])
    const titleRefs = ref([])
    const descRefs = ref([])

    // GSAP Animations
    let triggers = []
    const clearTriggers = () => {
      triggers.forEach(t => t?.kill?.())
      triggers = []
      ScrollTrigger.refresh()
    }

    const animateIn = (els, fromVars) => {
      els.forEach(el => {
        if (!el) return
        const t = gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: props.start,
            end: props.end,
            scrub: props.scrub,
            // markers: true,
          },
          ...fromVars
        })
        triggers.push(t.scrollTrigger || t)
      })
    }

    onMounted(() => {
      // AOS (ตามของเดิม)
      if (window.AOS?.init) AOS.init()

      // GSAP ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      // แอนิเมชันแต่ละส่วน (จาก refs)
      animateIn(imgRefs.value, { opacity: 0, y: 50, ease: "none" })
      animateIn(numRefs.value, { opacity: 0, x: -50, ease: "none" })
      animateIn(titleRefs.value, { opacity: 0, y: 50, ease: "none" })
      animateIn(descRefs.value, { opacity: 0, y: 50, ease: "none" })

    })

    onUnmounted(() => {
      clearTriggers()
    })
    const fontClass = () => (language.value === 'en' ? "Gotham" : 'DB OnUma');
    return {
      // template bindings
      lang,
      titleResolved,
      bgStyle,
      fontCss,
      pad2,
      stripHtml,

      // refs for v-for items
      imgRefs,
      numRefs,
      titleRefs,
      descRefs,
      fontClass
    }
  }
})

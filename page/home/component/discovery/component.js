// Define the Header component
const DiscoveryComponent = defineComponent({
  name: 'DiscoveryComponent', template: `
<section id="DiscoveryComponent">
  <div class="bg-[#003B5E] py-10 lg:pt-5 pt-0 lg:pb-10 pb-0">
    <div class="container lg:py-10 py-10 overflow-hidden"
         data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
      <h2 :class="\`\${font} text-white text-[35px] lg:text-center text-center uppercase leading-tight\`">
        {{ title }}
      </h2>
      <p class="text-[20px] text-center text-white lg:w-3/4 mx-auto mt-2" v-html="detail"></p>
    </div>

    <div class="relative">
      <div class="swiper collection-slide lg:pb-16"
           data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
        <div class="swiper-wrapper">
          <div
            v-if="slideImg && slideImg.length"
            v-for="(item, i) in slideImg"
            :key="i"
            class="swiper-slide"
          >
            <div class="relative w-full h-fit">
              <a :href="item.link" target="_blank">
                <img aria-hidden="true"
                  v-if="item.image.l"
                  :src="item.image.l"
                  :alt="\`\${item.name} - \${item.location}\`"
                  class="w-full md:block hidden"
                >
                <img aria-hidden="true"
                  v-if="item.image.s"
                  :src="item.image.s"
                  :alt="\`\${item.name} - \${item.location}\`"
                  class="w-full md:hidden block"
                >
              </a>
            </div>
          </div>
        </div>

        <div class="lg:absolute relative bottom-0 w-full z-10 mb-2"
             data-aos="fade-up" data-aos-duration="1000"
             data-aos-easing="linear" data-aos-anchor=".collection-slide">
          <div class="container lg:!px-[20px] !px-0">
            <div
              class="flex lg:w-3/4 bg-[#004670] mx-auto lg:p-5 p-0 py-5 lg:gap-5 lg:flex-row flex-col lg:px-10 px-5"
            >
              <div class="lg:w-1/2 w-full">
                <div class="swiper collection-detail-slide">
                  <div class="swiper-wrapper">
                    <div
                      v-if="slideDetail && slideDetail.length"
                      v-for="(det, j) in slideDetail"
                      :key="j"
                      class="swiper-slide text-white"
                    >
                      <a :href="det.link" target="_blank">
                        <h5 class="text-[22px] uppercase font-bold">{{ det.name[language] }}</h5>
                      </a>
                      <p class="text-[16px] capitalize font-[100]">{{ det.location[language] }}</p>
                      <p class="text-[20px] uppercase">{{ det.detail }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex gap-5 w-full lg:mt-0 mt-5">
                <div class="flex gap-5 lg:ml-auto w-full">
                  <div class="lg:w-full w-[150px] relative bg-white h-[4px] my-auto overflow-hidden">
                    <div class="hero-progress-bar h-full"></div>
                  </div>
                  <div class="flex text-white leading-0 text-[16px]">
                    <div class="page-number leading-tight my-auto whitespace-nowrap"></div>
                  </div>
                </div>

                <div class="flex gap-5 my-auto lg:ml-0 ml-auto">
                  <span class="prev w-[40px] cursor-pointer">
                    <img aria-hidden="true" src="/assets/image/residential/Button-Icon.webp" alt="icon" class="rotate-180">
                  </span>
                  <span class="next w-[40px] cursor-pointer">
                    <img aria-hidden="true" src="/assets/image/residential/Button-Icon.webp" alt="icon">
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`  ,
  setup() {
    // reactive language
    const language = ref('th');
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const m = path.match(/\/(th|en)(\/|$)/);
      return m ? m[1] : 'th';
    };

    // static titles & descriptions
    const titles = {
      en: "DISCOVERY OUR COLLECTIONS",
      th: "พบกับหลากหลายโครงการคุณภาพ"
    };
    const details = {
      th: `​โครงการที่พักอาศัยจาก สิงห์ เอสเตท มอบความหลากหลายให้คุณ ด้วยบ้านเดี่ยว ไพรเวทเอสเตท โฮมออฟฟิศ และคอนโดมิเนียม <br class="lg:block hidden"/>ผ่านความตั้งใจที่จะตอบโจทย์ทุกความต้องการด้วยแบรนด์ที่แตกต่าง ที่สะท้อนเอกลักษณ์ของเจ้าของบ้าน​`,
      en: `Experience in the pinnacle of luxury living with our exclusive collection of properties. Singha Estate offers a curated selection of residences, from exquisite single detached houses, distinguished private estates, home offices, and premier condominiums. Each property is tailored to reflect the unique personality ​`
    };

    // the full data array
    const rawData =
    {
      title: {
        en: "DISCOVERY OUR COLLECTIONS",
        th: "พบกับหลากหลายโครงการคุณภาพ"
      },
      detail: {
        th: `​โครงการที่พักอาศัยจาก สิงห์ เอสเตท มอบความหลากหลายให้คุณ ด้วยบ้านเดี่ยว ไพรเวทเอสเตท โฮมออฟฟิศ และคอนโดมิเนียม <br class="lg:block hidden"/>ผ่านความตั้งใจที่จะตอบโจทย์ทุกความต้องการด้วยแบรนด์ที่แตกต่าง ที่สะท้อนเอกลักษณ์ของเจ้าของบ้าน​`,
        en: `Experience in the pinnacle of luxury living with our exclusive collection of properties. Singha Estate offers a curated selection of residences, from exquisite single detached houses, distinguished private estates, home offices, and premier condominiums. Each property is tailored to reflect the unique personality ​`
      },
      items: [
        {
          name: {
            en: "SIRANINN RESIDENCES",
            th: "ศิรนินทร์ เรสซิเดนเซส"
          },
          link: "https://residential2.singhaestate.co.th/th/singlehouse/siraninn/pattanakarn",
          brands: "SIRANINN",
          location: {
            en: "Pattanakarn",
            th: "พัฒนาการ",
          },
          detail: "True Legacy Lives Now",
          image: {
            l: "/assets/image/residential/collection/siraninn 1.webp",
            s: "/assets/image/residential/collection/siraninn.webp"
          }
        },
        {
          name: {
            en: "S'RIN",
            th: "สริน "
          },
          link: `/${language.value}/house/detached-house/srin/ratchapruek-sai1`,
          brands: "S’RIN",
          location: {
            en: "Ratchaphruek - Sai 1",
            th: "ราชพฤกษ์ - สาย 1"
          },
          detail: "INFINITE LIVING",
          image: {
            l: "/assets/image/residential/collection/Pic01.webp",
            s: "/assets/image/residential/collection/singha-srin-m.webp"
          }
        },
        {
          name: {
            en: "SHAWN",
            th: "ณอน "
          },
          link: `/${language.value}/house/detached-house/shawn/panya-indra`,
          brands: "SHAWN",
          location: {
            en: "Panya Indra",
            th: "ปัญญาอินทรา"
          },
          detail: "Live SHAWN Way",
          image: {
            l: "/assets/image/residential/collection/shawn panya - home-banner.webp",
            s: "/assets/image/residential/collection/002.webp"
          }
        },
        {
          name: {
            en: "SHAWN",
            th: "ณอน "
          },
          link: `/${language.value}/house/detached-house/shawn/wongwaen-chatuchot`,
          brands: "SHAWN",
          location: {
            en: "Wongwaen - Chatuchot",
            th: "วงแหวน - จตุโชติ"
          },
          detail: "Live SHAWN Way",
          image: {
            l: "/assets/image/residential/collection/shawn wongwaen - home-banner.webp",
            s: "/assets/image/residential/collection/singha-shawn-ctc-m.webp"
          }
        },
        {
          name: {
            en: "THE EXTRO",
            th: "ดิ เอ็กซ์โทร"
          },
          link: `/${language.value}/condominium/the-extro/phayathai-rangnam`,
          brands: "extro",
          location: {
            en: "Phayathai - Rangnam",
            th: "พญาไท - รางน้ำ"
          },
          detail: "Living Extra",
          image: {
            l: "/assets/image/residential/collection/extro - home-banner.webp",
            s: "/assets/image/residential/collection/extro.webp"
          }
        }
      ]
    };

    // computed for template
    const title = computed(() => language.value === 'en' ? rawData.title.en : rawData.title.th);
    const detail = computed(() => language.value === 'en' ? rawData.detail.en : rawData.detail.th);
    const font = computed(() => language.value === 'en' ? "font-['SinghaEstate']" : "");


    // slide data for v-for
    const slideImg = ref(
      rawData.items.map(item => ({
        link: item.link,
        image: item.image,
        name: item.name,
        location: item.location
      }))
    );
    const slideDetail = ref(
      rawData.items.map(item => ({
        link: item.link,
        name: item.name,
        location: item.location,
        detail: item.detail
      }))
    );

    // swiper + AOS init
    const init = () => {
      AOS.init();
      const main = new Swiper("#DiscoveryComponent .collection-slide", {
        pagination: { el: ".hero-progress-bar", type: "progressbar" },
        navigation: { nextEl: ".next", prevEl: ".prev" },
      });
      const detailSw = new Swiper("#DiscoveryComponent .collection-detail-slide", {
        effect: "fade"
      });
      const pager = new Swiper("#DiscoveryComponent .collection-slide", {
        pagination: { el: ".page-number", type: "fraction" }
      });

      main.controller.control = detailSw;
      detailSw.controller.control = pager;
    };

    onMounted(() => {
      language.value = getLanguageFromPath();
      nextTick(init);
    });

    return {
      language,
      title,
      detail,
      font,
      slideImg,
      slideDetail
    };
  }
});

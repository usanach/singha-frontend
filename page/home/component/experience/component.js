function toggleCard(d) {
    // d.classList.toggle('expand');
    // d.classList.toggle('expanded');
}

// Define the Header component
const ExperienceComponent = defineComponent({
    name: 'ExperienceComponent',
    template: `
  <section id="ExperienceComponent" class="bg-[#1A2F4D] lg:pt-20 pt-0 lg:pb-40">
    <div class="container !px-0 lg:!px-[20px]">
      <div class="relative">
        <img :src="'/assets/image/residential/a-story-img-01' + (language==='en'?'.png':'.png')" alt="Experience unmatched living" class="lg:block hidden w-full" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear" />
        <img :src="'/assets/image/residential/a-story-img-01_m.png'" alt="Experience unmatched living" class="lg:hidden block w-full absolute top-0 left-0" />
        <div class="lg:absolute top-0 left-0 w-full h-full flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
          <div class="lg:p-20 p-5 lg:mx-0 mx-auto lg:mt-0 mt-10">
            <h2 :class="' text-[#CBA449] lg:text-[30px] text-[20px] md:text-start text-center uppercase leading-tight'" v-html="language==='en'?data.title.en:data.title.th"></h2>
            <p class="text-white md:text-[18px] text-[16px] md:mt-2 mt-3 text-center md:text-start" v-html="language==='en'?data.detail.en:data.detail.th"></p>
          </div>
        </div>
        <div class="grid lg:grid-cols-5 grid-cols-1 gap-5 lg:mt-[-15rem] mt-10 pb-10 relative xl:px-5 px-0">
          <div
            v-for="(item, index) in data.data"
            :key="index"
            class="bg-white lg:w-full w-[280px] card lg:mx-0 mx-auto"
            @click="toggleCard"
          >
            <img
              :src=" item.image.l "
              :alt="language==='en' ? item.title.en : item.title.th"
              class="w-full lg:block hidden"
            />
            <div class="bg-white uppercase p-5 space-y-3 lg:block hidden">
                <div class="xl:h-[40px] lg:h-[30px] overflow-hidden">
                    <h3 class="xl:text-[15px] lg:text-[10px]" v-html="language==='en' ? item.title.en : item.title.th"></h3>
                </div>
                <hr />
                <p class="text-[14px]" v-html="language==='en' ? item.detail.en : item.detail.th"></p>
            </div>
            
            <img
              :src=" item.image.s "
              :alt="language==='en' ? item.title.en : item.title.th"
              class="w-full lg:hidden block"
            />
            <div class="bg-white uppercase p-5 space-y-3  lg:hidden block" >
                <div class="xl:h-[40px] lg:h-[30px] h-fit overflow-hidden">
                    <h3 class="xl:text-[15px] lg:text-[10px]" v-html="language==='en' ? item.title.en : item.title.th"></h3>
                </div>
                <hr />
                <p class="text-[14px]" v-html="language==='en' ? item.detail.en : item.detail.th"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`,
    setup() {
        const language = ref('th');
        const data = {
            title: {
                th: 'สร้างนิยามแห่งการใช้ชีวิตในแบบของคุณ',
                en: 'INDULGE IN UNPARALLELED LIVING WHERE <br class="lg:block hidden"/> CRAFTSMANSHIP HARMONIZES WITH REFINED'
            },
            detail: {
                th: "ด้วยการออกแบบที่เข้าใจถึงความต้องการที่แท้จริง<br/>​ผสานความละเอียดและประณีตในทุกขั้นตอน<br/>​เพื่อส่งมอบความเป็นเอกลักษณ์ในแบบที่ไม่เหมือนใคร​",
                en: `Residences crafted for every facet of living ​<br/> Embodying a profound understanding of life's desires ​`
            },
            data: [{
                title: {
                    th: 'PRIME LOCATION',
                    en: 'PRIME LOCATION'
                },
                detail: {
                    th: "ทำเลทองที่จะสร้างมูลค่าอย่างต่อเนื่องในระยะยาว และมีสิ่งอำนวยความสะดวกให้ผู้อาศัย​​",
                    en: `A prime location that presents lucrative potential alongside exceptional amenities`
                },
                image: {
                    l: "/assets/image/residential/card/location.png",
                    s: "/assets/image/residential/card/location-m.png"
                }
            }, {
                title: {
                    th: 'SIGNATURE PLANNING & CRAFTED TO LAST DESIGN',
                    en: 'SIGNATURE PLANNING & CRAFTED TO LAST DESIGN'
                },
                detail: {
                    th: "ออกแบบพื้นที่ใช้สอยตอบสนองตรงตามความต้องการของผู้อยู่อาศัย รวมถึงงานดีไซน์ที่สวยงาม ประณีต และ มีเอกลักษณ์​",
                    en: `Craft-to-last design for every unique desire, seamlessly blending functionality with inspiration`
                },
                image: {
                    l: "/assets/image/residential/card/project-stories-img-06-2.webp",
                    s: "/assets/image/residential/card/project-stories-img-06-m.webp"
                }
            }, {
                title: {
                    th: 'QUALITY & INVISIBLE DETAILS',
                    en: 'QUALITY & INVISIBLE DETAILS '
                },
                detail: {
                    th: "ความพิถีพิถันเลือกใช้วัสดุคุณภาพสูงที่มาพร้อมความใส่ใจในรายละเอียดทุกด้าน​​",
                    en: "Meticulous attention to every detail, selecting only the finest quality materials"
                },
                image: {
                    l: "/assets/image/residential/card/Quality.png",
                    s: "/assets/image/residential/card/quality-m.png"
                }
            }, {
                title: {
                    th: 'SUSTAINABILITY',
                    en: 'SUSTAINABILITY'
                },
                detail: {
                    th: "การออกแบบเพื่อรองรับการอยู่อาศัยอย่างยั่งยืน​",
                    en: "A seamless living experience enhanced by exclusive service support"
                },
                image: {
                    l: "/assets/image/residential/card/project-stories-img-06-3.png",
                    s: "/assets/image/residential/card/project-stories-img-05.jpg"
                }
            }, {
                title: {
                    th: 'SERVICE & LIVING EXPERIENCE',
                    en: 'SERVICE & LIVING EXPERIENCE'
                },
                detail: {
                    th: "การบริการหลังการขายที่จะส่งมอบประสบการณ์ที่ดีในการอยู่อาศัย​​",
                    en: "Embrace eco-friendly and sustainability integrated seamlessly."
                },
                image: {
                    l: "/assets/image/residential/card/service.png",
                    s: "/assets/image/residential/card/service-m.png"
                }
            },]
        };

        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        const init = () => {
            AOS.init();
            nextTick(() => {
            });
        };

        onMounted(() => {
            language.value = getLanguageFromPath();
            init();
        });

        // Card toggle handler
        const toggleCard = (event) => {
            const btn = event.currentTarget;
            btn.classList.toggle('expanded');
        };

        return { language, data, toggleCard };
    }
});

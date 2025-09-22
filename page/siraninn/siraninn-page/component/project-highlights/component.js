const ProjectsHighlightComponent = defineComponent({
  name: 'ProjectsHighlightComponent',
  template: `
  
    <section class="onview font-['IBM_Plex_Sans_Thai']":style="{color:mainFontColor}" id="project_signature" data-section="project_signature">
        <div class="relative">
            <div class="w-full lg:h-full bg-cover bg-top pt-10 pb-20" :style="{ backgroundImage: 'url(' + bgImage + ')' }">
                <div class="container mx-auto lg:px-5 px-0">
                    <div>
                        <h2 :style="{fontFamily:dataset.font[language]}" class="text-[50px] text-center font-normal" data-aos="fade-up"
                            data-aos-duration="500" data-aos-easing="linear">
                            {{dataset.title[language]}}
                        </h2>
                    </div>
                    <div class="flex flex-col gap-10 mt-5">
                        <div class="flex flex-col lg:px-[15%] lg:gap-10 gap-5">
                            <div class="lg:mx-0 -mx-20">
                                <img :src="dataset.items[0].image" alt="" class="w-full"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5 lg:w-1/2">
                                <h3 :style="{fontFamily:dataset.items[0].font[language]}" class="text-[30px] leading-none font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{dataset.items[0].title[language]}}
                                </h3>
                                <p class="text-[16px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                    data-aos-easing="linear" data-aos-delay="300">
                                    {{dataset.items[0].detail[language]}}
                                </p>
                            </div>
                        </div>
                        <div class="items-end lg:-mt-[10%] gap-10">
                            <div class="flex lg:flex-row flex-col lg:gap-10 gap-5 w-full lg:mb-10">
                                <div class="lg:w-1/2 w-full mt-auto" data-aos="fade-up" data-aos-duration="1000"
                                    data-aos-easing="linear">
                                    <img :src="dataset.items[1].image" alt="" class="w-full"
                                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                                    <div class="flex lg:gap-10 gap-5 mt-5 lg:hidden">
                                        <div class="flex flex-col gap-2 w-full lg:px-0 px-5">
                                            <h3 :style="{fontFamily:dataset.items[1].font[language]}" class="text-[30px] leading-none font-normal" data-aos="fade-up"
                                                data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                                {{dataset.items[1].title[language]}}
                                            </h3>
                                            <p class="text-[16px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                                data-aos-easing="linear" data-aos-delay="300">
                                                {{dataset.items[1].detail[language]}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="lg:w-1/2 w-full" data-aos="fade-up" data-aos-duration="1000"
                                    data-aos-easing="linear">
                                    <img :src="dataset.items[2].image" class="lg:block hidden w-full"
                                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                        alt="">
                                    <img :src="dataset.items[2].image" alt="" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                        class="lg:hidden block w-full">
                                    <div class="flex lg:gap-10 gap-5 mt-5 lg:hidden">
                                        <div class="flex flex-col gap-2 w-full lg:px-0 px-5">
                                            <h3 :style="{fontFamily:dataset.items[2].font[language]}" class="text-[30px] leading-none font-normal" data-aos="fade-up"
                                                data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                                 {{dataset.items[2].title[language]}}
                                            </h3>
                                            <p class="text-[16px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                                data-aos-easing="linear" data-aos-delay="300">
                                                {{dataset.items[2].detail[language]}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="lg:flex hidden lg:gap-10 gap-5">
                                <div class="flex flex-col gap-2 w-1/2 lg:px-0 px-5">
                                    <h3 :style="{fontFamily:dataset.items[1].font[language]}" class="text-[30px] leading-none font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                        {{dataset.items[1].title[language]}}
                                    </h3>
                                    <p class="text-[16px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="300">
                                        {{dataset.items[1].detail[language]}}
                                    </p>
                                </div>
                                <div class="flex flex-col gap-2 w-1/2 lg:px-0 px-5">
                                    <h3 :style="{fontFamily:dataset.items[2].font[language]}" class="text-[30px] leading-none font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                        {{dataset.items[2].title[language]}}
                                    </h3>
                                    <p class="text-[16px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="300">
                                        {{dataset.items[2].detail[language]}}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col lg:px-[15%] lg:gap-10 gap-5">
                            <div class=" mx-auto">
                                <img :src="dataset.items[3].image" alt=""
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5">
                                <h3 :style="{fontFamily:dataset.items[3].font[language]}" class="text-[30px] leading-none font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{dataset.items[3].title[language]}}
                                </h3>
                                <p class="text-[16px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                    data-aos-easing="linear" data-aos-delay="300" v-html="dataset.items[3].detail[language]">
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `,
  setup() {
    const language = ref('th');
    const bgImage = ref('/assets\/image\/page-siraninn\/highlight\/bg.png')
    const mainFontColor = ref('#675635')
    const dataset = ref({
      title: {
        en: "PROJECT SIGNATURES",
        th: "จุดเด่นของโครงการ"
      },
      font: {
        en: "The Seasons",
        th: "DB OnUma"
      },
      items: [

        {
          // THE RISING PATTANAKARN
          title: { en: "THE RISING PATTANAKARN", th: "THE RISING PATTANAKARN" },
          font: { en: "Gotham", th: "DB OnUma" },
          detail: {
            en: "An emerging district brimming with the promise of growth, offering fresh opportunities and experiences. Located just 5 km. from Thonglor.",
            th: "บ้านเดี่ยวย่านพัฒนาการ ทำเลศักยภาพใจกลางเมืองเชื่อมทุกการเดินทาง อีกระดับของการอยู่อาศัยและที่สุดของความสะดวกสบาย เชื่อมต่อทุกจุดหมายใจกลางเมือง เพียง 5 กิโลเมตรจากทองหล่อ"
          },
          image: "/assets/image/page-siraninn/highlight/KANT%20x%20SIRANINN154.png"
        },
        {
          // EXCLUSIVE COMMUNITY
          title: { en: "EXCLUSIVE COMMUNITY 28 PRIVATE RESIDENCES", th: "EXCLUSIVE COMMUNITY 28 PRIVATE RESIDENCES" },
          font: { en: "Gotham", th: "DB OnUma" },
          detail: {
            en: "True luxury lies in the freedom to live life on your own way, embraced by privacy and tranquility. SIRANINN Residences spans 23 Rai, with residential zones thoughtfully separated from communal spaces. Here, every family returns to a verdant, private retreat designed for serenity.",
            th: "ที่สุดแห่งความเป็นส่วนตัว เพียง 28 ครอบครัวเท่านั้นที่จะได้สัมผัสกับสังคมส่วนตัวระดับเอ็กซ์คลูซีฟ บนพื้นที่กว่า 23 ไร่ ด้วยการจัดสรรพื้นที่แยกโซนพักอาศัยออกจากพื้นที่ส่วนกลางอย่างลงตัว สร้างสังคมที่เงียบสงบและปลอดภัย เพื่อความสุขและเป็นส่วนตัวของทุกครอบครัว"
          },
          image: "/assets/image/page-siraninn/highlight/THE%20ESSE36%20SMALL%2010.png"
        },
        {
          // TIMELESS DESIGN
          title: { en: "TIMELESS DESIGN", th: "TIMELESS DESIGN" },
          font: { en: "Gotham", th: "DB OnUma" },
          detail: {
            en: "We take pride in revealing the beauty in every detail while ensuring the balance of aesthetic elegance with premium materials, practicality and effortless maintenance.",
            th: "ออกแบบประณีตสไตล์ Tropical Modern ที่เรียบหรู ทันสมัย และเลือกใช้วัสดุคุณภาพสูง ไม่เพียงมอบความงามที่ไร้กาลเวลา แต่ยังคำนึงถึงคุณภาพทนทานใช้งานได้ดีอย่างยาวนาน"
          },
          image: "/assets/image/page-siraninn/highlight/ESSE36%20x%20KANT%2048.png"
        },
        {
          // PERFECT LIVING EXPERIENCE
          title: { en: "PERFECT LIVING EXPERIENCE", th: "PERFECT LIVING EXPERIENCE" },
          font: { en: "Gotham", th: "DB OnUma" },
          detail: {
            en: "Thanks to exhaustive, comprehensive, and expert planning in every design element, you’ll discover a perfect living experience that complements your refined lifestyle.",
            th: "พิถีพิถันใส่ใจทุกขั้นตอน แม้ในจุดเล็ก ๆ ที่ไม่มีใครมองเห็น เพื่อให้บ้านของคุณเป็นมากกว่าที่อยู่อาศัย แต่เป็นสถานที่แห่งความสุข<br class='lg:block hidden' />และบ้านที่สมบูรณ์แบบของครอบครัวคุณ"
          },
          image: "/assets/image/page-siraninn/highlight/KANT%20x%20SIRANINN178.png"
        },
      ],
    });

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const init = () => { if (window.AOS) AOS.init(); };

    onMounted(() => {
      language.value = getLanguageFromPath();
      nextTick(() => init());
    });

    return { language, dataset, bgImage, mainFontColor };
  }
});

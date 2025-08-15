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
                                    <img :src="dataset.items[2].image" class="lg:block hidden"
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
                                    data-aos-easing="linear" data-aos-delay="300">
                                    {{dataset.items[3].detail[language]}}
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
          title: {
            en: "ดีไซน์สวยงามไร้กาลเวลา",
            th: "ดีไซน์สวยงามไร้กาลเวลา"
          },
          font: {
            en: "Gotham",
            th: "DB OnUma"
          },
          detail: {
            en: "ดีไซน์แบบทรอปิคอล โมเดิร์น เรียบง่าย ทันสมัย และเลือกใช้วัสดุคุณภาพที่นอกจากจะคงความสวยงามไร้กาลเวลาแล้ว ยังคำนึงถึงคุณภาพที่ใช้งานได้ดีในระยะยาว",
            th: "ดีไซน์แบบทรอปิคอล โมเดิร์น เรียบง่าย ทันสมัย และเลือกใช้วัสดุคุณภาพที่นอกจากจะคงความสวยงามไร้กาลเวลาแล้ว ยังคำนึงถึงคุณภาพที่ใช้งานได้ดีในระยะยาว"
          },
          image: "/assets\/image\/page-siraninn\/highlight\/KANT x SIRANINN154.png"
        },
        {
          title: {
            en: "ที่สุดของสังคมส่วนตัว",
            th: "ที่สุดของสังคมส่วนตัว"
          },
          font: {
            en: "Gotham",
            th: "DB OnUma"
          },
          detail: {
            en: "เพียง 28 ครอบครัว กับสังคมส่วนตัวระดับเอ็กซ์คลูซีฟ บนพื้นที่กว่า 23 ไร่ พร้อมความเป็นส่วนตัวสูงสุด โดยแยกโซนพักอาศัยออกจากพื้นที่ส่วนกลางอย่างชัดเจน",
            th: "เพียง 28 ครอบครัว กับสังคมส่วนตัวระดับเอ็กซ์คลูซีฟ บนพื้นที่กว่า 23 ไร่ พร้อมความเป็นส่วนตัวสูงสุด โดยแยกโซนพักอาศัยออกจากพื้นที่ส่วนกลางอย่างชัดเจน"
          },
          image: "/assets\/image\/page-siraninn\/highlight\/THE ESSE36 SMALL 10.png"
        },
        {
          title: {
            en: "บ้านเดี่ยวในเมือง ทำเลศักยภาพพัฒนาการ ",
            th: "บ้านเดี่ยวในเมือง ทำเลศักยภาพพัฒนาการ "
          },
          font: {
            en: "Gotham",
            th: "DB OnUma"
          },
          detail: {
            en: "อีกขั้นของการอยู่อาศัยที่เหนือกว่า ทำเลแห่งศักยภาพสำหรับการใช้ชีวิตใจกลางเมือง เดินทางสู่ทองหล่อเพียง 5 กม.",
            th: "อีกขั้นของการอยู่อาศัยที่เหนือกว่า ทำเลแห่งศักยภาพสำหรับการใช้ชีวิตใจกลางเมือง เดินทางสู่ทองหล่อเพียง 5 กม."
          },
          image: "/assets\/image\/page-siraninn\/highlight\/ESSE36 x KANT 48.png"
        },
        {
          title: {
            en: "ประสบการณ์การอยู่อาศัยที่ดีที่สุด",
            th: "ประสบการณ์การอยู่อาศัยที่ดีที่สุด"
          },
          font: {
            en: "Gotham",
            th: "DB OnUma"
          },
          detail: {
            en: "เราพิถีพิถันใส่ใจทุกรายละเอียด ทุกขั้นตอน แม้ในจุดเล็กๆที่ไม่มีใครมองเห็น เพื่อสรรสร้างบ้านที่ดีที่สุดให้กับคุณและครอบครัว",
            th: "เราพิถีพิถันใส่ใจทุกรายละเอียด ทุกขั้นตอน แม้ในจุดเล็กๆที่ไม่มีใครมองเห็น เพื่อสรรสร้างบ้านที่ดีที่สุดให้กับคุณและครอบครัว"
          },
          image: "/assets\/image\/page-siraninn\/highlight\/KANT x SIRANINN178.png"
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

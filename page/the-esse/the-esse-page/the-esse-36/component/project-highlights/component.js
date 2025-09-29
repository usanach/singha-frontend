const ProjectsHighlightComponent = defineComponent({
  name: 'ProjectsHighlightComponent',
  template: `
  
    <section class="onview font-['IBM_Plex_Sans_Thai']" id="project_signature" data-section="project_signature">
        <div class="relative">
            <div class="w-full lg:h-full bg-cover bg-top pt-10 pb-20" :style="{ backgroundImage: 'url(' + bgImage + ')' }">
                <div class="container mx-auto lg:px-5 px-0">
                    <div>
                        <h2 :style="{fontFamily:dataset.font[language]}" class="text-[#451E24] text-[50px] text-center font-normal" data-aos="fade-up"
                            data-aos-duration="500" data-aos-easing="linear">
                            {{dataset.title[language]}}
                        </h2>
                    </div>
                    <div class="flex flex-col gap-10 mt-5">
                        <div class="flex flex-col lg:px-[15%] lg:gap-10 gap-5">
                            <div class="lg:mx-0 -mx-20">
                                <img aria-hidden="true" :src="dataset.items[0].image" alt="" class="w-full"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5 lg:w-1/2">
                                <h3 :style="{fontFamily:dataset.items[0].font[language]}" class="text-[#451E24] text-[22px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{dataset.items[0].title[language]}}
                                </h3>
                                <p class="text-[#451E24] text-[16px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                    data-aos-easing="linear" data-aos-delay="300">
                                    {{dataset.items[0].detail[language]}}
                                </p>
                            </div>
                        </div>
                        <div class="items-end lg:-mt-[10%] gap-10">
                            <div class="flex lg:flex-row flex-col lg:gap-10 gap-5 w-full lg:mb-10">
                                <div class="lg:w-1/2 w-full mt-auto" data-aos="fade-up" data-aos-duration="1000"
                                    data-aos-easing="linear">
                                    <img aria-hidden="true" :src="dataset.items[1].image" alt="" class="w-full"
                                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                                    <div class="flex lg:gap-10 gap-5 mt-5 lg:hidden">
                                        <div class="flex flex-col gap-2 w-full justify-center lg:px-0 px-5">
                                            <h3 :style="{fontFamily:dataset.items[1].font[language]}" class="text-[#451E24] text-[22px] font-normal" data-aos="fade-up"
                                                data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                                {{dataset.items[1].title[language]}}
                                            </h3>
                                            <p class="text-[#451E24] text-[16px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                                data-aos-easing="linear" data-aos-delay="300">
                                                {{dataset.items[1].detail[language]}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="lg:w-1/2 w-full" data-aos="fade-up" data-aos-duration="1000"
                                    data-aos-easing="linear">
                                    <img aria-hidden="true" :src="dataset.items[2].image" class="lg:block hidden w-full"
                                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                        alt="">
                                    <img aria-hidden="true" :src="dataset.items[2].image" alt="" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                        class="lg:hidden block w-full">
                                    <div class="flex lg:gap-10 gap-5 mt-5 lg:hidden">
                                        <div class="flex flex-col gap-2 w-full justify-center lg:px-0 px-5">
                                            <h3 :style="{fontFamily:dataset.items[2].font[language]}" class="text-[#451E24] text-[22px] font-normal" data-aos="fade-up"
                                                data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                                 {{dataset.items[2].title[language]}}
                                            </h3>
                                            <p class="text-[#451E24] text-[16px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                                data-aos-easing="linear" data-aos-delay="300">
                                                {{dataset.items[2].detail[language]}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="lg:flex hidden lg:gap-10 gap-5">
                                <div class="flex flex-col gap-2 w-1/2 justify-center lg:px-0 px-5">
                                    <h3 :style="{fontFamily:dataset.items[1].font[language]}" class="text-[#451E24] text-[22px] font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                        {{dataset.items[1].title[language]}}
                                    </h3>
                                    <p class="text-[#451E24] text-[16px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="300">
                                        {{dataset.items[1].detail[language]}}
                                    </p>
                                </div>
                                <div class="flex flex-col gap-2 w-1/2 justify-center lg:px-0 px-5">
                                    <h3 :style="{fontFamily:dataset.items[2].font[language]}" class="text-[#451E24] text-[22px] font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                        {{dataset.items[2].title[language]}}
                                    </h3>
                                    <p class="text-[#451E24] text-[16px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="300">
                                        {{dataset.items[2].detail[language]}}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col lg:px-[15%] lg:gap-10 gap-5">
                            <div class=" mx-auto">
                                <img aria-hidden="true" :src="dataset.items[3].image" alt=""
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5">
                                <h3 :style="{fontFamily:dataset.items[3].font[language]}" class="text-[#451E24] text-[22px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{dataset.items[3].title[language]}}
                                </h3>
                                <p class="text-[#451E24] text-[16px] font-normal" data-aos="fade-up" data-aos-duration="500"
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
    const bgImage = ref('/assets\/image\/page-the-esse-36\/highlight\/bg.png')
    const dataset = ref({
      title: {
        en: "PROJECT SIGNATURES",
        th: "จุดเด่นของโครงการ"
      },
      font: {
        en: "Gotham",
        th: "DB Heavent"
      },
      items: [
        {
          title: {
            en: "AUTHENTIC AND CONTEMPORARY",
            th: "AUTHENTIC AND CONTEMPORARY"
          },
          font: {
            en: "Gotham",
            th: ""
          },
          detail: {
            en: "A blend of classic Thai architectural elements with modern design, creating an artistic living space.​",
            th: "เอกลักษณ์ที่มีคุณค่าของสถาปัตยกรรมไทยถูกนำมาผสมผสานเสน่ห์และองค์ประกอบที่ร่วมสมัยได้อย่างสมดุล​​"
          },
          image: "/assets/image/page-the-esse-36/highlight/THE-ESSE364120main_Selects_056.png"
        },
        {
          title: {
            en: "PASSION AND FUNCTIONAL ELEGANCE​",
            th: "PASSION AND FUNCTIONAL ELEGANCE​"
          },
          font: {
            en: "Gotham",
            th: ""
          },
          detail: {
            en: "Expansive unit designs crafted to serve the residents’ passions with unit sizes ranging from 38.50 to 252.00 sq.m.​",
            th: "ฟังก์ชันครบครันในยูนิตที่กว้างขวาง ออกแบบมาเพื่อตอบสนองได้ทุกความต้องการของผู้อยู่อาศัย ตั้งแต่ขนาด 38.50 - 252.00 ตร.ม.​"
          },
          image: "/assets/image/page-the-esse-36/highlight/THE-ESSE36-SMALL-10.png"
        },
        {
          title: {
            en: "CITY AND SERENITY",
            th: "CITY AND SERENITY"
          },
          font: {
            en: "Gotham",
            th: ""
          },
          detail: {
            en: "Artfully merging the dynamic essence of Thonglor’s lifestyle with the serene tranquility of the residential project​",
            th: "เมืองแห่งสีสันสู่ความเงียบสงบ เพลินกับจังหวะชีวิตที่มีสีสันย่านทองหล่อและคืนสู่บรรยากาศที่เงียบสงบในโครงการได้เมื่อต้องการ​"
          },
          image: "/assets\/image\/page-the-esse-36\/highlight\/ESSE36xKANT-48.png"
        },
        {
          title: {
            en: "SOCIETY AND EXCLUSIVITY",
            th: "SOCIETY AND EXCLUSIVITY"
          },
          font: {
            en: "Gotham",
            th: ""
          },
          detail: {
            en: "Enjoy a variety of recreational amenities tailored to accommodate both social engagement and personal retreat.",
            th: "ผ่อนคลายกับสิ่งอำนวยความสะดวกเพื่อการพักผ่อนที่ออกแบบมาเพื่อตอบโจทย์ทุกความต้องการของผู้อยู่อาศัย ไม่ว่าจะเป็นกิจกรรมที่ใช้ร่วมกันหรือมุมโปรดส่วนตัว​"
          },
          image: "/assets\/image\/page-the-esse-36\/highlight\/DSCF0496-Edit-Edit.png"
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

    return { language, dataset, bgImage };
  }
});

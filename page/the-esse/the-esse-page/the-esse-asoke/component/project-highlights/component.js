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
                                <img :src="dataset.items[0].image" alt="" class="w-full"
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
                        <div v-if="dataset.items[1]||dataset.items[2]" class="items-end lg:-mt-[10%] gap-10">
                            <div class="flex lg:flex-row flex-col lg:gap-10 gap-5 w-full lg:mb-10">
                                <div v-if="dataset.items[1]" class="lg:w-1/2 w-full mt-auto" data-aos="fade-up" data-aos-duration="1000"
                                    data-aos-easing="linear">
                                    <img :src="dataset.items[1].image" alt="" class="w-full"
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
                                <div v-if="dataset.items[2]" class="lg:w-1/2 w-full" data-aos="fade-up" data-aos-duration="1000"
                                    data-aos-easing="linear">
                                    <img :src="dataset.items[2].image" class="lg:block hidden w-full"
                                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                        alt="">
                                    <img :src="dataset.items[2].image" alt="" data-aos="fade-up"
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
                                <div v-if="dataset.items[1]" class="flex flex-col gap-2 w-1/2 justify-center lg:px-0 px-5">
                                    <h3 :style="{fontFamily:dataset.items[1].font[language]}" class="text-[#451E24] text-[22px] font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                        {{dataset.items[1].title[language]}}
                                    </h3>
                                    <p class="text-[#451E24] text-[16px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="300">
                                        {{dataset.items[1].detail[language]}}
                                    </p>
                                </div>
                                <div v-if="dataset.items[2]" class="flex flex-col gap-2 w-1/2 justify-center lg:px-0 px-5">
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
                        <div v-if="dataset.items[3]" class="flex flex-col lg:px-[15%] lg:gap-10 gap-5">
                            <div class=" mx-auto">
                                <img :src="dataset.items[3].image" alt=""
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
    const bgImage = ref('')
    const dataset = ref({
      title: {
        en: "DESIGN CONCEPT",
        th: "จุดเด่นโครงการ"
      },
      font: {
        en: "Gotham",
        th: "DB Heavent"
      },
      items: [
        {
          title: {
            en: "THE HIGHEST BUILDING AT SUKHUMVIT ROAD",
            th: "THE HIGHEST BUILDING AT SUKHUMVIT ROAD"
          },
          font: {
            en: "Gotham",
            th: ""
          },
          detail: {
            en: "THE ESSE ASOKE: An iconic contemporary tower, rising majestically 240 meters above the city from its coveted prime land plot.",
            th: "นิยามใหม่แห่งการใช้ชีวิตที่เหนือกว่า ด้วยความสูงกว่า 240 เมตร ตึกที่ผสมผสานสไตล์ร่วมสมัยและความโมเดิร์นเข้าด้วยกัน จำนวน 55 ชั้น ในทำเลแห่งศักยภาพ"
          },
          image: "/assets/image/page-the-esse-asoke/signature/The ESSE Asoke_f33-30-lowres.png"
        },
        {
          title: {
            en: "DEFINE LIFE AT ITS FINEST",
            th: "DEFINE LIFE AT ITS FINEST"
          },
          font: {
            en: "Gotham",
            th: ""
          },
          detail: {
            en: "Being one of Bangkok’s premier business districts, Asoke Montri Road offers immediate access to top-tier education, healthcare, shopping, and dining. This prime location is exceptionally well-connected and promising for future potential.",
            th: "ถนนอโศกมนตรี หนึ่งในย่านธุรกิจชั้นนำของกรุงเทพฯ ที่เข้าถึงการใช้ชีวิตที่หลากหลายได้อย่างสะดวกสบาย แวดล้อมด้วยสถาบันการศึกษาระดับแนวหน้า โรงพยาบาล แหล่งช้อปปิ้ง และร้านอาหาร ทำเลแห่งนี้จึงตอบโจทย์ทั้งการใช้ชีวิตในปัจจุบัน ศักยภาพและมูลค่าที่เติบโตในอนาคต"
          },
          image: "/assets/image/page-the-esse-asoke/signature/The ESSE Asoke_f-1.png"
        },
        {
          title: {
            en: "DELIVER QUALITY AT ITS HIGHEST",
            th: "DELIVER QUALITY AT ITS HIGHEST"
          },
          font: {
            en: "Gotham",
            th: ""
          },
          detail: {
            en: "THE ESSE condominium project occupies a prominent and highly desirable location in the heart of Asoke, surrounded by thriving Grade A commercial towers, shopping centers, luxurious hotels, and vibrant entertainment hubs.",
            th: "THE ESSE คอนโดมิเนียมตั้งอยู่ในทำเลที่โดดเด่นและเป็นที่ต้องการในย่านอโศก เพราะความสะดวกสบายที่รายล้อมด้วยอาคารสำนักงานชั้นนำ ศูนย์การค้า โรงแรมหรู และแหล่งบริการความบันเทิงต่างๆ"
          },
          image: "/assets/image/page-the-esse-asoke/signature/The ESSE Asoke_exterior-52-lowres.png"
        }
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

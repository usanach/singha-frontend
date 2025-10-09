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
                            <div class="flex flex-col gap-2 lg:px-0 px-5">
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
            en: "THE BEST OF LIVING CONNECTIVITY​",
            th: "THE BEST OF LIVING CONNECTIVITY​"
          },
          font: {
            en: "Gotham",
            th: ""
          },
          detail: {
            en: "Strategically located at the vibrant intersection of Asoke and Phetchaburi, The ESSE offers unmatched connectivity for modern living. With a direct link to the MRT station, the Airport Rail Link and boat pier just a short walk away, and easy access to major roads and expressways—all modes of transport are within easy reach.​​",
            th: "โครงการตั้งอยู่บนสี่แยกอโศก - เพชรบุรีตัดใหม่ มอบความสะดวกสบายในการเดินทาง ทำเลติดสถานีรถไฟฟ้า MRT และเดินเพียงไม่กี่ก้าวก็ถึงแอร์พอร์ตเรลลิงก์ และท่าเรือโดยสาร พร้อมการเดินทางที่สะดวกสบายสู่ถนนหลักและทางด่วน ทุกรูปแบบการเดินทางอยู่ใกล้แค่เอื้อม ​​"
          },
          image: "/assets\/image\/page-the-esse-complex\/project-signature\/THE_ESSE_at_Singha_Complex_1.png"
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

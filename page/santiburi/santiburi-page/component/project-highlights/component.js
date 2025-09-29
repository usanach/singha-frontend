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
                                <img aria-hidden="true" :src="dataset.items[0].image" alt="" class="w-full"
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
                                    <img aria-hidden="true" :src="dataset.items[1].image" alt="" class="w-full"
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
                                    <img aria-hidden="true" :src="dataset.items[2].image" class="lg:block hidden w-full"
                                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                        alt="">
                                    <img aria-hidden="true" :src="dataset.items[2].image" alt="" data-aos="fade-up"
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
                                <img aria-hidden="true" :src="dataset.items[3].image" alt=""
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
    const bgImage = ref('/assets\/image\/santiburi-page\/highlight\/bg.png')
    const mainFontColor = ref('#4A1923')
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
            en: "IMPRINT THE BEST MEMORIES",
            th: "IMPRINT THE BEST MEMORIES"
          },
          font: {
            en: "Gotham",
            th: "DB Heavent"
          },
          detail: {
            en: "Homes created for your ideal lifestyle. Three thoughtfully crafted standard home designs, each offering perfect functionality yet featuring unique lifestyle details that celebrate your identity. Make every day feel like home, where you and your family can truly be yourselves.",
            th: "บ้านที่สะท้อนภาพชีวิตในอุดมคติของคุณ ผ่าน​การออกแบบที่คิดอย่างถี่ถ้วนในทุกแง่มุม พร้อมฟังก์ชั่นครบสมบูรณ์ สร้างสรรค์เป็นบ้านมาตรฐาน 3 แบบที่แตกต่างในรายละเอียด สะท้อนความเป็นตัวตนของผู้เป็นเจ้าของ รองรับทุกรูปแบบการใช้ชีวิต ให้คุณและครอบครัวรู้สึกเป็นตัวเองมากที่สุด​"
          },
          image: "/assets\/image\/santiburi-page\/highlight\/KANT x SANTIBURI60.png"
        },
        {
          title: {
            en: "COMFORT YOURSELF IN THE WAY THAT NO ONE ELSE CAN AT SANTIBURI​",
            th: "COMFORT YOURSELF IN THE WAY THAT NO ONE ELSE CAN AT SANTIBURI​"
          },
          font: {
            en: "Gotham",
            th: "DB Heavent"
          },
          detail: {
            en: "Every space and function is carefully planned in a 360-degree approach, elevating everyday moments into unparalleled comfort and extraordinary experiences.​",
            th: "จัดสรรพื้นที่และฟังก์ชั่น ลงลึกถึงรายละเอียดแบบ 360 องศา ที่จะเปลี่ยนช่วงเวลาของชีวิตประจำวันให้กลายเป็นกิจกรรมในโอกาสพิเศษ​"
          },
          image: "/assets\/image\/santiburi-page\/highlight\/KANT x SANTIBURI196.png"
        },
        {
          title: {
            en: "PRECIOUS LOCATION​",
            th: "PRECIOUS LOCATION​"
          },
          font: {
            en: "Gotham",
            th: "DB Heavent"
          },
          detail: {
            en: "Meeting the needs of comfortable living, this privileged project is surrounded by a friendly and tranquil environment that ensures complete peace of mind every day.",
            th: "ทำเลที่ประเมินค่าไม่ได้ ตอบโจทย์ความสะดวกสบายในการอยู่อาศัย รายล้อมด้วยสิ่งแวดล้อมที่เป็นมิตร ที่จะทำให้คุณสามารถใช้ชีวิตในแต่ละวันได้โดยไร้กังวล​​"
          },
          image: "/assets\/image\/santiburi-page\/highlight\/KANT x SANTIBURI107.png"
        },
        {
          title: {
            en: "NATURE IS NOT A PLACE TO VISIT, IT'S HOME​",
            th: "NATURE IS NOT A PLACE TO VISIT, IT'S HOME​"
          },
          font: {
            en: "Gotham",
            th: "DB Heavent"
          },
          detail: {
            en: "Embrace your everyday life closer to nature with over 15 Rai of Project Area dedicated to common spaces abundant with natural greenery. The design seamlessly integrates nature's touch throughout the entire project.​",
            th: "ให้ทุกวันของชีวิตแนบชิดกับธรรมชาติได้ยิ่งขึ้นด้วยพื้นที่กว่า 15 ไร่ ในโครงการ ถูกจัดสรรให้เป็นพื้นที่ส่วนกลางที่แวดล้อมด้วยสีเขียวของธรรมชาติ และการออกแบบให้มีพื้นที่สีเขียวที่แทรกซึมอยู่ทั่วทั้งโครงการ"
          },
          image: "/assets\/image\/santiburi-page\/highlight\/KANT x SANTIBURI190.png"
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

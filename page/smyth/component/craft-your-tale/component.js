const CraftYourTaleComponent = defineComponent({
  name: 'CraftYourTaleComponent',
  template: `
    <section class="onview font-['IBM_Plex_Sans_Thai']" data-section="craft_your_tales">
      <div
        :style="{ backgroundImage: 'url(' + (isMobile ? texts.images.bg.mobile : texts.images.bg.desktop) + ')' }"
        class="bg-cover bg-no-repeat bg-center"
      >
        <div class="py-20">
          <div class="container">
            <div class="flex flex-col mx-auto justify-center gap-20">
              <!-- Title Section -->
              <div class="flex flex-col justify-center">
                <p class="font-['Tenor_Sans'] lg:text-[110px] text-[60px] text-white text-center leading-none relative z-10"
                   data-aos="fade-up"
                   data-aos-duration="500"
                   data-aos-easing="linear">
                  CRAFT <br class="lg:hidden"/> YOUR TALE
                </p>
                <!-- Static Image Section -->
                <div class="lg:-mt-8 -mt-5 mx-auto overflow-hidden relative lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]">
                  <img aria-hidden="true"
                    class="w-full"
                    :src="isMobile ? texts.images.mobile : texts.images.desktop"
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-easing="linear"
                    data-aos-delay="200"
                    alt="Craft Your Tale"
                  />
                </div>
              </div>

              <!-- Description Section -->
              <div class="flex flex-col mx-auto lg:px-0 px-3 gap-3">
                <h2
                  class="text-center text-[35px] font-[400]"
                  data-aos="fade-up"
                  data-aos-duration="500"
                  data-aos-easing="linear"
                >
                  <span v-html="texts.subtitle[language]"></span>
                </h2>
                <div class="space-y-3">
                  <p
                    class="text-center text-[20px] font-normal"
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-easing="linear"
                    v-html="texts.description[language]"
                  ></p>
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
    const isMobile = ref(window.innerWidth < 768);

    const handleResize = () => {
      isMobile.value = window.innerWidth < 768;
    };

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const texts = {
      subtitle: {
        en: 'CRAFT YOUR TALE',
        th: 'CRAFT YOUR TALE'
      },
      description: {
        en: `
          Home is more than a dwelling place,<br class="lg:block hidden" />
          it is a place where every chapter of your story seamlessly connects.<br class="lg:block hidden"/>
          Every detail is thoughtfully designed<br class="lg:block hidden" />
          to reflect your unique identity and the SMYTH'S lifestyle.<br/><br/>
          Let this home be your unique story,<br class="lg:block hidden" />
          Crafted exclusively for those who embrace the SMYTH’S way of life.
        `,
        th: `
          เพราะ บ้าน เป็นมากกว่าที่อยู่อาศัย <br class="lg:block hidden" />
          คือสถานที่ที่เชื่อมทุกเรื่องราวได้อย่างลงตัว <br class="lg:block hidden" />
          ทุกรายละเอียดจึงถูกออกแบบ <br class="lg:hidden" />
          จากความเข้าใจตัวตน <br class="lg:block hidden" />
          สะท้อนไลฟ์สไตล์แบบ SMYTH'S<br/><br/>
          เพื่อให้บ้านนี้… คือเรื่องราวเฉพาะของคนแบบ SMYTH’S
        `
      },
      images: {
        bg: {
          desktop: '/assets/image/page-smyth-home/craft-your-tale/background.webp',
          mobile: '/assets/image/page-smyth-home/craft-your-tale/background.webp'
        },
        desktop: '/assets/image/page-smyth-ramintra/craft-yours-tale/smyth_KV_3_dt.webp',
        mobile: '/assets/image/page-smyth-ramintra/craft-yours-tale/smyth_KV_1_mb.webp'
      }
    };

    language.value = getLanguageFromPath();

    onMounted(() => {
      AOS.init();
      window.addEventListener('resize', handleResize);
    });

    return { language, texts, isMobile };
  }
});
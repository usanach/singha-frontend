const EntrustedComponent = defineComponent({
  name: 'EntrustedComponent',
  setup() {
    const language = ref('th'); // Default language

    // Function to extract language from the URL
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th'; // Default to 'th' if not found
    };

    // Define content for each language with new text
    const datasets = ref({
      title: {
        en: "ENTRUSTED AND<br/>VALUE ENRICHER",
        th: "ENTRUSTED AND<br/>VALUE ENRICHER"
      },
      detail: {
        en: "Indulge in the ultimate essence of refined living with Singha Estate\'s collection of quality homes and condominiums",
        th: "สัมผัสคุณค่าแห่งความสุขทุกช่วงเวลาของการใช้ชีวิตอย่างลงตัวกับ โครงการบ้านและคอนโดมิเนียมคุณภาพ จาก สิงห์ เอสเตท"
      },
      // button: {
      //   en: "Explore More",
      //   th: "ดูเพิ่มเติม"
      // }
    });

    onMounted(() => {
      language.value = getLanguageFromPath();
    });

    return { language, datasets };
  },
  template: `
      <section class="entrusted bg-[#E9E2DC] onview"  data-section="entrusted_and_value_enricher">
        <div class="bg-[#C3B5A7]">
          <div class="grid lg:grid-rows-1 grid-rows-3 lg:grid-cols-3 grid-cols-1 lg:space-x-4 lg:min-h-[600px]">
            <div class="lg:px-[20%] px-5 md:py-20 py-10 space-y-5">
              <h2 class="text-[35px] leading-none  font-['IBM_Plex_Sans_Thai']">
                <b v-html="datasets.title[language]"></b>
              </h2>
              <p class="font-normal font-[16px] font-['IBM_Plex_Sans_Thai']" v-html="datasets.detail[language]"></p>
              <button v-if="datasets.button" type="button" class="btn bg-transparent text-black !mt-10">
                {{ datasets.button[language] }}
              </button>
            </div>
            <div class="bg-[url('/assets/image/page-house/entrusted/bg.png')] bg-cover bg-center md:col-span-2 row-span-2 relative min-h-[300px]  md:mt-0 -mt-10">
              <div class="backdrop-blur-xl bg-white/10 top-0 left-0 w-full h-full lg:pr-20 md:pr-5 py-5">
                <div class="grid md:grid-cols-4 grid-cols-1 grid-rows-3 lg:gap-6 gap-4 h-full">
                  <div class="col-start-1 md:row-start-1 row-start-3 z-10 drop-shadow-xl row-span-2 lg:w-[400px] md:w-[250px] w-[150px] h-[150px] lg:h-[300px] md:h-[200px] md:mt-auto -mt-10 lg:-ml-20 md:-ml-5 ml-10 bg-cover bg-center" style="background-image:url('/assets/image/page-house/entrusted/1.png')"></div>
                  <div class="md:max-w-auto max-w-[70%] md:col-start-3 col-start-1 row-start-1 md:col-span-2 col-span-3 md:row-span-3 row-span-2 drop-shadow-xl bg-center bg-cover md:mt-0 -mt-10 md:-translate-y-20" style="background-image:url('/assets/image/page-house/entrusted/2.png')"></div>
                  <div class="md:col-start-2 col-start-3 md:col-span-1 md:row-start-3 row-start-3 bg-cover bg-center drop-shadow-xl md:w-auto w-[150px] h-[150px] md:h-auto md:mt-0 mt-10 md:mr-0 mr-10" style="background-image:url('/assets/image/page-house/entrusted/3.png')"></div>
                </div>
              </div>
            </div>
            <div class=""></div>
          </div>
        </div>
      </section>
    `
});

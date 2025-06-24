const ProjectsHighlightComponent = defineComponent({
  name: 'ProjectsHighlightComponent',
  template: `
      <section class="onview -mt-1" id="ProjectsHighlightComponent" data-section="condominium_projects">
        <div class="bg-[url('/assets/image/page-condo/project/bg.png')] bg-cover bg-top">
          <div class="container lg:px-5 px-0">
            <div class="grid md:grid-cols-3 grid-cols-1 md:grid-rows-3 grid-rows-6 md:gap-8 gap-6 lg:px-4 px-0 md:py-20 py-5 md:max-h-[1024px] max-h-[2000px] lg:w-[90%] lg:ml-auto">
              <!-- Dynamic Heading -->
              <div class="md:p-4 p-10 md:pt-4 pt-5 text-left z-10">
                <h2 class="md:text-[60px] text-[32px] text-nowrap leading-none text-white  font-['IBM_Plex_Sans_Thai']" :class="[fontCss()]">
                  <span v-html="data.heading[language]"></span>
                </h2>
              </div>
  
              <!-- Dynamic Image (Small) -->
              <div class="md:col-start-2 md:col-span-2 -mt-26 md:row-start-1 row-start-2 row-span-2 bg-center bg-cover md:mt-0 drop-shadow-xl max-w-[500px] lg:ml-20 md:mx-0 mx-5 " 
                   :style="{ backgroundImage: 'url(' + data.images.s + ')' }"
                   :class="[language=='th' ? '-mt-[7.5rem]':'-mt-28']"
                   ></div>
  
              <!-- Dynamic Image (Large) -->
              <div class="md:ml-0 ml-auto md:row-start-2 row-start-4 md:row-span-2 row-span-2 flex md:col-span-1">
                <div class="bg-center lg:w-[350px] md:h-[380px] w-[270px] h-full mt-auto md:ml-auto drop-shadow-xl lg:translate-x-40" 
                     :style="{ backgroundImage: 'url(' + data.images.l + ')' }"></div>
              </div>
  
              <!-- Dynamic Paragraph -->
              <div class="md:col-start-2 md:col-span-2 md:row-start-3 row-start-6 lg:ml-40 md:px-0 px-5">
                <p class="lg:w-3/5 font-normal  font-['IBM_Plex_Sans_Thai']" v-html="data.description[language]"></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
  setup() {
    const template = ref('');
    const language = ref('th'); // Default language
    
    // JSON data for both languages along with shared images
    const data = ref({
      heading:{
        en:"Condominium<br/> projects from <br/>Singha Estate",
        th:"โครงการคอนโดมิเนียม<br/>จากสิงห์ เอสเตท"
      },
      description:{
        en:`Enjoy urban life with our premium condominiums, centrally located in the heart of Bangkok. Easy connectivity to the city’s best wherever your destination is via private car, mass transit, or expressway. Our residences offer the future of living with modern amenities and innovative technology. Experience the vibrant city life, redefined.`,
        th:`ค้นพบวิถีคนเมือง ในคอนโดมิเนียมหรู บนทำเลศักยภาพใจกลางเมือง ไม่พลาดกับไลฟ์สไตล์ และความเพลิดเพลิน บริหารเวลาได้ดีกับการเดินทางด้วยรถไฟฟ้า หรืออิสระกับการเดินทางด้วยรถยนต์ส่วนตัว เชื่อมต่อคุณกับจุดหมายปลายทางได้อย่างราบรื่นและรวดเร็ว รองรับการชีวิตเมืองด้วยเทคโนโลยีเพื่อการอยู่อาศัย เพื่อมอบประสบการณ์อยู่อาศัยที่สมบูรณ์`
      },
      images: {
        s: "/assets/image/page-condo/project/234-Edit-Edit-Edit.png",
        l: "/assets/image/page-condo/project/2.png"
      }
    });
    
    // Function to extract language from the URL
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th'; // Default to 'th' if not found
    };

    const init = () => {
      AOS.init();
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();
      // You can update dynamic content based on language here:
      // if (language.value === 'en') { ... }

      nextTick(() => {
        init();  // Initialize scroll-triggered animations after DOM update
      });
    });
    const fontCss=()=>{
      return getLanguageFromPath()=="en"?"":""
    }
    return { template, language, data,fontCss };
  }
});

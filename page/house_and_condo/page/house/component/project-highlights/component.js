const ProjectsHighlightComponent = defineComponent({
    name: 'ProjectsHighlightComponent',
    template: `
      <section class="onview -mt-1" id="ProjectsHighlightComponent" data-section="project_signature">
        <div class="bg-[url('/assets/image/page-house/house-project-bg.png')] bg-cover bg-bottom">
          <div class="container lg:px-5 px-0">
            <div class="grid md:grid-cols-3 grid-cols-1 md:grid-rows-3 grid-rows-5 md:gap-8 gap-6 lg:px-4 px-0 md:py-20 py-10 md:max-h-[930px] max-h-[2000px]">
              <!-- Dynamic Heading -->
              <div class="md:p-4 p-10 text-left z-10">
                <h2 class="font-['Cinzel'] md:text-[60px] text-[40px] text-nowrap leading-none text-white">
                    <span class="text-[100px] md:text-[160px]">H</span>ouse <br/>projects from<br/> Singha Estate
                </h2>
              </div>
  
            
              <!-- Dynamic Image (Small) -->
              <div class="md:col-start-2 col-start-1 md:col-span-2 md:row-start-1 row-start-2 row-span-2 bg-center bg-cover md:mt-0 -mt-36 drop-shadow-xl md:ml-0 ml-10" 
                   :style="{ backgroundImage: 'url(' + data.images.s + ')' }"></div>
  
              <!-- Dynamic Image (Large) -->
              <div class="col-start-1 md:row-start-2 row-start-4 md:row-span-2 row-span-1 flex md:col-span-1 md:pl-0 pl-5">
                <div class="bg-cover bg-center lg:w-[350px] md:h-[380px] w-[270px] h-full mt-auto md:ml-auto drop-shadow-xl" 
                     :style="{ backgroundImage: 'url(' + data.images.l + ')' }"></div>
              </div>
  
              <!-- Dynamic Paragraph -->
              <div class="md:col-start-2 md:col-span-2 md:row-start-3 row-start-5 px-5">
                <p class="text-white lg:w-3/5" v-html="data.description"></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    setup() {
        const template = ref('');
        const language = ref('th'); // Default language
        const data = ref({
            description: "Residential business, both high rise and low rise projects, is diverse in forms,namely single detached houses, townhomes, home offices,and condominium Residential business, both high rise and low rise projects, is diverse in forms,namely single detached houses, townhomes, home offices, and condominium",
            images: {
                s: "/assets/image/page-house/house-project/2.png",
                l: "/assets/image/page-house/house-project/1.png"
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

        return { template, language, data };
    }
});

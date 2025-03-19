const ProjectsHighlightComponent = defineComponent({
    name: 'ProjectsHighlightComponent',
    template: `
      <section class="onview -mt-1" id="ProjectsHighlightComponent" data-section="project_signature">
        <div class="bg-[url('/assets/image/page-condo/project/bg.png')] bg-cover bg-top">
          <div class="container lg:px-5 px-0">
            <div class="grid md:grid-cols-3 grid-cols-1 md:grid-rows-3 grid-rows-5 md:gap-8 gap-6 lg:px-4 px-0 md:py-20 py-5 md:max-h-[1024px] max-h-[2000px] lg:w-[90%] lg:ml-auto">
              <!-- Dynamic Heading -->
              <div class="p-4 text-left z-10 md:mb-0 mb-2">
                <h2 class="font-['Cinzel'] md:text-[60px] text-[36px] text-nowrap leading-none text-white md:px-0 px-5">
                    <span class="text-[80px] md:text-[160px]">C</span>ondominum <br/>projects from<br/> Singha Estate
                </h2>
              </div>
  
              <!-- Dynamic Image (Small) -->
              <div class="md:col-start-2 md:col-span-2 md:row-start-1 row-start-2 row-span-2 bg-center bg-cover md:mt-0 -mt-24 drop-shadow-xl max-w-[500px] lg:ml-20 md:mx-0 mx-5 " 
                   :style="{ backgroundImage: 'url(' + data.images.s + ')' }"></div>
  
              <!-- Dynamic Image (Large) -->
              <div class="md:ml-0 ml-auto md:row-start-2 row-start-4 md:row-span-2 row-span-1 flex md:col-span-1">
                <div class="bg-center lg:w-[350px] md:h-[380px] w-[270px] h-full mt-auto md:ml-auto drop-shadow-xl lg:translate-x-40" 
                     :style="{ backgroundImage: 'url(' + data.images.l + ')' }"></div>
              </div>
  
              <!-- Dynamic Paragraph -->
              <div class="md:col-start-2 md:col-span-2 md:row-start-3 row-start-5 lg:ml-40 md:px-0 px-5">
                <p class="lg:w-3/5" v-html="data.description"></p>
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

        return { template, language, data };
    }
});

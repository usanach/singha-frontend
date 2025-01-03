// Define the Header component
const CraftYourTaleComponent = defineComponent({
    name: 'CraftYourTaleComponent',
    template: `
    <section class="craft-your-tale-component onview relative overflow-hidden lg:max-h-[1020px] max-h-[750px]" data-section="property_introduction">
        <div class="w-full overflow-hidden cyt-desktop-pin">
            <div id="layout-2" class="layout-2 absolute inset-0 flex items-center justify-center w-full h-screen cty-pallax -top-[10rem]"  data-cty-pallax-speed="-3">
                <div class="w-full h-full">
                    <img src="/assets/image/page-srin-prannok/infinity-living/img.png" alt="" class="w-full lg:block hidden">
                    <img src="/assets/image/page-srin-prannok/infinity-living/img-m.png" alt="" class="w-full lg:hidden block h-full">
                    <div class="absolute top-0 left-0 h-full w-full flex">
                        <div class="flex flex-col m-auto">
                            <div class="mt-3">  
                                <p class="font-['The_Seasons'] text-white text-[40px] text-center cyt-desc" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="500">
                                    INFINITE LIVING
                                </p>
                                <p  class="font-['DB_OnUma'] text-white text-[30px] text-center cyt-desc" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="500">
                                    บ้านเพื่อทุกการเติบโตไม่มีที่สิ้นสุด
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Layout 1 (Foreground Layer) -->
            <div id="layout-1" class="layout-1 relative inset-0 flex items-center justify-center w-full transition-all duration-1000 h-screen">
                <img src="/assets/image/page-srin-prannok/infinity-living/sm.png" alt="" class="w-full lg:block hidden h-full">
                <img src="/assets/image/page-srin-prannok/infinity-living/sm-m.png" alt="" class="w-full lg:hidden block h-full">
            </div>
        </div>
    </section>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };
        onMounted(async () => {
            language.value = getLanguageFromPath();
            gsap.registerPlugin(ScrollTrigger);

            const init = () => {
                AOS.init();
            };

            const ctyPallax = new Rellax('.cty-pallax');
            nextTick(() => {
                init();

                // ScrollTrigger.create({
                //     trigger: "#layout-1",
                //     start: "top top",
                //     end: "+=2000px",
                //     pin: true,
                //     scrub: true,
                //     pinSpacing:true
                // });

                ScrollTrigger.create({
                    trigger: "#layout-1",
                    start: "top center",
                    onEnter: (e) => {
                        const layout1 = document.querySelector("#layout-1");
                        layout1.classList.add("opacity-0");
                        layout1.classList.add("scale-110");
                    },
                    onLeaveBack: (e) => {
                        const layout1 = document.querySelector("#layout-1");
                        layout1.classList.remove("opacity-0");
                        layout1.classList.remove("scale-110");
                    }
                });

                // gsap.to("#layout-2", {
                //     scrollTrigger: {
                //         trigger: "#layout-2",
                //         start: "top cemter",
                //         end: "+=2000px",
                //         pin: true,
                //         scrub: true,
                //         pinSpacing:true
                //     }
                // });
            });
        });

        return { template, language };
    }
});

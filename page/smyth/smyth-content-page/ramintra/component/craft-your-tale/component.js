// Define the Header component
const CraftYourTaleComponent = defineComponent({
    name: 'CraftYourTaleComponent',
    template: `
    <section class="craft-your-tale-component relative overflow-hidden h-[900px] onview" data-section="property_introduction">
        <div class="w-full overflow-hidden cyt-desktop-pin">
            <div id="layout-2" class="layout-2 lg:bg-[url('/assets/image/page-smyth-ramintra/craft-yours-tale/smyth_KV_3_dt.jpg')] bg-[url('/assets/image/page-smyth-ramintra/craft-yours-tale/smyth_KV_1_mb.jpg')] bg-cover bg-center bg-norepeat  absolute inset-0 flex items-center justify-center w-full cty-pallax -top-[10rem]">
                <div class="w-full h-full">
                    <div class="absolute top-0 left-0 h-full w-full flex">
                        <div class="flex flex-col m-auto">
                            <div>
                                <img src="/assets/image/page-smyth-ramintra/craft-yours-tale/smyth_logo.png" alt="" class="max-w-[300px]" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
                            </div>
                            <div class="mt-3">  
                                <p class="font-['Tenor_Sans'] text-white text-[30px] text-center cyt-desc" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="500">
                                    Craft your tale
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Layout 1 (Foreground Layer) -->
            <div id="layout-1" class="layout-1 relative inset-0 flex items-center justify-center w-full transition-all duration-1000 h-[900px] lg:bg-[url('/assets/image/page-smyth-ramintra/craft-yours-tale/sm.png')] bg-[url('/assets/image/page-smyth-ramintra/craft-yours-tale/sm-m.png')] bg-cover bg-center"></div>
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
                if (window.innerWidth > 768) {
                    ScrollTrigger.create({
                        trigger: ".craft-your-tale-component",
                        start: "top top",
                        pin: true,
                        scrub: true,
                        pinSpacing:false
                    });
                }

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
            });
        });

        return { template, language };
    }
});

// Define the Header component
const CraftYourTaleComponent = defineComponent({
    name: 'CraftYourTaleComponent',
    template: `
    <section class="craft-your-tale-component relative overflow-hidden h-[900px] onview" data-section="craft_your_tales">
        <div class="w-full overflow-hidden cyt-desktop-pin">
            <div id="layout-2" class="layout-2  lg:bg-[url('/assets/image/page-shawn-panya/craft-your-tale/live-bg.png')] bg-[url('/assets/image/page-shawn-panya/craft-your-tale/live-bg-m.jpg')] bg-cover bg-center bg-norepeat  absolute inset-0 flex items-center justify-center w-full cty-pallax -top-[10rem]">
                <div class="w-full h-full bg-[#00000030]">
                    <div class="absolute top-0 left-0 h-full w-full flex">
                        <div class="flex flex-col m-auto mb-[10%]">
                            <div class="w-4/5 h-[600px] mx-auto bg-white" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="500" >
                                <iframe class="w-full h-full" width="1903" height="742" src="https://www.youtube.com/embed/3w1UbJe1wXc" title="SHAWN – Live SHAWN Way, Like no one else" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>
                            <div class="-mt-16">  
                                <img class="w-4/5 mx-auto" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="500" src="/assets/image/page-shawn-panya/infinity-living/live-shawn.svg" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
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
                if (window.innerWidth > 768) {
                    ScrollTrigger.create({
                        trigger: "",
                        start: "top top",
                        pin: true,
                        scrub: true,
                        pinSpacing: false
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

// Define the Header component
const CraftYourTaleComponent = defineComponent({
    name: 'CraftYourTaleComponent',
    template: `
    <section class="craft-your-tale-component relative overflow-hidden min-h-screen">
        <div class="w-full h-[200vh] cyt-desktop-pin">
            <div id="layout-2" class="layout-2 absolute inset-0 flex items-center justify-center w-full h-screen">
                <div class="w-full h-full">
                    <img src="/assets/image/page-smyth-kaset/craft-yours-tale/img.png" alt="" class="w-full lg:block hidden">
                    <img src="/assets/image/page-smyth-kaset/craft-yours-tale/img-m.png" alt="" class="w-full lg:hidden block h-full">
                    <div class="absolute top-0 left-0 h-screen w-full flex">
                        <div class="flex flex-col m-auto">
                            <div>
                                <img src="/assets/image/page-smyth-kaset/craft-yours-tale/smyth_logo.png" alt="" class="max-w-[300px]">
                            </div>
                            <div class="mt-3">
                                <p class="font-['Tenor_Sans'] text-white text-[30px] text-center">
                                    Craft your tale
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Layout 1 (Foreground Layer) -->
            <div id="layout-1" class="layout-1 relative inset-0 flex items-center justify-center w-full transition-all duration-1000 h-screen">
                <img src="/assets/image/page-smyth-kaset/craft-yours-tale/sm.png" alt="" class="w-full lg:block hidden">
                <img src="/assets/image/page-smyth-kaset/craft-yours-tale/sm-m.png" alt="" class="w-full lg:hidden block h-full">
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

            nextTick(() => {
                init();

                ScrollTrigger.create({
                    trigger: "#layout-1",
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    scrub: true,
                });

                ScrollTrigger.create({
                    trigger: "#layout-1",
                    start: "top center",
                    onEnter: (e) => {
                        const layout1 = document.querySelector("#layout-1");
                        layout1.classList.add("opacity-0", "scale-110");
                    },
                    onLeaveBack: (e) => {
                        const layout1 = document.querySelector("#layout-1");
                        layout1.classList.remove("opacity-0", "scale-110");
                    }
                });
                gsap.to("#layout-2", {
                    scrollTrigger: {
                        trigger: "#layout-2",
                        start: "top cemter",
                        end: "+=200%",
                        pin: true,
                        scrub: true,
                    }
                });
            });
        });

        return { template, language };
    }
});

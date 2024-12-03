// Define the Header component
const CraftYourTaleComponent = defineComponent({
    name: 'CraftYourTaleComponent',
    template: `
    <section class="craft-your-tale-component relative overflow-hidden">
        <div id="layout-2" class="layout-2 absolute inset-0 flex items-center justify-center z-10">
            <div>
                <img src="/assets/image/page-smyth-kaset/craft-yours-tale/img.png" alt="">
                <div class="absolute top-0 left-0 h-full w-full flex">
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
        <div id="layout-1" class="layout-1 relative inset-0 flex items-center justify-center z-20">
            <img src="/assets/image/page-smyth-kaset/craft-yours-tale/sm.png" alt="">
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
        const init = () => {
            AOS.init();
        }
        onMounted(async () => {
            language.value = getLanguageFromPath();
            gsap.registerPlugin(ScrollTrigger);


            nextTick(() => {
                init();

                // Pin and animate layout-1
                gsap.to("#layout-1", {
                    opacity: 0,
                    scale: 1.2, // Zoom out to 80% of its size
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: "#layout-1",
                        start: "center center", // Starts when the top of layout 1 reaches the center of the viewport
                        end: "+=500",           // Animation duration in scroll distance
                        scrub: 2,              // Smooth scrubbing
                        pin: true,             // Pin the element during the animation
                        pinSpacing: true       // Add spacing for pinning
                    },
                });
                gsap.fromTo("#layout-2",
                    { opacity: 1 },
                    {
                        opacity: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: "#layout-2",
                            start: "center center",  // Starts when the top of layout 2 reaches the center of the viewport
                            end: "+=500",            // Animation duration in scroll distance
                            scrub: 2,                // Smooth scrubbing
                            pin: true,               // Pin the element during the animation
                            pinSpacing: true         // Add spacing for pinning
                        },
                    }
                );

            });
        });

        return { template, language };
    }
});

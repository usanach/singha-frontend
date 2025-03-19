// Define the Header component
const CraftYourTaleComponent = defineComponent({
    name: 'CraftYourTaleComponent',
    template: `
    <section class="craft-your-tale-component relative overflow-hidden h-[900px] onview" data-section="craft_your_tales">
        <div class="w-full overflow-hidden cyt-desktop-pin">
            <div id="layout-2" class="layout-2  lg:bg-[url('/assets/image/page-shawn-wongwaen/craft-your-tale/live-bg.png')] bg-[url('/assets/image/page-shawn-wongwaen/craft-your-tale/live-bg-m.png')] bg-cover bg-center bg-norepeat  absolute inset-0 flex items-center justify-center w-full cty-pallax -top-[10rem]">
                <div class="w-full h-full bg-[#00000030]">
                    <div class="absolute top-0 left-0 h-full w-full flex">
                        <div class="flex flex-col w-4/5 m-auto mb-[10%] mt-[11rem] md:mt-[12rem]  relative">
                            <div v-if="!isVideoVisible" class="relative w-full h-[670px] lg:h-[600px] mx-auto z-10 bg-cover bg-[url('/assets/image/page-shawn-wongwaen/craft-your-tale/craft-image-m.png')] lg:bg-[url('/assets/image/page-shawn-wongwaen/craft-your-tale/craft-image.png')]" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="500">
                                <button type="button" @click="showVideo" class="none md:block hover:scale-125  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                                    <svg class="w-0 h-0 block md:w-auto md:h-auto  z-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="197" height="209" viewBox="0 0 197 209">
                                        <defs>
                                            <filter id="Polygon_3" x="0" y="0" width="197" height="209" filterUnits="userSpaceOnUse">
                                            <feOffset dy="3" input="SourceAlpha"/>
                                            <feGaussianBlur stdDeviation="20" result="blur"/>
                                            <feFlood flood-opacity="0.494"/>
                                            <feComposite operator="in" in2="blur"/>
                                            <feComposite in="SourceGraphic"/>
                                            </filter>
                                        </defs>
                                        <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Polygon_3)">
                                            <path id="Polygon_3-2" data-name="Polygon 3" d="M44.5,0,89,77H0Z" transform="translate(137 57) rotate(90)" fill="#fff" opacity="0.588"/>
                                        </g>
                                    </svg>
                                </button>
                                <a href="https://www.youtube.com/watch?v=3w1UbJe1wXc" data-lity
                                    class="mobileplay w-1/5 md:w-0 h-1/5 md:h-0 block lg:none hover:scale-125 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                                    <svg class="w-auto md:w-0 h-auto md:h-0 block z-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="197" height="209" viewBox="0 0 197 209">
                                        <defs>
                                            <filter id="Polygon_3" x="0" y="0" width="197" height="209" filterUnits="userSpaceOnUse">
                                            <feOffset dy="3" input="SourceAlpha"/>
                                            <feGaussianBlur stdDeviation="20" result="blur"/>
                                            <feFlood flood-opacity="0.494"/>
                                            <feComposite operator="in" in2="blur"/>
                                            <feComposite in="SourceGraphic"/>
                                            </filter>
                                        </defs>
                                        <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Polygon_3)">
                                            <path id="Polygon_3-2" data-name="Polygon 3" d="M44.5,0,89,77H0Z" transform="translate(137 57) rotate(90)" fill="#fff" opacity="0.588"/>
                                        </g>
                                    </svg>
                                </a>
                            </div>
                            <div v-if="isVideoVisible" ref="videoContainer" class="relative  w-full h-[690px] lg:h-[600px] mx-auto bg-black z-10">
                                <iframe 
                                    class="w-full h-full" 
                                    width="1903" height="742" 
                                    :src="iframeSrc"
                                    title="SHAWN – Live SHAWN Way, Like no one else" 
                                    frameborder="0" 
                                    allow="accelerometer; 
                                    autoplay; 
                                    clipboard-write; 
                                    encrypted-media; 
                                    gyroscope; 
                                    picture-in-picture; 
                                    web-share" 
                                    referrerpolicy="strict-origin-when-cross-origin" 
                                    allowfullscreen>
                                    </iframe>
                            </div>
                            <div ref="liveShawnImage"  class="z-20 opacity-1 transition-all duration-500 ease-linear absolute bottom-[9.15rem] md:bottom-16 lg:bottom-24 xl:-bottom-4">  
                                <img class="w-full mx-auto " data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="500" src="/assets/image/page-shawn-panya/infinity-living/live-shawn.svg" alt=""/>
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
        const isVideoVisible = ref(false);
        const videoContainer = ref(null);
        const liveShawnImage = ref(null);
        const iframeSrc = ref("");

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const showVideo = () => {
            isVideoVisible.value = true;
            iframeSrc.value = "https://www.youtube.com/embed/3w1UbJe1wXc?autoplay=1";

            nextTick(() => {
                setTimeout(() => {
                    if (videoContainer.value) {
                        videoContainer.value.style.opacity = "1";
                    }
                }, 50);
    
                setTimeout(() => {
                    if (liveShawnImage.value) {
                        liveShawnImage.value.style.opacity = "0";
                        liveShawnImage.value.style.zIndex = "0";
                    }
                }, 300); // Delay the image fade-out for smooth transition
            });
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

        return { template, language, isVideoVisible, showVideo, iframeSrc, liveShawnImage };
    }
});

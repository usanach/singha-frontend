
// Define the Header component
const SubHeaderComponent = defineComponent({
    name: 'SubHeaderComponent',
    template: `
    <nav class="sub-header top-[63px] w-full absolute left-0 z-10 border border-b-1 border-l-0 border-r-0 border-t-0 border-white/50 lg:block hidden">
        <div class="container mx-auto py-3 relative">
            <div class="flex">
                <div class="my-auto">
                    <img src="/assets/image/page-shawn-panya/banner/shawn-logo.png" alt="" class="w-[100px] logo">
                </div>
                <div class="w-full flex justify-center my-auto gap-5">
                    <div>
                        <a href="#design-concept" data-header-click="design_concept">
                            <p class="text-white font-normal">คอนเซ็ปต์</p>
                        </a>
                    </div>
                    <div>
                        <a href="#ProjectsHighlightComponent" data-header-click="project_signature">
                            <p class="text-white font-normal">จุดเด่นโครงการ</p>
                        </a>
                    </div>
                    <div>
                        <a href="#info" data-header-click="project_detail">
                            <p class="text-white font-normal">ข้อมูลโครงการ</p>
                        </a>
                    </div>
                    <div>
                        <a href="#gallery" data-header-click="gallery">
                            <p class="text-white font-normal">แกลอรี่</p>
                        </a>
                    </div>
                    <div>
                        <a href="#location" data-header-click="location">
                            <p class="text-white font-normal">ที่ตั้งโครงการ</p>
                        </a>
                    </div>
                    <div>
                        <a href="#lifestyle" data-header-click="s_lifestyle">
                            <p class="text-white font-normal">S LIFESTYLE</p>
                        </a>
                    </div>
                </div>
                <div class="my-auto">
                    <a href="#register" data-header-click="register">
                        <button type="button"  class="border border-1 border-white px-5 py-1">
                            <p class="text-nowrap font-normal text-white">
                                ลงทะเบียน
                            </p>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </nav>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };
        // Smooth scroll with offset
        const smoothScrollWithOffset = (target) => {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - 50; // Adjust by 50px
                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth',
                });
            }
        };
        onMounted(async () => {
            language.value = getLanguageFromPath();
            gsap.registerPlugin(ScrollTrigger);

            const init = () => {
                AOS.init();
            };

            nextTick(() => {
                init();
                const anchorLinks = document.querySelectorAll('a[href^="#"]');
                anchorLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        const href = link.getAttribute('href');
                        if (href && href.startsWith('#') && href.length > 1) {
                            e.preventDefault(); // Prevent default anchor behavior
                            smoothScrollWithOffset(href);
                        }
                    });
                });
                gsap.registerPlugin(ScrollTrigger);
                ScrollTrigger.create({
                    trigger: "body",
                    start: "+=70 top",
                    scrub: 1,
                    onUpdate: (self) => {
                        if (self.progress > 0) {
                            document.querySelector('.sub-header').classList.add('!backdrop-blur-xl');
                            document.querySelector('.sub-header').classList.add('!bg-white/50');
                            document.querySelector('.sub-header').classList.add('!fixed');
                            document.querySelector('.sub-header button').classList.add('!border-black');
                            document.querySelector('.sub-header button p').classList.add('!text-black');
                            document.querySelector('.sub-header .logo').src = '/assets/image/page-shawn-panya/banner/shawn-logo-color.png';
                            document.querySelector('.sub-header').classList.add('!top-0');
                            if (window.innerWidth > 768) {
                                document.querySelector('#header').classList.add('!opacity-0');
                                document.querySelector('#header').classList.add('!-z-50');
                            }

                            var item = document.querySelectorAll('.sub-header a p');
                            item.forEach(e => {
                                e.classList.add('!text-black');
                            })
                        } else {
                            document.querySelector('.sub-header').classList.remove('!backdrop-blur-xl');
                            document.querySelector('.sub-header').classList.remove('!bg-white/50');
                            document.querySelector('.sub-header').classList.remove('!fixed');
                            document.querySelector('.sub-header button').classList.remove('!border-black');
                            document.querySelector('.sub-header button p').classList.remove('!text-black');
                            document.querySelector('.sub-header .logo').src = '/assets/image/page-shawn-panya/banner/shawn-logo.png';
                            document.querySelector('.sub-header').classList.remove('!top-0');
                            if (window.innerWidth > 768) {
                                document.querySelector('#header').classList.remove('!opacity-0');
                                document.querySelector('#header').classList.remove('!-z-50');
                            }
                            var item = document.querySelectorAll('.sub-header a p');
                            item.forEach(e => {
                                e.classList.remove('!text-black');
                            })
                        }
                    }
                });
            });
        });

        return { template, language };
    }
});

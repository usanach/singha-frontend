
// Define the Header component
const SubHeaderComponent = defineComponent({
    name: 'SubHeaderComponent',
    template: `
    <nav class="sub-header top-[63px] w-full absolute left-0 z-10 border border-b-1 border-l-0 border-r-0 border-t-0 border-white/50 lg:block hidden">
        <div class="container mx-auto py-3 relative">
            <div class="flex">
                <div class="my-auto">
                    <img src="/assets/image/page-smyth-ramintra/banner/ramintra-logo.png" alt="" class="w-[100px] logo">
                </div>
                <div class="w-full flex justify-center my-auto gap-5">
                    <div>
                        <a href="#design-concept">
                            <p class="text-white font-normal">คอนเซ็ปต์</p>
                        </a>
                    </div>
                    <div>
                        <a href="#ProjectsHighlightComponent">
                            <p class="text-white font-normal">จุดเด่นโครงการ</p>
                        </a>
                    </div>
                    <div>
                        <a href="#info">
                            <p class="text-white font-normal">ข้อมูลโครงการ</p>
                        </a>
                    </div>
                    <div>
                        <a href="#gallery">
                            <p class="text-white font-normal">แกลอรี่</p>
                        </a>
                    </div>
                    <div>
                        <a href="#location">
                            <p class="text-white font-normal">ที่ตั้งโครงการ</p>
                        </a>
                    </div>
                    <div>
                        <a href="#lifestyle">
                            <p class="text-white font-normal">ติดตาม</p>
                        </a>
                    </div>
                    <div>
                        <a href="#">
                            <p class="text-white font-normal">ข่าวและกิจกรรม</p>
                        </a>
                    </div>
                </div>
                <div class="my-auto">
                    <button type="button" class="border border-1 border-white px-5 py-1">
                        <p class="text-nowrap font-normal text-white">
                            ลงทะเบียน
                        </p>
                    </button>
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
        onMounted(async () => {
            language.value = getLanguageFromPath();
            gsap.registerPlugin(ScrollTrigger);

            const init = () => {
                AOS.init();
            };

            nextTick(() => {
                init();

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
                            document.querySelector('.sub-header .logo').src = '/assets/image/page-smyth-ramintra/banner/ramintra-logo-color.png';
                            // document.querySelector('#header').classList.add('hidden');
                            document.querySelector('.sub-header').classList.add('!top-[65px]');

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
                            document.querySelector('.sub-header .logo').src = '/assets/image/page-smyth-ramintra/banner/ramintra-logo.png';
                            document.querySelector('.sub-header').classList.remove('!top-[65px]');
                            // document.querySelector('#header').classList.remove('hidden');

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

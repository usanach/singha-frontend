const GalleryComponent = defineComponent({
    name: 'GalleryComponent',
    template: `
        <section id="gallery" data-section="gallery" class="gallery-component onview font-['IBM_Plex_Sans_Thai'] bg-[url('/assets/image/page-smyth-kaset/gallery/bg.webp')] bg-cover bg-center relative font-['Gotham']">
            <div class="pt-10 px-0">
                <h2 class=" font-bold text-[35px] text-center text-white uppercase" :class="[ language === 'th' ? '' : 'font-[\\'Gotham\\']' ]" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                    {{title[language]}}
                </h2>
           
                <!-- Category Buttons -->
                <div class="gallery-controls flex gap-4 mb-6 lg:justify-center justify-evenly lg:px-0 px-5 lg:overflow-x-auto overflow-x-scroll" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                    <button
                        v-for="cat in categories"
                        :key="cat.cate"
                        :data-gallery="cat.cate"
                        class="py-2 text-white text-[20px] min-w-fit uppercase"
                        :class="{ 'font-bold': activeGallery === cat.cate }"
                        @click="handleButtonClick(cat.cate)"
                    >
                        {{ cat.title[language] }}
                    </button>
                </div>


                <!-- Desktop Carousel -->
                <div v-if="desktopSlides.length" class="gallery-content lg:block hidden" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                    <div class="mx-auto">
                        <div class="swiper desktop h-full">
                            <div class="swiper-wrapper">
                                <div v-for="(slide, n) in desktopSlides" :key="n" class="swiper-slide">
                                    <div class="grid grid-cols-4 gap-2 grid-rows-6 h-[600px]">
                                        <div
                                            v-for="(item,i) in slide"
                                            :key="i"
                                            class="relative bg-center bg-cover cursor-pointer brightness-50 hover:brightness-100"
                                            :class="[item.type === 'image' ? 'p-4' : 'overflow-hidden',i==0?'row-span-6':i==1?'row-span-3':i==2?'row-span-4':i==3?'row-span-6':i==4?'row-span-3 col-start-2':'row-span-2 col-start-3']"
                                            :style="item.type === 'image' ? { backgroundImage: 'url(' + item.url + ')' } : {}"
                                            @click="openModal((n*6)+i)"
                                        >  
                                            <div class="absolute w-full h-full" @click="openModal((n*6)+i)"></div>
                                            <iframe
                                                v-if="item.type === 'video'"
                                                class="w-full h-full"
                                                :src="item.url"
                                                frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Slide Navigation Buttons -->
                            <div class="py-5 flex justify-end gap-5 container mx-auto my-5">
                                <button class="desktop prev rotate-180 transition border">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <rect width="48" height="48" rx="2" fill="none" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M29.7237 17.7245C30.2444 17.2038 31.0886 17.2038 31.6093 17.7245L36.9426 23.0578C37.4633 23.5785 37.4633 24.4228 36.9426 24.9435L31.6093 30.2768C31.0886 30.7975 30.2444 30.7975 29.7237 30.2768C29.203 29.7561 29.203 28.9119 29.7237 28.3912L32.7809 25.334H11.9998C11.2635 25.334 10.6665 24.737 10.6665 24.0007C10.6665 23.2643 11.2635 22.6673 11.9998 22.6673H32.7809L29.7237 19.6101C29.203 19.0894 29.203 18.2452 29.7237 17.7245Z"
                                            fill="white" />
                                    </svg>
                                </button>
                                <button class="desktop next transition border">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" class="rotate-icon">
                                        <rect width="48" height="48" rx="2" fill="none" />
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M29.7237 17.7245C30.2444 17.2038 31.0886 17.2038 31.6093 17.7245L36.9426 23.0578C37.4633 23.5785 37.4633 24.4228 36.9426 24.9435L31.6093 30.2768C31.0886 30.7975 30.2444 30.7975 29.7237 30.2768C29.203 29.7561 29.203 28.9119 29.7237 28.3912L32.7809 25.334H11.9998C11.2635 25.334 10.6665 24.737 10.6665 24.0007C10.6665 23.2643 11.2635 22.6673 11.9998 22.6673H32.7809L29.7237 19.6101C29.203 19.0894 29.203 18.2452 29.7237 17.7245Z"
                                            fill="white" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <!-- Mobile Carousel -->
                <div v-if="mobileSlides.length" class="gallery-content lg:hidden block" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                    <div class="mx-auto">
                        <div class="swiper mobile h-full">
                            <div class="swiper-wrapper">
                                <div v-for="(slide, n) in mobileSlides" :key="i" class="swiper-slide">
                                    <div class="grid grid-cols-2 gap-2 grid-rows-6 h-[300px]">
                                        <div
                                            v-for="(item,i) in slide"
                                            :key="i"
                                            class="relative bg-center bg-cover cursor-pointer"
                                            :class="[item.type === 'image' ? 'p-4' : 'overflow-hidden',i==0?'row-span-6':'row-span-3']"
                                            :style="item.type === 'image' ? { backgroundImage: 'url(' + item.url + ')' } : {}"
                                            @click="openModal((n*3)+i)"
                                        >
                                            <div class="absolute w-full h-full" @click="openModal((n*3)+i)"></div>
                                            <iframe
                                                v-if="item.type === 'video'"
                                                class="w-full h-full"
                                                :src="item.url"
                                                frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Slide Navigation Buttons -->
                        <div class="py-5 flex justify-end gap-5 container mx-auto">
                            <button class="mobile prev rotate-180 transition border">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="2" fill="none" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M29.7237 17.7245C30.2444 17.2038 31.0886 17.2038 31.6093 17.7245L36.9426 23.0578C37.4633 23.5785 37.4633 24.4228 36.9426 24.9435L31.6093 30.2768C31.0886 30.7975 30.2444 30.7975 29.7237 30.2768C29.203 29.7561 29.203 28.9119 29.7237 28.3912L32.7809 25.334H11.9998C11.2635 25.334 10.6665 24.737 10.6665 24.0007C10.6665 23.2643 11.2635 22.6673 11.9998 22.6673H32.7809L29.7237 19.6101C29.203 19.0894 29.203 18.2452 29.7237 17.7245Z"
                                        fill="white" />
                                </svg>
                            </button>
                            <button class="mobile next transition border">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" class="rotate-icon">
                                    <rect width="48" height="48" rx="2" fill="none" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M29.7237 17.7245C30.2444 17.2038 31.0886 17.2038 31.6093 17.7245L36.9426 23.0578C37.4633 23.5785 37.4633 24.4228 36.9426 24.9435L31.6093 30.2768C31.0886 30.7975 30.2444 30.7975 29.7237 30.2768C29.203 29.7561 29.203 28.9119 29.7237 28.3912L32.7809 25.334H11.9998C11.2635 25.334 10.6665 24.737 10.6665 24.0007C10.6665 23.2643 11.2635 22.6673 11.9998 22.6673H32.7809L29.7237 19.6101C29.203 19.0894 29.203 18.2452 29.7237 17.7245Z"
                                        fill="white" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="fixed inset-0 bg-black bg-opacity-75 z-[9999]" :class="isModalOpen ? 'block' : 'hidden'">
                <div class="relative p-5 rounded-lg h-full">
                    <div class="swiper galleries-detail h-full">
                        <div class="swiper-wrapper">
                            <div v-for="(item,i) in modalItems" :key="i" class="swiper-slide flex justify-center items-center">
                                <img v-if="item.type === 'image'" :src="item.url" class="max-h-full m-auto" />
                                <div v-else class="md:w-3/4 w-[320px] md:h-4/5 h-[440px]">
                                    <iframe
                                        v-if="isModalOpen"
                                        :src="item.url"
                                        frameborder="0"
                                        class="w-full h-full" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="absolute left-0 top-1/2 w-full -translate-y-1/2 z-50">
                        <div class="absolute left-0 mx-5 top-1/2 -translate-y-1/2">
                            <button class="galleries-detail-prev prev rotate-180 transition border my-auto">
                                <svg  viewBox="0 0 48 48" fill="none" class="md:w-[45px] md:h-[45px] w-[25px] h-[25px]"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="2" fill="none" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M29.7237 17.7245C30.2444 17.2038 31.0886 17.2038 31.6093 17.7245L36.9426 23.0578C37.4633 23.5785 37.4633 24.4228 36.9426 24.9435L31.6093 30.2768C31.0886 30.7975 30.2444 30.7975 29.7237 30.2768C29.203 29.7561 29.203 28.9119 29.7237 28.3912L32.7809 25.334H11.9998C11.2635 25.334 10.6665 24.737 10.6665 24.0007C10.6665 23.2643 11.2635 22.6673 11.9998 22.6673H32.7809L29.7237 19.6101C29.203 19.0894 29.203 18.2452 29.7237 17.7245Z"
                                        fill="white" />
                                </svg>
                            </button>
                        </div>
                        <div class="absolute right-0 mx-5 top-1/2 -translate-y-1/2">
                            <button class="galleries-detail-next next transition border my-auto ">
                                <svg viewBox="0 0 48 48" fill="none"class="md:w-[45px] md:h-[45px] w-[25px] h-[25px]"
                                    xmlns="http://www.w3.org/2000/svg" class="rotate-icon">
                                    <rect width="48" height="48" rx="2" fill="none" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M29.7237 17.7245C30.2444 17.2038 31.0886 17.2038 31.6093 17.7245L36.9426 23.0578C37.4633 23.5785 37.4633 24.4228 36.9426 24.9435L31.6093 30.2768C31.0886 30.7975 30.2444 30.7975 29.7237 30.2768C29.203 29.7561 29.203 28.9119 29.7237 28.3912L32.7809 25.334H11.9998C11.2635 25.334 10.6665 24.737 10.6665 24.0007C10.6665 23.2643 11.2635 22.6673 11.9998 22.6673H32.7809L29.7237 19.6101C29.203 19.0894 29.203 18.2452 29.7237 17.7245Z"
                                        fill="white" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button @click="closeModal" class="absolute right-0 top-0 lg:m-10 m-5 z-50 w-[30px] overflow-hidden">
                        <img src="/assets/icon/close.svg" class="scale-110" />
                    </button>
                </div>
            </div>
        </section>
    `,
    setup() {
        const galleries = ref(
            [
                { cate: 'exterior', title: { en: "exterior", th: "ภาพตกแต่งภายนอก" }, type: 'image', url: '/assets/image/page-smyth-ramintra/gallery/2.webp' },
                { cate: 'interior', title: { en: "interior", th: "ภาพตกแต่งภายใน" }, type: 'image', url: '/assets/image/page-smyth-ramintra/gallery/4.webp' },
                { cate: 'interior', title: { en: "interior", th: "ภาพตกแต่งภายใน" }, type: 'image', url: '/assets/image/page-smyth-ramintra/gallery/5.webp' },
                { cate: 'interior', title: { en: "interior", th: "ภาพตกแต่งภายใน" }, type: 'image', url: '/assets/image/page-smyth-ramintra/gallery/6.webp' },
                { cate: 'interior', title: { en: "interior", th: "ภาพตกแต่งภายใน" }, type: 'image', url: '/assets/image/page-smyth-ramintra/gallery/3.webp' },
                { cate: 'interior', title: { en: "interior", th: "ภาพตกแต่งภายใน" }, type: 'image', url: '/assets/image/page-smyth-ramintra/gallery/1.webp' },
                // { cate: 'facilities', title: { en: "facilities", th: "สิ่งอำนวยความสะดวก" }, type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/facilities/001.webp' },
                // { cate: 'vdo', type: 'video', url: 'https://www.youtube.com/embed/YEXyZJIg8zY' }
            ]);


        // Shuffle initial galleries
        function shuffleArray(arr) {
            return arr
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
        }
        galleries.value = shuffleArray(galleries.value);

        const title = {
            en: 'Gallery',
            th: 'แกลเลอรี'
        };


        // Reactive state
        const activeGallery = ref('all');
        const desktopSlides = ref([]);
        const mobileSlides = ref([]);
        const modalItems = ref([]);
        const isModalOpen = ref(false);

        // Compute categories with title labels
        const categories = ref([
            { cate: 'all', title: { en: 'All', th: 'ทั้งหมด' } }
        ]);
        const categoryMap = new Map();
        galleries.value.forEach(item => {
            if (!categoryMap.has(item.cate)) {
                categoryMap.set(item.cate, item.title);
                categories.value.push({ cate: item.cate, title: item.title });
            }
        });
        const desiredOrder = ['all', 'exterior', 'interior', 'facilities', 'vdo'];
        categories.value.sort((a, b) => {
            return desiredOrder.indexOf(a.cate) - desiredOrder.indexOf(b.cate);
        });

        // Utility to chunk array into pages
        const chunk = (arr, size) => {
            const r = [];
            for (let i = 0; i < arr.length; i += size) r.push(arr.slice(i, i + size));
            return r;
        };

        // Update slide sets based on active category
        function updateSlides() {
            const items = activeGallery.value === 'all'
                ? galleries.value
                : galleries.value.filter(i => i.cate === activeGallery.value);

            desktopSlides.value = chunk(items, 6);
            mobileSlides.value = chunk(items, 3);
            modalItems.value = [];

            nextTick(() => {
                modalItems.value = items;
            });
        }

        // Handler for category buttons
        async function handleButtonClick(cateKey) {
            activeGallery.value = cateKey;
            updateSlides();
            await nextTick();
            swiperDesktop?.destroy(true, true);
            swiperMobile?.destroy(true, true);
            initSwipers();
        }

        // Modal open/close
        function openModal(id) {
            isModalOpen.value = true;
            nextTick(() => {
                swiperDetail?.destroy(true, true);
                swiperDetail = new Swiper('.galleries-detail', {
                    slidesPerView: 1,
                    loop: true,
                    spaceBetween: 10,
                    initialSlide: id,
                    navigation: { nextEl: '.galleries-detail-next', prevEl: '.galleries-detail-prev' }
                });
            });
        }
        function closeModal() {
            isModalOpen.value = false;
        }

        // Initialize Swipers
        let swiperDesktop, swiperMobile, swiperDetail;
        function initSwipers() {
            swiperDesktop = new Swiper('.gallery-content .swiper.desktop', {
                slidesPerView: 1,
                spaceBetween: 10,
                navigation: { nextEl: '.desktop.next', prevEl: '.desktop.prev' }
            });
            swiperMobile = new Swiper('.gallery-content .swiper.mobile', {
                slidesPerView: 1,
                spaceBetween: 10,
                navigation: { nextEl: '.mobile.next', prevEl: '.mobile.prev' }
            });
        }

        // Detect language from URL
        const language = ref('th');
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        onMounted(() => {
            language.value = getLanguageFromPath();
            updateSlides();
            nextTick(initSwipers);
        });

        return {
            title,
            categories,
            activeGallery,
            desktopSlides,
            mobileSlides,
            handleButtonClick,
            openModal,
            closeModal,
            modalItems,
            isModalOpen,
            language
        };
    }
});
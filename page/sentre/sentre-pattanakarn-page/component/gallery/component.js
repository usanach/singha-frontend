

const GalleryComponent = defineComponent({
    name: 'GalleryComponent',
    template: `
        <section id="gallery" data-section="gallery" class="gallery-component onview bg-[#B29C85] bg-cover bg-center relative font-['IBM_Plex_Sans_Thai']" :style="{ backgroundImage: 'url(/assets/image/page-sentre/gallery/bg.png)' }">
            <div class="pt-10 px-0">
                <h2 class="text-[35px] text-center text-white uppercase" :style="{fontFamily: language === 'th' ? 'DB OnUma' : 'Gotham' ,color:'#5A5B3F'}" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                   {{title[language]}}
                </h2>
                <!-- Category Buttons -->
                <div class="gallery-controls flex gap-4 mb-6 justify-center" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                    <button
                        v-for="cat in categories"
                        :key="cat.cate"
                        :data-gallery="cat.cate"
                        class="py-2 text-white text-[20px]"
                        :class="{ 'font-bold': activeGallery === cat.cate }"
                        :style="{color:'#5A5B3F'}"
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
                                <div v-for="(slide, n) in mobileSlides" :key="n" class="swiper-slide">
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
                <!-- Panorama Desktop -->
                <div v-if="activeGallery === 'panorama' && panoramaItems.length" class="gallery-content lg:block hidden" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                    <div class="mx-auto">
                        <div class="swiper panorama-desktop h-full">
                        <div class="swiper-wrapper">
                            <div v-for="(item, i) in panoramaItems" :key="i" class="swiper-slide">
                            <!-- viewport: เห็นเฉพาะในกรอบ, overflow-x-scroll + ซ่อน scrollbar -->
                            <div
                                class="pano-viewport w-full h-[600px] overflow-x-scroll overflow-y-hidden bg-black/30 cursor-grab active:cursor-grabbing swiper-no-swiping no-scrollbar"
                                v-drag-scroll
                                @click="onPanoramaClick($event, i)"
                            >
                                <!-- รูปพาโนรามา: สูงพอดีกล่อง กว้างตามสัดส่วน -->
                                <img :src="item.url" class="select-none pointer-events-none max-w-none h-full" draggable="false" />
                            </div>
                            </div>
                        </div>

                        <!-- Nav -->
                        <div class="py-5 flex justify-end gap-5 container mx-auto my-5">
                            <button class="panorama desktop prev rotate-180 transition border"> ...ไอคอน... </button>
                            <button class="panorama desktop next transition border"> ...ไอคอน... </button>
                        </div>
                        </div>
                    </div>
                </div>
                <!-- Panorama Mobile -->
                <div v-if="activeGallery === 'panorama' && panoramaItems.length" class="gallery-content lg:hidden block" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                    <div class="mx-auto">
                        <div class="swiper panorama-mobile h-full">
                        <div class="swiper-wrapper">
                            <div v-for="(item, i) in panoramaItems" :key="i" class="swiper-slide">
                            <div
                                class="pano-viewport w-full h-[300px] overflow-x-scroll overflow-y-hidden bg-black/30 cursor-grab active:cursor-grabbing swiper-no-swiping no-scrollbar"
                                v-drag-scroll
                                @click="onPanoramaClick($event, i)"
                            >
                                <img :src="item.url" class="h-[300px] w-auto inline-block select-none pointer-events-none" draggable="false" />
                            </div>
                            </div>
                        </div>
                        </div>

                        <!-- Nav -->
                        <div class="py-5 flex justify-end gap-5 container mx-auto">
                        <button class="panorama mobile prev rotate-180 transition border"> ...ไอคอน... </button>
                        <button class="panorama mobile next transition border"> ...ไอคอน... </button>
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
                              
                                <div v-else-if="item.type === 'image' && item.cate === 'panorama'"
                                    class="md:w-3/4 w-[320px] md:h-4/5 h-[440px] overflow-x-scroll overflow-y-hidden bg-black/20 no-scrollbar swiper-no-swiping cursor-grab active:cursor-grabbing"
                                    v-drag-scroll>
                                    <img :src="item.url" class="h-full w-auto inline-block select-none pointer-events-none" draggable="false" />
                                </div>


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
        const galleries = ref([
            { cate: 'exterior', title: { en: 'exterior', th: 'ภาพตกแต่งภายนอก' }, type: 'image', url: '/assets\/image\/page-sentre\/gallery\/exterior\/DS1_V1_NEW.jpg' },
            { cate: 'exterior', title: { en: 'exterior', th: 'ภาพตกแต่งภายนอก' }, type: 'image', url: '/assets\/image\/page-sentre\/gallery\/exterior\/DS1_V2_NEW.jpg' },
            { cate: 'exterior', title: { en: 'exterior', th: 'ภาพตกแต่งภายนอก' }, type: 'image', url: '/assets\/image\/page-sentre\/gallery\/exterior\/INT_SPACE_CLINIC_VIEW01_FINAL_HIRES.jpg' },

            { cate: 'interior', title: { en: 'interior', th: 'ภาพตกแต่งภายใน' }, type: 'image', url: '/assets\/image\/page-sentre\/gallery\/interior\/INT_SPACE_CLINIC_FINAL_HIRES.jpg' },
            { cate: 'interior', title: { en: 'interior', th: 'ภาพตกแต่งภายใน' }, type: 'image', url: '/assets\/image\/page-sentre\/gallery\/interior\/INT_SPACE_OFFICE_VIEW02_FINAL_HIRES.jpg' },

            // { cate: 'facilities', title: { en: 'facilities', th: 'สิ่งอำนวยความสะดวก' }, type: 'image', url: '/assets/image/page-siraninn/gallery/facilities/s_1515698.jpg' },
            // ตัวอย่างวิดีโอ/พาโนรามา (ถ้าจะใช้ค่อยปลดคอมเมนต์)
            // { cate: 'vdo',       title: { en: 'Video',     th: 'วีดีโอ' }, type: 'video', url: 'https://www.youtube.com/embed/dOFY-cUuOVg' },
            // { cate: 'panorama',  title: { en: 'panorama',  th: 'ภาพพาโนรามา' }, type: 'image', url: '/assets/image/page-the-esse-36/gallery/panorama/s_5481160.jpg' },
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
        const panoramaItems = ref([]);

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
        const desiredOrder = ['all', 'exterior', 'interior', 'facilities', 'panorama', 'vdo'];
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

            if (activeGallery.value === 'panorama') {
                desktopSlides.value = [];
                mobileSlides.value = [];
                panoramaItems.value = items; // ใช้อาร์เรย์ตรง ๆ สำหรับพาโนรามา
            } else {
                desktopSlides.value = chunk(items, 6);
                mobileSlides.value = chunk(items, 3);
                panoramaItems.value = [];
            }

            nextTick(() => {
                modalItems.value = items;
            });
        }

        // Handler for category buttons
        async function handleButtonClick(cateKey) {
            console.log(cateKey)
            activeGallery.value = cateKey;
            updateSlides();
            await nextTick();
            destroySwipers();
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

        function destroySwipers() {
            swiperDesktop?.destroy(true, true); swiperDesktop = null;
            swiperMobile?.destroy(true, true); swiperMobile = null;
            swiperPanoramaDesktop?.destroy(true, true); swiperPanoramaDesktop = null;
            swiperPanoramaMobile?.destroy(true, true); swiperPanoramaMobile = null;
        }
        // Initialize Swipers
        let swiperDesktop, swiperMobile, swiperDetail, swiperPanoramaDesktop, swiperPanoramaMobile;
        function initSwipers() {
            const desktopEl = document.querySelector('.gallery-content .swiper.desktop');
            if (desktopEl) {
                swiperDesktop = new Swiper(desktopEl, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: { nextEl: '.desktop.next', prevEl: '.desktop.prev' }
                });
            }

            const mobileEl = document.querySelector('.gallery-content .swiper.mobile');
            if (mobileEl) {
                swiperMobile = new Swiper(mobileEl, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: { nextEl: '.mobile.next', prevEl: '.mobile.prev' }
                });
            }

            // ===== Panorama =====
            const panoCount = panoramaItems.value?.length || 0;       // << นับจำนวนพาโนรามา
            const enableLoop = panoCount > 1;                         // << มีมากกว่า 1 ใบค่อย loop

            // Panorama (desktop)
            const panoDesktopEl = document.querySelector('.gallery-content .swiper.panorama-desktop');
            if (panoDesktopEl) {
                swiperPanoramaDesktop = new Swiper(panoDesktopEl, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: { nextEl: '.panorama.desktop.next', prevEl: '.panorama.desktop.prev' },
                    noSwiping: true,
                    noSwipingClass: 'swiper-no-swiping',
                    loop: enableLoop,                 // << เปิด loop
                    loopAdditionalSlides: 3,          // << กันสไลด์ว่างตอนวน
                    watchOverflow: true,              // << ถ้ามีสไลด์เดียวจะปิด nav/loop ให้อัตโนมัติ
                    observer: true,
                    observeParents: true
                });
            }

            // Panorama (mobile)
            const panoMobileEl = document.querySelector('.gallery-content .swiper.panorama-mobile');
            if (panoMobileEl) {
                swiperPanoramaMobile = new Swiper(panoMobileEl, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: { nextEl: '.panorama.mobile.next', prevEl: '.panorama.mobile.prev' },
                    noSwiping: true,
                    noSwipingClass: 'swiper-no-swiping',
                    loop: enableLoop,                 // << เปิด loop
                    loopAdditionalSlides: 3,
                    watchOverflow: true,
                    observer: true,
                    observeParents: true
                });
            }
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
        function onPanoramaClick(e, index) {
            if (e.currentTarget?.dataset?.dragging === '1') return;
            // openModal(index);
        }

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
            language,
            onPanoramaClick,
            panoramaItems
        };
    }
});
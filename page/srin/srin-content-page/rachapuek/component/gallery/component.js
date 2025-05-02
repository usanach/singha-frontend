const GalleryComponent = defineComponent({
    name: 'GalleryComponent',
    template: `
        <section id="gallery" data-section="gallery" class="gallery-component onview bg-[url('/assets/image/page-srin-rachapuek/gallery/bg.png')] bg-cover bg-center relative">
            <div class="pt-10 px-0">
                <h2 class="font-['Kaisei_Decol'] text-[40px] text-center text-white uppercase" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                    Gallery
                </h2>
                <!-- Category Buttons -->
                <div class="gallery-controls flex gap-4 mb-6 justify-center" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                    <button
                        v-for="cat in categories"
                        :key="cat"
                        :data-gallery="cat"
                        class="py-2 text-white"
                        :class="{ 'font-bold': activeGallery === cat }"
                        @click="handleButtonClick(cat)"
                    >
                        {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
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
                { cate: 'exterior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/exterior/Residence_I/001.png' },
                { cate: 'exterior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/exterior/Residence_I/002.png' },
                { cate: 'exterior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/exterior/Residence_I/003.png' },
                { cate: 'exterior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/exterior/Residence_I/004.png' },
                { cate: 'exterior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/exterior/Residence_I/005.jpg' },
                { cate: 'exterior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/exterior/Residence_I/006.jpg' },
                { cate: 'exterior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/exterior/Residence_I/007.jpg' },
                { cate: 'exterior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/exterior/Residence_I/008.jpg' },
                { cate: 'exterior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/exterior/Residence_I/009.jpg' },
                { cate: 'exterior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/exterior/Residence_II/001.jpg' },
                { cate: 'exterior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/exterior/Residence_III/001.jpg' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_I/001.jpg' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_I/002.jpg' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_I/003.jpg' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_I/004.png' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_I/005.png' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_I/006.png' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_I/007.jpg' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_I/008.jpg' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_I/009.jpg' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_I/010.jpg' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_I/011.jpg' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_I/012.jpg' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_I/013.jpg' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_II/001.jpg' },
                { cate: 'interior', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/interior/Residence_II/002.jpg' },
                { cate: 'facilities', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/facilities/001.jpg' },
                { cate: 'facilities', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/facilities/002.jpg' },
                { cate: 'facilities', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/facilities/003.jpg' },
                { cate: 'facilities', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/facilities/004.jpg' },
                { cate: 'facilities', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/facilities/005.jpg' },
                { cate: 'facilities', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/facilities/006.png' },
                { cate: 'facilities', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/facilities/007.png' },
                { cate: 'facilities', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/facilities/008.jpg' },
                { cate: 'facilities', type: 'image', url: '/assets/image/page-srin-rachapuek/gallery/facilities/009.jpg' }
                // { id: 45, cate: 'vdo', type: 'video', url: 'https://www.youtube.com/embed/YEXyZJIg8zY' }
            ]);

        const categories = ref(['all']);
        galleries.value.forEach(i => { if (!categories.value.includes(i.cate)) categories.value.push(i.cate); });

        const chunk = (arr, size) => {
            const r = [];
            for (let i = 0; i < arr.length; i += size) r.push(arr.slice(i, i + size));
            return r;
        };

        const activeGallery = ref('all');
        const desktopSlides = ref([]);
        const mobileSlides = ref([]);
        const modalItems = ref([]);
        const isModalOpen = ref(false);

        const swiperDesktop = ref(null);
        const swiperMobile = ref(null);
        const swiperDetail = ref(null);

        function shuffleArray(arr) {
            return arr
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
        }
        galleries.value = shuffleArray(galleries.value);
        
        function updateSlides() {
            const items = activeGallery.value === 'all'
                ? galleries.value
                : galleries.value.filter(i => i.cate === activeGallery.value);
            desktopSlides.value = chunk(items, 6);
            mobileSlides.value = chunk(items, 3);
            modalItems.value = items;
        }

        async function handleButtonClick(cat) {
            activeGallery.value = cat;
            updateSlides();
            await nextTick();
            swiperDesktop.value.destroy(true, true);
            swiperMobile.value.destroy(true, true);
            initSwipers();
        }

        function openModal(id) {
            isModalOpen.value = true;
            nextTick(() => {
                swiperDetail.value && swiperDetail.value.destroy(true, true);
                swiperDetail.value = new Swiper('.galleries-detail', {
                    slidesPerView: 1,
                    loop: true,
                    spaceBetween: 10,
                    initialSlide: id,
                    navigation: {
                        nextEl: '.galleries-detail-next', prevEl: '.galleries-detail-prev'
                    }
                });
            });
        }

        function closeModal() {
            isModalOpen.value = false;
        }

        function initSwipers() {
            swiperDesktop.value = new Swiper('.gallery-content .swiper.desktop', {
                slidesPerView: 1,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.desktop.next',
                    prevEl: '.desktop.prev',
                },
            });
            swiperMobile.value = new Swiper('.gallery-content .swiper.mobile', {
                slidesPerView: 1,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.mobile.next',
                    prevEl: '.mobile.prev',
                },
            });
        }

        onMounted(() => {
            updateSlides();
            nextTick(() => {
                initSwipers();
            });
        });

        return { categories, activeGallery, desktopSlides, mobileSlides, handleButtonClick, openModal, closeModal, modalItems, isModalOpen };
    },
});

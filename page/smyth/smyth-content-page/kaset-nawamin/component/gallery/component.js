const GalleryComponent = defineComponent({
    name: 'GalleryComponent',
    template: `
        <section id="gallery"  data-section="gallery" class="gallery-component onview bg-[url('/assets/image/page-smyth-kaset/gallery/bg.png')] bg-cover bg-center relative">
            <div class="pt-10 px-0">
                <h2 class="font-['Gotham'] font-medium text-[40px] text-center text-white uppercase" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                    Gallery
                </h2>
                <div class="gallery-controls flex gap-4 mb-6 justify-center" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                    <button 
                        v-for="(gallery, galleryId) in galleries" 
                        :key="galleryId" 
                        :data-gallery="galleryId"
                        class="py-2 text-white"
                        :class="{ 'font-bold': activeGallery === galleryId }"
                        @click="handleButtonClick">
                        {{ galleryId.charAt(0).toUpperCase() + galleryId.slice(1) }}
                    </button>
                </div>

                <div v-if="activeGallery && galleries[activeGallery]" class="gallery-content lg:block hidden"  data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                    <div class="mx-auto">
                        <div class="swiper desktop h-full">
                            <div class="swiper-wrapper">
                                <div v-for="(array, index) in galleries[activeGallery]" class="swiper-slide">
                                    <div class="grid grid-cols-4 gap-2 grid-rows-6 h-[600px]">
                                        <div 
                                            v-for="(item, index) in array" 
                                            :key="index" 
                                            class=" bg-center bg-cover cursor-pointer brightness-50 hover:brightness-100"
                                            :class="[item.class,item.type === 'image' ? 'p-4':'overflow-hidden']"
                                            :style="item.type === 'image' ? { backgroundImage: 'url(' + item.url + ')' } : {}"
                                            @click="openModal(item.url,item.id)"
                                        >
                                        <div class="absolute w-full h-full"@click="openModal(item.url,item.id)"></div>
                                            <iframe 
                                                v-if="item.type === 'video'" 
                                                class="w-full h-full " 
                                                :src="item.url" 
                                                frameborder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowfullscreen>
                                            </iframe>
                                        </div>
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

                <div v-if="activeGallery && galleriesM[activeGallery]" class="gallery-content lg:hidden block" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                    <div class="mx-auto">
                        <div class="swiper mobile h-full">
                            <div class="swiper-wrapper">
                               <div v-for="(array, index) in galleriesM[activeGallery]" class="swiper-slide">
                                    <div class="grid grid-cols-2 gap-2 grid-rows-6 h-[300px]">
                                        <div 
                                            v-for="(item, index) in array" 
                                            :key="index" 
                                            class="bg-center bg-cover cursor-pointer"
                                            :class="[item.class,item.type === 'image' ? 'p-4':'overflow-hidden']"
                                            :style="item.type === 'image' ? { backgroundImage: 'url(' + item.url + ')' } : {}"
                                            @click="openModal(item.url,item.id)"
                                        >
                                        <div class="absolute w-full h-full"@click="openModal(item.url,item.id)"></div>
                                            <iframe 
                                                v-if="item.type === 'video'" 
                                                class="w-full h-full" 
                                                :src="item.url" 
                                                frameborder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowfullscreen>
                                            </iframe>
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
            <div class="fixed inset-0 bg-black bg-opacity-75 z-[9999]" :class="[isModalOpen ? 'block':'hidden']">
                <div class="p-5 rounded-lg h-full ">
                    <div class="swiper h-full galleries-detail" v-for="(array, index) in galleriesDetail[activeGallery]">
                        <div class="swiper-wrapper">
                            <!-- Slides -->
                            <div  class="swiper-slide flex"  v-for="(item, index) in array"  :key="index" >
                                <img :src="item.url" alt="Gallery Image" class="max-h-full m-auto" 
                                                v-if="item.type === 'image'"  />
                                <iframe 
                                    v-if="item.type === 'video'" 
                                    class="w-full h-full" 
                                    :src="item.url" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
                                </iframe>
                            </div>
                        </div>
                    </div>
                    <div class="absolute left-0 top-1/2 w-full -translate-y-1/2 z-50">
                        <div class="absolute left-0 mx-5">
                            <button class="galleries-detail-prev prev rotate-180 transition border my-auto">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="2" fill="none" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M29.7237 17.7245C30.2444 17.2038 31.0886 17.2038 31.6093 17.7245L36.9426 23.0578C37.4633 23.5785 37.4633 24.4228 36.9426 24.9435L31.6093 30.2768C31.0886 30.7975 30.2444 30.7975 29.7237 30.2768C29.203 29.7561 29.203 28.9119 29.7237 28.3912L32.7809 25.334H11.9998C11.2635 25.334 10.6665 24.737 10.6665 24.0007C10.6665 23.2643 11.2635 22.6673 11.9998 22.6673H32.7809L29.7237 19.6101C29.203 19.0894 29.203 18.2452 29.7237 17.7245Z"
                                        fill="white" />
                                </svg>
                            </button>
                        </div>
                        <div class="absolute right-0 mx-5">
                            <button class="galleries-detail-next next transition border my-auto ">
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
                <button @click="closeModal" class="absolute right-0 top-0 lg:m-10 m-5 z-50 w-[30px] overflow-hidden">
                    <img src="/assets/icon/close.svg" class="scale-110" />
                </button>
            </div>
        </section>
    `,
    setup() {
        const activeGallery = ref('all');
        const galleriesDetail = ref({
            all: [
                [
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior1.jpg', class: 'row-span-6', id: 1 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior2.jpg', class: 'row-span-3', id: 2 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior4.jpg', class: 'row-span-4', id: 3 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior5.jpg', class: 'row-span-6', id: 4 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior1.jpg', class: 'row-span-3', id: 5 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior2.jpg', class: 'row-span-2', id: 6 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior3.jpg', class: 'row-span-6', id: 7 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior4.jpg', class: 'row-span-3', id: 8 },
                ]
            ],
            exterior: [[
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior1.jpg', class: 'row-span-6', id: 1 },
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior2.jpg', class: 'row-span-3', id: 2 },
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior4.jpg', class: 'row-span-4', id: 3 },
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior5.jpg', class: 'row-span-6', id: 4 },
            ]
            ],
            interior: [[
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior1.jpg', class: 'row-span-6', id: 5 },
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior2.jpg', class: 'row-span-3', id: 6 },
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior3.jpg', class: 'row-span-4', id: 7 },
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior4.jpg', class: 'row-span-3', id: 8 },
            ]
            ],
            vdo: [[
                { type: 'video', url: 'https://www.youtube.com/embed/YEXyZJIg8zY', class: 'row-span-6', detail: 1 },
            ]
            ]
        })
        const galleries = ref({
            all: [
                [
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior1.jpg', class: 'row-span-6', id: 1 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior2.jpg', class: 'row-span-3', id: 2 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior4.jpg', class: 'row-span-4', id: 3 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior5.jpg', class: 'row-span-6', id: 4 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior1.jpg', class: 'row-span-3', id: 5 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior2.jpg', class: 'row-span-2', id: 6 },
                ],
                [
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior3.jpg', class: 'row-span-6', id: 7 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior4.jpg', class: 'row-span-3', id: 8 },
                ]
            ],
            exterior: [[
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior1.jpg', class: 'row-span-6', id: 1 },
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior2.jpg', class: 'row-span-3', id: 2 },
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior4.jpg', class: 'row-span-4', id: 3 },
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior5.jpg', class: 'row-span-6', id: 4 },
            ]
            ],
            interior: [[
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior1.jpg', class: 'row-span-6', id: 1 },
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior2.jpg', class: 'row-span-3', id: 2 },
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior3.jpg', class: 'row-span-4', id: 3 },
                { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior4.jpg', class: 'row-span-6', id: 4 },

            ]
            ],
            vdo: [[
                { type: 'video', url: 'https://www.youtube.com/embed/YEXyZJIg8zY', class: 'row-span-6', detail: 1 },
            ]
            ],
        });

        const galleriesM = ref({
            all: [
                [
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior1.jpg', class: 'row-span-6', id: 1 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior2.jpg', class: 'row-span-3', id: 2 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior4.jpg', class: 'row-span-3', id: 3 },
                ],
                [

                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior5.jpg', class: 'row-span-6', id: 4 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior1.jpg', class: 'row-span-3', id: 5 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior2.jpg', class: 'row-span-3', id: 6 },
                ],
                [
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior3.jpg', class: 'row-span-6', id: 7 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior4.jpg', class: 'row-span-3', id: 8 },
                ]
            ],
            exterior: [
                [
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior1.jpg', class: 'row-span-6', id: 1 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior2.jpg', class: 'row-span-3', id: 2 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior4.jpg', class: 'row-span-3', id: 3 },
                ],
                [

                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/exterior5.jpg', class: 'row-span-6', id: 4 },
                ],
            ],
            interior: [
                [
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior1.jpg', class: 'row-span-6', id: 1 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior2.jpg', class: 'row-span-3', id: 2 },
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior3.jpg', class: 'row-span-3', id: 3 },
                ],
                [
                    { type: 'image', url: '/assets/image/page-smyth-kaset/gallery/interior4.jpg', class: 'row-span-3', id: 4 },
                ]
            ],
            vdo: [[
                { type: 'video', url: 'https://www.youtube.com/embed/YEXyZJIg8zY', class: 'row-span-6', detail: 1 },
            ]
            ],
        });

        const swiperInstance = ref(null);
        const swiperInstance2 = ref(null);
        const swiperInstance3 = ref(null);

        const isModalOpen = ref(false);
        const modalImageUrl = ref('');

        const openModal = (url, id) => {
            modalImageUrl.value = url;
            isModalOpen.value = true;
            swiperInstance3.value = new Swiper('.galleries-detail.swiper', {
                slidesPerView: 1,
                spaceBetween: 10,
                loop: true,
                navigation: {
                    nextEl: '.galleries-detail-next.next',
                    prevEl: '.galleries-detail-prev.prev',
                },
            });
            setTimeout(() => {
                swiperInstance3.value.slideTo(id-1);
            }, 300);
        };

        const closeModal = () => {
            const iframes = document.querySelectorAll('.galleries-detail iframe');
            iframes.forEach((iframe) => {
                iframe.src = iframe.src; // Reset src to stop video playback
            });
            isModalOpen.value = false;
            modalImageUrl.value = '';
        };

        const handleButtonClick = async (event) => {
            const button = event.target.closest('button[data-gallery]');

            if (!button) return;
            const galleryId = button.getAttribute('data-gallery');
            if (galleryId in galleries.value) {
                activeGallery.value = galleryId;

                // Wait for Vue to re-render the DOM
                await nextTick();

                // Destroy the previous Swiper instance if it exists
                if (swiperInstance.value) {
                    swiperInstance.value.destroy(true, true);
                }

                if (swiperInstance2.value) {
                    swiperInstance2.value.destroy(true, true);
                }

                // Reinitialize Swiper after the DOM has been updated
                swiperInstance.value = new Swiper('.gallery-content .swiper.desktop', {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: {
                        nextEl: '.desktop.next',
                        prevEl: '.desktop.prev',
                    },
                });
                swiperInstance2.value = new Swiper('.gallery-content .swiper.mobile', {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    navigation: {
                        nextEl: '.mobile.next',
                        prevEl: '.mobile.prev',
                    },
                });
            }
        };
        onMounted(() => {
            // Reinitialize Swiper after the DOM has been updated
            swiperInstance.value = new Swiper('.gallery-content .swiper.desktop', {
                slidesPerView: 1,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.desktop.next',
                    prevEl: '.desktop.prev',
                },
            });
            swiperInstance2.value = new Swiper('.gallery-content .swiper.mobile', {
                slidesPerView: 1,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.mobile.next',
                    prevEl: '.mobile.prev',
                },
            });

            swiperInstance3.value = new Swiper('.galleries-detail.swiper', {
                slidesPerView: 1,
                spaceBetween: 10,
                loop: true,
                navigation: {
                    nextEl: '.galleries-detail-next.next',
                    prevEl: '.galleries-detail-prev.prev',
                },
            });
        });

        return { activeGallery, galleries, galleriesM, galleriesDetail, handleButtonClick, isModalOpen, modalImageUrl, openModal, closeModal };
    },
});

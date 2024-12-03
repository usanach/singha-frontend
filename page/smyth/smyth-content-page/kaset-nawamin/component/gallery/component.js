const GalleryComponent = defineComponent({
    name: 'GalleryComponent',
    template: `
        <section id="gallery" class="gallery-component bg-[url('/assets/image/page-smyth-kaset/gallery/bg.png')] bg-cover bg-center lg:pb-20 relative">
            <div class="container py-10 lg:px-5 px-0">
                <h2 class="font-['Gotham'] text-[40px] text-center text-white uppercase" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
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
                    <div class="container mx-auto">
                        <div class="swiper desktop h-full">
                            <div class="swiper-wrapper">
                                <div v-for="(array,index) in galleries[activeGallery]" class="swiper-slide">
                                    <div class="grid grid-cols-4 gap-4 grid-rows-6 h-[600px]">
                                        <div 
                                            v-for="(image, index) in array" 
                                            :key="index" 
                                            :class="['p-4 bg-cover bg-center', image.class]"
                                            :style="{ backgroundImage: 'url(' + image.url + ')' }"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Slide Navigation Buttons -->
                        <div class="py-5 flex justify-end gap-5 container mx-auto">
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
                                <div v-for="(array,index) in galleriesM[activeGallery]" class="swiper-slide">
                                    <div class="grid grid-cols-2 gap-4 grid-rows-6 h-[300px]">
                                        <div 
                                            v-for="(image, index) in array" 
                                            :key="index" 
                                            :class="['p-4 bg-cover bg-center', image.class]"
                                            :style="{ backgroundImage: 'url(' + image.url + ')' }"
                                        ></div>
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
        </section>
    `,
    setup() {
        const activeGallery = ref('all');
        const galleries = ref({
            all: [
                [
                    { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                    { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                    { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-4' },
                    { url: '/assets/image/page-smyth-kaset/gallery/4.png', class: 'row-span-6' },
                    { url: '/assets/image/page-smyth-kaset/gallery/5.png', class: 'row-span-3' },
                    { url: '/assets/image/page-smyth-kaset/gallery/6.png', class: 'row-span-2' },
                ],
                [

                    { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                    { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                    { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-4' },
                    { url: '/assets/image/page-smyth-kaset/gallery/4.png', class: 'row-span-6' },
                    { url: '/assets/image/page-smyth-kaset/gallery/5.png', class: 'row-span-3' },
                    { url: '/assets/image/page-smyth-kaset/gallery/6.png', class: 'row-span-2' },
                ]
            ],
            exterior: [[
                { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/5.png', class: 'row-span-4' },
                { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/4.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/6.png', class: 'row-span-2' },
            ]
            ],
            interior: [[
                { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-4' },
                { url: '/assets/image/page-smyth-kaset/gallery/4.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/5.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/6.png', class: 'row-span-2' },

            ], [
                { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-4' },
                { url: '/assets/image/page-smyth-kaset/gallery/4.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/5.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/6.png', class: 'row-span-2' },
            ], [
                { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-4' },
                { url: '/assets/image/page-smyth-kaset/gallery/4.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/5.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/6.png', class: 'row-span-2' },
            ]
            ],
            facilities: [[
                { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-4' },
                { url: '/assets/image/page-smyth-kaset/gallery/4.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/5.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/6.png', class: 'row-span-2' },
            ]
            ],
            vdo: [[
                { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-4' },
                { url: '/assets/image/page-smyth-kaset/gallery/4.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/5.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/6.png', class: 'row-span-2' },
            ]
            ],
        });

        const galleriesM = ref({
            all: [
                [
                    { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                    { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                    { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-3' },
                ],
                [

                    { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                    { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                    { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-3' },
                ]
            ],
            exterior: [[
                { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/5.png', class: 'row-span-3' },
            ]
            ],
            interior: [[
                { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-3' },

            ], [
                { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-3' },
            ], [
                { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-3' },
            ]
            ],
            facilities: [[
                { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-3' },
            ]
            ],
            vdo: [[
                { url: '/assets/image/page-smyth-kaset/gallery/1.png', class: 'row-span-6' },
                { url: '/assets/image/page-smyth-kaset/gallery/2.png', class: 'row-span-3' },
                { url: '/assets/image/page-smyth-kaset/gallery/3.png', class: 'row-span-3' },
            ]
            ],
        });
        const swiperInstance = ref(null);
        const swiperInstance2 = ref(null);

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
        });

        return { activeGallery, galleries, galleriesM, handleButtonClick };
    },
});

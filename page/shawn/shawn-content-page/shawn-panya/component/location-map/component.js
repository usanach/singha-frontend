const LocationComponent = defineComponent({
    name: 'LocationComponent',
    template: `
        <section class="location-component bg-[#F4F8FB] py-10 onview" id="location" data-section="location">
            <div class="container mx-auto flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                <div class="relative z-10">
                    <h2 class="text-[#564B40] text-[40px] font-['Gotham'] font-medium text-center uppercase">
                        Location
                    </h2>
                    <p class="font-['DB_Heavent'] text-[26px] text-center text-[#564B40]">
                        วิธีการเดินทาง
                    </p>
                </div>
                <!-- Clickable Image -->
                <div class="mx-auto  cursor-pointer relative" @click="openModal">
                    <img ref="mapImage" src="/assets/image/page-shawn-panya/location/MAP_shawn-panya.png" alt="MAP" class="w-full">
                </div>
                <div class="flex gap-5 justify-center mt-5">
                    <div>
                        <button type="button" class="bg-[#B8A16F] px-5 p-2 text-white map-download" @click="downloadMap">
                            ดาวน์โหลดภาพ
                        </button>
                    </div>
                    <div>
                        <a :href="googleUrl" target="_blank" class="get-location">
                            <button type="button" class="bg-[#B8A16F] px-5 p-2 text-white">
                                Google Map
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Modal for Enlarged Image with Click-to-Zoom -->
            <div v-if="isModalOpen" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50" @click.self="closeModal">
                <div class="relative overflow-hidden" @click="zoomIn">
                    <img ref="zoomedImage" :src="imageUrl" alt="Enlarged Map" 
                        class="transition-transform duration-500 ease-in-out"
                        :style="{ transform: \`scale(\${zoomScale}) translate(\${translateX}px, \${translateY}px)\` }">
                </div>
                <button @click="closeModal" class="absolute top-2 right-2 text-[#564B40] rounded-full p-2 text-lg">✕</button>

            </div>
        </section>
    `,
    setup() {
        const isModalOpen = ref(false);
        const imageUrl = '/assets/image/page-shawn-panya/location/MAP_shawn-panya.png';
        const googleUrl = "https://maps.app.goo.gl/upbREW1cYyzu4quk6";
        const zoomScale = ref(1);
        const translateX = ref(0);
        const translateY = ref(0);
        const zoomedImage = ref(null);

        const openModal = (event) => {
            isModalOpen.value = true;
            zoomScale.value = 1;
            translateX.value = 0;
            translateY.value = 0;
        };

        const closeModal = () => {
            isModalOpen.value = false;
            zoomScale.value = 1;
            translateX.value = 0;
            translateY.value = 0;
        };

        const zoomIn = (event) => {
            if (!zoomedImage.value) return;

            const rect = zoomedImage.value.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;

            if (zoomScale.value === 1) {
                zoomScale.value = 2; // Zoom level
                translateX.value = (-offsetX + rect.width / 2) / 2;
                translateY.value = (-offsetY + rect.height / 2) / 2;
            } else {
                zoomScale.value = 1;
                translateX.value = 0;
                translateY.value = 0;
            }
        };

        const downloadMap = () => {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'MAP_SMYTH.png';
            link.click();
        };

        return {
            isModalOpen,
            imageUrl,
            googleUrl,
            zoomScale,
            translateX,
            translateY,
            zoomedImage,
            openModal,
            closeModal,
            zoomIn,
            downloadMap,
        };
    },
});

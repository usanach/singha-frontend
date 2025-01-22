const LocationComponent = defineComponent({
    name: 'LocationComponent',
    template: `
        <section class="location-component bg-[#D6E1E8] py-10 onview" id="location" data-section="location">
            <div class="container mx-auto flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                <div class="relative">
                    <h2 class="text-[#013B5E] text-[40px] font-['Kaisei_Decol'] font-medium text-center uppercase">
                        Location
                    </h2>
                    <p class="font-['DB_OnUma'] text-[26px] text-center text-[#013B5E]">
                        วิธีการเดินทาง
                    </p>
                </div>
                <!-- Clickable Image -->
                <div class="mx-auto cursor-pointer" @click="openModal">
                    <img src="/assets/image/page-srin-prannok/location/MAP_SRIN.png" alt="MAP" class="w-full">
                </div>
                <div class="flex gap-5 justify-center mt-5">
                    <div>
                        <button type="button" class="bg-[#B8A16F] px-5 p-2 text-white map-download" @click="downloadMap">
                            ดาวน์โหลดภาพ
                        </button>
                    </div>
                    <div>
                        <a href="https://maps.app.goo.gl/VAeEiBQU5mGapHot8" target="_blank" class="get-location">
                            <button type="button" class="bg-[#B8A16F] px-5 p-2 text-white">
                                Google Map
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Modal for Enlarged Image -->
            <div v-if="isModalOpen" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50" @click.self="closeModal">
                <button @click="closeModal" class="absolute top-2 right-2 text-white rounded-full p-2 text-lg">✕</button>
                <div class="relative">
                    <img :src="imageUrl" alt="Enlarged Map" class="max-w-[90vw] max-h-[90vh]">
                </div>
            </div>
        </section>
    `,
    setup() {
        const isModalOpen = ref(false);
        const imageUrl = '/assets/image/page-srin-prannok/location/MAP_SRIN.png'; // Path to the image

        const openModal = () => {
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
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
            openModal,
            closeModal,
            downloadMap,
        };
    },
});

const LocationComponent = defineComponent({
    name: 'LocationComponent',
    template: `
        <section class="location-component bg-[#D6E1E8] py-10 onview font-['IBM_Plex_Sans_Thai']" id="location" data-section="location">
            <div class="container mx-auto flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                <div class="relative z-10">
                    <h2 class="text-[#013B5E] text-[35px] font-medium text-center uppercase"
                :class="[fontFam()]">
                        {{ title[language] }}
                    </h2>
                </div>
                <!-- Clickable Image -->
                <div class="mx-auto cursor-pointer relative mt-5" @click="openModal">
                     <img :src="imageUrl" alt="MAP" class="w-full max-w-[850px] max-h-[680px]">
                </div>
                <div class="flex gap-5 justify-center mt-5">
                    <button type="button" class="bg-[#B8A16F] px-5 p-2 text-white map-download" @click="downloadMap">
                    {{ btnDownload[language] }}
                    </button>
                    <a :href="googleUrl" target="_blank">
                    <button type="button" class="bg-[#B8A16F] px-5 p-2 text-white">
                        {{ btnGoogleMap[language] }}
                    </button>
                    </a>
                </div>
            </div>

            <!-- Modal for Enlarged Image with Click-to-Zoom -->
            <div v-if="isModalOpen" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-[9999]" @click.self="closeModal">
                <div class="relative overflow-hidden" @click="zoomIn">
                    <img ref="zoomedImage" :src="imageUrl" alt="Enlarged Map" 
                        class="transition-transform duration-500 ease-in-out max-w-[850px] max-h-[680px]"
                        :style="{ transform: \`scale(\${zoomScale}) translate(\${translateX}px, \${translateY}px)\` }">
                </div>
                <button @click="closeModal" class="absolute top-2 right-2 text-white rounded-full p-2 text-lg">✕</button>

            </div>
        </section>
    `,
    setup() {
        const isModalOpen = ref(false);
        const imageUrl = '/assets\/image\/page-srin-prannok\/location\/SRIN_Prannok_map.webp';
        const googleUrl = "";
        const zoomScale = ref(1);
        const translateX = ref(0);
        const translateY = ref(0);
        const zoomedImage = ref(null);

        // สร้าง reactive title และปุ่มต่างๆ
        const title = {
            th: 'วิธีการเดินทาง',
            en: 'Location'
        };
        const btnDownload = {
            th: 'ดาวน์โหลดภาพ',
            en: 'Download Image'
        };
        const btnGoogleMap = {
            th: 'Google Map',
            en: 'Open in Google Maps'
        };

        // ดึงภาษาจาก path
        const language = ref('th');
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const m = path.match(/\/(th|en)(\/|$)/);
            return m ? m[1] : 'th';
        };
        language.value = getLanguageFromPath();

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
            link.download = 'S’RIN_Prannok.jpg';
            link.click();
        };

        const fontFam = () => {
            return language.value == 'en' ? "font-['Kaisei_Decol']" : "";
        }

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
            language,
            title,
            btnDownload,
            btnGoogleMap,
            fontFam
        };
    },
});

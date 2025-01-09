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
                <div class="mx-auto">
                    <img src="/assets/image/page-srin-prannok/location/MAP_SRIN.png" alt="" id="location-map">
                </div>
                <div class="flex gap-5 justify-center">
                    <div>
                        <button type="button" class="bg-[#B8A16F] px-5 p-2 text-white map-download" @click="downloadMap">
                            ดาวน์โหลดภาพ
                        </button>
                    </div>
                    <div>
                        <a href="https://maps.app.goo.gl/v6dnft5TMV6iAUPh7" target="_blank" class="get-location">
                            <button type="button" class="bg-[#B8A16F] px-5 p-2 text-white">
                                 Google Map
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `,
    setup() {
        // Function to download the map image
        const downloadMap = () => {
            const imageUrl = '/assets/image/page-srin-prannok/location/MAP_SRIN.png'; // Path to the image
            const link = document.createElement('a'); // Create an anchor element
            link.href = imageUrl; // Set the image path
            link.download = 'MAP_SRIN.png'; // Set the filename for download
            link.click(); // Trigger the download
        };

        return {
            downloadMap,
        };
    },
});

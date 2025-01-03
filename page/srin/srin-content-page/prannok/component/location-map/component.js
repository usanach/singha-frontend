const LocationComponent = defineComponent({
    name: 'LocationComponent',
    template: `
    
        <section class="location-component bg-[#D6E1E8] py-10 onview" id="location" data-section="location">
            <div class="container mx-auto flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                <div class="relative">
                    <h2 class="text-[#564B40] text-[40px] font-['Kaisei_Decol'] font-medium text-center uppercase">
                        Location
                    </h2>
                    <p class="font-['DB_Heavent'] text-[26px] text-center">
                        แผนที่โครงการ
                    </p>
                </div>
                <div class="mx-auto lg:-mt-20">
                    <img src="/assets/image/page-srin-prannok/location/MAP_SRIN.png" alt="">
                </div>
                <div class="flex gap-5 justify-center">
                    <div>
                        <button type="button" class="bg-[#B8A16F] px-5 p-2 text-white map-download">
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
});

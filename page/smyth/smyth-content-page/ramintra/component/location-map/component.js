const LocationComponent = defineComponent({
    name: 'LocationComponent',
    template: `
    
        <section class="location-component bg-[#F7F5E8] py-10" id="location">
            <div class="container mx-auto flex flex-col" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
                <div class="relative">
                    <h2 class="text-[#564B40] text-[40px] font-['Gotham'] font-medium text-center uppercase">
                        Location
                    </h2>
                    <p class="font-['DB_Heavent'] text-[26px] text-center">
                        แผนที่โครงการ
                    </p>
                </div>
                <div class="mx-auto lg:-mt-20">
                    <img src="/assets/image/page-smyth-ramintra/location/MAP_SMYTH.png" alt="">
                </div>
                <div class="flex gap-5 justify-center">
                    <div>
                        <button type="button" class="bg-[#B8A16F] px-5 p-2 text-white">
                            ดาวน์โหลดภาพ
                        </button>
                    </div>
                    <div>
                        <a href="https://maps.app.goo.gl/VAeEiBQU5mGapHot8" target="_blank">
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

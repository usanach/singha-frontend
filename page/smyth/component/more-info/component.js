const MoreInfoComponent = defineComponent({
    name: 'MoreInfoComponent',

    template: `
        <section 
            class="more-info"
            @mouseenter="showSection" 
            @mouseleave="hideSection"
        >
            <div class="p-5 bg-white/50 backdrop-blur-md">
                <div :class="{'hidden': !isHovered, 'space-y-6': true}">
                    <a class="flex gap-2" href="https://lin.ee/8hJoAxK" target="_blank">
                        <div class="w-[30px]">
                            <img src="/assets/icon/more-info/line.svg" alt="" class="mx-auto">
                        </div>
                        <div class="my-auto">
                            <p class="font-['IBM_Plex_Sans_Thai']">แชทสอบถาม</p>
                        </div>
                    </a>
                    <a class="flex gap-2" href="tel:1221">
                        <div class="w-[30px]">
                            <img src="/assets/icon/more-info/phone.svg" alt="" class="mx-auto">
                        </div>
                        <div class="my-auto">
                            <p class="font-['IBM_Plex_Sans_Thai']">โทรติดต่อ</p>
                        </div>
                    </a>
                    <a class="flex gap-2" href="mailto:Info@SinghaEstate.co.th" target="_blank">
                        <div class="w-[30px]">
                            <img src="/assets/icon/more-info/email.svg" alt="" class="mx-auto">
                        </div>
                        <div class="my-auto">
                            <p class="font-['IBM_Plex_Sans_Thai']">อีเมล</p>
                        </div>
                    </a>
                </div>
                <div class="flex" v-if="!isHovered">
                    <button class="ml-auto">
                        <img src="/assets/icon/more-info.svg" alt="" class="w-[25px]">
                    </button>
                </div>
            </div>
        </section>
    `,

    setup() {
        const isHovered = ref(false);

        const showSection = () => {
            isHovered.value = true;
        };

        const hideSection = () => {
            isHovered.value = false;
        };

        return { isHovered, showSection, hideSection };
    },
});

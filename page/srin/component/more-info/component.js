const MoreInfoComponent = defineComponent({
    name: 'MoreInfoComponent',

    template: `
        <section 
            class="more-info"
            @mouseenter="showSection" 
            @mouseleave="hideSection"
        >
            <div class="p-3 bg-white backdrop-blur-md" :class="[isHovered?'py-5':'']">
                <div :class="{'hidden': !isHovered, 'space-y-6': true}">
                    <a class="flex gap-2 tel info-menu" href="tel:1221">
                        <div class="w-[30px]">
                            <img src="/assets/icon/more-info/phone.svg" alt="" class="mx-auto">
                        </div>
                        <div class="my-auto lg:block hidden">
                            <p class="font-['IBM_Plex_Sans_Thai']">โทร 1221</p>
                        </div>
                    </a>
                    <a class="flex gap-2 line info-menu" href="https://lin.ee/8hJoAxK" target="_blank">
                        <div class="w-[30px]">
                            <img src="/assets/icon/more-info/line.svg" alt="" class="mx-auto">
                        </div>
                        <div class="my-auto lg:block hidden">
                            <p class="font-['IBM_Plex_Sans_Thai']">แชทสอบถาม</p>
                        </div>
                    </a>
                    <a class="flex gap-2 email info-menu" href="mailto:Info@SinghaEstate.co.th" target="_blank">
                        <div class="w-[30px]">
                            <img src="/assets/icon/more-info/email.svg" alt="" class="mx-auto">
                        </div>
                        <div class="my-auto lg:block hidden">
                            <p class="font-['IBM_Plex_Sans_Thai']">ส่งอีเมล</p>
                        </div>
                    </a>
                </div>
                <div class="lg:hidden mt-6" v-if="isHovered">
                    <button typ="button" class="space-y-2" @click="hideSection">
                        <img src="/assets/icon/more-info/close.svg" alt="" class="w-[25px] mx-auto translate-x-1">
                    </button>
                </div>
                <div v-if="!isHovered">
                    <button typ="button" class="space-y-2">
                        <img src="/assets/icon/more-info.svg" alt="" class="w-[25px] mx-auto translate-x-1">
                        <p class="text-center leading-none text-[14px]">
                            ติดต่อเรา
                        </p>
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

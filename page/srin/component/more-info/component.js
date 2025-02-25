const MoreInfoComponent = defineComponent({
    name: 'MoreInfoComponent',

    template: `
        <section class="fixed bottom-5 right-5 z-50 group" @mouseenter="showMenuMoreDetail" @mouseleave="hideMenuMoreDetail">
            <div class="relative">
                <!-- Expanded Menu -->
                <div 
                    id="more-info" 
                    :class="menuVisible ? 'flex flex-col gap-2 items-end mb-2' : 'hidden'">
                    <a class="flex items-center gap-3" href="tel:1221">
                        <span class="bg-white text-black px-3 py-1 rounded-full shadow text-sm ml-auto">โทร 1221</span>
                        <button class="bg-[#003B5E] text-white rounded-full p-3 shadow">
                            <img src="/assets/icon/more-info/phone.svg" class="w-[25px]" />
                        </button>
                    </a>
                    <a class="flex items-center gap-3" href="https://lin.ee/8hJoAxK" target="_blank">
                        <span class="bg-white text-black px-3 py-1 rounded-full shadow text-sm ml-auto">แชทสอบถาม</span>
                        <button class="bg-[#003B5E] text-white rounded-full p-3 shadow">
                             <img src="/assets/icon/more-info/line.svg" class="w-[25px]" />
                        </button>
                    </a>
                    <a class="flex items-center gap-3" href="mailto:Info@SinghaEstate.co.th" target="_blank">
                        <span class="bg-white text-black px-3 py-1 rounded-full shadow text-sm ml-auto">ส่งอีเมล</span>
                        <button class="bg-[#003B5E] text-white rounded-full p-3 shadow">
                            <img src="/assets/icon/more-info/email.svg" class="w-[25px]" />
                        </button>
                    </a>
                    <!-- Main Button -->
                    <div class="flex items-center gap-3 justify-end lg:hidden">
                        <span 
                            v-if="!menuVisible" 
                            class="bg-white text-black px-3 py-1 rounded-full shadow ml-auto">ติดต่อเรา</span>
                        <button 
                            class="bg-[#003B5E] text-white rounded-full p-3 shadow" 
                            @click="toggleMenu">
                        <img v-else src="/assets/icon/more-info/close-white.svg" class="w-[25px]" />
                        </button>
                    </div>
                </div>

                <!-- Main Button -->
                <div  class="flex items-center gap-3 justify-end"  v-if="!menuVisible" >
                    <span 
                        v-if="!menuVisible" 
                        class="bg-white text-black px-3 py-1 rounded-full shadow ml-auto">ติดต่อเรา</span>
                    <button 
                        class="bg-[#003B5E] text-white rounded-full p-3 shadow" 
                        @click="toggleMenu">
                       <img v-if="!menuVisible" src="/assets/icon/more-info/contact.svg" class="w-[25px]" />
                    </button>
                </div>
            </div>
        </section>
    `,

    setup() {
        const menuVisible = ref(false);

        const toggleMenu = () => {
            menuVisible.value = !menuVisible.value;
        };

        const showMenuMoreDetail = () => {
            menuVisible.value = true;
        };

        const hideMenuMoreDetail = () => {
            menuVisible.value = false;
        };

        return {
            menuVisible,
            toggleMenu,
            showMenuMoreDetail,
            hideMenuMoreDetail,
        };
    },
});

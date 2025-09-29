const ShowCaseComponent = defineComponent({
    name: 'ShowCaseComponent',
    template: `
<section class="onview font-['IBM_Plex_Sans_Thai']" data-section="360_experience">
  <div class="bg-[#907F5D] relative">
    <div class="flex flex-col">
      <div class="container py-10">
        <h2 class="text-[35px] text-center font-bold text-white" :style="{fontFamily:fontClass()}">
          {{ title[language] }}
        </h2>

        <div class="relative lg:px-20 mt-5">
          <div class="relative">
            <div class="bg-black/20">
              <iframe
                :key="activeUrl"
                class="w-full lg:min-h-[600px] min-h-[400px]"
                :src="activeUrl"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <!-- แถบซ้าย -->
            <div class="absolute left-0 top-0 w-1/5 bg-black/40 h-full flex">
              <div class="m-auto w-full px-4">
                <div class="flex justify-center">
                  <img aria-hidden="true" src="/assets/image/page-the-esse-36/banner/logo.svg" />
                </div>

                <ul class="space-y-3 mt-6 px-6">
                  <li v-for="scene in scenes" :key="scene.id">
                    <button
                      type="button"
                      class="w-full py-2 transition
                             text-white bg-white/20 hover:bg-white/40 hover:text-white
                             backdrop-blur-md"
                      :class="{
                        'bg-white/40 text-white shadow-md': activeButton === scene.id
                      }"
                      :aria-pressed="activeButton === scene.id"
                      @click="setActive(scene.id)"
                    >
                      {{ scene.label[language] || scene.label.en }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  </div>
</section>`,

    setup() {
        const language = ref('th');

        // รายการซีน/ปุ่ม + URL ของ Matterport
        const scenes = ref([
            {
                id: 'amenitiesG',
                label: { en: 'Amenities FL. G', th: 'สิ่งอำนวยความสะดวก ชั้น G' },
                url: 'https://my.matterport.com/show/?m=NoWXAMAECEb',
            },
            {
                id: 'amenities7_th',
                label: { en: 'Amenities FL. 7th', th: 'สิ่งอำนวยความสะดวก ชั้น 7' },
                url: 'https://my.matterport.com/show/?m=nG79tHwoLaW',
            },
            {
                id: 'amenities8_th',
                label: { en: 'Amenities FL. 8th', th: 'สิ่งอำนวยความสะดวก ชั้น 8' },
                url: 'https://my.matterport.com/show/?m=WoaPKFtVNfJ',
            },
            {
                id: 'amenities41_st',
                label: { en: 'Amenities FL. 41st', th: 'สิ่งอำนวยความสะดวก ชั้น 41' },
                url: 'https://my.matterport.com/show/?m=kwhVxvTzVkF',
            },
            {
                id: '1_bedroom',
                label: { en: '1 Bedroom', th: '1 ห้องนอน' },
                url: 'https://my.matterport.com/show/?m=qJcP2azf83h',
            },
            {
                id: '2_bedroom',
                label: { en: '2 Bedroom', th: '2 ห้องนอน' },
                url: 'https://my.matterport.com/show/?m=1NmUgjLM8cX',
            },
        ]);

        // ปุ่มเริ่มต้น = ซีนแรก
        const activeButton = ref(scenes.value[0]?.id || null);

        // หัวข้อ
        const title = {
            en: '360° experience',
            th: 'ประสบการณ์ 360 °',
        };

        // URL ปัจจุบันของ iframe
        const activeUrl = computed(() => {
            const found = scenes.value.find(s => s.id === activeButton.value);
            return found?.url || 'about:blank';
        });

        // เปลี่ยนซีน (ไม่ต้องจัดการ loader แล้ว)
        const setActive = (id) => {
            if (activeButton.value === id) return;
            activeButton.value = id;
            // :key="activeUrl" ช่วยบังคับ re-render ให้เปลี่ยนซีนทันทีแบบสมูท
        };

        // ภาษา
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        const fontClass = () => (language.value === 'en' ? "Gotham" : 'DB Heavent');

        const init = () => {
            if (window.AOS?.init) AOS.init();
        };

        onMounted(() => {
            language.value = getLanguageFromPath();
            nextTick(init);
        });

        return {
            language,
            scenes,
            activeButton,
            activeUrl,
            setActive,
            fontClass,
            title,
        };
    },
});

const ShowCaseComponent = defineComponent({
  name: 'ShowCaseComponent',
  template: `
<section class="onview font-['IBM_Plex_Sans_Thai']" data-section="360_experience">
  <div class="lg:bg-[#907F5D] relative">
    <div class="flex flex-col">
      <div class="container py-10">
        <h2 class="text-[35px] text-center lg:text-white" :style="{fontFamily:fontClass()}">
          {{ title[language] }}
        </h2>

        <!-- Mobile: Custom select (เชื่อมกับ scenes เดียวกับแถบซ้าย) -->
        <div class="relative lg:hidden block my-5 z-10" ref="mobileSelectRef">
          <button
            type="button"
            class="project-detail-button-listM bg-[#182A44] bg-cover bg-center px-5 text-center w-full lg:py-3 py-2 text-white lg:text-[24px] text-[18px] relative"
            @click="isMobileOpen = !isMobileOpen"
            :aria-expanded="isMobileOpen"
            :aria-controls="'scene-mobile-dropdown'"
          >
            <p>{{ currentSceneLabel }}</p>
            <span class="absolute top-0 right-0 m-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="13.114" height="7.498" viewBox="0 0 13.114 7.498"
                   class="transition-transform" :class="{ 'rotate-180': isMobileOpen }">
                <path d="M12.747,16.484l4.958-4.962a.933.933,0,0,1,1.324,0,.945.945,0,0,1,0,1.327L13.41,18.471a.935.935,0,0,1-1.292.027L6.461,12.853a.937.937,0,0,1,1.324-1.327Z"
                      transform="translate(-6.188 -11.247)" fill="#f5f5f5"/>
              </svg>
            </span>
          </button>

          <!-- Dropdown -->
          <transition name="fade-scale">
            <div
              v-show="isMobileOpen"
              id="scene-mobile-dropdown"
              class="absolute left-0 top-full w-full border border-black p-3 bg-white z-30 space-y-2 shadow-lg"
            >
              <div
                v-for="scene in scenes"
                :key="scene.id"
                class="cursor-pointer"
                @click="selectMobileScene(scene.id)"
              >
                <h3
                  class="text-[18px] transition"
                  :class="activeButton === scene.id ? 'font-semibold text-[#182A44]' : 'font-light hover:font-normal'"
                >
                  {{ scene.label[language] || scene.label.en }}
                </h3>
              </div>
            </div>
          </transition>
        </div>

        <div class="relative lg:px-20 mt-5">
          <div class="relative">
            <div class="bg-black/20 relative z-0">
              <iframe
                :key="activeUrl"
                class="w-full lg:min-h-[600px] min-h-[400px]"
                :src="activeUrl"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <!-- Desktop (lg+): แถบซ้าย -->
            <div class="absolute left-0 top-0 w-1/5 bg-black/40 h-full lg:flex hidden z-20">
              <div class="m-auto w-full px-4">
                <div class="flex justify-center">
                  <img src="/assets/image/page-the-esse-complex/logo.png" alt="logo" />
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

    // เปลี่ยนซีน (desktop & mobile ใช้ร่วมกัน)
    const setActive = (id) => {
      if (activeButton.value === id) return;
      activeButton.value = id;
      // :key="activeUrl" จะบังคับ re-render iframe ให้โหลดซีนใหม่
    };

    // ===== Mobile custom select state & logic =====
    const isMobileOpen = ref(false);
    const mobileSelectRef = ref(null);

    const currentSceneLabel = computed(() => {
      const found = scenes.value.find(s => s.id === activeButton.value);
      return (found?.label?.[language.value]) || (found?.label?.en) || (language.value === 'th' ? 'เลือกซีน' : 'Choose a scene');
    });

    const selectMobileScene = (id) => {
      if (activeButton.value !== id) {
        activeButton.value = id; // ผูกกับแถบซ้ายโดยตรง
      }
      isMobileOpen.value = false;
    };

    // ปิด dropdown เมื่อคลิกนอก
    const onClickOutside = (e) => {
      if (!mobileSelectRef.value) return;
      if (!mobileSelectRef.value.contains(e.target)) {
        isMobileOpen.value = false;
      }
    };

    // ภาษา
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const fontClass = () => (language.value === 'en' ? 'Gotham' : '');

    const init = () => {
      if (window.AOS?.init) AOS.init();
    };

    onMounted(() => {
      language.value = getLanguageFromPath();
      nextTick(init);
      document.addEventListener('click', onClickOutside, true);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', onClickOutside, true);
    });

    return {
      language,
      scenes,
      activeButton,
      activeUrl,
      setActive,
      // mobile
      isMobileOpen,
      mobileSelectRef,
      currentSceneLabel,
      selectMobileScene,
      // misc
      fontClass,
      title,
    };
  },
});

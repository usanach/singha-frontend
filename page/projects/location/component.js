const LocationComponent = defineComponent({
  name: 'LocationComponent',
  template: `
    <section
        v-if="isDisabled"
        class="location-component py-10 onview"
        :style="{ backgroundColor: bgColor,backgroundImage:isLasoiedes?'url(/assets\/image\/page-la-soie-de-s\/location\/gettyimages-1151799998-170667a.png)':'' }"
        id="location"
        data-section="location"
      >

      <div
        class="container mx-auto flex flex-col"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-easing="linear"
      >
        <div class="relative z-10">
          <h2
            class="text-[35px] font-medium text-center uppercase"
            :style="{ fontFamily: fontFam(), color: titleColor }"
          >
            {{ title[language] }}
          </h2>
        </div>

        <div
          class="mx-auto cursor-pointer relative mt-5"
          v-if="imageUrl"
          @click="openModal"
        >
          <img :src="imageUrl" alt="MAP" class="w-full max-w-[850px] max-h-[680px]">
        </div>

        <div class="flex gap-5 justify-center mt-5" v-if="imageUrl || googleUrl">
          <button
            v-if="imageUrl"
            type="button"
            class="bg-[#B8A16F] px-5 p-2 text-white map-download"
            @click="downloadMap"
          >
            {{ btnDownload[language] }}
          </button>

          <a v-if="googleUrl" :href="googleUrl" target="_blank">
            <button type="button" class="bg-[#B8A16F] px-5 p-2 text-white">
              {{ btnGoogleMap[language] }}
            </button>
          </a>
        </div>
      </div>

      <div
        v-if="isModalOpen"
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-[9999]"
        @click.self="closeModal"
      >
        <div class="relative overflow-hidden" @click="zoomIn">
          <img
            ref="zoomedImage"
            :src="imageUrl"
            class="transition-transform duration-500 ease-in-out max-w-[850px] max-h-[680px] w-full"
            :style="{ transform: \`scale(\${zoomScale}) translate(\${translateX}px, \${translateY}px)\` }"
          >
        </div>
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-white text-lg"
        >✕</button>
      </div>
    </section>
  `,
  setup() {
    const isModalOpen = ref(false);
    const imageUrl = ref('');
    const googleUrl = ref('');
    const isDisabled = ref(false);

    const zoomScale = ref(1);
    const translateX = ref(0);
    const translateY = ref(0);
    const zoomedImage = ref(null);

    const title = { th: 'วิธีการเดินทาง', en: 'Location' };
    const btnDownload = { th: 'ดาวน์โหลดภาพ', en: 'Download Image' };
    const btnGoogleMap = { th: 'Google Map', en: 'Google Map' };

    const isLasoiedes = ref(false);

    const checkLasoiedesPath = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      isLasoiedes.value = path.includes('/house/private-estate/lasoiedes/sukhumvit43');
    };

    const language = ref(
      window.location.pathname.match(/\/(th|en)(\/|$)/)?.[1] || 'th'
    );

    const fontFam = () =>
      language.value === 'en' ? 'The Seasons' : 'DB OnUma';

    const openModal = () => {
      if (!imageUrl.value) return;
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
        zoomScale.value = 2;
        translateX.value = (-offsetX + rect.width / 2) / 2;
        translateY.value = (-offsetY + rect.height / 2) / 2;
      } else {
        zoomScale.value = 1;
        translateX.value = 0;
        translateY.value = 0;
      }
    };

    /* =========================
     * ✅ ใช้ api.js โหลดไฟล์
     * ========================= */
    const downloadMap = async () => {
      if (!imageUrl.value) return;

      const fileName =
        imageUrl.value.split('/').pop() || 'location_map.png';

      try {
        const res = await get(imageUrl.value, {
          responseType: 'blob'
        });

        const blobUrl = URL.createObjectURL(res.data);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch (e) {
        console.error('Download error:', e);
      }
    };

    const STORAGE_BASE =
      window.APP_CONFIG?.storageUrl ||
      'http://127.0.0.1:8000/storage/';

    const findProjectIdFromSeo = async () => {
      return projectIDs || null;
    };

    /* =========================
     * ✅ ใช้ getProjectLocation
     * ========================= */
    const fetchLocation = async () => {
      try {
        const projectId = await findProjectIdFromSeo();
        if (!projectId) return;

        const res = await getProjectLocation(projectId);
        const location = res.data?.location;

        if (!location) return;

        googleUrl.value = location.google_map || '';
        imageUrl.value = location.image?.file
          ? `${STORAGE_BASE}uploads/projects/${location.image.file}`
          : '';

        isDisabled.value = !!location.disabled;
      } catch (err) {
        console.error('Error loading location:', err);
      }
    };
    const titleColor = computed(() => {
      return isExtro.value ? '#FFFFFF' : '#312D1F';
    });
    
    const isExtro = computed(() => {
      return window.location.pathname.includes(
        '/condominium/the-extro/phayathai-rangnam'
      );
    });

    const bgColor = computed(() => {
      const path = window.location.pathname;

      if (path.includes('/condominium/the-extro/phayathai-rangnam')) {
        return '#234A59';
      }

      return '#E0DFDB';
    });

    onMounted(fetchLocation);

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
      fontFam,
      isDisabled,
      bgColor,
      isExtro,
      titleColor,isLasoiedes
    };
  }
});

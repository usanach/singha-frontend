const LocationComponent = defineComponent({
  name: 'LocationComponent',
  template: `
    <section
      v-if="isDisabled"
      class="location-component bg-[#E0DFDB] py-10 onview"
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
            class="text-[#312D1F] text-[35px] font-medium text-center uppercase"
            :style="{ fontFamily: fontFam() }"
          >
            {{ title[language] }}
          </h2>
        </div>

        <!-- Clickable Image -->
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

          <a v-if="googleUrl" :href="googleUrl" target="_blank" class="get-location">
            <button type="button" class="bg-[#B8A16F] px-5 p-2 text-white">
              {{ btnGoogleMap[language] }}
            </button>
          </a>
        </div>
      </div>

      <!-- Modal for Enlarged Image with Click-to-Zoom -->
      <div
        v-if="isModalOpen"
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-[9999]"
        @click.self="closeModal"
      >
        <div class="relative overflow-hidden" @click="zoomIn">
          <img
            ref="zoomedImage"
            :src="imageUrl"
            alt="Enlarged Map"
            class="transition-transform duration-500 ease-in-out max-w-[850px] max-h-[680px] lg:w-auto w-full"
            :style="{ transform: \`scale(\${zoomScale}) translate(\${translateX}px, \${translateY}px)\` }"
          >
        </div>
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-white rounded-full p-2 text-lg"
        >✕</button>
      </div>
    </section>
  `,
  setup() {
    const isModalOpen = ref(false);

    // จะให้เป็น reactive เพื่ออัปเดตจาก API
    const imageUrl   = ref('');  // fallback ค่อยใส่ทีหลัง
    const googleUrl  = ref('');
    const isDisabled = ref(false);

    const zoomScale   = ref(1);
    const translateX  = ref(0);
    const translateY  = ref(0);
    const zoomedImage = ref(null);

    // title / ปุ่ม (รองรับ multi language)
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
      en: 'Google Map'
    };

    // language จาก path
    const language = ref('th');
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const m = path.match(/\/(th|en)(\/|$)/);
      return m ? m[1] : 'th';
    };

    language.value = getLanguageFromPath();

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
        zoomScale.value = 2; // Zoom level
        translateX.value = (-offsetX + rect.width / 2) / 2;
        translateY.value = (-offsetY + rect.height / 2) / 2;
      } else {
        zoomScale.value = 1;
        translateX.value = 0;
        translateY.value = 0;
      }
    };

    const downloadMap = async () => {
    if (!imageUrl.value) return;

    // ดึงชื่อไฟล์จาก URL หรือใช้ default
    const fileName = imageUrl.value.split('/').pop() || 'location_map.png';

    try {
        // โหลดไฟล์เป็น blob (สำคัญมาก)
        const res = await axios.get(imageUrl.value, { responseType: 'blob' });

        const blobUrl = URL.createObjectURL(res.data);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;

        // ต้อง append เข้า DOM ก่อนบาง browser ถึงจะยอมคลิก
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(blobUrl);
    } catch (e) {
        console.error('Download error:', e);
    }
    };


    const fontFam = () => {
      return language.value === 'en' ? 'The Seasons' : 'DB OnUma';
    };


    const API_BASE = window.APP_CONFIG?.apiBaseUrl || 'http://127.0.0.1:8000/api';
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl || 'http://127.0.0.1:8000/storage/';


    const findProjectIdFromSeo = async () => {
      // const path = window.location.pathname;
      // const lang = language.value;

      // const res = await axios.get(`${API_BASE}/project/seo`);
      // const rows = Array.isArray(res.data?.data) ? res.data.data : [];

      // const enabledRows = rows.filter(r => (r.seo_disabled ?? 0) != 1);
      // const field = lang === 'en' ? 'seo_url_en' : 'seo_url_th';

      // const matched = enabledRows.find(row => row[field] === path);
      return projectIDs || null;
    };
    // 🎯 ดึงข้อมูลจาก API /project/location/{project_id}
    const fetchLocation = async () => {
      try {
        const projectId = await findProjectIdFromSeo();
        const res = await axios.get(`${API_BASE}/project/location/${projectId}`);
        const location = res.data?.location || null;

        if (!location) {
          // ถ้าไม่มีข้อมูลใน DB → ใช้ fallback เดิมก็ได้
          imageUrl.value  = '/assets/image/page-siraninn/location/map.png';
          googleUrl.value = '';
          isDisabled.value = false;
          return;
        }
        googleUrl.value = location.google_map || '';
        imageUrl.value  = `${STORAGE_BASE}uploads/projects/${location.image?.file}` || '';
        isDisabled.value = !!location.disabled;
      } catch (err) {
        console.error('Error loading location:', err);
        // fallback เวลา API พัง
        imageUrl.value  = '';
        googleUrl.value = '';
        isDisabled.value = false;
      }
    };

    onMounted(async () => {
      await fetchLocation();
    });

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
      isDisabled
    };
  }
});

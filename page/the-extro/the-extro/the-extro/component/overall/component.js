const OverallProgressComponent = defineComponent({
  name: 'OverallProgressComponent',
  props: {
    title: {
      type: Object,
      default: () => ({ en: "Progress" })
    },
    translations: {
      type: Array,
      default: () => [
        { key: "overallStatus", en: "OVERALL STATUS" },
        { key: "dateLabel", en: "Date" },
        { key: "progressPicture", en: "PROGRESS PICTURE" },
        { key: "updatedOn", en: "Updated On" },
        { key: "approvedProjects", en: "Projects With Approved EIA Reports And Construction Permits." }
      ]
    },
    // JSON data that drives the select option and the displayed content
    dataList: {
      type: Array,
      default: () => [
        {
          date: "20/02/2025",
          overallProgress: 90.05,
          progressItems: [
            { label: 'Structure Work', percentage: 99.84 },
            { label: 'SYSTEMS INSTALLATION', percentage: 93.27 },
            { label: 'ARCHITECTURE WORK', percentage: 96.15 },
            { label: 'FACADE WORK', percentage: 93.42 },
            { label: 'INTERIOR WORK', percentage: 88.86 }
          ],
          progressDetails: [
            { en: "- The Environmental Impact Assessment Has Been Approved." },
            { en: "- Request For A Construction Permit Has Already Been Filed Under Section 39" },
            { en: "- Expected Completion Date: March 2024" },
            { en: "- Under Construction." },
            { en: "- 90.05% Of Overall Construction Work Completed" }
          ],
          progressImages: [
            '/assets/image/page-the-extro/the-extro/overall-progress/1.webp',
            '/assets/image/page-the-extro/the-extro/overall-progress/2.webp',
            '/assets/image/page-the-extro/the-extro/overall-progress/3.webp',
            '/assets/image/page-the-extro/the-extro/overall-progress/1.webp',
            '/assets/image/page-the-extro/the-extro/overall-progress/2.webp'
          ]
        }
        // You can add more objects here as needed
      ]
    }
  },
  template: `
    <section class="onview" id="OverallProgressComponent" data-section="overall_progress">
      <div class="grid lg:grid-cols-6">
        <!-- Left Side: Overall Status and Date Select -->
        <div class="lg:col-span-2 bg-[url('/assets/image/page-the-extro/the-extro/project-information/tab-bg.webp')] bg-cover bg-center md:px-10 px-5 py-20">
          <div class="leading-none">
            <h2 class="text-white text-[50px] lg:text-[60px] font-bold uppercase md:text-left text-center"
                data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
              {{ title.en }}
            </h2>
            <p class="text-white text-[30px] lg:text-[30px] font-bold uppercase md:-ml-5 md:text-left text-center"
               data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
              {{ getTranslation('overallStatus') }}
            </p>
          </div>
          <!-- Date Select Option populated from JSON -->
          <div class="leading-none mt-10">
            <p class="text-white text-[18px] font-bold">{{ getTranslation('dateLabel') }}:</p>
            <div class="mt-1">
              <select v-model="selectedDataIndex" @change="updateCurrentData" class="form-select bg-transparent text-white border-b text-[24px]">
                <option v-for="(data, index) in dataList" :key="index" :value="index">
                  {{ getFormattedDate(data.date) }}
                </option>
              </select>
            </div>
          </div>
          <div class="mt-5">
            <p class="text-white font-thin md:text-[110px] text-[90px] leading-none md:text-left text-center">
              {{ getOverallProgressFormatted() }}%
            </p>
          </div>
          <div class="mt-5 lg:block hidden">
            <!-- Button to toggle carousel -->
            <button type="button" @click="toggleExpand" class="bg-[#BC6F2D] px-5 p-2 text-white flex gap-5">
              {{ getTranslation('progressPicture') }}
              <span :class="['chev-down-icon', 'my-auto', { 'rotate-180': isExpanded }]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12.625" height="6.812" viewBox="0 0 12.625 6.812">
                  <path d="M883,2408.5l-5.606,5.605-5.606-5.605" transform="translate(-871.086 -2407.793)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
                </svg>
              </span>
            </button>
            <!-- Carousel/Swiper placeholder -->
            <div v-if="isExpanded" class="mt-10">
              <!-- Carousel content goes here -->
            </div>
          </div>
        </div>
        <!-- Right Side: Progress Items and Details -->
        <div class="lg:col-span-4 bg-[#F3F1EB] lg:py-20 py-10 lg:px-0 px-5">
          <div class="flex flex-col lg:w-3/4 w-full mx-auto">
            <!-- Dynamic progress items from JSON -->
            <div v-for="(item, index) in currentData.progressItems" :key="index" class="mb-5">
              <div class="flex justify-between w-full">
                <p class="text-[#5D4F48] text-[14px] uppercase flex my-auto">
                  {{ item.label }}
                </p>
                <p class="text-[#5D4F48] text-[18px] uppercase">
                  {{ item.percentage }}%
                </p>
              </div>
              <div class="flex w-full mt-5">
                <progress class="h-[2px] w-full" :value="item.percentage" max="100"></progress>
              </div>
            </div>
            <!-- Progress Details -->
            <div class="mt-5">
              <p class="text-[20px] text-center lg:text-left font-bold">
                {{ getTranslation('updatedOn') }} {{ getFormattedDate(currentData.date) }}
              </p>
              <div v-if="isExpanded" v-for="(detail, index) in currentData.progressDetails" :key="index">
                <p>{{ detail.en }}</p>
              </div>
              <br/>
              <p class="font-bold text-center lg:text-left">{{ getTranslation('approvedProjects') }}</p>
            </div>
            <!-- Mobile: Toggle carousel button and carousel (similar to above) -->
          </div>
        </div>
      </div>
    </section>
  `,
  setup(props) {
    const language = ref('en');
    const getTranslation = (key) => {
      const item = props.translations.find(t => t.key === key);
      return item ? item.en : '';
    };

    // Use the JSON data to drive the display
    const selectedDataIndex = ref(0);
    const currentData = ref({});

    const updateCurrentData = () => {
      currentData.value = props.dataList[selectedDataIndex.value];
    };

    // Helper function to convert a "dd/mm/yyyy" date string into "Month dd,yyyy" format.
    // For example, "20/02/2025" becomes "February 20,2025" (which follows the desired style, e.g., "May 02,2024").
    const getFormattedDate = (dateStr) => {
      if (!dateStr) return '';
      const parts = dateStr.split('/');
      if (parts.length !== 3) return dateStr;
      const [day, month, year] = parts;
      // Create a date object. Note: month is zero-indexed.
      const dateObj = new Date(year, month - 1, day);
      // Format using full month name and 2-digit day.
      return dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      });
    };

    // Initialize on mount
    onMounted(() => {
      updateCurrentData();
    });

    // Carousel logic (using currentData.progressImages if available)
    const currentSlide = ref(0);
    const thumbStart = ref(0);
    const isExpanded = ref(false);
    const getThumbStyle = () => ({
      transform: "translateX(-" + (thumbStart.value * 33.33) + "%)",
      transition: "transform 0.3s ease"
    });
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value;
    };
    const nextSlide = () => {
      if (
        currentData.value.progressImages &&
        currentSlide.value < currentData.value.progressImages.length - 1
      ) {
        currentSlide.value++;
        if (currentSlide.value >= thumbStart.value + 3) {
          thumbStart.value = currentSlide.value - 2;
        }
      }
    };
    const prevSlide = () => {
      if (currentData.value.progressImages && currentSlide.value > 0) {
        currentSlide.value--;
        if (currentSlide.value < thumbStart.value) {
          thumbStart.value = currentSlide.value;
        }
      }
    };
    const goToSlide = (index) => {
      currentSlide.value = index;
      if (currentSlide.value >= thumbStart.value + 3) {
        thumbStart.value = currentSlide.value - 2;
      } else if (currentSlide.value < thumbStart.value) {
        thumbStart.value = currentSlide.value;
      }
    };
    const prevThumb = () => {
      if (thumbStart.value > 0) {
        thumbStart.value--;
      }
    };
    const nextThumb = () => {
      if (
        currentData.value.progressImages &&
        thumbStart.value < currentData.value.progressImages.length - 3
      ) {
        thumbStart.value++;
      }
    };

    // Return overall progress from currentData; fallback if not set
    const getOverallProgressFormatted = () => {
      return currentData.value.overallProgress
        ? currentData.value.overallProgress.toFixed(2)
        : "0.00";
    };

    return {
      language,
      getTranslation,
      selectedDataIndex,
      updateCurrentData,
      currentData,
      isExpanded,
      toggleExpand,
      currentSlide,
      goToSlide,
      nextSlide,
      prevSlide,
      thumbStart,
      getThumbStyle,
      nextThumb,
      prevThumb,
      getOverallProgressFormatted,
      dataList: props.dataList,
      getFormattedDate
    };
  }
});

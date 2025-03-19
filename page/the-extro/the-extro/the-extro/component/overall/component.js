const OverallProgressComponent = defineComponent({
    name: 'OverallProgressComponent',
    template: `
    <section class="onview" id="OverallProgressComponent" data-section="overall_progress">
      <div class="grid lg:grid-cols-6">
        <!-- Left Side: Overall Status -->
        <div class="lg:col-span-2 bg-[url('/assets/image/page-the-extro/the-extro/project-information/tab-bg.png')] bg-cover bg-center md:px-10 px-5 py-20">
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
          <div class="leading-none mt-10">
            <p class="text-white text-[18px] font-bold">{{ getTranslation('dateLabel') }}:</p>
            <div class="date-picker-container relative w-fit mt-1">
              <div class="absolute top-0 left-0 w-full h-full flex">
                <span class="date-placeholder text-white my-auto text-[24px]" id="datePlaceholder">
                  {{ formattedDate || 'March 19, 2025' }}
                </span>
              </div>
              <input type="date" id="nativeDate" class="native-date-input form-control" lang="en-US">
              <input type="text" id="displayDate" class="relative bg-transparent border-b text-[24px] text-white focus-visible:outline-none" name="BIRTHDAY" readonly autocomplete="off">
              <div class="absolute right-0 top-0 h-full flex">
                <span class="chev-down-icon my-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12.625" height="6.812" viewBox="0 0 12.625 6.812">
                    <path id="Path_34" data-name="Path 34" d="M883,2408.5l-5.606,5.605-5.606-5.605" transform="translate(-871.086 -2407.793)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
                  </svg>
                </span>
              </div>
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
                  <path id="Path_34" data-name="Path 34" d="M883,2408.5l-5.606,5.605-5.606-5.605" transform="translate(-871.086 -2407.793)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
                </svg>
              </span>
            </button>
            <!-- Carousel/Swiper placeholder -->
            <div v-if="isExpanded" class="mt-10">
                <div class="px-10 relative">
                <!-- Main Swiper -->
                <div class="swiper-container px-5">
                    <div v-for="(image, index) in progressImages" :key="index" v-show="index === currentSlide">
                    <img :src="image" class="w-full" />
                    </div>
                    <!-- Navigation arrows -->
                    <div class="absolute top-0 w-full h-full left-0 flex justify-between">
                    <div class="my-auto">
                        <img 
                        @click="prevSlide" 
                        src="/assets/image/residential/Button-Icon.png" 
                        alt="prev icon" 
                        :class="['rotate-180', currentSlide === 0 ? 'opacity-50 pointer-events-none' : 'cursor-pointer']">
                    </div>
                    <div class="my-auto relative">
                        <span class="absolute top-0 -mt-5 left-0 text-white text-[12px]">
                        {{ currentSlide + 1 }}/{{ progressImages.length }}
                        </span>
                        <img 
                        @click="nextSlide" 
                        src="/assets/image/residential/Button-Icon.png" 
                        alt="next icon" 
                        :class="currentSlide === progressImages.length - 1 ? 'opacity-50 pointer-events-none' : 'cursor-pointer'">
                    </div>
                    </div>
                </div>
                </div>
                <!-- Thumbnails Section -->
                <div class="px-10 relative mt-2">
                <div class="flex items-center px-5">
                    <!-- Thumbnails container with sliding effect -->
                    <div class="overflow-hidden w-full">
                    <div class="flex transition-transform duration-300" :style="getThumbStyle()">
                        <div v-for="(image, index) in progressImages" :key="index"
                            @click="goToSlide(index)"
                            
                            class="cursor-pointer w-1/3 flex-shrink-0 pr-2">
                        <img :src="image":class="{'border-2 border-white': index === currentSlide}" />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </div>
        <!-- Right Side: Progress Items and Details -->
        <div class="lg:col-span-4 bg-[#F3F1EB] lg:py-20 py-10 lg:px-0 px-5">
          <div class="flex flex-col lg:w-3/4 w-full mx-auto">
            <!-- Dynamic progress items -->
            <div v-for="(item, index) in progressItems" :key="index" class="mb-5">
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
            <!-- Dynamic progress details using a simple array -->
            <div class="mt-5">
                <p class="text-[20px] text-center lg:text-left font-bold">
                {{ getTranslation('updatedOn') }} {{ formattedDate }}
                </p>
                <div v-if="isExpanded" v-for="(detail, index) in progressDetails" :key="index">
                <p>{{ detail.en }}</p>
                </div>
                <br/>
                <p class="font-bold text-center lg:text-left">{{ getTranslation('approvedProjects') }}</p>
            </div>
            
          <div class="mt-5 lg:hidden block">
            <!-- Button to toggle carousel -->
            <button type="button" @click="toggleExpand" class="bg-[#BC6F2D] px-5 p-2 text-white flex gap-5 mx-auto">
              {{ getTranslation('progressPicture') }}
              <span :class="['chev-down-icon', 'my-auto', { 'rotate-180': isExpanded }]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12.625" height="6.812" viewBox="0 0 12.625 6.812">
                  <path id="Path_34" data-name="Path 34" d="M883,2408.5l-5.606,5.605-5.606-5.605" transform="translate(-871.086 -2407.793)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
                </svg>
              </span>
            </button>
            <!-- Carousel/Swiper placeholder -->
            <div v-if="isExpanded" class="mt-10">
                <div class="px-10 relative">
                <!-- Main Swiper -->
                <div class="swiper-container px-5">
                    <div v-for="(image, index) in progressImages" :key="index" v-show="index === currentSlide">
                    <img :src="image" class="w-full" />
                    </div>
                    <!-- Navigation arrows -->
                    <div class="absolute top-0 w-full h-full left-0 flex justify-between">
                    <div class="my-auto">
                        <img 
                        @click="prevSlide" 
                        src="/assets/image/residential/Button-Icon.png" 
                        alt="prev icon" 
                        :class="['rotate-180', currentSlide === 0 ? 'opacity-50 pointer-events-none' : 'cursor-pointer']">
                    </div>
                    <div class="my-auto relative">
                        <span class="absolute top-0 -mt-5 left-0 text-white text-[12px]">
                        {{ currentSlide + 1 }}/{{ progressImages.length }}
                        </span>
                        <img 
                        @click="nextSlide" 
                        src="/assets/image/residential/Button-Icon.png" 
                        alt="next icon" 
                        :class="currentSlide === progressImages.length - 1 ? 'opacity-50 pointer-events-none' : 'cursor-pointer'">
                    </div>
                    </div>
                </div>
                </div>
                <!-- Thumbnails Section -->
                <div class="px-10 relative mt-2">
                <div class="flex items-center px-5">
                    <!-- Thumbnails container with sliding effect -->
                    <div class="overflow-hidden w-full">
                    <div class="flex transition-transform duration-300" :style="getThumbStyle()">
                        <div v-for="(image, index) in progressImages" :key="index"
                            @click="goToSlide(index)"
                            
                            class="cursor-pointer w-1/3 flex-shrink-0 pr-2">
                        <img :src="image":class="{'border-2 border-white': index === currentSlide}" />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  `,
    setup() {
        // For now, both 'en' and 'th' use English text
        const language = ref('en');
        const title = ref({
            en: "Progress"
        });

        // Fixed text translations (only English)
        const translations = ref([
            { key: "overallStatus", en: "OVERALL STATUS" },
            { key: "dateLabel", en: "Date" },
            { key: "progressPicture", en: "PROGRESS PICTURE" },
            { key: "updatedOn", en: "Updated On" },
            { key: "approvedProjects", en: "Projects With Approved EIA Reports And Construction Permits." }
        ]);

        function getTranslation(key) {
            const item = translations.value.find(t => t.key === key);
            return item ? item.en : '';
        }

        // Progress details array (only English)
        const progressDetails = ref([
            { en: "- The Environmental Impact Assessment Has Been Approved." },
            { en: "- Request For A Construction Permit Has Already Been Filed Under Section 39" },
            { en: "- Expected Completion Date: March 2024" },
            { en: "- Under Construction." },
            { en: "- 90.05% Of Overall Construction Work Completed" }
        ]);

        // Set selectedDate default to today's date (YYYY-MM-DD)
        const selectedDate = ref(new Date().toISOString().substr(0, 10));
        const formattedDate = ref('');
        function handleDateChange() {
            if (!selectedDate.value) {
                formattedDate.value = '';
                return;
            }
            const date = new Date(selectedDate.value);
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            formattedDate.value = date.toLocaleDateString('en-US', options);
        }

        // Overall progress value
        const overallProgress = ref(90.05);
        function getOverallProgressFormatted() {
            return overallProgress.value.toFixed(2);
        }

        // Dynamic progress items
        const progressItems = ref([
            { label: 'Structure Work', percentage: 99.84 },
            { label: 'SYSTEMS INSTALLATION', percentage: 93.27 },
            { label: 'ARCHITECTURE WORK', percentage: 96.15 },
            { label: 'FACADE WORK', percentage: 93.42 },
            { label: 'INTERIOR WORK', percentage: 88.86 }
        ]);

        // Carousel data
        const currentSlide = ref(0);
        const progressImages = ref([
            '/assets/image/page-the-extro/the-extro/overall-progress/1.png',
            '/assets/image/page-the-extro/the-extro/overall-progress/2.png',
            '/assets/image/page-the-extro/the-extro/overall-progress/3.png',
            '/assets/image/page-the-extro/the-extro/overall-progress/1.png',
            '/assets/image/page-the-extro/the-extro/overall-progress/2.png'
        ]);
        const thumbStart = ref(0);
        function getThumbStyle() {
            return {
                transform: "translateX(-" + (thumbStart.value * 33.33) + "%)",
                transition: "transform 0.3s ease"
            };
        }
        function toggleExpand() {
            isExpanded.value = !isExpanded.value;
        }
        function nextSlide() {
            if (currentSlide.value < progressImages.value.length - 1) {
                currentSlide.value++;
                if (currentSlide.value >= thumbStart.value + 3) {
                    thumbStart.value = currentSlide.value - 2;
                }
            }
        }
        function prevSlide() {
            if (currentSlide.value > 0) {
                currentSlide.value--;
                if (currentSlide.value < thumbStart.value) {
                    thumbStart.value = currentSlide.value;
                }
            }
        }
        function goToSlide(index) {
            currentSlide.value = index;
            if (currentSlide.value >= thumbStart.value + 3) {
                thumbStart.value = currentSlide.value - 2;
            } else if (currentSlide.value < thumbStart.value) {
                thumbStart.value = currentSlide.value;
            }
        }
        function prevThumb() {
            if (thumbStart.value > 0) {
                thumbStart.value--;
            }
        }
        function nextThumb() {
            if (thumbStart.value < progressImages.value.length - 3) {
                thumbStart.value++;
            }
        }

        const isExpanded = ref(false);
        onMounted(function () {
            handleDateChange();

            const nativeDateInput = document.getElementById('nativeDate');
            const displayDateInput = document.getElementById('displayDate');
            const datePlaceholder = document.getElementById('datePlaceholder');
            const dateIcon = document.querySelector('.chev-down-icon');

            nativeDateInput.value = selectedDate.value;

            function updateDisplayDate() {
                if (nativeDateInput.value) {
                    const dateObj = new Date(nativeDateInput.value);
                    const month = dateObj.toLocaleString('en-US', { month: 'long' });
                    const day = dateObj.getDate();
                    const year = dateObj.getFullYear();
                    displayDateInput.value = month + " " + day + "," + year;
                    datePlaceholder.style.opacity = '0';
                } else {
                    displayDateInput.value = '';
                    datePlaceholder.style.opacity = '1';
                }
            }
            function showCalendar() {
                if (typeof nativeDateInput.showPicker === "function") {
                    nativeDateInput.showPicker();
                } else {
                    nativeDateInput.click();
                }
            }
            displayDateInput.addEventListener('click', showCalendar);
            displayDateInput.addEventListener('focus', showCalendar);
            dateIcon.addEventListener('click', showCalendar);
            dateIcon.addEventListener('focus', showCalendar);
            nativeDateInput.addEventListener('change', updateDisplayDate);
            nativeDateInput.addEventListener('input', updateDisplayDate);
            displayDateInput.addEventListener('blur', function () {
                if (!displayDateInput.value) {
                    datePlaceholder.style.opacity = '1';
                }
            });
            updateDisplayDate();
        });

        return {
            language,
            title,
            getTranslation,
            progressDetails,
            selectedDate,
            formattedDate,
            handleDateChange,
            isExpanded,
            toggleExpand,
            currentSlide,
            progressImages,
            nextSlide,
            prevSlide,
            goToSlide,
            thumbStart,
            prevThumb,
            nextThumb,
            getThumbStyle,
            overallProgress,
            getOverallProgressFormatted,
            progressItems
        };
    }
});

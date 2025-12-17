// Define the Lifestyle component (no v-html, no loadTemplate)
const LifestyleComponent = defineComponent({
  name: 'LifestyleComponent',
  template: `
    <section id="lifeStyle">
      <div class="bg-[#F8F3ED] pb-10 bg-[url('./../assets/image/background/lifestyle-bg.svg')] bg-cover bg-center bg-no-repeat">
        <div class="py-10 pb-20 bg-[url('./../assets/image/lifestyle/S05-Recommended_by_designer.webp')] bg-cover bg-center">
          <div class="container pb-20 leading-tight">
            <h2
              data-aos="fade-in"
              data-aos-duration="1000"
              data-aos-easing="linear"
              :class="[fontClass, 'text-white text-[35px] uppercase text-center']"
            >
              {{ titleText }}
            </h2>

            <h2
              data-aos="fade-in"
              data-aos-duration="1000"
              data-aos-easing="linear"
              data-aos-delay="100"
              :class="[fontClass, 'text-white text-[35px] uppercase text-center font-thin']"
            >
              {{ detailText }}
            </h2>
          </div>
        </div>

        <div class="container lg:-mt-[10rem] -mt-[8rem]">
          <div class="lg:w-3/4 mx-auto px-10 mt-10">

            <!-- LARGE -->
            <div
              v-if="largeItem"
              class="flex lg:flex-row flex-col shadow-xl"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="linear"
              data-aos-delay="200"
            >
              <div class="w-full">
                <a :href="largeItem.url?.[language]">
                  <img :src="largeItem.lifestyle?.l" :alt="largeItem.topic" class="w-full">
                </a>
              </div>

              <div class="bg-white flex flex-col w-full">
                <div class="px-5 pt-5 pb-3 flex flex-col h-full">
                  <div>
                    <a :href="largeItem.url?.[language]">
                      <p
                        class="font-[400] border text-[16px] border-[3px] border-[#786028] border-r-0 border-t-0 border-b-0 leading-tight pl-3 text-[#696969] uppercase"
                      >
                        {{ largeItem.cate }}
                      </p>
                    </a>
                  </div>

                  <div class="lg:mb-auto mt-5">
                    <a :href="largeItem.url?.[language]">
                      <h3 class="text-[22px] font-normal">
                        {{ largeItem.title }}
                      </h3>
                    </a>
                  </div>
                </div>

                <hr class="w-full border-[#E2E2E2]" />

                <div class="flex px-5 py-3 gap-5">
                  <a class="flex gap-1" :href="largeItem.url?.[language]">
                    <p class="text-[#A3A3A3] text-[15px] my-auto font-[400]">
                      {{ formatDate(largeItem.date) }}
                    </p>
                  </a>
                </div>
              </div>
            </div>

            <!-- SMALL -->
            <div class="mt-5">
              <ul class="flex gap-5 flex-wrap">
                <li
                  v-for="(a, idx) in smallItems"
                  :key="idx"
                  class="lg:flex-[1_1_30%] flex-[1_1_100%] shadow-xl animate-border-hover flex flex-col"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-easing="linear"
                  data-aos-delay="300"
                >
                  <a :href="a.url?.[language]" target="_blank">
                    <div class="object-cover h-[223px] overflow-hidden">
                      <img :src="a.lifestyle?.s" :alt="a.topic" class="w-full">
                    </div>
                  </a>

                  <div class="bg-white flex flex-col h-full">
                    <div class="px-5 lg:pt-5 pt-5 pb-2 flex flex-col h-full lg:min-h-[150px]">
                      <div>
                        <a :href="a.url?.[language]" target="_blank">
                          <p
                            class="text-[16px] uppercase border border-[3px] border-[#786028] border-r-0 border-t-0 border-b-0 leading-tight pl-3 text-[#696969]"
                          >
                            {{ a.cate }}
                          </p>
                        </a>
                      </div>

                      <div class="mb-auto mt-3">
                        <a :href="a.url?.[language]" target="_blank">
                          <h3 class="text-[16px] font-normal">
                            {{ (a.title || '').replace('<br/>', '') }}
                          </h3>
                        </a>
                      </div>
                    </div>

                    <hr class="w-full border-[#E2E2E2]" />

                    <div class="flex px-5 py-3 gap-5">
                      <div class="flex gap-1">
                        <p class="text-[#A3A3A3] text-[15px] my-auto">
                          {{ formatDate(a.date) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="flex">
              <a :href="'/' + language + '/stories'" target="_blank" class="btn mt-10 mx-auto group flex w-fit mx-auto !pr-2">
                {{ moreText }}
                <span class="my-auto">
                  <img class="group-hover:block hidden" src="/assets/icon/explore.svg" alt="icon">
                  <img class="group-hover:hidden" src="/assets/icon/explore-white.svg" alt="icon">
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  `,
    setup() {
    const language = ref('th');
    const articles = ref([]);

    const { storageUrl = '' } = window.APP_CONFIG || {};

    const getLanguageFromPath = () => {
        const m = window.location.pathname.match(/\/(th|en)(\/|$)/);
        return m ? m[1] : 'th';
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);

        if (language.value === 'en') {
        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(date);
        }

        const thMonths = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
        ];

        return `${date.getDate()} ${thMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
    };

    /* ===============================
    * TEXT
    * =============================== */
    const titleText = computed(() =>
        language.value === 'en'
        ? 'ELEVATE YOUR LIFESTYLE'
        : 'เติมเต็มไลฟ์สไตล์ของคุณ'
    );

    const detailText = computed(() =>
        language.value === 'en'
        ? 'BY OUR STORIES'
        : 'ผ่านโครงการของเรา'
    );

    const moreText = computed(() =>
        language.value === 'en'
        ? 'Explore more'
        : 'ดูเพิ่มเติม'
    );

    const fontClass = computed(() =>
        language.value === 'en' ? "font-['SinghaEstate']" : ''
    );

    /* ===============================
    * PICK ITEMS (เหมือนเดิม)
    * =============================== */
    const largeItem = computed(() => articles.value[0] || null);

    const smallItems = computed(() => {
        const a = articles.value || [];
        return [a[3], a[4], a[1]].filter(Boolean);
    });

    /* ===============================
    * LOAD ARTICLES FROM API
    * =============================== */
    const loadArticles = async () => {
        try {
        const res = await getArticle();
        const list = res?.data?.data || [];

        articles.value = list.map(item => ({
            id: item.id,
            title: item.title?.[language.value] || '',
            topic: item.title?.[language.value] || '',
            cate: item.tag || 'STORY',
            date: item.date_start,
            url: {
            th: item.url_th,
            en: item.url_en,
            },
            lifestyle: {
            // ✅ ใช้ storageUrl จาก config.js
            l: item.lifestyle_image
                ? `${storageUrl}uploads/article/${item.lifestyle_image}`
                : '',
            s: item.lifestyle_image
                ? `${storageUrl}uploads/article/${item.lifestyle_image}`
                : '',
            },
        }));
        } catch (error) {
        console.error('loadArticles error:', error);
        articles.value = [];
        }
    };

    const initAOS = () => {
        if (window.AOS) window.AOS.init();
    };

    onMounted(async () => {
        language.value = getLanguageFromPath();
        await loadArticles();
        nextTick(() => initAOS());
    });

    return {
        language,
        titleText,
        detailText,
        moreText,
        fontClass,
        largeItem,
        smallItems,
        formatDate,
    };
    }
});

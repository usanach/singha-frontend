
const ContentComponent = defineComponent({
  name: 'ContentComponent',
  props: {
    articleData: { type: Array, default: () => [] },
    landing_page: { type: String, default: 'story_page' }
  },
  setup(props) {
    const language = ref('th');
    const articles = ref([]);
    const visibleCount = ref(2);

    const fetchArticles = async () => {
      try {
        const res = await axios.get('/data/article.json');
        articles.value = res.data;
      } catch (err) {
        console.error('Error loading articles:', err);
      }
    };

    const paginatedList = computed(() => {
      const pages = [];
      for (let i = 0; i < articles.value.length; i += 3) {
        pages.push(articles.value.slice(i, i + 3));
      }
      return pages.map((chunk, pageIndex) => ({
        items: chunk,
        layout: pageIndex % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row',
        width: pageIndex % 2 === 0 ? 'w-[90%]' : 'w-full',
        hidden: pageIndex >= visibleCount.value
      }));
    });

    const totalPages = computed(() => paginatedList.value.length);

    const expandMore = () => {
      visibleCount.value = totalPages.value;
      trackEvent('explore_more_content');
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    };

    const selectArticle = (link, title) => {
      trackEvent('click_content', { article_name: title });
      window.open(link, '_blank');
    };

    const trackEvent = (action, extra = {}) => {
      const payload = {
        event: action,
        landing_page: props.landing_page,
        section: 'content_container',
        event_action: 'click',
        ...extra
      };
      if (window.setDataLayer) window.setDataLayer(payload);
    };

    const detectLang = () => {
      const match = window.location.pathname.match(/\/(th|en)(\/|$)/);
      language.value = match ? match[1] : 'th';
    };

    const headingText = computed(() => {
      const total = articles.value.length;
      const shown = Math.min(visibleCount.value * 3, total);
      const label = language.value === 'en' ? 'contents' : 'เรื่องน่าสนใจ';
      // return `${total} ${label} (${shown}/${total})`;
    });

    onMounted(async () => {
      detectLang();
      await fetchArticles();
      AOS.init();
    });

    return {
      language,
      paginatedList,
      headingText,
      visibleCount,
      totalPages,
      expandMore,
      selectArticle
    };
  },
  template: `
    <section class="content-trigger-pin">
      <div class="relative bg-[url('./../assets/image/story/story-bg.svg')] bg-cover bg-no-repeat bg-bottom">
        <div class="container py-10">
          <div class="pagination lg:w-3/4 mx-auto">
            <h2 class="lg:text-[20px] text-[14px] font-normal text-white uppercase" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear">
              {{ headingText }}
            </h2>
          </div>

          <div id="content_list" class="flex gap-5 flex-col lg:w-3/4 mx-auto mt-5">
            <ul>
              <li v-for="(page, idx) in paginatedList" :key="idx" :class="[page.hidden ? 'hidden' : '', 'mt-5']">
                <div class="w-full">
                  <div :class="['flex gap-5 lg:gap-10', page.layout, 'flex-col mt-2']">
                    <!-- Large Item -->
                    <div class="lg:w-1/2 w-full flex flex-col gap-5" v-if="page.items[0]">
                      <img :src="page.items[0].thumb" :alt="page.items[0].topic" data-aos="fade-up" data-aos-duration="700" data-aos-easing="linear" data-aos-anchor=".content-trigger-pin">
                      <div class="space-y-2">
                        <p class="uppercase text-[15px] border border-[3px] border-[#786028] border-r-0 border-t-0 border-b-0 leading-tight pl-3 text-white" data-aos="fade-up">
                          {{ page.items[0].cate }}
                        </p>
                        <h3 @click="selectArticle(page.items[0].url[language], page.items[0].topic)" class="text-white font-normal text-[22px] leading-snug cursor-pointer" data-aos="fade-up">
                          {{ page.items[0].title }}
                        </h3>
                        <p class="text-white text-[16px] truncate-lines-2" data-aos="fade-up">
                          {{ page.items[0].description }}
                        </p>
                        <p class="text-[#A3A3A3] text-[15px]" data-aos="fade-up">
                          {{ page.items[0].date }}
                        </p>
                      </div>
                      <hr class="border border-t-0 border-l-0 border-r-0 border-white/30" />
                    </div>
                    <!-- Small Items -->
                    <div class="lg:w-1/2 w-full flex flex-col gap-5">
                      <div v-for="(item, i2) in page.items.slice(1)" :key="i2" class="flex flex-col lg:gap-0 gap-2">
                        <div class="flex gap-5 lg:gap-0 relative">
                          <img class="w-2/5 md:h-[180px] h-[150px] object-cover" :src="item.thumb" :alt="item.topic" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear" data-aos-anchor=".content-trigger-pin">
                          <div class="w-3/5 lg:px-5 lg:pb-2 flex flex-col gap-2 h-full">
                            <p class="uppercase text-[15px] border border-[3px] border-[#786028] border-r-0 border-t-0 border-b-0 leading-tight pl-3 text-white" data-aos="fade-up">
                              {{ item.cate }}
                            </p>
                            <h3 @click="selectArticle(item.url[language], item.topic)" class="text-white font-normal lg:text-[22px] text-[18px] leading-snug cursor-pointer" data-aos="fade-up">
                              {{ item.title }}
                            </h3>
                            <p class="text-white text-[16px] truncate-lines-3" data-aos="fade-up">
                              {{ item.description}}
                            </p>
                            <p class="text-[#A3A3A3] text-[15px]" data-aos="fade-up">
                              {{ item.date }}
                            </p>
                          </div>
                        </div>
                        <hr class="mt-5 border border-t-0 border-l-0 border-r-0 border-white/30" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="flex">
            <button v-if="visibleCount < totalPages" @click="expandMore" class="btn mt-10 mx-auto font-['SinghaEstate']" data-aos="fade-up" data-aos-duration="500">
              {{ language === 'en' ? 'Explore more' : 'ดูเพิ่มเติม​' }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `
});
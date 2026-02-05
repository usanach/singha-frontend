let hightLightSwipe = null;

const BannerComponent = defineComponent({
    name: 'BannerComponent',
    template: `
    <div class="section-1-trigger">
      <section class="pt-10" data-aos="fade-up" data-aos-duration="1000">
        <div class="md:bg-[url('./../assets/image/story/bg.webp')] bg-[url('./../assets/image/story/bg-m.webp')] bg-cover bg-no-repeat py-10 relative">
          <div class="container lg:pt-5">
            <div>
              <h1
                class="text-[35px] text-center uppercase"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="linear"
                data-aos-anchor=".section-1-trigger"
              >
                {{ headingText[language] }}
              </h1>
              <h2
                class="text-center text-[22px]"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="linear"
                data-aos-delay="100"
                data-aos-anchor=".section-1-trigger"
              >
                {{ subheadingText[language] }}
              </h2>
            </div>
          </div>

          <div class="container md:mt-10 mt-5">
            <div class="flex gap-5 lg:flex-row flex-col h-full lg:w-3/4 mx-auto">
              <!-- LEFT : SWIPER -->
              <div
                class="lg:w-1/2 lg:px-5 lg:mr-0 lg:ml-0 -mr-[20px] -ml-[20px]"
                data-aos="fade-in"
                data-aos-duration="1000"
                data-aos-easing="linear"
                data-aos-anchor=".section-1-trigger"
              >
                <div class="swiper highlight-story-slide pb-10 swiper-fade">
                  <div class="swiper-wrapper">
                    <div
                      class="swiper-slide"
                      v-for="(item, index) in highlights"
                      :key="item.id || index"
                      :data-slide="index"
                    >
                      <a :href="item.url">
                        <div class="w-full overflow-hidden relative">
                          <img
                            :src="item.thumb"
                            :alt="item.alt"
                            class="w-full hover:scale-110 transition-all duration-1000"
                          >
                          <div
                            class="absolute bottom-0 left-0 w-full p-5 lg:hidden block bg-gradient-to-t from-black/75 to-transparent text-white"
                          >
                            <h3
                              class="text-[22px] font-normal"
                              data-aos="fade-up"
                              data-aos-duration="1000"
                              data-aos-easing="linear"
                              :data-aos-delay="200"
                              data-aos-anchor=".section-1-trigger"
                              v-html="item.title"
                            ></h3>
                            
                            <p
                                class="text-[16px] truncate-3-lines"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-easing="linear"
                                :data-aos-delay="300"
                                data-aos-anchor=".section-1-trigger"
                                >
                                {{ item.description }}
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="custom-pagination-square z-10"></div>
                </div>
              </div>

              <!-- RIGHT : LIST -->
              <div class="lg:w-1/2 w-full lg:block hidden">
                <div class="flex flex-col h-full pb-10" id="highlight_list">
                  <div v-for="(item, index) in highlights" :key="'list-' + (item.id || index)">
                    <a
                      :href="item.url"
                      onmouseenter="highlightSelect(this)"
                      onclick="highlightSelect(this)"
                      :data-article_title="item.articleTitle"
                      :data-slide="index"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-easing="linear"
                      data-aos-anchor=".section-1-trigger"
                      :data-aos-delay="(index + 1) * 200"
                      class="cursor-pointer flex flex-col border border-1 border-b-0 border-l-0 border-r-0 p-5 hover:text-black hover:border-black"
                      :class="index === 0 ? 'text-black border-black' : 'text-black/40 border-black/40'"
                    >
                      <h3
                        class="text-[22px] font-normal"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-easing="linear"
                        :data-aos-delay="(index + 1) * 200"
                        data-aos-anchor=".section-1-trigger"
                        v-html="item.title"
                      ></h3>
                      <p
                        class="text-[16px] truncate-3-lines"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-easing="linear"
                        :data-aos-delay="300"
                        data-aos-anchor=".section-1-trigger"
                        >
                        {{ item.description }}
                      </p>

                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
    `,

    setup() {
        const language = ref('th');
        const highlights = ref([]);

        const apiBaseUrl = window.APP_CONFIG?.apiBaseUrl || '';
        const storageUrl = window.APP_CONFIG?.storageUrl || '';

        const headingText = {
            th: 'HIGHLIGHT STORIES',
            en: 'HIGHLIGHT STORIES',
        };

        const subheadingText = {
            th: 'อัพเดตเรื่องน่ารู้ เติมเต็มไลฟ์สไตล์​​',
            en: 'Discover personalized insights for a more fulfilling lifestyle.​',
        };

        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        const buildImageUrl = (file) => {
            if (!file) return '';
            if (file.includes('/')) {
                return `${storageUrl}${file}`;
            }
            return `${storageUrl}uploads/article/${file}`;
        };

        const loadArticles = async (lang) => {
            try {
                const res = await axios.get(`${apiBaseUrl}/article`);
                let items = (res.data && res.data.data) || [];

                // ✅ เรียงตาม "sort" (ถ้า backend ใส่มา) หรือ "sort_order"
                // ถ้าไม่มีทั้งคู่ ค่อย fallback ไปใช้ date_start แบบเดิม
                items = items.sort((a, b) => {
                    const sa = a.sort ?? a.sort_order;
                    const sb = b.sort ?? b.sort_order;

                    if (sa != null && sb != null) {
                        return Number(sa) - Number(sb); // น้อยไปมาก
                    }
                    if (sa != null) return -1;
                    if (sb != null) return 1;

                    const da = a.date_start ? new Date(a.date_start) : 0;
                    const db = b.date_start ? new Date(b.date_start) : 0;
                    return db - da; // fallback: ใหม่ไปเก่า
                });

                // เอาแค่ 3 ตัวแรกมาโชว์เป็น highlight
                items = items.slice(0, 3);

                highlights.value = items.map((a, index) => {
                    const rawTitle =
                        (a.title && (a.title[lang] || a.title.th)) || '';
                    const titleWithBr = rawTitle.replace(/\r\n|\n/g, '<br/>');

                    const description =
                        (a.detail && (a.detail[lang] || a.detail.th)) ||
                        a.meta_description ||
                        '';

                    const url =
                        lang === 'en'
                            ? (a.url_en || a.url_th || '#')
                            : (a.url_th || a.url_en || '#');

                    const imageFile =
                        a.highlight_banner_image ||
                        a.image_master ||
                        a.og_image_small ||
                        '';

                    const thumb = buildImageUrl(imageFile);

                    const articleTitle =
                        a.meta_title ||
                        rawTitle.replace(/\r\n|\n/g, ' ');

                    return {
                        id: a.id,
                        url,
                        thumb,
                        title: titleWithBr,
                        description,
                        topic: a.tag || '',
                        articleTitle,
                        alt: articleTitle || 'article highlight',
                    };
                });
            } catch (e) {
                console.error('Failed to load /api/article:', e);
            }
        };

        const init = () => {
            AOS.init();

            hightLightSwipe = new Swiper(".highlight-story-slide", {
                allowTouchMove: false,
                effect: "fade",
                autoplay: {
                    delay: 5000,
                },
                pagination: {
                    el: ".highlight-story-slide .custom-pagination-square",
                    clickable: true
                },
            });

            hightLightSwipe.on('slideChange', function () {
                const lists = document.querySelectorAll(`#highlight_list [data-slide]`);
                for (let index = 0; index < lists.length; index++) {
                    const element = lists[index];
                    if (index === hightLightSwipe.realIndex) {
                        element.classList.add('text-black', 'border-black');
                        element.classList.remove('text-black/40', 'border-black/40');
                    } else {
                        element.classList.remove('text-black', 'border-black');
                        element.classList.add('text-black/40', 'border-black/40');
                    }
                }
            });

            ScrollTrigger.create({
                trigger: ".addon-tap-pin",
                pin: ".addon-tap-pin img",
                start: "top top",
                pinSpacing: false,
                scrub: 1
            });

            gsap.to(".section-1-trigger", {
                y: 200,
                opacity: 0,
                ease: "linear",
                scrollTrigger: {
                    trigger: ".section-1-trigger",
                    start: "top top",
                    scrub: 1,
                },
            });
        };

        onMounted(async () => {
            language.value = getLanguageFromPath();
            await loadArticles(language.value);

            nextTick(() => {
                init();
            });
        });

        return {
            language,
            highlights,
            headingText,
            subheadingText,
        };
    }
});

// ฟังก์ชัน global เดิม ใช้ได้เหมือนเดิม
function highlightSelect(ev) {
    var tracking = {
        event: "click_highlight_stories",
        landing_page: landing_page,
        section: "highlight_stories",
        event_action: "click",
        article_name: ev.dataset["article_title"]
    };
    if (hightLightSwipe) {
        hightLightSwipe.slideTo(ev.dataset["slide"]);
    }
    setDataLayer(tracking);
}

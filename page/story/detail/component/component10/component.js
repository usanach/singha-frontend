
const Article10Component = defineComponent({
    name: 'Article10Component',
    template: `
    <section class="article-10">
      <div class="title-text-wrapper wrapper-space-bottom">
        <h2 class="header-text">{{ titleText }}</h2>
      </div>

      <img class="campaign-form-detail-bg" src="/assets/image/estate_article/Rectangle4.png" alt="bg" />

      <div class="campaign-detail-articlesRecommendation-wrapper lg:!w-[70%] md:!w-[90%]">
        <a
          v-for="item in recommended"
          :key="item.url[language]"
          :href="item.url[language]"
          class="articlesRecommendation-image-wrapper group"
        >
          <img
            class="articlesRecommendation-img md:block hidden group-hover:scale-110 transition-all"
            :src="item.recomended.m"
            :alt="item.topic"
          />
          <img
            class="articlesRecommendation-img md:hidden block"
            :src="item.recomended.s"
            :alt="item.topic"
          />
          <img
            class="articlesRecommendation-img-ef"
            src="/assets/image/estate_article/effect.png"
            alt="bg"
          />
          <div class="articlesRecommendation-text-wrapper lg:!p-4 md:!p-2">
            <h3 v-html="item.title"></h3>
          </div>
        </a>
      </div>

      <div class="btn-wrapper wrapper-space-bottom">
        <a :href="moreLink" class="exploreArticles-btn">{{ moreText }}</a>
      </div>
    </section>
  `,

    setup() {
        const language = ref('th');
        const titleText = ref('บทความเกี่ยวข้อง ');
        const moreText = ref('อ่านต่อ ');
        const moreLink = ref('#'); // set default or computed

        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        const recommended = computed(() => {
            const list = [];
            const idx = articleData.findIndex(d => d.url[language.value] === window.location.pathname);
            if (idx !== -1) {
                for (let i = 1; i <= 3; i++) {
                    list.push(articleData[(idx + i) % articleData.length]);
                }
            } else {
                for (let i = 0; i <= 2; i++) {
                    list.push(articleData[i]);
                }
            }
            return list;
        });

        const initAnimations = () => {
            AOS.init();
            gsap.registerPlugin(ScrollTrigger);

            const titleEl = document.querySelector('.article-10 .title-text-wrapper');
            gsap.from(titleEl, {
                opacity: 0,
                y: 20,
                duration: 1,
                scrollTrigger: {
                    trigger: titleEl,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true
                }
            });

            const itemsWrapper = document.querySelector(
                '.article-10 .campaign-detail-articlesRecommendation-wrapper'
            );
            gsap.from(itemsWrapper.children, {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.4,
                scrollTrigger: {
                    trigger: itemsWrapper,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true
                }
            });
        };

        onMounted(() => {
            language.value = getLanguageFromPath();
            moreLink.value = '/'+getLanguageFromPath()+'/stories';
            // update language-specific text
            if (language.value === 'en') {
                titleText.value = 'ARTICLES RECOMMENDATION';
                moreText.value = 'Explore more';
            }
            nextTick(initAnimations);
        });

        return {
            language,
            titleText,
            recommended,
            moreText,
            moreLink
        };
    }
});

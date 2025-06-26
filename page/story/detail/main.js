
let articleId = 0
let landing_page = "articles_page";
let view_articles = null;

const getPath = () => {
    const url = window.location.href;
    const urlObj = new URL(url);

    // Get the pathname
    const pathname = urlObj.pathname;

    // Split the pathname into parts
    const pathParts = pathname.split('/').filter(part => part);

    // Convert to parameters
    const params = {};
    for (let i = 0; i < pathParts.length; i++) {
        params[`param${i + 1}`] = decodeURIComponent(pathParts[i]);
    }
    return {
        category_name: params['param3'],
        story_name: params['param4']
    }
}
// Create and mount the Vue app
createApp({
    components: {
        HeaderComponent,
        FooterComponent,
        BannerComponent,
        ContentComponent,
        Article11Component,
        Article10Component
    },

    data() {
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const getArticle = async () => {
            const lang = getLanguageFromPath()
            const res = await axios.get('/data/article.json');

            const article = res.data.filter((d, i) => {
                return d.url[lang] == window.location.pathname;
            }).map((d, i) => {
                return d
            })
            const defaultImageUrl = `${window.location.protocol}//${window.location.host}/default-image.jpg`;
            const imageUrl = article[0]?.banner?.s
                ? `${window.location.protocol}//${window.location.host}${article[0].banner.s}`
                : defaultImageUrl;

            return {
                meta: {
                    title: article[0].meta.title[lang] + " | Singha Residences",
                    description: article[0].meta.description[lang],
                    keywords: article[0].topic
                },
                og: {
                    title: `${article[0].meta.title[lang]} | ${article[0].topic}`,
                    description: article[0].meta.description[lang],
                    image: imageUrl,
                    url: window.location.href
                }
            }
        }
        return {
            ...getArticle()
        };
    },
    setup() {
        // Vue 3 equivalent of mounted() in Vue 2
        onMounted(async () => {
            const res = await axios.get('/data/article.json');

            const getLanguageFromPath = () => {
                const path = window.location.pathname;
                const match = path.match(/\/(th|en)(\/|$)/);
                return match ? match[1] : 'th'; // Default to 'th' if not found
            };
            const lang = getLanguageFromPath()

            // document.title = article[0].meta.title[lang] +" | Singha Residences";
            // if (document.querySelector('meta[name="description"]')) {
            //     document.querySelector('meta[name="description"]').setAttribute('content', article[0].meta.description[lang]);
            // }
            // if (document.querySelector('meta[name="keywords"]')) {
            //     document.querySelector('meta[name="keywords"]').setAttribute('content', article[0].topic);
            // }
            const pageLoad = () => {
                const article = res.data.filter((d, i) => {
                    return d.url[lang] == window.location.pathname;
                }).map((d, i) => {
                    return d
                })
                var tracking = {
                    event: "view_articles",
                    landing_page: "articles_page",
                    section: "articles",
                    event_action: "view",
                    article_name: article[0]?.topic || "Untitled"
                };
                setDataLayer(tracking);
            };
            pageLoad();
            view_articles = {
                name: res.data[articleId].topic,
            }
        });
    }
}).mount('#app');

const getLanguageFromPath = () => {
    const path = window.location.pathname;
    const match = path.match(/\/(th|en)(\/|$)/);
    return match ? match[1] : 'th'; // Default to 'th' if not found
};
const socialMediaShare = async (ev) => {
  const res = await axios.get('/data/article.json');
  const lang = getLanguageFromPath();
  const article = res.data.find(d => d.url[lang] === window.location.pathname) || {};
  const tracking = {
    event: "share_articles",
    landing_page,
    section: "articles",
    event_action: "share",
    button: ev.dataset.button,
    article_name: article.topic || "Untitled"
  };
  console.log(tracking);

  const href = ev.dataset.href;

  if (ev.dataset.button === "facebook") {
    window.open(href, '_blank', 'width=600,height=400');

  } else if (ev.dataset.button === "instagram") {
    const ua = navigator.userAgent;
    const isAndroid = /Android/i.test(ua);
    const isIOS     = /iPhone|iPad|iPod/i.test(ua);

    // deep-link to Instagram library
    const encoded = encodeURIComponent(href);
    const intentUrl = `intent://library?AssetPath=${encoded}#Intent;scheme=instagram;package=com.instagram.android;end`;
    const deepLink  = `instagram://library?AssetPath=${encoded}`;

    // helper: try to open app, fallback to web/share
    const openWithFallback = (link, fallback) => {
      // ถ้าแอปเปิดได้ หน้าเบราว์เซอร์จะ unload ก่อนเกิด pagehide 
      const t = setTimeout(() => {
        fallback();
      }, 1500);
      window.location = link;
      window.addEventListener('pagehide', () => clearTimeout(t));
    };

    if (isAndroid) {
      openWithFallback(intentUrl, () => window.open(href, '_blank'));
    }
    else if (isIOS) {
      openWithFallback(deepLink, () => window.open(href, '_blank'));
    }
    else {
      // บน Desktop หรืออุปกรณ์อื่นๆ ให้ใช้ Web Share API หรือเปิดลิงก์ภาพปกติ
      if (navigator.share) {
        navigator.share({ title: document.title, url: href }).catch(console.error);
      } else {
        window.open(href, '_blank');
      }
    }

  } else {
    // copy URL to clipboard
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => alert('URL copied to clipboard!'))
      .catch(err => console.error('Failed to copy URL: ', err));
  }

  setDataLayer(tracking);
};

const toProject = (ev) => {
    var tracking = {
        event: "view_project",
        landing_page: landing_page,
        section: "property_collection",
        event_action: "click",
        button: "see_the_project",
        article_name: view_articles.name,
    }
    setDataLayer(tracking);
}

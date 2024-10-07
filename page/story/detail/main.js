
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


        return {};
    },
    setup() {
        // Vue 3 equivalent of mounted() in Vue 2
        onMounted(() => {
            const article = articleData.filter((d, i) => {
                return d.topic.replace(/ /g, "-") == getPath().story_name;
            }).map((d, i) => {
                return d
            })

            document.title = article[0].title;
            if (document.querySelector('meta[name="description"]')) {
                document.querySelector('meta[name="description"]').setAttribute('content', article[0].description);
            }
            if (document.querySelector('meta[name="keywords"]')) {
                document.querySelector('meta[name="keywords"]').setAttribute('content', article[0].topic);
            }
            const pageLoad = () => {
                var tracking = {
                    event: "view_articles",
                    landing_page: "articles_page",
                    section: "articles",
                    event_action: "view",
                    article_name: articleData[0]?.topic || "Untitled"
                };
                
                setDataLayer(tracking);
            };
            pageLoad();
            landing_page = getPath().story_name;
            view_articles = {
                name: articleData[articleId].topic,
            }
        });
    }
}).mount('#app');
const socialMediaShare = (ev) => {
    var tracking = {
        event: "share_promotion",
        landing_page: landing_page,
        section: "campaign_detal",
        event_action: "share",
        button: ev.dataset["button"],
        article_name: view_articles.name,
    }
    
    setDataLayer(tracking);
}
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


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
    setup() {
        // Vue 3 equivalent of mounted() in Vue 2
        onMounted(() => {

            const getLanguageFromPath = () => {
                const path = window.location.pathname;
                const match = path.match(/\/(th|en)(\/|$)/);
                return match ? match[1] : 'th'; // Default to 'th' if not found
            };
            const lang = getLanguageFromPath()
            const article = articleData.filter((d, i) => {
                return d.url[lang] == window.location.pathname;
            }).map((d, i) => {
                return d
            })

            // document.title = article[0].meta.title[lang] +" | Singha Residences";
            // if (document.querySelector('meta[name="description"]')) {
            //     document.querySelector('meta[name="description"]').setAttribute('content', article[0].meta.description[lang]);
            // }
            // if (document.querySelector('meta[name="keywords"]')) {
            //     document.querySelector('meta[name="keywords"]').setAttribute('content', article[0].topic);
            // }
            const pageLoad = () => {
                const article = articleData.filter((d, i) => {
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
                name: articleData[articleId].topic,
            }
        });
    }
}).mount('#app');

const getLanguageFromPath = () => {
    const path = window.location.pathname;
    const match = path.match(/\/(th|en)(\/|$)/);
    return match ? match[1] : 'th'; // Default to 'th' if not found
};
const socialMediaShare = (ev) => {

    const lang = getLanguageFromPath()
    const article = articleData.filter((d, i) => {
        return d.url[lang] == window.location.pathname;
    }).map((d, i) => {
        return d
    })
    var tracking = {
        event: "share_articles",
        landing_page: landing_page,
        section: "articles",
        event_action: "share",
        button: ev.dataset["button"],
        article_name: article[0]?.topic || "Untitled"
    }

console.log(tracking);

    if (ev.dataset['button'] == "facebook") {
        window.open(ev.dataset['href'], '_blank', 'width=600,height=400');
    } else if (ev.dataset['button'] == "instagram") {

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            window.location.href = `instagram://library?AssetPath=${encodeURIComponent(ev.dataset['href'])}`;
        } else {
            console.log('Instagram sharing is only supported on mobile devices.');
        }
    } else {
        const currentUrl = window.location.href; // Get the current page URL

        // Copy the URL to the clipboard
        navigator.clipboard.writeText(currentUrl).then(() => {
            alert('URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy URL: ', err);
        });
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


// Define the Header component
const ContentComponent = defineComponent({
    name: 'ContentComponent',
    template: `<div class="section-wrapper" v-html="template"></div>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const setOpenGraphMetaTag = (property, content) => {
            let metaTag = document.querySelector(`meta[property='${property}']`);

            // If the meta tag exists, update its content
            if (metaTag) {
                metaTag.setAttribute('content', content);
            } else {
                // If the meta tag does not exist, create a new one and append it to the head
                metaTag = document.createElement('meta');
                metaTag.setAttribute('property', property);
                metaTag.setAttribute('content', content);
                document.getElementsByTagName('head')[0].appendChild(metaTag);
            }
        }
        const loadTemplate = async (lang) => {
            const article = articleData.filter((d, i) => {
                return d.url[lang] == window.location.pathname;
            }).map((d, i) => {
                return d
            })

            try {

                const templateResponse = await axios.get(article[0].template);
                let templateContent = templateResponse.data;

                const urlToShare = window.location.href; // Replace with the URL you want to share
                const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;

                const datasets = articleData.filter((d, i) => {
                    return d.url[lang] == window.location.pathname;
                })

                // Example usage to set or update Open Graph tags
                setOpenGraphMetaTag('og:title', datasets[0].meta.title[lang] + " | " + datasets[0].topic);
                setOpenGraphMetaTag('og:description', datasets[0].meta.description[lang]);
                setOpenGraphMetaTag('og:image', window.location.host + datasets[0].banner.s);
                setOpenGraphMetaTag('og:url', window.location.href);

                const imageUrl = datasets[0].banner.s; // Replace with your image URL

                // Check if the user is on a mobile device
                const instagramShoreUrl = imageUrl;


                template.value = templateContent
                    .replace(/{{share.facebook}}/g, facebookShareUrl)
                    .replace(/{{share.instagram}}/g, instagramShoreUrl);
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };


        const init = () => {
            AOS.init();

            if (document.getElementById('social-mobile') !== null) {
                console.log('true');
                let socialMobileBtn = document.getElementById('social-mobile');
                let socialMobileElements = document.querySelectorAll('.social-mobile-block:not(:first-child)'); // Select all except the first
                socialMobileBtn.addEventListener('click', () => {
                    for (let i = 0; i < socialMobileElements.length; i++) {
                        if (socialMobileElements[i].style.opacity === '1') {
                            socialMobileElements[i].style.opacity = 0;
                            socialMobileElements[i].style.marginBottom = '-100px';
                            socialMobileElements[i].style.zIndex = 0;
                        } else {
                            socialMobileElements[i].style.opacity = 1;
                            socialMobileElements[i].style.marginBottom = '0';
                            socialMobileElements[i].style.zIndex = 65;
                        }
                    }
                    console.log('click');
                });
            } else {
                console.log('false');
            }

        }
        onMounted(async () => {
            language.value = getLanguageFromPath();
            await loadTemplate(language.value);
            nextTick(() => {
                init();  // ScrollTrigger is initialized after template is loaded and DOM is updated
            });
        });

        return { template, language };
    }
});

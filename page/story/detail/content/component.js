
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
                })// Example usage to set or update Open Graph tags
                const defaultImageUrl = `${window.location.protocol}//${window.location.host}/default-image.jpg`;
                
                const imageUrl = datasets[0]?.banner?.s 
                    ? `${window.location.protocol}//${window.location.host}${datasets[0].banner.s}` 
                    : defaultImageUrl;
                    
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

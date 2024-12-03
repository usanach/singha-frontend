// Define the Header component
const DescriptionComponent = defineComponent({
    name: 'DescriptionComponent',
    template: `<section class="" v-html="template" ></section>`,

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
            try {
                const templateResponse = await axios.get('/page/smyth/smyth-content-page/kaset-nawamin/component/description/template.html');
                let templateContent = templateResponse.data;
                // Replace placeholders with actual data
                templateContent = templateContent
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        const init = () => {
            AOS.init();
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
function toggleDiv(sectionId, element) {
    // Find all `li` elements within the same parent container
    const listItems = element.parentNode.querySelectorAll('li');

    // Remove 'active' class and reset 'font-light' for all items
    listItems.forEach((item) => {
        item.classList.remove('active');
        const header = item.querySelector('h3');
        if (header) {
            header.classList.remove('font-normal');
            header.classList.add('font-light');
        }
    });

    // Add 'active' class and apply 'font-normal' to the clicked element
    element.classList.add('active');
    const activeHeader = element.querySelector('h3');
    if (activeHeader) {
        activeHeader.classList.remove('font-light');
        activeHeader.classList.add('font-normal');
    }

    // Toggle visibility of sections (using Tailwind's 'hidden' and 'block' utilities)
    const sections = document.querySelectorAll('.section'); // Adjust selector as needed
    sections.forEach((section) => {
        if (section.id === sectionId) {
            section.classList.remove('hidden');
            section.classList.add('block');
        } else {
            section.classList.remove('block');
            section.classList.add('hidden');
        }
    });
    const expBtnText = document.querySelector('#expand-button p')
    expBtnText.innerHTML = element.textContent

    const expDiv = document.querySelector('.expand-div');
    if(expDiv){
        expDiv.classList.add('hidden')
    }
}
function toggleExpand() {
    const div = document.querySelector('.expand-div');
    div.classList.remove('hidden');
}
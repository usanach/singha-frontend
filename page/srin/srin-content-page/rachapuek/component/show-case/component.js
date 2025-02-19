// Define the Header component
const ShowCaseComponent = defineComponent({
    name: 'ShowCaseComponent',
    template: `<section class="" v-html="template" ></section>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language
        const activeButton = ref("livingRoom"); // Track the active button (LivingRoom, BedRoom, DiningRoom)


        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const loadTemplate = async (lang) => {
            try {
                const templateResponse = await axios.get('/page/srin/srin-content-page/rachapuek/component/show-case/template.html');
                let templateContent = templateResponse.data;
                // Replace placeholders with actual data
                templateContent = templateContent
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };

        // Toggle active button
        const toggleActive = (buttonId) => {
            activeButton.value = activeButton.value === buttonId ? null : buttonId;
            updateButtonClasses(); // Update the button styles after toggle
        };

        // Manually update button classes
        const updateButtonClasses = () => {
            // Ensure you access DOM elements inside the v-html content
            const buttonIds = ['livingRoom', 'bedRoom', 'diningRoom'];

            buttonIds.forEach((buttonId) => {
                const button = document.getElementById(buttonId);
                if (button) {
                    if (activeButton.value === buttonId) {
                        button.classList.add('bg-white', 'text-black');
                        button.classList.remove('bg-white/30','text-white');
                    } else {
                        button.classList.remove('bg-white', 'text-black');
                        button.classList.add('bg-white/30','text-white');
                    }
                }
            });
        };

        const init = () => {
            AOS.init();
        }
        onMounted(async () => {
            language.value = getLanguageFromPath();
            await loadTemplate(language.value);

            nextTick(() => {
                init();  // ScrollTrigger is initialized after template is loaded and DOM is updated
                // Add event listeners for dynamic buttons
                document.getElementById('livingRoom')?.addEventListener('click', () => toggleActive('livingRoom'));
                document.getElementById('bedRoom')?.addEventListener('click', () => toggleActive('bedRoom'));
                document.getElementById('diningRoom')?.addEventListener('click', () => toggleActive('diningRoom'));

                // Initialize the button styles after the page is loaded
                updateButtonClasses();
            });
        });

        return { template, language, activeButton, toggleActive };
    }
});

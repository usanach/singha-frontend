const ShowCaseComponent = defineComponent({
    name: 'ShowCaseComponent',
    template: `<section class="onview font-['IBM_Plex_Sans_Thai']" data-section="360_experience">
    <div class="bg-[#F9F2E8] relative" :class="[fontClass()]">
      <div class="flex flex-col">
        <div class="container py-10">
            <h2 class=" text-[35px] text-center font-bold" :class="[fontClass()]">
                {{title[language]}}
            </h2>
            <div class="relative lg:px-20 mt-5">
                <!-- Loader -->
                <div v-if="!iframeLoaded" class="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    Loading...
                </div>
                <!-- Iframe with onload event -->
                <iframe 
                    @load="handleIframeLoad"
                    v-show="iframeLoaded"
                    class="w-full lg:min-h-[600px] min-h-[400px]" 
                    src="https://visualpanorama.com/360/premium360/singhaestate/theextrophayathairangnam/Type1B-1.html">
                </iframe>
            </div>
        </div>
      </div>
    </div>
</section>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language
        const activeButton = ref("livingRoom"); // Track the active button (LivingRoom, BedRoom, DiningRoom)
        const iframeLoaded = ref(false); // Track iframe load state


        const title = {
            en: "360° experience",
            th: "ประสบการณ์ 360 ํ"
        }
        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
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
                        button.classList.remove('bg-white/30', 'text-white');
                    } else {
                        button.classList.remove('bg-white', 'text-black');
                        button.classList.add('bg-white/30', 'text-white');
                    }
                }
            });
        };

        // Set iframe loaded to true once content is loaded
        const handleIframeLoad = () => {
            iframeLoaded.value = true;
        };

        const init = () => {
            AOS.init();
        };

        // New computed property to select the font class based on language.
        const fontClass = () => {
            return language.value === 'en' ? "font-['Gotham']" : "";
        };
        onMounted(async () => {
            language.value = getLanguageFromPath();
            nextTick(() => {
                init();  // ScrollTrigger is initialized after DOM is updated

                // Add event listeners for dynamic buttons
                document.getElementById('livingRoom')?.addEventListener('click', () => toggleActive('livingRoom'));
                document.getElementById('bedRoom')?.addEventListener('click', () => toggleActive('bedRoom'));
                document.getElementById('diningRoom')?.addEventListener('click', () => toggleActive('diningRoom'));

                // Initialize the button styles after the page is loaded
                updateButtonClasses();
            });
        });

        return { language, activeButton, toggleActive, iframeLoaded, handleIframeLoad, fontClass,title };
    }
});

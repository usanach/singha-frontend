
// Create and mount the Vue app
createApp({
    components: {
        HeaderComponent,
    },
    setup() {
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };
        const title = ref('แผนที่เว็บไซต์');
        const dataset = ref(null);

        // Fetch dataset using Axios
        const fetchDataset = async () => {
            try {
                const response = await axios.get('/data/footer.json'); // Update this path
                dataset.value = response.data; // Set the dataset to the fetched data
            } catch (error) {
                console.error('Error fetching dataset:', error);
            }
        };

        // Call fetchDataset when the component is created
        fetchDataset();

        return { title, dataset };
    }
}).mount('#app');


// Create and mount the Vue app
createApp({
    components: {
        HeaderComponent,
        FooterComponent,
    },
    setup() {
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };
        const title = ref('แผนที่เว็บไซต์');
        const dataset = ref(null);
        const lang = ref('th');

        // Fetch dataset using Axios
        const fetchDataset = async (lang) => {
            try {
                const response = await axios.get('/data/footer.json'); // Update this path
                dataset.value = response.data; // Set the dataset to the fetched data
                lang = getLanguageFromPath();
                response.data.map(d => {
                    d.items.map(d => {
                        if(d.type !="page"){
                            console.log(d.items);
                        }
                    })
                })
            } catch (error) {
                console.error('Error fetching dataset:', error);
            }
        };

        // Call fetchDataset when the component is created
        fetchDataset();


        return { title, dataset,lang };
    }
}).mount('#app');

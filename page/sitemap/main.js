
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
                        if (d.type != "page") {
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


        return { title, dataset, lang };
    }
}).mount('#app');

function selectLink(ev) {
    var tracking = {
        landing_page: "sitemap_page",
        section: "sitemap",
        event_action: "click",
        sitemap_name: ev.innerHTML
    }
    
    // ev.dataset["property_brand"] != undefined ? tracking.property_brand = ev.dataset["property_brand"] : "";
    // ev.dataset["project_label"] != undefined ? tracking.project_label = ev.dataset["project_label"] : "";
    // ev.dataset["property_type"] != undefined ? tracking.property_type = ev.dataset["property_type"] : "";
    // ev.dataset["property_location"] != undefined ? tracking.property_location = ev.dataset["property_location"] : "";
    // ev.dataset["property_price"] != undefined ? tracking.property_price = ev.dataset["property_price"] : "";
    setDataLayer(tracking);
}

// Create and mount the Vue app
createApp({
    components: {
        HeaderComponent,
FooterComponent,
        BannerComponent,
        ContentComponent,
    },

    data() {
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        return {
            title: getLanguageFromPath() == 'en' ? "GO BEYOND DREAMS" : "GO BEYOND DREAMS",
            detail: getLanguageFromPath() == 'en' ? "Our Private Estate Collection from Singha Estate, offering enduring value for you and generations to come." : "โครงการที่พักอาศัยคุณภาพจาก สิงห์ เอสเตท ​มอบคุณค่าการใช้ชีวิตพร้อมการเติบโตอย่างยั่งยืนให้คุณและรุ่นต่อไป",
            aboutus: getLanguageFromPath() == 'en' ? "About us " : "เกี่ยวกับเรา"
        };
    },
}).mount('#app');

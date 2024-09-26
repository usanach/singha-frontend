
// Create and mount the Vue app
createApp({
    components: {
        HeaderComponent,
    },

    data() {
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        return {
            font: getLanguageFromPath() == 'en' ? "font-['Cinzel']" : "!font-['IBMPlexSansThai']",
            title: getLanguageFromPath() == 'en' ? "CONTACT US " : "ติดต่อเรา",
            location: {
                title: getLanguageFromPath() == 'en' ? "OUR LOCATION" : "ที่ตั้ง",
                direction: getLanguageFromPath() == 'en' ? "Get Direction" : "การเดินทาง",
                detail: getLanguageFromPath() == 'en'
                    ? "SINGHA ESTATE PCL. 123 Suntowers Building B, 40th Floor, Vibhavadi-Rangsit Road, Chom Phon, Chatuchak, Bangkok 10900"
                    : "บริษัท สิงห์ เอสเตท จำกัด (มหาชน) อาคารซันทาวเวอร์ส บี, ชั้น 40 เลขที่ 123 ถนนวิภาวดีรังสิต แขวงจอมพล เขตจตุจักร​ กรุงเทพมหานคร 10900"

            },
            email: {
                title: getLanguageFromPath() == 'en' ? "EMAIL US " : "อีเมล",
            },
            call: {
                title: getLanguageFromPath() == 'en' ? "CALL US" : "ติดต่อ",
            }
        };
    },
}).mount('#app');

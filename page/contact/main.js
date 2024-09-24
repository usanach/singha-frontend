
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
            data: getLanguageFromPath() == 'en' ? [
                {
                    title: "CONTACT US",
                    detail: "Interested in our residential projects",
                    more: "Explore more",
                    image: {
                        s: "/assets/image/ContactUs/1.png",
                        l: "/assets/image/ContactUs/1-1.png"
                    }
                },
                {
                    title: "BECOME AGENT",
                    detail: "Project information and partnership terms ",
                    more: "Explore more",
                    image: {
                        s: "/assets/image/ContactUs/2.png",
                        l: "/assets/image/ContactUs/1-2.png"
                    }
                },
                {
                    title: "Explore more​",
                    detail: "Types of land / buildings for sale",
                    more: "Explore more",
                    image: {
                        s: "/assets/image/ContactUs/3.png",
                        l: "/assets/image/ContactUs/1-3.png"
                    }
                },
            ] : [
                {
                    title: "ติดต่อเรา",
                    detail: "สนใจรายละเอียดโครงการที่พักอาศัย",
                    more: "ข้อมูลเพิ่มเติม​",
                    image: {
                        s: "/assets/image/ContactUs/1.png",
                        l: "/assets/image/ContactUs/1-1.png"
                    }
                },
                {
                    title: "สมัครเป็นตัวแทนขาย​",
                    detail: "ข้อมูลโครงการและเงื่อนไขผลตอบแทน ",
                    more: "ข้อมูลเพิ่มเติม​",
                    image: {
                        s: "/assets/image/ContactUs/2.png",
                        l: "/assets/image/ContactUs/1-2.png"
                    }
                },
                {
                    title: "เสนอขายที่ดิน/อาคาร​",
                    detail: "ประเภทที่ดิน/อาคารที่ต้องการขาย​",
                    more: "ข้อมูลเพิ่มเติม",
                    image: {
                        s: "/assets/image/ContactUs/3.png",
                        l: "/assets/image/ContactUs/1-3.png"
                    }
                },
            ]
        };
    },
}).mount('#app');

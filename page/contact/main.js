
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
            lang: getLanguageFromPath(),
            data: [
                {
                    title: {
                        en: "CONTACT US",
                        th: "ติดต่อเรา"
                    },
                    detail: {
                        en: "Interested in our residential projects",
                        th: "สนใจรายละเอียดโครงการที่พักอาศัย"
                    },
                    link: "/" + getLanguageFromPath() + "/contact-us/contact",
                    target:"_self",
                    more: {
                        en: "Explore more",
                        th: "ข้อมูลเพิ่มเติม​"
                    },
                    image: {
                        s: "/assets/image/ContactUs/1.png",
                        l: "/assets/image/ContactUs/1-1.png"
                    }
                },
                {
                    title: {
                        en: "BECOME AGENT",
                        th: "สมัครเป็นตัวแทนขาย​"
                    },
                    detail: {
                        en: "Project information and partnership terms ",
                        th: "ข้อมูลโครงการและเงื่อนไขผลตอบแทน"
                    },
                    link: "/" + getLanguageFromPath() + "/contact-us/become-agent",
                    target:"_self",
                    more: {
                        en: "Explore more",
                        th: "ข้อมูลเพิ่มเติม​"
                    },
                    image: {
                        s: "/assets/image/ContactUs/2.png",
                        l: "/assets/image/ContactUs/1-2.png"
                    }
                },
                {
                    title: {
                        en: "Explore more​",
                        th: "เสนอขายที่ดิน/อาคาร​",
                    },
                    detail: {
                        en: "Types of land / buildings for sale",
                        th: "ประเภทที่ดิน/อาคารที่ต้องการขาย​"
                    },
                    target:"_blank",
                    link: "https://property.singhaestate.co.th/en/property-offer?_ga=2.266121743.1474642135.1727241573-885017993.1707963665&_gac=1.224594792.1724900635.CjwKCAjwlbu2BhA3EiwA3yXyu0JpthQzF-0t4GTZ_zA71-2X9vs-f0zjNgSBLTJRVo-X3dqnTudJ7BoCuH4QAvD_BwE#overview",
                    more: {
                        en: "Explore more",
                        th: "ข้อมูลเพิ่มเติม​"
                    },
                    image: {
                        s: "/assets/image/ContactUs/3.png",
                        l: "/assets/image/ContactUs/1-3.png"
                    }
                },
            ]
        };
    },
}).mount('#app');

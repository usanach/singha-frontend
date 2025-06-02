
// Create and mount the Vue app
createApp({
    components: {
        HeaderComponent,
        FooterComponent,
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
                    target: "_self",
                    more: {
                        en: "Explore more",
                        th: "ข้อมูลเพิ่มเติม​"
                    },
                    image: {
                        s: "/assets/image/ContactUs/1.png",
                        l: "/assets/image/ContactUs/1-1.png"
                    },
                    datalayer: {
                        button:"contact_us"
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
                    target: "_self",
                    more: {
                        en: "Explore more",
                        th: "ข้อมูลเพิ่มเติม​"
                    },
                    image: {
                        s: "/assets/image/ContactUs/2.png",
                        l: "/assets/image/ContactUs/1-2.png"
                    },
                    datalayer: {
                        button:"become_agent"
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
                    target: "_blank",
                    link: "https://property.singhaestate.co.th/th/property-offer",
                    more: {
                        en: "Explore more",
                        th: "ข้อมูลเพิ่มเติม​"
                    },
                    image: {
                        s: "/assets/image/ContactUs/3.png",
                        l: "/assets/image/ContactUs/1-3.png"
                    },
                    datalayer: {
                        button:"property_offer"
                    }
                },
            ],
        };
    },
}).mount('#app');


const landing_page = "home_contact_us_page";

function exploreMore(ev) {
    var tracking = {
        event: "click_explore",
        landing_page: landing_page,
        section: "contact_us",
        event_action: "click",
        button: ev.dataset["button"]
    }
    
    setDataLayer(tracking);
    window.open(ev.dataset['href'], ev.dataset["target"]);
}
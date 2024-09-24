
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
            form_section: {
                title: getLanguageFromPath() == 'en'
                    ? "JOIN OUR ACTIVITY"
                    : "สัมผัสประสบการณ์ดี ๆ ด้วยกัน​",
                detail: getLanguageFromPath() == 'en'
                    ? "Register to join activity & receive exclusive information"
                    : "ลงทะเบียนเพื่อร่วมกิจกรรมและรับสิทธิพิเศษ"
            },
            campaing_show_detail_show_product: {
                logo: "/assets/image/estate_CampaignDetail/siranin_logo.svg",
                detail: getLanguageFromPath() == 'en'
                    ? "Where legacies thrive in the crafted living spaces for their family completeness.​​"
                    : "ศิรนินทร์ เรสซิเดนเซส บ้านที่ออกแบบ…เพื่อการใช้ชีวิตของครอบครัวใหญ่ที่สมบูรณ์​​",
                more: getLanguageFromPath() == 'en'
                    ? "See the project"
                    : "เยี่ยมชมโครงการ ​​",
            },
            campaign_detail_articlesRecommendation_section: {
                title: getLanguageFromPath() == 'en'
                    ? "ARTICLES RECOMMENDATION"
                    : "บทความเกี่ยวข้อง​​",
                more: getLanguageFromPath() == 'en'
                    ? "Explore more"
                    : "อ่านต่อ​",
            }
        };
    },
}).mount('#app');

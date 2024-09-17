
let recommendedData = [{
    title: "พาชมโครงการบ้านหรู คฤหาสน์ Luxury บนทำเลทอง ปี 2024",
    description: "การเป็นเจ้าของบ้านหรูระดับ Luxury ไปจนถึง Ultra Luxury ถือเป็นสัญลักษณ์แห่งความสำเร็จ ความมั่งคั่ง สะท้อนให้เห็นถึงไลฟ์สไตล์ที่ดูหรูหรา รสนิยม และความสำเร็จของเจ้าของบ้าน",
    topic: "บ้านหรู",
    cate: "s blog",
    date: "9 SEP 2024",
    thumb: "/page/src/content/content3/images/H1/บ้านหรู_thumbnail.webp",
    m: "/page/src/content/content3/images/H1/บ้านหรู_recommend.webp",
    s: "/page/src/content/content3/images/H1/บ้านหรู_recommend_m.webp",
    banner: {
        s: "/page/src/content/content3/images/H1/บ้านหรู_m.webp",
        l: "/page/src/content/content3/images/H1/บ้านหรู.webp"
    }
}, {
    title: "ทางลาดสำหรับผู้สูงอายุและคนพิการ ตามหลัก Universal Design",
    description: "การออกแบบทางลาดสำหรับคนพิการทุพพลภาพและผู้สูงอายุตามหลัก Universal Design เพื่อความปลอดภัยและความสะดวกสบายในการใช้งาน",
    topic: "ทางลาดผู้สูงอายุ",
    cate: "s blog",
    date: "9 SEP 2024",
    thumb: "/page/src/content/content4/images/H1/ทางลาดผู้สูงอายุ_thumbnail.webp",
    m: "/page/src/content/content4/images/H1/ทางลาดผู้สูงอายุ_recommend.webp",
    s: "/page/src/content/content4/images/H1/ทางลาดผู้สูงอายุ_recommend_m.webp",
    banner: {
        s: "/page/src/content/content4/images/H1/ทางลาดผู้สูงอายุ_m.webp",
        l: "/page/src/content/content4/images/H1/ทางลาดผู้สูงอายุ.webp"
    }
}, {
    title: "Universal Design คืออะไร เทคนิคการออกแบบที่ไม่ว่าใคร ก็ใช้งานร่วมกันได้",
    description: "Universal Design เป็นหลักการออกแบบผลิตภัณฑ์ สภาพแวดล้อม และบริการต่างๆ ให้สามารถใช้งานได้อย่างเท่าเทียมที่ทุกคนสามารถใช้ร่วมกันได้",
    topic: "universal design คือ",
    cate: "s blog",
    date: "9 SEP 2024",
    thumb: "/page/src/content/content5/images/H1/universal_design_คือ_thumbnail.webp",
    m: "/page/src/content/content5/images/H1/universal_design_คือ_recommend.webp",
    s: "/page/src/content/content5/images/H1/universal_design_คือ_recommend_m.webp",
    banner: {
        s: "/page/src/content/content5/images/H1/universal_design_คือ_m.webp",
        l: "/page/src/content/content5/images/H1/universal_design_คือ.webp"
    }
}]
let articleId = 1
const landing_page = "ฮวงจุ้ยบ้าน";
const view_articles = {
    name: articleData[articleId].title,
}
function pageLoad() {
    var tracking = {
        event: "view_articles",
        landing_page: landing_page,
        section: "articles",
        event_action: "view",
        article_name: view_articles.name,
    }
    setDataLayer(tracking);
}

function socialMediaShare(ev) {
    var tracking = {
        event: "share_promotion",
        landing_page: landing_page,
        section: "campaign_detal",
        event_action: "share",
        button: ev.dataset["button"],
        article_name: view_articles.name,
    }
    setDataLayer(tracking);
}
function toProject(ev) {
    var tracking = {
        event: "view_project",
        landing_page: landing_page,
        section: "property_collection",
        event_action: "click",
        button: "see_the_project",
        article_name: view_articles.name,
    }
    setDataLayer(tracking);
}

function setPage() {
    let bannerTitle = document.querySelector(".article-page .banner-wrapper .banner-header-wrapper .header-text");
    let love = document.querySelector(".article-page .banner-wrapper .love-time-wrapper .love-wrapper");
    let time = document.querySelector(".article-page .banner-wrapper .love-time-wrapper .time-wrapper .time-number");
    let bannerBg = document.querySelector(".article-page .banner-wrapper .article-background");
    let bannerBgMobile = document.querySelector(".article-page .banner-wrapper .background-wrapper picture source");
    let recommended = document.querySelector('.article-10 .campaign-detail-articlesRecommendation-wrapper');

    bannerTitle.innerHTML = articleData[articleId].title;
    love.style.display = "none";
    time.innerHTML = articleData[articleId].date;
    bannerBg.src = articleData[articleId].banner.l
    bannerBgMobile.src = articleData[articleId].banner.s
    bannerBg.alt = articleData[articleId].topic;
    bannerBgMobile.alt = articleData[articleId].topic;
    recommended.innerHTML = `
        ${recommendedData.map((d, i) => {
        return `
        <a href="#" class="articlesRecommendation-image-wrapper">
            <img class="articlesRecommendation-img md:block hidden"
                src="${d.m}"
                alt="${d.topic}" />
            <img class="articlesRecommendation-img md:hidden block"
                src="${d.s}"
                alt="${d.topic}" />
            <img class="articlesRecommendation-img-ef" src="../../../assets/images/estate_article/effect.png"
                alt="bg" />
            <div class="articlesRecommendation-text-wrapper">
                <h3>${d.title}</h3>
            </div>
        </a>
        `;
    })}
    `
    const owl = document.querySelector('.article-11owl.owl-carousel');

    owl.innerHTML = `
${articleData[articleId].gallery.map((d, i) => {
        return `
                <div class="item">
                    <img class="gallery-item" src="${d.thumb}"
                        alt="${d.alt}" gallery-item="${d.l}"/>
                </div>
                `
    }).join("")}
                   
                    `

}

setPage();

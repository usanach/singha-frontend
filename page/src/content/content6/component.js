
let recommendedData = [{
    title: "11 ต้นไม้มงคลเสริมโชคลาภ ปลูกแล้วเฮงเรียกทรัพย์ตลอดปี",
    description: "หลายคนนิยมปลูกต้นไม้มงคลในบ้าน และคอนโด เพราะนอกจากจะช่วยประดับตกแต่งภายบ้านแล้ว ยังสามารถช่วยเสริมสิริมงคล ดึงดูดโชคลาภ เงินทอง ให้ไหลมาเทมาแก่ผู้อาศัยอีกด้วย",
    topic: "ต้นไม้มงคล",
    cate: "s blog",
    date: "9 SEP 2024",
    thumb: "/page/src/content/content7/images/H1/ต้นไม้มงคล_thumbnail.webp",
    m: "/page/src/content/content7/images/H1/ต้นไม้มงคล_recommend.webp",
    s: "/page/src/content/content7/images/H1/ต้นไม้มงคล_recommend_m.webp",
    banner: {
        s: "/page/src/content/content7/images/H1/ต้นไม้มงคล_m.webp",
        l: "/page/src/content/content7/images/H1/ต้นไม้มงคล.webp"
    }
}, {
    title: "ฮวงจุ้ยบ้าน เคล็ดลับนำความสุข ความเจริญรุ่งเรืองให้แก่ผู้อยู่อาศัย",
    description: "เรียนรู้หลักการฮวงจุ้ยบ้านเพื่อสร้างพลังงานที่ดี ส่งเสริมความสุข สุขภาพ และความมั่งคั่ง พร้อมเคล็ดลับการจัดห้องต่างๆ และวิธีแก้ไขฮวงจุ้ยที่ไม่ดีในบ้าน",
    topic: "ฮวงจุ้ยบ้าน",
    cate: "s blog",
    date: "9 SEP 2024",
    thumb: "/page/src/content/content1/images/H1/ฮวงจุ้ยบ้าน_thumbnail.webp",
    m: "/page/src/content/content1/images/H1/ฮวงจุ้ยบ้าน_recommend.webp",
    s: "/page/src/content/content1/images/H1/ฮวงจุ้ยบ้าน_recommend_m.webp",
    banner: {
        s: "/page/src/content/content1/images/H1/ฮวงจุ้ยบ้าน_m.webp",
        l: "/page/src/content/content1/images/H1/ฮวงจุ้ยบ้าน.webp"
    }
},
{
    title: "ฮวงจุ้ยห้องนอน เคล็ดลับจัดห้องนอนให้ถูกหลัก ช่วยเสริมพลังชีวิต",
    description: "เรียนรู้หลักฮวงจุ้ยห้องนอนที่ถูกต้อง พร้อมเคล็ดลับการจัดวางเตียง กระจก และของตกแต่ง เพื่อสร้างพื้นที่พักผ่อนที่สมบูรณ์แบบ ส่งเสริมการนอนหลับที่มีคุณภาพและชีวิตที่สมดุล",
    topic: "ฮวงจุ้ยห้องนอน",
    cate: "s blog",
    date: "9 SEP 2024",
    thumb: "/page/src/content/content2/images/H1/ฮวงจุ้ยห้องนอน_thumbnail.webp",
    m: "/page/src/content/content2/images/H1/ฮวงจุ้ยห้องนอน_recommend.webp",
    s: "/page/src/content/content2/images/H1/ฮวงจุ้ยห้องนอน_recommend_m.webp",
    banner: {
        s: "/page/src/content/content2/images/H1/ฮวงจุ้ยห้องนอน_m.webp",
        l: "/page/src/content/content2/images/H1/ฮวงจุ้ยห้องนอน.webp"
    }
},]
let articleId = 5
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
    }).join("")}
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
    }).join("")}`

}

setPage();

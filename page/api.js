/* =========================================================
 * Axios Client
 * ========================================================= */

const { apiBaseUrl } = window.APP_CONFIG || {};

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* =========================================================
 * Cache Config
 * ========================================================= */

const CACHE_VERSION = 'v1';
const CACHE_PREFIX = `api_cache_${CACHE_VERSION}_`;

const TTL = {
  SHORT: 1000 * 60 * 5,   // 5 นาที
  MEDIUM: 1000 * 60 * 15, // 15 นาที
  LONG: 1000 * 60 * 30,   // 30 นาที
};

/* =========================================================
 * Cache Helpers
 * ========================================================= */

function setCache(key, data, ttl) {
  const record = {
    data,
    expiry: Date.now() + ttl,
  };
  localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(record));
}

function getCache(key) {
  const raw = localStorage.getItem(CACHE_PREFIX + key);
  if (!raw) return null;

  try {
    const record = JSON.parse(raw);
    if (Date.now() > record.expiry) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return record.data;
  } catch {
    localStorage.removeItem(CACHE_PREFIX + key);
    return null;
  }
}

function clearApiCache() {
  Object.keys(localStorage)
    .filter(k => k.startsWith(CACHE_PREFIX))
    .forEach(k => localStorage.removeItem(k));
}

window.clearApiCache = clearApiCache;

/* =========================================================
 * Base Request Helpers
 * ========================================================= */

const get = (url, config = {}) => apiClient.get(url, config);
const post = (url, data = {}, config = {}) =>
  apiClient.post(url, data, config);

async function cachedGet(url, config = {}, ttl = TTL.SHORT) {
  const cacheKey = url + JSON.stringify(config);
  const cached = getCache(cacheKey);

  if (cached) {
    return Promise.resolve({ data: cached });
  }

  const res = await apiClient.get(url, config);
  setCache(cacheKey, res.data, ttl);
  return res;
}

/* =========================================================
 * Register / Lead (❌ NO CACHE)
 * ========================================================= */

const postResidentialRegister = (payload) =>
  post('/residential-register', payload);

const postLeadByProject = (projectKey, payload) =>
  post(`/lead/${projectKey}`, payload);

/* =========================================================
 * Home (CACHE)
 * ========================================================= */

const getHomeBanner = () =>
  cachedGet('/home/banner', {}, TTL.MEDIUM);

const getHomeBrandPhilosophy = () =>
  cachedGet('/home/brand-philosophy', {}, TTL.LONG);

const getHomeDiscovery = () =>
  cachedGet('/home/discovery', {}, TTL.MEDIUM);

const getHomeNews = () =>
  cachedGet('/home/news', {}, TTL.SHORT);

/* =========================================================
 * Promotion / Campaign
 * ========================================================= */

const getPromotion = () =>
  cachedGet('/promotion', {}, TTL.MEDIUM);

/* =========================================================
 * Collection Page
 * ========================================================= */

const getBannerCollection = () =>
  cachedGet('/collection-page/banner-collection', {}, TTL.LONG);

const getBannerCollectionVideo = () =>
  cachedGet('/collection-page/banner-collection-video', {}, TTL.LONG);

/* =========================================================
 * Article
 * ========================================================= */

const getArticle = () =>
  cachedGet('/article', {}, TTL.SHORT);

/* =========================================================
 * Condo
 * ========================================================= */

const getCondoBanner = () =>
  cachedGet('/condo-banner', {}, TTL.LONG);

const getCondoCollection = () =>
  cachedGet('/condo-collection', {}, TTL.MEDIUM);

const getCondoEntrusted = () =>
  cachedGet('/condo-entrusted', {}, TTL.MEDIUM);

const getCondoHighlight = () =>
  cachedGet('/condo-highlight', {}, TTL.MEDIUM);

/* =========================================================
 * House
 * ========================================================= */

const getHouseBanner = () =>
  cachedGet('/house-banner', {}, TTL.LONG);

const getHouseCollection = () =>
  cachedGet('/house-collection', {}, TTL.MEDIUM);

const getHouseEntrusted = () =>
  cachedGet('/house-entrusted', {}, TTL.MEDIUM);

const getHouseHighlight = () =>
  cachedGet('/house-highlight', {}, TTL.MEDIUM);

/* =========================================================
 * Global
 * ========================================================= */

const getGlobalBrandCollection = () =>
  cachedGet('/global/brand-collection', {}, TTL.LONG);

const getGlobalSplashPage = () =>
  cachedGet('/global/splash-page', {}, TTL.LONG);

const getGlobalProjectLocation = () =>
  cachedGet('/global/project-location', {}, TTL.LONG);

const getGlobalProjectBrand = () =>
  cachedGet('/global/project-brand', {}, TTL.LONG);

const getGlobalSeo = (id) =>
  id
    ? cachedGet(`/global/seo/${id}`, {}, TTL.LONG)
    : cachedGet('/global/seo', {}, TTL.LONG);

/* =========================================================
 * Contact Us
 * ========================================================= */

const getContactUsContact = () =>
  cachedGet('/contact-us/contact', {}, TTL.LONG);

const getContactUsHeadOffice = () =>
  cachedGet('/contact-us/head-office', {}, TTL.LONG);

const getContactUsBecomeAgent = () =>
  cachedGet('/contact-us/become-agent', {}, TTL.LONG);

window.getContactUsBecomeAgent = getContactUsBecomeAgent;

/* =========================================================
 * Project (prefix: /project)
 * ========================================================= */

const getProjectList = () =>
  cachedGet('/project', {}, TTL.SHORT);

const getProjectRelated = (id) =>
  cachedGet(`/project/related/${id}`, {}, TTL.MEDIUM);

const getProjectBanner = (id) =>
  cachedGet(`/project/banner/${id}`, {}, TTL.MEDIUM);

const getProjectCaftYoursTale = (id) =>
  cachedGet(`/project/caft-yours-tale/${id}`, {}, TTL.MEDIUM);

const getProjectForm = (id) =>
  get(`/project/form/${id}`); // ❌ no cache

const getProjectDesignConcept = (id) =>
  cachedGet(`/project/design-concept/${id}`, {}, TTL.LONG);

const getProjectLocation = (id) =>
  cachedGet(`/project/location/${id}`, {}, TTL.LONG);

const getProjectVideo = (id) =>
  cachedGet(`/project/video/${id}`, {}, TTL.LONG);

const getProjectGallery = (id) =>
  cachedGet(`/project/gallery/${id}`, {}, TTL.MEDIUM);

const getProjectLifestyle = (id) =>
  cachedGet(`/project/lifestyle/${id}`, {}, TTL.MEDIUM);

const getProjectInformationTemplate1 = (id) =>
  cachedGet(`/project/information-template-1/${id}`, {}, TTL.LONG);

const getProjectInformationUnitPlan = (id) =>
  cachedGet(`/project/information-unit-plan/${id}`, {}, TTL.LONG);

const getProjectInformationMasterPlan = (id) =>
  cachedGet(`/project/information-master-plan/${id}`, {}, TTL.LONG);

const getProjectInformationProjectDetailArea = (id) =>
  cachedGet(`/project/information-project-detail-area/${id}`, {}, TTL.LONG);

const getProjectBudget = (id) =>
  cachedGet(`/project/budget/${id}`, {}, TTL.SHORT);

const getProjectHighlight = (id) =>
  cachedGet(`/project/highlight/${id}`, {}, TTL.MEDIUM);

const getProjectInformationAmenities = (id) =>
  cachedGet(`/project/information-amenities/${id}`, {}, TTL.LONG);

const getProjectInformationService = (id) =>
  cachedGet(`/project/information-service/${id}`, {}, TTL.LONG);

const getProjectSubHeader = (id) =>
  cachedGet(`/project/project_sub_header/${id}`, {}, TTL.LONG);

const getProjectSeo = () =>
  cachedGet('/project/seo', {}, TTL.LONG);
/* =========================================================
 * Auto Clear Cache On Page Refresh
 * ========================================================= */

// ล้าง cache ทุกครั้งที่ page reload จริง
if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
  clearApiCache();
}

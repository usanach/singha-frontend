const { apiBaseUrl } = window.APP_CONFIG || {};

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* helpers */
const get = (url, config = {}) => apiClient.get(url, config);
const post = (url, data = {}, config = {}) =>
  apiClient.post(url, data, config);

/* =========================================================
 * Register / Lead
 * ========================================================= */

 const postResidentialRegister = (payload) =>
  post('/residential-register', payload);

 const postLeadByProject = (projectKey, payload) =>
  post(`/lead/${projectKey}`, payload);

/* =========================================================
 * Home
 * ========================================================= */

 const getHomeBanner = () => get('/home/banner');
 const getHomeBrandPhilosophy = () => get('/home/brand-philosophy');
 const getHomeDiscovery = () => get('/home/discovery');
 const getHomeNews = () => get('/home/news');

/* =========================================================
 * Promotion / Campaign
 * ========================================================= */

 const getPromotion = () => get('/promotion');

/* =========================================================
 * Collection Page
 * ========================================================= */

 const getBannerCollection = () =>
  get('/collection-page/banner-collection');

 const getBannerCollectionVideo = () =>
  get('/collection-page/banner-collection-video');

/* =========================================================
 * Article
 * ========================================================= */

 const getArticle = () => get('/article');

/* =========================================================
 * Condo
 * ========================================================= */

 const getCondoBanner = () => get('/condo-banner');
 const getCondoCollection = () => get('/condo-collection');
 const getCondoEntrusted = () => get('/condo-entrusted');
 const getCondoHighlight = () => get('/condo-highlight');

/* =========================================================
 * House
 * ========================================================= */

 const getHouseBanner = () => get('/house-banner');
 const getHouseCollection = () => get('/house-collection');
 const getHouseEntrusted = () => get('/house-entrusted');
 const getHouseHighlight = () => get('/house-highlight');

/* =========================================================
 * Global
 * ========================================================= */

 const getGlobalBrandCollection = () =>
  get('/global/brand-collection');

 const getGlobalSplashPage = () =>
  get('/global/splash-page');

 const getGlobalProjectLocation = () =>
  get('/global/project-location');

 const getGlobalProjectBrand = () =>
  get('/global/project-brand');

 const getGlobalSeo = (id) =>
  id ? get(`/global/seo/${id}`) : get('/global/seo');

/* =========================================================
 * Project (prefix: /project)
 * ========================================================= */

 const getProjectList = () => get('/project');

 const getProjectBanner = (id) =>
  get(`/project/banner/${id}`);

 const getProjectCaftYoursTale = (id) =>
  get(`/project/caft-yours-tale/${id}`);

 const getProjectForm = (id) =>
  get(`/project/form/${id}`);

 const getProjectDesignConcept = (id) =>
  get(`/project/design-concept/${id}`);

 const getProjectLocation = (id) =>
  get(`/project/location/${id}`);

 const getProjectVideo = (id) =>
  get(`/project/video/${id}`);

 const getProjectGallery = (id) =>
  get(`/project/gallery/${id}`);

 const getProjectLifestyle = (id) =>
  get(`/project/lifestyle/${id}`);

 const getProjectInformationTemplate1 = (id) =>
  get(`/project/information-template-1/${id}`);

 const getProjectInformationUnitPlan = (id) =>
  get(`/project/information-unit-plan/${id}`);

 const getProjectInformationMasterPlan = (id) =>
  get(`/project/information-master-plan/${id}`);

 const getProjectInformationProjectDetailArea = (id) =>
  get(`/project/information-project-detail-area/${id}`);

 const getProjectBudget = (id) =>
  get(`/project/budget/${id}`);

 const getProjectHighlight = (id) =>
  get(`/project/highlight/${id}`);

 const getProjectInformationAmenities = (id) =>
  get(`/project/information-amenities/${id}`);

 const getProjectInformationService = (id) =>
  get(`/project/information-service/${id}`);

 const getProjectSubHeader = (id) =>
  get(`/project/project_sub_header/${id}`);

 const getProjectSeo = () =>
  get('/project/seo');

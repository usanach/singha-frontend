// ตรวจ URL ปัจจุบัน
const isExtroPage = window.location.pathname === '/condominium/the-extro/phayathai-rangnam';

// เลือก component ที่จะใช้
const CraftYourTale = isExtroPage
  ? CraftYourTaleExtroComponent
  : CraftYourTaleComponent;

// Create and mount the Vue app
createApp({
  components: {
    HeaderComponent,
    SubHeaderComponent,
    BannerComponent,

    // 👇 ใช้ตัวที่เลือกไว้
    CraftYourTaleComponent: CraftYourTale,

    FormRegisterComponent,
    DesignConceptComponent,
    ProjectsHighlightComponent,
    ProjectInformationComponent,
    ShowCaseComponent,
    GalleryComponent,
    LocationComponent,
    LifeStyleComponent,
    RelatedProjectsComponent,
    MoreInfoComponent,
    FooterComponent,
    VdoComponent
  }
}).mount('#app');

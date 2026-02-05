const isExtroPage = window.location.pathname === '/condominium/the-extro/phayathai-rangnam';

createApp({
  data() {
    return {
      isExtroPage
    };
  },
  components: {
    HeaderComponent,
    SubHeaderComponent,
    BannerComponent,
    CraftYourTaleComponent,
    CraftYourTaleExtroComponent,
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

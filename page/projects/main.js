const isExtroPage = () => {
  return window.location.pathname.includes(
    '/condominium/the-extro/phayathai-rangnam'
  );
};

createApp({
  components: {
    HeaderComponent,
    SubHeaderComponent,
    BannerComponent,

    // 👇 เลือก component ตาม url
    CraftYourTaleComponent: isExtroPage()
      ? CraftYourTaleExtroComponent
      : CraftYourTaleComponent,

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

let landing_page = "sitemap_page"

createApp({
  components: {
    HeaderComponent,
    FooterComponent,
  },
  setup() {

    const language = ref('th')
    const sections = ref([])
    const sitemap = ref('')
    const home = ref('')

    const getLanguageFromPath = () => {
      const m = window.location.pathname.match(/\/(th|en)(\/|$)/)
      return m ? m[1] : 'th'
    }

    // ----------------------------
    // label map
    // ----------------------------
    const normalizeLabel = (code) => {
      const map = {
        new_project: 'New Project',
        ready_to_move: 'Ready to Move',
        ready_to_move_in: 'Ready to Move',
        sold_out: 'Sold Out',
        normal: '',
      }
      return map[code] ?? ''
    }

    const categoryTitleMap = {
      'บ้านเดี่ยว': { th: 'บ้านเดี่ยว', en: 'DETACHED HOUSE' },
      'ไพรเวท เอสเตท': { th: 'ไพรเวท เอสเตท', en: 'PRIVATE ESTATE' },
      'โฮม ออฟฟิศ': { th: 'โฮม ออฟฟิศ', en: 'HOME OFFICE' },
      'คอนโดมิเนียม': { th: 'คอนโดมิเนียม', en: 'CONDOMINIUM' },
    }

    const buildCategoryUrl = (typeTh) => {
      const isCondo = typeTh === 'คอนโดมิเนียม'
      return {
        th: isCondo ? '/th/condominium' : '/th/house',
        en: isCondo ? '/en/condominium' : '/en/house',
      }
    }

    const buildFooterSectionsFromApi = (masters, projects) => {

      const masterById = {}
      masters.forEach(m => {
        if (m?.id != null) masterById[String(m.id)] = m
      })

      const projectsByMasterId = {}
      projects.forEach(p => {
        const masterId = String(p?.filter_component_item_l2_id || '')
        if (!masterId) return
        if (!projectsByMasterId[masterId]) projectsByMasterId[masterId] = []
        projectsByMasterId[masterId].push(p)
      })

      const mastersByType = {}
      masters.forEach(m => {
        const typeTh = m?.filter_component_item_l1_id
        if (!typeTh) return
        if (!mastersByType[typeTh]) mastersByType[typeTh] = []
        mastersByType[typeTh].push(m)
      })

      const buildCategory = (typeTh) => {
        const masterList = mastersByType[typeTh] || []
        if (!masterList.length) return null

        return {
          id: `cat-${typeTh}`,
          title: categoryTitleMap[typeTh] || { th: typeTh, en: typeTh },
          url: buildCategoryUrl(typeTh),
          items: masterList.map(master => {

            const masterId = String(master.id)
            const matchedProjects = projectsByMasterId[masterId] || []
            if (!matchedProjects.length) return null

            return {
              id: `brand-${masterId}`,
              title: master.title,
              items: matchedProjects.map((p, idx) => {

                const locTh = (p?.location?.th || '').trim()
                const locEn = (p?.location?.en || '').trim()
                const brandTh = (master.title?.th || '').trim()
                const brandEn = (master.title?.en || '').trim()

                return {
                  id: `sub-${masterId}-${idx}`,
                  label: normalizeLabel(p?.label),
                  price: p?.price?.[language.value] || '',
                  title: {
                    th: `${brandTh} ${locTh}`.trim(),
                    en: `${brandEn} ${locEn}`.trim(),
                  },
                  url: p?.url || { th: '#', en: '#' },
                }
              })
            }

          }).filter(Boolean)
        }
      }

      const houseTypes = ['บ้านเดี่ยว', 'ไพรเวท เอสเตท', 'โฮม ออฟฟิศ']
      const condoTypes = ['คอนโดมิเนียม']

      const houseCategories = houseTypes.map(buildCategory).filter(Boolean)
      const condoCategories = condoTypes.map(buildCategory).filter(Boolean)

      return [
        { id: 'section-house', items: houseCategories },
        { id: 'section-condo', items: condoCategories },
      ]
    }

    // ----------------------------
    // Load Data (เหมือน Footer)
    // ----------------------------
    const loadData = async () => {
      try {

        language.value = getLanguageFromPath()

        const sitemaptext = {
          en: "SITEMAP",
          th: "แผนผังเว็บไซต์"
        }

        const hometext = {
          en: "HOME PAGE",
          th: "หน้าหลักสิงห์เอสเตท"
        }

        sitemap.value = sitemaptext[language.value]
        home.value = hometext[language.value]

        const [masterRes, projectRes] = await Promise.all([
          getGlobalProjectBrand(),
          getGlobalProjectLocation(),
        ])

        const masters = masterRes?.data?.data || []
        const projects = projectRes?.data?.data || []

        sections.value = buildFooterSectionsFromApi(masters, projects)

      } catch (err) {
        console.error('Sitemap load error:', err)
      }
    }

    onMounted(loadData)

    return {
      language,
      sitemap,
      home,
      sections
    }
  }
}).mount('#app')

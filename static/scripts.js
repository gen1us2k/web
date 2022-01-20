(function () {
  const loadConsentBanner = () => {
    const dependencies = [
      'https://cdn.iubenda.com/cs/ccpa/stub.js',
      'https://cdn.iubenda.com/cs/iubenda_cs.js'
    ]
  
    return Promise.all(
      dependencies.map((url) => {
        const script = document.createElement('script')
        script.src = url
        document.body.appendChild(script)
        return new Promise((resolveLoad) => {
          script.onload = () => resolveLoad()
        })
      })
    )
  }
  
  // Provided by tag manager
  const initializeTagManger = (w, d, s, l, i) =>
    new Promise((resolve) => {
      w[l] = w[l] || []
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        /* eslint-disable-next-line eqeqeq */
        dl = l != 'dataLayer' ? '&l=' + l : ''
      j.async = true
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
      f.parentNode.insertBefore(j, f)
      j.addEventListener('load', resolve)
    })
  
  const eventsOnBannerInteraction = {
    onPreferenceExpressedOrNotNeeded: (preference = {}) => {
      const dataLayer = window.dataLayer
      dataLayer.push({
        iubenda_ccpa_opted_out: window._iub.cs.api.isCcpaOptedOut()
      })
      if (!preference) {
        dataLayer.push({ event: 'iubenda_preference_not_needed' })
        return
      }
      if (preference.purposes) {
        for (const category in preference.purposes) {
          if (preference.purposes[category]) {
            dataLayer.push({ event: `iubenda_consent_given_purpose_${category}` })
          }
        }
      }
    }
  }
  
  const initAnalytics = () => {
    window.dataLayer = window.dataLayer || []
    const _iub = window._iub || {}
    _iub.csConfiguration = {
      enableCcpa: true,
      countryDetection: true,
      consentOnContinuedBrowsing: false,
      ccpaAcknowledgeOnDisplay: true,
      lang: 'en',
      siteId: 2407170,
      floatingPreferencesButtonDisplay: false,
      perPurposeConsent: true,
      // https://www.iubenda.com/en/help/1205-how-to-configure-your-cookie-solution-advanced-guide
      purposes: `1, 2, 3, 4, 5`,
      cookiePolicyId: 17136025,
      privacyPolicyUrl: '/privacy',
      cookiePolicyUrl: '/privacy/#cookie-privacy-policy',
      callback: eventsOnBannerInteraction,
      banner: {
        cookiePolicyLinkCaption: 'Cookie Policy',
        customizeButtonCaption: 'Manage preferences',
        acceptButtonCaption: 'Accept all',
        content:
          'We use cookies to make sure Ory is the best it can be, with your consent. More information in our %{cookie_policy_link}',
        acceptButtonDisplay: true,
        customizeButtonDisplay: true,
        acceptButtonColor: '#5528ff',
        acceptButtonCaptionColor: 'white',
        customizeButtonColor: '#cbcbcb',
        customizeButtonCaptionColor: '#010101',
        closeButtonDisplay: false,
        position: 'float-bottom-center',
        textColor: '#010101',
        backgroundColor: '#ffffff'
      }
    }
    window._iub = _iub
  
    // Initialize tag manager first - no tags fire until consent is expressed
    // Load consent banner after so we're sure tag manager is active to dispatch
    // consent events to
    initializeTagManger(window, document, 'script', 'dataLayer', window.__gtm_id || 'GTM-5JC2SVK')
      .then(() => loadConsentBanner())
      .then(() => {
        // Future sequential stuff that is dependent on consent banner goes here
      })
  }
  initAnalytics()
})();

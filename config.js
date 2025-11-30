// config.js
(function () {
  const host = window.location.hostname;
  let config = {};

  if (host === 'localhost' || host === '127.0.0.1') {
    config = {
      env: 'local',
      apiBaseUrl: 'http://localhost:8000/api',
      storageUrl:'http://localhost:8000/storage/',
      debug: true,
    };
  } else if (host.includes('staging')) {
    config = {
      env: 'staging',
      apiBaseUrl: 'https://residential-uat.singhaestate.co.th/api',
      storageUrl:'https://residential-uat.singhaestate.co.th/storage/',
      debug: true,
    };
  } else {
    config = {
      env: 'production',
      apiBaseUrl: 'https://residential.singhaestate.co.th/api',
      storageUrl:'https://residential.singhaestate.co.th/storage/',
      debug: false,
    };
  }

  window.APP_CONFIG = config;
})();

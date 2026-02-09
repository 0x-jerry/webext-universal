import { defineConfig } from 'wxt'
import '@wxt-dev/unocss'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue', '@wxt-dev/unocss'],
  unocss: {
    excludeEntrypoints: ['background'],
  },
  webExt: {
    chromiumProfile: '.profile/chrome',
    keepProfileChanges: true,
    startUrls: ['chrome://new-tab'],
  },
  manifestVersion: 3,
  manifest: {
    name: 'Universal Extension',
    description: 'A extension only for who wants it.',
    key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxUGdAdqcYaNSmRWaNww1hBBH2E4vuIZI92rOPm1PqI+WTHl9090Dyw0VE5W+YvXaoluoQQJ6gI2WenMAJweuzrLrtTydTazSRUtbXIfe1I3oMZ0pRw6hKRJP3emCTgoEiJeG1W+U09jAqCbQYtSLp3Fh4netQ/OcLlqCZN07gmS2zCpZHQc47p+YCzGuaS0z30mx4NqumJPAHh9hRi6fPhNonRvOn+8xxJliXq6ZMnRvUNBMGi6TSNboiXk56O3b8BAsYjK23jk9QcDvrFeDTbMiHj0ohXYZ3idGOx5OrdGnWFzsNXo0ZhdHf+bJ+zU0X6fXDgL6e+6jXUwjrNb/EwIDAQAB',
    homepage_url: 'https://github.com/0x-jerry/webext-universal',
    update_url:
      'https://raw.githubusercontent.com/0x-jerry/webext-universal/main/updates.xml',
    permissions: [
      'tabs',
      'activeTab',
      'sessions',
      'history',
      'topSites',
      'bookmarks',
      'favicon',
      'sessions',
    ],
    web_accessible_resources: [
      {
        resources: ['_favicon/*'],
        matches: ['<all_urls>'],
      },
      {
        resources: ['content-main.js'],
        matches: ['<all_urls>'],
      },
    ],
  },
})

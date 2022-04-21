const path = require('path');

module.exports = {
  i18n: {
    locales: ['tr', 'en'],
    defaultLocale: 'en',
    localeDetection: true
  },
  localePath: path.resolve('./public/locales')
};

import { i18n } from 'next-i18next';

const Langs = [
  {
    Id: 1,
    LanguageName: i18n?.t('languagesIsoCode.trTr') || '',
    IsoCode: 'tr-TR',
    SystemSupport: true,
  },
  {
    Id: 2,
    LanguageName: i18n?.t('languagesIsoCode.enUs') || '',
    IsoCode: 'en-US',
    SystemSupport: true,
  },
  {
    Id: 3,
    LanguageName: i18n?.t('languagesIsoCode.azAz') || '',
    IsoCode: 'az-AZ',
    SystemSupport: false,
  },
  {
    Id: 4,
    LanguageName: i18n?.t('languagesIsoCode.elGr') || '',
    IsoCode: 'el-GR',
    SystemSupport: false,
  },
  {
    Id: 5,
    LanguageName: i18n?.t('languagesIsoCode.deDe') || '',
    IsoCode: 'de-DE',
    SystemSupport: false,
  },
  {
    Id: 6,
    LanguageName: i18n?.t('languagesIsoCode.nlNl') || '',
    IsoCode: 'nl-NL',
    SystemSupport: false,
  },
  {
    Id: 7,
    LanguageName: i18n?.t('languagesIsoCode.enGb') || '',
    IsoCode: 'en-GB',
    SystemSupport: false,
  },
  {
    Id: 8,
    LanguageName: i18n?.t('languagesIsoCode.esEs') || '',
    IsoCode: 'es-ES',
    SystemSupport: false,
  },
  {
    Id: 9,
    LanguageName: i18n?.t('languagesIsoCode.frFr') || '',
    IsoCode: 'fr-FR',
    SystemSupport: false,
  },
  {
    Id: 10,
    LanguageName: i18n?.t('languagesIsoCode.itIt') || '',
    IsoCode: 'it-IT',
    SystemSupport: false,
  },
  {
    Id: 11,
    LanguageName: i18n?.t('languagesIsoCode.ruRU') || '',
    IsoCode: 'ru-RU',
    SystemSupport: false,
  },
  {
    Id: 12,
    LanguageName: i18n?.t('languagesIsoCode.zhChs') || '',
    IsoCode: 'zh-CN',
    SystemSupport: false,
  },
  {
    Id: 13,
    LanguageName: i18n?.t('languagesIsoCode.jaHp') || '',
    IsoCode: 'ja-JP',
    SystemSupport: false,
  },
  {
    Id: 14,
    LanguageName: i18n?.t('languagesIsoCode.hiIn') || '',
    IsoCode: 'hi-IN',
    SystemSupport: false,
  },
  {
    Id: 15,
    LanguageName: i18n?.t('languagesIsoCode.arAe') || '',
    IsoCode: 'ar-AE',
    SystemSupport: false,
  },
];

export default Langs;

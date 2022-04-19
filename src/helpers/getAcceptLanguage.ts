
import Router from 'next/router';

export default function getAcceptLanguage() {

  switch (Router.locale) {
    case 'tr': return 'tr-TR';
    case 'en': return 'en-US';

    default:
      return 'en-US';
  }

}

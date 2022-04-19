/* eslint-disable import/prefer-default-export */
import { CookieEnum } from '@assets/enums/CookieEnum';
import Cookies from 'js-cookie';

export class CookieService {

  static getCookie(cname: CookieEnum) {

    if (typeof window !== 'undefined') {

      const value = Cookies.get(cname);

      if (typeof value === 'undefined') return '';

      return value;

    }

    return '';

  }

  static setCookie(cname: CookieEnum, cvalue: string, exdays = 1) {

    if (typeof window !== 'undefined') {

      Cookies.set(cname, cvalue, { expires: exdays, secure: true, sameSite: 'none' });

    }

  }

  static removeCookie(cnames: CookieEnum[] | CookieEnum) {

    if (typeof window !== 'undefined') {

      const expires = `expires=${new Date().toUTCString()}`;


      if (!Array.isArray(cnames)) document.cookie = `${cnames}="";${expires};path=/`;

      else {

        cnames.forEach((cname) => {

          document.cookie = `${cname}="";${expires};path=/`;

        });

      }

    }

  }
}

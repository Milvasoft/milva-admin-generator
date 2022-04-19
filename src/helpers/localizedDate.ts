import Router from 'next/router';
import moment from 'moment';
import 'moment/locale/tr';
import 'moment/locale/en-gb';

export function getLocalizeDateWithFormat(value?: string | Date, format?: string) {

  moment.locale(Router?.locale);

  return moment(value).format(format);

}

export function getLocalizeTime(value: string | Date) {

  return getLocalizeDateWithFormat(value, 'HH:mm');

}

export function getLocalizeDate(value: string | Date) {

  return getLocalizeDateWithFormat(value, 'LL');

}

export function getLocalize(value: string | Date) {

  return getLocalizeDateWithFormat(value, 'LLL');

}

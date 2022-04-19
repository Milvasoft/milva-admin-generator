/* eslint-disable consistent-return */
import { showToast } from '@helpers/toast';
import { i18n } from 'next-i18next';
import Router from 'next/router';

type DataType = {
  statusCode?: number;
  message: string;
}

const ErrorMiddleware = (data: DataType) => {

  process.env.NODE_ENV === 'development' && console.log('success', data);

  let variant: 'default' | 'error' | 'success' | 'warning' | 'info' | undefined = 'warning';

  const statusCode = data?.statusCode || 400;

  if ([400, 401, 403, 500].includes(statusCode)) {

    variant = 'error';

    showToast(data?.message || i18n?.t('generalErrorText') || '', variant);

    if (statusCode === 401) {

      // TODO dispatcher({ type: 'LOGIN_USER_ERROR' });

      // TODO deleteAllCookies();

      Router.push('/');

    }

  } else if ([600].indexOf(statusCode) >= 0 || !statusCode) {

    return () => {

      const messages = data?.message.split('~');

      messages?.forEach((msg) => {

        showToast(msg || i18n?.t('generalErrorText') || '', variant);

      });

    };

  }

};
export default ErrorMiddleware;

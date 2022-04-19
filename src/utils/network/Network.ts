/* eslint-disable max-len */
import { i18n } from 'next-i18next';
import { closeGeneralLoading, openGeneralLoading } from '@helpers/generalLoading';
import { errorToast, successToast } from '@helpers/toast';
import * as apiMethods from './apiMethods';
import NetworkParams, { ApiParams, Result as ApiResult } from './networkParams';
import { CancelablePromise } from '../CancelablePromise';
import ErrorMiddleware from './errorMiddleware';
import Request from './instance';

export default class Network {

  private static newRequest<_Result, Response>(requestParams: NetworkParams) {

    const {
      url,
      data,
      method,
      headers,
      backDrop = true,
      rejectable = false,
      successMessaging = true,
      errorMessaging = true
    } = requestParams;

    process.env.NODE_ENV !== 'production' && console.log({
      url, data, method, headers
    });

    const _promise = new CancelablePromise<ApiResult<_Result, Response>>((resolve, reject) => {

      if (backDrop) openGeneralLoading();

      Request({
        url,
        method,
        headers,
        data
      })
        .then((res: any) => {

          if (backDrop) closeGeneralLoading();

          const errorCallBack = ErrorMiddleware(res.data);

          if (errorMessaging && res.data.statusCode !== 200) errorCallBack?.();

          if (res.data.statusCode === 200) {

            if (successMessaging && res.data.message) successToast(res.data.message);

            return resolve(res.data);

          } if (rejectable) return reject(res.data);

          return _promise.cancel();

        })
        .catch((err: any) => {

          if (backDrop) closeGeneralLoading();

          if (!err.response?.status) errorToast(i18n?.t('helperTexts.networkError'));

          else {

            const errorCallBack = ErrorMiddleware(err.response);

            if (errorMessaging) errorCallBack?.();

          }

          if (rejectable) return reject(err);

          return _promise.cancel();

        });

    });

    return _promise;

  }

  static urlGenerator(url: string, params?: string | number | boolean): string {

    return params !== undefined && params !== null && params !== ''
      ? `${url}/${params}`
      : url;

  }

  static getRequest<_Result = any, Response = ApiResult<_Result>>({ version = '/v1.0', ...requestParams }: ApiParams) {

    return this.newRequest<_Result, Response>({
      ...requestParams,
      url: this.urlGenerator(`${version}${requestParams.url}`, requestParams.params),
      method: apiMethods.get,
    });

  }

  static deleteRequest<_Result = any, Response = ApiResult<_Result>>({ version = '/v1.0', ...requestParams }: ApiParams) {

    return this.newRequest<_Result, Response>({
      ...requestParams,
      url: this.urlGenerator(`${version}${requestParams.url}`, requestParams.params),
      method: apiMethods.deleteMethod,
    });

  }

  static patchRequest<_Result = any, Response = ApiResult<_Result>>({ version = '/v1.0', ...requestParams }: ApiParams) {

    return this.newRequest<_Result, Response>({
      ...requestParams,
      url: this.urlGenerator(`${version}${requestParams.url}`, requestParams.params),
      method: apiMethods.patch,
    });

  }

  static putRequest<_Result = any, Response = ApiResult<_Result>>({ version = '/v1.0', ...requestParams }: ApiParams) {

    return this.newRequest<_Result, Response>({
      ...requestParams,
      url: this.urlGenerator(`${version}${requestParams.url}`, requestParams.params),
      method: apiMethods.put,
    });

  }

  static postRequest<_Result = any, Response = ApiResult<_Result>>({ version = '/v1.0', ...requestParams }: ApiParams) {

    return this.newRequest<_Result, Response>({
      ...requestParams,
      url: this.urlGenerator(`${version}${requestParams.url}`, requestParams.params),
      method: apiMethods.post,
    });

  }
}

import axios from 'axios';
import axiosDefaults from 'axios/lib/defaults';
import Logger from '../../utils/Logger';
import createRequestHeaders from './createRequestHeaders';
import {APIError, createAPIError} from './APIError';

function isResponseError(data, status) {
  if (status >= 400 && status < 600) {
    return true;
  }
  if (data && data.errors) {
    return true;
  }
  return false;
}

function getErrorResponseJSON(data) {
  if (data && data.errors) {
    return data;
  }
  return JSON.parse(`{
    "errors": [
      {
        "detail": "This is an error."
      }
    ]
  }`);
}

export default class API {
  constructor({
    baseURL,
    // getToken,
    handleNoInternet,
    transformResponseCallbacks,
  }) {
    // this.getToken = getToken;
    this.baseURL = baseURL;
    this.shared = axios.create({
      baseURL,
      transformResponse:
        transformResponseCallbacks || axiosDefaults.transformResponse,
    });
    this.handleNoInternet = handleNoInternet;
  }

  async send(
    props: {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE',
      path: string,
      headers?: any,
      data?: any,
      handlerError?: (responseJSON: {}, statusCode: number) => {},
      validateStatus?: (status: number) => boolean,
    },
    needHandleNoInternet = true,
  ) {
    const {method, path, headers, data, handlerError, validateStatus} = props;
    const request = {method, path};
    // const requestHeaders = await createRequestHeaders(headers, this.getToken);
    const requestHeaders = await createRequestHeaders(headers);
    return this.shared(path, {
      method,
      data,
      headers: requestHeaders,
      validateStatus,
    })
      .then(response => {
        if (isResponseError(response.data, response.status)) {
          const error = {response};
          return Promise.reject(error);
        }
        if (validateStatus && !validateStatus(response.status)) {
          const error = {response: {status: response.status}};
          return Promise.reject(error);
        }
        this.log(data, requestHeaders, request, response);
        return Promise.resolve(response.data);
      })
      .catch(error => {
        Logger.error(error);
        if (!error.response) {
          if (needHandleNoInternet && this.handleNoInternet) {
            this.handleNoInternet();
            return Promise.reject(createAPIError({noInternet: true}));
          }
        }
        this.log(data, requestHeaders, request, error.response);
        const apiError: APIError = {
          responseJSON: getErrorResponseJSON(error.response.data),
          statusCode: error.response.status,
        };
        const needHandlerError = handlerError !== null;
        if (needHandlerError) {
          handlerError(apiError.responseJSON, apiError.statusCode);
        }
        return Promise.reject(createAPIError(apiError));
      });
  }

  log(parameters, headers, request, response) {
    Logger.api({
      request: {
        url: this.baseURL,
        headers,
        method: request.method,
        parameters,
        path: request.path,
      },
      response: {
        status: response.status,
        data: response.data,
      },
    });
  }
}

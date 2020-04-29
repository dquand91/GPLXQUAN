export type APIError =
  | {
      noInternet: boolean,
    }
  | {
      responseJSON: {},
      statusCode: number,
    };

export function createAPIError(error: APIError) {
  return {apiError: error};
}

export function parseAPIError(responseJSON) {
  const {title, detail} = responseJSON.errors[0];
  return {title, detail};
}

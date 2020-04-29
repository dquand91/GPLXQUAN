// export default async function createRequestHeaders(customHeaders, getTokenFn) {
//   const token = await getTokenFn();
//   return {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     ...(token ? {Authorization: token} : null),
//     ...customHeaders,
//   };
// }

export default async function createRequestHeaders(customHeaders) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...customHeaders,
  };
}

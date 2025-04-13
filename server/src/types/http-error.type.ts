export interface IHttpError extends Error {
  statusCode: null | number | undefined;
}

/**
 * Appends a backslash to the prefix URL if there isn't one.
 * TODO: remove eslint check after another function is added.
 */
/* eslint-disable import/prefer-default-export */
export const sanitizeUrlPrefix = (url) =>
  url + (url.slice(-1) === '/' ? '' : '/');

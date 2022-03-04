/**
 * Appends a backslash to the prefix URL if there isn't one.
 */
export const sanitizeUrlPrefix = (url) =>
  url + (url.slice(-1) === '/' ? '' : '/');

/**
 * Converts array to JSON object with array values as keys and `true` assigned to each key.
 * */
export const makeTruthTable = (values) => {
  const res = {};
  values.forEach((val) => {
    res[val] = true;
  });
  return res;
};

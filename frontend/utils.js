/**
 * Appends a backslash to the prefix URL if there isn't one.
 */
export const sanitizeUrlPrefix = (url) =>
  url + (url.slice(-1) === '/' ? '' : '/');

/**
 * Converts array to JSON object with array values as keys and `true` assigned to each key.
 * */
export const makeTruthTable = (values, isSelected) => {
  const res = {};
  values.forEach((val) => {
    res[val] = isSelected;
  });
  return res;
};

/**
 * Gets season/term from date
 */
export const getTermSeason = (date) => {
  const month = date.getMonth() + 1;
  let season = '';
  if (month <= 4) {
    season = 'WINTER';
  } else if (month <= 8) {
    season = 'SPRING';
  } else {
    season = 'FALL';
  }

  return season;
};

/**
 * Returns date entries in <TERM>-<YEAR> format.
 */
export const getTermDate = (date) =>
  `${getTermSeason(date)}-${date.getFullYear()}`;

/**
 * Creates data from an array of values:
 */

export const createData = (keys, values) => {
  const res = {};
  keys.forEach((kval, idx) => {
    res[kval] = values[idx];
  });
  return res;
};

/**
 * Gets item by id in JSON object array
 */
export const getItemById = (arr, id) => {
  const obj = arr.filter((item) => item.id === id);
  return obj[0];
};

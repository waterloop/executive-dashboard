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

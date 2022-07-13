/**
 * Sets and updates checked checkboxes
 */
export const setCheckboxValues = (clickedOption, values, setValues) => {
  setValues({
    ...values,
    [clickedOption.target.name]: !values[clickedOption.target.name],
  });
};

/**
 * Toggles between how many checkboxes should be shown
 */
export const setCheckboxesShown = (
  checkboxesShown,
  setShown,
  maxShown,
  minShown,
) => {
  setShown(checkboxesShown === maxShown ? minShown : maxShown);
};

export const oneTrue = (subteamsChecked) => {
  const keys = Object.keys(subteamsChecked);

  for (let i = 0; i < keys.length; i += 1) {
    if (subteamsChecked[keys[i]]) {
      return true;
    }
  }
  return false;
};

export const getItemByName = (arr, name) => {
  const obj = arr.filter((item) => item.name === name);
  return obj[0];
};
/* eslint-disable */
export const renameObjectKeys = (arr, oldKey, newKey) => {
  const newArr = arr.map((obj) => {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
    return obj;
  });
  return newArr;
};

/**
 * Formats the term that comes in the format TERM-20## to Term 20##
 */
export const formatTerm = (currentTerm) => {
  if (currentTerm){
    const applicationTerm = currentTerm.split('-');
    const term = applicationTerm[0].charAt(0) + applicationTerm[0].slice(1).toLowerCase();
    const year = applicationTerm[1];
    return `${term} ${year}`
  }
  return ''
}
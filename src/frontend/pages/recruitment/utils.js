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
    return obj;
  });
  return newArr;
};
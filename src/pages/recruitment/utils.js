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

export const oneTrue = (subteamsChecked, clickedOption) => {
  const keys = Object.keys(subteamsChecked);

  for (let i = 0; i < keys.length; i += 1) {
    if (
      (subteamsChecked[keys[i]] && keys[i] !== clickedOption.target.name) ||
      (!subteamsChecked[keys[i]] && keys[i] === clickedOption.target.name)
    ) {
      return true;
    }
  }
  return false;
};

export const getItemByName = (arr, name) => {
  const obj = arr.filter((item) => item.name === name);
  return obj[0];
};

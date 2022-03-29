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

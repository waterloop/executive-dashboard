import * as actionTypes from '../actionTypes';

export const setConfiguration = (configuration) => ({
  type: actionTypes.CONFIGURATION_SET_CONFIGURATION,
  payload: {
    configuration,
  },
});

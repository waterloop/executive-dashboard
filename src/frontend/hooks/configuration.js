import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import * as configurationActions from '../state/configuration/actions';
import * as configurationSelectors from '../state/configuration/selectors';
import { snakeCaseToCamelCase } from '../utils';

const useConfiguration = () => {
  const dispatch = useDispatch();
  const configuration = useSelector(configurationSelectors.configuration);

  const parseConfiguration = (rawConfiguration) => {
    const parsedConfiguration = {};
    rawConfiguration.forEach((config) => {
      // The database stores the config as snake_case and by converting the labels to camelCase, it matches the Redux slice labels
      // e.g., database: interview_meeting_link; Redux: interviewMeetingLink
      parsedConfiguration[snakeCaseToCamelCase(config.label)] = config.value;
    });
    return parsedConfiguration;
  };

  const getConfiguration = useCallback(async () => {
    try {
      const configuration = await api.configuration.getConfiguration();
      if (configuration.status !== 200) {
        throw new Error(
          `Could not fetch configuration, HTTP ${configuration.status}`,
        );
      }

      return parseConfiguration(configuration.data);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(err);
      }
      return {};
    }
  }, []);

  const updateConfiguration = useCallback(
    async (configuration) => {
      try {
        const res = await api.configuration.updateConfiguration(configuration);
        if (res.status !== 200) {
          throw new Error(
            `Could not update configuration status, HTTP ${res.status}`,
          );
        }
        dispatch(
          configurationActions.setConfiguration(parseConfiguration(res.data)),
        );
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    },
    [dispatch],
  );

  useEffect(() => {
    (async () => {
      const configuration = await getConfiguration();
      dispatch(configurationActions.setConfiguration(configuration));
    })();
  }, [dispatch, getConfiguration]);

  return {
    configuration,
    updateConfiguration,
  };
};

export default useConfiguration;

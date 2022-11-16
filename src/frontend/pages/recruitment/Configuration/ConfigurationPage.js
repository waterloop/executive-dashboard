import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';

import useConfiguration from '../../../hooks/configuration';
import FormContainer from '../../../components/FormContainer';
import Button from '../../../components/Button';
import { camelCaseToSnakeCase } from '../../../utils';

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colours.white};
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 0.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  height: 100%;

  -webkit-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  -moz-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

const Container = styled.div`
  margin: ${({ theme }) => theme.pageMargin};
  position: relative;
`;

const PageTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.bold36};
`;

const SectionContainer = styled.div`
  margin: 1rem 3rem;
`;

const SectionTitle = styled.h1`
  font: ${({ theme }) => theme.fonts.bold24};
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin: 2rem;
  align-self: flex-end;
`;

const CancelButton = styled(Button)`
  background-color: #afafaf;
  color: ${({ theme }) => theme.colours.white};
  font: ${({ theme }) => theme.fonts.bold18};
  padding: 8px 22px;
  border: none;
  text-decoration: none;
`;

const SaveButton = styled(Button)`
  padding: 8px 22px;
  width: 100px;
`;

const InnerSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateContainer = styled.div`
  display: flex;
  width: 40%;
`;

const TimeContainer = styled.div`
  display: flex;
  width: 50%;
`;

const ConfigurationPage = () => {
  const { configuration, updateConfiguration } = useConfiguration();

  const [config, setConfig] = useState({
    interviewMeetingLink: '',
    interviewFirstRoundDeadline: new Date(),
    interviewSecondRoundDeadline: new Date(),
    newMembersMeetingLink: '',
    newMembersMeetingDate: new Date(),
    newMembersMeetingStartTime: new Date(),
    newMembersMeetingEndTime: new Date(),
    newMembersFormLink: '',
    newMembersFormDeadline: new Date(),
  });
  const history = useHistory();

  useEffect(() => {
    const parsedConfig = cloneDeep(configuration);

    Object.entries(parsedConfig).forEach(([k, v]) => {
      if (
        [
          'interviewFirstRoundDeadline',
          'interviewSecondRoundDeadline',
          'newMembersMeetingDate',
          'newMembersFormDeadline',
        ].includes(k)
      ) {
        // Converts date (e.g., 2022-11-04) to moment object (wrapper for JS Date Object)
        parsedConfig[k] = moment(v);
      } else if (
        ['newMembersMeetingStartTime', 'newMembersMeetingEndTime'].includes(k)
      ) {
        // Converts time (e.g., 6:45 PM) to moment object (wrapper for JS Date Object)
        parsedConfig[k] = moment(v, 'LT');
      }
    });

    setConfig(parsedConfig);
  }, [configuration]);

  const goBack = () => {
    history.push('/');
  };

  const saveForm = () => {
    const configuration = Object.entries(config)
      .filter((entry) => entry[1] !== '')
      .map(([k, v]) => {
        const entry = {
          label: camelCaseToSnakeCase(k),
        };

        if (
          [
            'interviewFirstRoundDeadline',
            'interviewSecondRoundDeadline',
            'newMembersMeetingDate',
            'newMembersFormDeadline',
          ].includes(k)
        ) {
          // Converts moment object to string representation of date (e.g., 2022-11-04)
          entry.value = moment(v).format('YYYY-MM-DD');
        } else if (
          ['newMembersMeetingStartTime', 'newMembersMeetingEndTime'].includes(k)
        ) {
          // Converts moment object to string representation of time (e.g., 6:45 PM)
          entry.value = moment(v).format('LT');
        } else {
          entry.value = v;
        }
        return entry;
      });

    updateConfiguration(configuration);
    history.push('/');
  };

  // Handler function for all inputs on this page
  const handleChange = (type, prop) => (param) => {
    const newConfig = cloneDeep(config);
    switch (type) {
      case 'text':
        newConfig[prop] = param.target.value;
        break;
      case 'date/time':
        newConfig[prop] = param;
        break;
      default:
        throw new Error(
          'Error with handleChange function in ConfigurationPage',
        );
    }
    setConfig(newConfig);
  };

  return (
    <Container>
      <PageTitle>Configuration</PageTitle>

      <CardContainer>
        <SectionContainer>
          <SectionTitle>Interviews</SectionTitle>
          <InnerSectionContainer>
            <RowContainer>
              <FormContainer title="Meeting Link">
                <TextField
                  placeholder="URL"
                  variant="outlined"
                  value={config.interviewMeetingLink}
                  onChange={handleChange('text', 'interviewMeetingLink')}
                />
              </FormContainer>
            </RowContainer>
            <RowContainer>
              <DateContainer>
                <FormContainer title="First Round Deadline">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      inputFormat="yyyy-MM-dd"
                      mask="____-__-__"
                      value={config.interviewFirstRoundDeadline}
                      onChange={handleChange(
                        'date/time',
                        'interviewFirstRoundDeadline',
                      )}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormContainer>
              </DateContainer>
              <DateContainer>
                <FormContainer title="Second Round Deadline">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      inputFormat="yyyy-MM-dd"
                      mask="____-__-__"
                      value={config.interviewSecondRoundDeadline}
                      onChange={handleChange(
                        'date/time',
                        'interviewSecondRoundDeadline',
                      )}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormContainer>
              </DateContainer>
            </RowContainer>
          </InnerSectionContainer>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>New Members Orientation</SectionTitle>
          <InnerSectionContainer>
            <RowContainer>
              <FormContainer title="Meeting Link">
                <TextField
                  id="outlined-basic"
                  placeholder="URL"
                  variant="outlined"
                  value={config.newMembersMeetingLink}
                  onChange={handleChange('text', 'newMembersMeetingLink')}
                />
              </FormContainer>
            </RowContainer>
            <RowContainer>
              <DateContainer>
                <FormContainer title="Date">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      inputFormat="yyyy-MM-dd"
                      mask="____-__-__"
                      value={config.newMembersMeetingDate}
                      onChange={handleChange(
                        'date/time',
                        'newMembersMeetingDate',
                      )}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormContainer>
              </DateContainer>
              <TimeContainer>
                <FormContainer title="Start Time">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      value={config.newMembersMeetingStartTime}
                      onChange={handleChange(
                        'date/time',
                        'newMembersMeetingStartTime',
                      )}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormContainer>
                <FormContainer title="End Time">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      value={config.newMembersMeetingEndTime}
                      onChange={handleChange(
                        'date/time',
                        'newMembersMeetingEndTime',
                      )}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormContainer>
              </TimeContainer>
            </RowContainer>
          </InnerSectionContainer>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>Member Status Confirmation</SectionTitle>
          <InnerSectionContainer>
            <RowContainer>
              <FormContainer title="Form Link">
                <TextField
                  placeholder="URL"
                  variant="outlined"
                  value={config.newMembersFormLink}
                  onChange={handleChange('text', 'newMembersFormLink')}
                />
              </FormContainer>
            </RowContainer>
            <RowContainer>
              <DateContainer>
                <FormContainer title="Deadline">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      inputFormat="yyyy-MM-dd"
                      mask="____-__-__"
                      value={config.newMembersFormDeadline}
                      onChange={handleChange(
                        'date/time',
                        'newMembersFormDeadline',
                      )}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormContainer>
              </DateContainer>
            </RowContainer>
          </InnerSectionContainer>
        </SectionContainer>

        <ButtonContainer>
          <CancelButton onClick={goBack} cancel="true">
            Cancel
          </CancelButton>
          <SaveButton onClick={saveForm} tertiary="true">
            Save
          </SaveButton>
        </ButtonContainer>
      </CardContainer>
    </Container>
  );
};

export default ConfigurationPage;

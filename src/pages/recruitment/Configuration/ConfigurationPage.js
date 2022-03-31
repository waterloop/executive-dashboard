import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';

import FormContainer from '../../../components/FormContainer';
import Button from '../../../components/Button';

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
  const [firstDeadline, setFirstDeadline] = React.useState(new Date());
  const [secondDeadline, setSecondDeadline] = React.useState(new Date());
  const [orientationDate, setOrientationDate] = React.useState(new Date());
  const [confirmDeadline, setConfirmDeadline] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const history = useHistory();

  const goBack = () => {
    history.push('/');
  };

  const saveForm = () => {
    /* TODO: Handle submit form when user clicks save */
    history.push('/');
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
                <TextField placeholder="URL" variant="outlined" />
              </FormContainer>
            </RowContainer>
            <RowContainer>
              <DateContainer>
                <FormContainer title="First Round Deadline">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      inputFormat="MM/dd/yyyy"
                      value={firstDeadline}
                      onChange={setFirstDeadline}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormContainer>
              </DateContainer>
              <DateContainer>
                <FormContainer title="Second Round Deadline">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      inputFormat="MM/dd/yyyy"
                      value={secondDeadline}
                      onChange={setSecondDeadline}
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
                />
              </FormContainer>
            </RowContainer>
            <RowContainer>
              <DateContainer>
                <FormContainer title="Date">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      inputFormat="MM/dd/yyyy"
                      value={orientationDate}
                      onChange={setOrientationDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormContainer>
              </DateContainer>
              <TimeContainer>
                <FormContainer title="Start Time">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      value={startTime}
                      onChange={setStartTime}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormContainer>
                <FormContainer title="End Time">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      value={endTime}
                      onChange={setEndTime}
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
                <TextField placeholder="URL" variant="outlined" />
              </FormContainer>
            </RowContainer>
            <RowContainer>
              <DateContainer>
                <FormContainer title="Deadline">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      inputFormat="MM/dd/yyyy"
                      value={confirmDeadline}
                      onChange={setConfirmDeadline}
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

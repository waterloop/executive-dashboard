import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

// import * as R from 'ramda';
import { useHistory } from 'react-router-dom';
// import api from '../../../api';
import TextInput from '../../../components/TextInput';
// import UnstyledTextInput from '../../../components/TextInput';
import FormContainer from '../../../components/FormContainer';
import Button from '../../../components/Button';

const PlaceholderContainer = styled.div`
  background-color: ${({ theme }) => theme.colours.white};
  border: ${({ theme }) => theme.borders.solidGrey1};
  border-radius: 0.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 100%;

  // TODO: remove min-dimension requirements once content is available
  /* min-height: 20rem; */

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

const GridContainer = styled(Grid)`
  padding-bottom: 16px;
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
  padding: 0.5rem 0;
  margin: 2rem;
  align-self: flex-end;
`;

const CancelButton = styled(Button)`
  background-color: #afafaf;
  color: ${({ theme }) => theme.colours.white};
  font: ${({ theme }) => theme.fonts.bold18};
  border: none;
  text-decoration: none;
`;

function ConfigurationPage() {
  const history = useHistory();

  // const [formData, setformData] = useState({
  //   active: {
  //     heading: '',
  //     body: '',
  //   },
  //   nonActive: {
  //     heading: '',
  //     body: '',
  //   },
  // });

  // useEffect(() => {
  //   api.openingsDescription.getDescriptions().then((data) => {
  //     if (!R.isEmpty(data.data)) {
  //       setformData(data.data);
  //     }
  //   });
  // }, []);

  // const onChange = (type, name) => (text) => {
  //   const newState = {
  //     ...formData,
  //     [type]: { ...formData[type], [name]: text },
  //   };
  //   setformData(newState);
  // };

  const goBack = () => {
    history.push('/postings');
  };

  const saveForm = () => {
    // api.openingsDescription
    //   .updateDescriptions(formData)
    //   .then(() => history.push('/postings'));
  };

  return (
    <Container>
      <PageTitle>Configuration</PageTitle>

      <PlaceholderContainer>
        <SectionContainer>
          <SectionTitle>Interviews</SectionTitle>
          <GridContainer container spacing={1}>
            <Grid item xs={12}>
              <FormContainer title="Meeting Link">
                <TextInput
                  // value={title}
                  // onChange={updateTitle}
                  placeholder="URL"
                />
              </FormContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormContainer title="First Round Deadline">
                <TextInput
                  // value={title}
                  // onChange={updateTitle}
                  placeholder="Select Date"
                />
              </FormContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormContainer title="Second Round Deadline">
                <TextInput
                  // value={title}
                  // onChange={updateTitle}
                  placeholder="Select Date"
                />
              </FormContainer>
            </Grid>
          </GridContainer>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>New Members Orientation</SectionTitle>
          <GridContainer container spacing={1}>
            <Grid item xs={12}>
              <FormContainer title="Meeting Link">
                <TextInput
                  // value={title}
                  // onChange={updateTitle}
                  placeholder="URL"
                />
              </FormContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormContainer title="Date">
                <TextInput
                  // value={title}
                  // onChange={updateTitle}
                  placeholder="Select Date"
                />
              </FormContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormContainer title="Start Time">
                <TextInput
                  // value={title}
                  // onChange={updateTitle}
                  placeholder="Select Time"
                />
              </FormContainer>
            </Grid>
          </GridContainer>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>Member Status Confirmation</SectionTitle>
          <GridContainer container spacing={1}>
            <Grid item xs={12}>
              <FormContainer title="Form Link">
                <TextInput
                  // value={title}
                  // onChange={updateTitle}
                  placeholder="URL"
                />
              </FormContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormContainer title="Deadline">
                <TextInput
                  // value={title}
                  // onChange={updateTitle}
                  placeholder="Select Date"
                />
              </FormContainer>
            </Grid>
          </GridContainer>
        </SectionContainer>

        <ButtonContainer>
          <CancelButton onClick={goBack} cancel="true">
            Cancel
          </CancelButton>
          <Button onClick={saveForm} tertiary="true">
            Save
          </Button>
        </ButtonContainer>
      </PlaceholderContainer>
    </Container>
  );
}

export default ConfigurationPage;

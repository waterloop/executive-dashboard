import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

import ImagePreview from '../ImagePreview';
import FormContainer from '.';
import DropDownList from '../DropDownList';
import TextInput from '../TextInput';

export default {
  title: 'FormContainer',
  component: FormContainer,
  argTypes: {},
};

const Template = (args) => (
  <ThemeProvider theme={theme}>
    <FormContainer {...args} />
  </ThemeProvider>
);

export const TextArea = Template.bind({});
TextArea.args = {
  title: 'Text Area',
  children: <textarea>This is a bunch of placeholder text</textarea>,
};

export const Title = Template.bind({});
Title.args = {
  title: 'Title',
  children: <input type="text" />,
};

export const SelectMenu = Template.bind({});
SelectMenu.args = {
  title: 'Select Menu',
  children: (
    <DropDownList
      title="Options...."
      items={[
        {
          text: 'Option 1',
          id: 123,
        },
        {
          text: 'Option 2 ',
          id: 13,
        },
        {
          text: 'Option 3',
          id: 3,
        },
      ]}
    />
  ),
};

export const SubmitImage = Template.bind({});
SubmitImage.args = {
  title: 'Submit an Image',
  children: <ImagePreview />,
};

export const TextInputRequired = Template.bind({});
TextInputRequired.args = {
  title: 'Name (required)',
  children: (isError) => <TextInput value='' isError={isError}/>,
  isError: true,
}

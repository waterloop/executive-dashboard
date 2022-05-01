import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';

import Button from '.';

export default {
  title: 'Button',
  component: Button,
  argTypes: {},
};

const Template = (args) => (
  <ThemeProvider theme={theme}>
    <Button {...args} />
  </ThemeProvider>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true,
  label: 'Button',
};

export const Delete = Template.bind({});
Delete.args = {
  del: true,
  label: 'Delete',
};

export const Cancel = Template.bind({});
Cancel.args = {
  cancel: true,
  label: 'Cancel',
};

export const Link = Template.bind({});
Link.args = {
  label: 'Button',
  link: true,
};

export const SecondaryLink = Template.bind({});
SecondaryLink.args = {
  secondary: true,
  label: 'Button',
  link: true,
};

export const DeleteLink = Template.bind({});
DeleteLink.args = {
  del: true,
  label: 'Delete',
  link: true,
};

export const CancelLink = Template.bind({});
CancelLink.args = {
  cancel: true,
  label: 'Cancel',
  link: true,
};

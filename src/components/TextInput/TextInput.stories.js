import React from 'react';
import TextInput from '.';
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import { getRichText, submitRichText } from '../../utils/rich-text/rich-text-utils';

export default {
  title: 'TextInput',
  component: TextInput,
  argTypes: {
    value: { control: 'text' },
  },
};

const Template = (args) => <ThemeProvider theme={theme}><TextInput {...args} /></ThemeProvider>;

export const SingleLineEmpty = Template.bind({});
SingleLineEmpty.args = {
  value: '',
};

export const SingleLineEmptyRequired = Template.bind({});
SingleLineEmptyRequired.args = {
  value: '',
  isError: true,
};

export const SingleLineFilled = Template.bind({});
SingleLineFilled.args = {
  value: 'Text a user has entered',
};

export const MultiLineEmpty = Template.bind({});
MultiLineEmpty.args = {
  value: '',
  multiLine: true,
};

export const MultiLineEmptyRequired = Template.bind({});
MultiLineEmptyRequired.args = {
  value: '',
  multiLine: true,
  isError: true,
};

export const MultiLineFilled = Template.bind({});
MultiLineFilled.args = {
  value: 'Text a user has entered and a long sentence appears like lorem  ipsum lorem ipsum lorem ipsum Text a user has entered and a long sentence appears like lorem  ipsum lorem ipsum lorem ipsum Text a user has entered and a long sentence appears like lorem  ipsum lorem ipsum lorem ipsum Text a user has entered and a long sentence appears like lorem  ipsum lorem ipsum lorem ipsum Text a user has entered and a long sentence appears like lorem  ipsum lorem ipsum lorem ipsum',
  multiLine: true,
};

export const RichTextUseStateExample = () => {
  const [state, onChange] = React.useState(getRichText('<strong><p>Hello I am Strong</p></strong>'))
  const onClick = () => {
    // eslint-disable-next-line no-alert
    alert(submitRichText(state));
  }
  return (
    <ThemeProvider theme={theme}>
      <TextInput
        value={state}
        onChange={onChange}
        multiLine
        richText
      />
      <button onClick={onClick}>Show as html</button>
    </ThemeProvider>
  )
}


const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {
        value: action.value,
      }
    default:
      return state;
  }
}

export const RichTextUseReducerExample = () => {
  const [state, dispatch] = React.useReducer(reducer, { value: getRichText('<strong>Hello I am Strong</strong>')});
  const onClick = () => {
    // eslint-disable-next-line no-alert
    alert(submitRichText(state.value));
  }
  return (
    <ThemeProvider theme={theme}>
      <TextInput
        value={state.value}
        onChange={(value) => dispatch({ type: 'UPDATE_VALUE', value })}
        multiLine
        richText
      />
      <button onClick={onClick}>Show as html</button>
    </ThemeProvider>
  )
}

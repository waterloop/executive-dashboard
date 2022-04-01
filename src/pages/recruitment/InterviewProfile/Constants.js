import theme from '../../../theme';

export const options = ['Pending', 'To accept', 'To reject', 'Undecided'];

export const backgrounds = [
  theme.colours.yellows.yellow1,
  theme.colours.greens.green2,
  theme.colours.reds.red1,
  theme.colours.greys.grey2,
];

export const statuses = {
  interview_pending: 'Pending',
  interview_reject: 'To reject',
  final_accept: 'To accept',
  interview_undecided: 'Undecided',
};

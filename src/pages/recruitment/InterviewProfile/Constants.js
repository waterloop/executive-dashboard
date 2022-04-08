import theme from '../../../theme';

export const options = ['Pending', 'To accept', 'To reject', 'Undecided'];

export const backgrounds = {
  interview_pending: theme.colours.yellows.yellow1,
  interview_reject: theme.colours.reds.red1,
  final_accept: theme.colours.greens.green2,
  interview_undecided: theme.colours.greys.grey2,
};

export const statuses = {
  interview_pending: 'Pending',
  interview_reject: 'To reject',
  final_accept: 'To accept',
  interview_undecided: 'Undecided',
};

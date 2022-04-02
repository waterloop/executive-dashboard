import theme from '../../../theme';

export const options = ['Pending', 'To interview', 'To reject', 'Undecided'];

export const backgrounds = {
  app_pending: theme.colours.yellows.yellow1,
  interview_pending: theme.colours.blues.blue2,
  app_reject: theme.colours.reds.red1,
  app_undecided: theme.colours.greys.grey2,
};

// export const statuses = {
//   app_pending: 'Pending',
//   app_reject: 'To reject',
//   interview_pending: 'To interview',
//   app_undecided: 'Undecided',
//   interview_reject: 'To interview',
//   final_accept: 'To interview',
//   interview_undecided: 'To interview',
// };

export const statuses = {
  app_pending: 'Pending',
  app_reject: 'To reject',
  interview_pending: 'To interview',
  app_undecided: 'Undecided',
};

export const postingColours = [
  theme.colours.blues.blue2,
  theme.colours.greens.green1,
  theme.colours.purples.purple1,
];

export const interviewStatuses = [
  'interview_reject',
  'final_accept',
  'interview_undecided',
];

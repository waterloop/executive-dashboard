import { getTermDate } from '../../../utils';

export const colNames = [
  'NAME',
  'YEAR OF STUDY',
  'TERM',
  'SUBTEAM',
  'POSITION',
];

export const TERM_TYPE_OPTIONS = [
  { name: 'study', formattedName: 'Study' },
  { name: 'coop', formattedName: 'Co-op' },
];

export const YEAR_OPTIONS = [
  { name: '1A', formattedName: '1A' },
  { name: '1B', formattedName: '1B' },
  { name: '2A', formattedName: '2A' },
  { name: '2B', formattedName: '2B' },
  { name: '3A', formattedName: '3A' },
  { name: '3B', formattedName: '3B' },
  { name: '4A', formattedName: '4A' },
  { name: '4B', formattedName: '4B' },
  { name: '5A', formattedName: '5A' },
];

export const MIN_SUBTEAMS_SHOWN = 6;
export const MIN_YEARS_SHOWN = 2;
export const ROWS_PER_PAGE = 11;

export const CURRENT_TERM_YEAR =
  process.env.NODE_ENV === 'development'
    ? 'FALL-2022'
    : getTermDate(Date.now());

export const PREVIOUS_TERM_YEAR =
  process.env.NODE_ENV === 'development'
    ? 'SPRING-2022'
    : getTermDate(new Date().setMonth(Date.now().getMonth() - 4));

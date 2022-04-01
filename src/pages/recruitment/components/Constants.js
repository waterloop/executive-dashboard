export const colNames = [
  'NAME',
  'YEAR OF STUDY',
  'TERM',
  'SUBTEAM',
  'POSITION',
];

export const SUBTEAM_OPTIONS = [
  { name: 'WebTeam', formattedName: 'Web' },
  { name: 'Electrical', formattedName: 'Electrical' },
  { name: 'Mechanical', formattedName: 'Mechanical' },
  { name: 'LIM', formattedName: 'LIM' },
  { name: 'Business', formattedName: 'Business' },
  { name: 'Infrastructure', formattedName: 'Infrastructure' },
  { name: 'Propulsion', formattedName: 'Propulsion' },
  { name: 'BMS', formattedName: 'BMS' },
  { name: 'Embedded', formattedName: 'Embedded' },
  { name: 'MotorControl', formattedName: 'Motor Control' },
  { name: 'Communications', formattedName: 'Communications' },
];

export const POSITION_OPTIONS = [
  { name: 'Front End developer', formattedName: 'Front End developer', team: 'WebTeam' },
  { name: 'Back End developer', formattedName: 'Back End developer', team: 'WebTeam' },
  { name: 'Zip Zap developer', formattedName: 'Zip Zap developer', team: 'Electrical' },
  { name: 'Gears guy', formattedName: 'Gears guy', team: 'Mechanical' },
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

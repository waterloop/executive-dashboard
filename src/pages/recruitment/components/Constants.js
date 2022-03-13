import { createData } from '../../../utils';

export const rows = [
  createData('Michael', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('John', '1B', 'coop', 'web', 'Backend Developer', 'pending'),
  createData(
    'Michael1 really long name',
    '1A',
    'study',
    'web',
    'Frontend Developer',
    'pending',
  ),
  createData('Michael2', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael3', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael4', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael5', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael6', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael7', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael8', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael9', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael10', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael11', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael12', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael13', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael14', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael15', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael16', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData(
    'Jack',
    '3A',
    'study',
    'electrical',
    'Zip Zap Developer',
    'interview',
  ),
  createData('Jean', '4A', 'study', 'web', 'Frontend Developer', 'rejected'),
];

export const colNames = [
  'NAME',
  'YEAR OF STUDY',
  'TERM',
  'SUBTEAM',
  'POSITION',
];

export const SUBTEAM_OPTIONS = [
  'web',
  'electrical',
  'mechanical',
  'lim',
  'business',
  'infrastructure',
  'propulsion',
  'bms',
  'embedded',
  'motorControl',
  'communications',
  'firmware',
];

export const TERM_TYPE_OPTIONS = ['study', 'coop'];

export const YEAR_OPTIONS = [
  '1A',
  '1B',
  '2A',
  '2B',
  '3A',
  '3B',
  '4A',
  '4B',
  '5A',
];

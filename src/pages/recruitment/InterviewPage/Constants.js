import { createData } from '../../../utils';

export const rows = [
  createData('MichaelINT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('John', '1B', 'coop', 'web', 'Backend Developer', 'pending'),
  createData(
    'Michael1 really INT',
    '1A',
    'study',
    'web',
    'Frontend Developer',
    'pending',
  ),
  createData('Michael2INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael3INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael4INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael5INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael6INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael7INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael8INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('Michael9INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael10INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael11INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael12INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael13INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael14INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael15INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('ichael16INT', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData(
    'JackINT',
    '3A',
    'study',
    'electrical',
    'Zip Zap Developer',
    'accept',
  ),
  createData('JeanINT', '4A', 'study', 'web', 'Frontend Developer', 'rejected'),
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

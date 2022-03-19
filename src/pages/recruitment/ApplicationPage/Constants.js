import { createData } from '../../../utils';

export const rows = [
  createData('Michael', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
  createData('John', '1B', 'coop', 'web', 'Backend Developer', 'pending'),
  createData('Michael1', '1A', 'study', 'web', 'Frontend Developer', 'pending'),
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

export const tabs = ['pending', 'interview', 'rejected', 'undecided'];

export const tableColumns = [
  {
    columnName: 'name',
    formattedName: 'NAME',
  },
  {
    columnName: 'year',
    formattedName: 'YEAR',
  },
  {
    columnName: 'term',
    formattedName: 'TERM',
  },
  {
    columnName: 'subteam',
    formattedName: 'SUBTEAM',
  },
  {
    columnName: 'position',
    formattedName: 'POSITION',
  },
];

import { createData } from '../../../utils';

export const tableColumns = ['name', 'year of study', 'term', 'subteam', 'position', 'status'];

export const rows = [
  createData(tableColumns, ['Michael', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['John', '1B', 'coop', 'web', 'Backend', 'pending']),
  createData(tableColumns, ['Mhael1', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['Mhael2', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['Mhael3', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['Mhael4', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['Mhael5', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['Mhael6', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['Mhael7', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['Mhael8', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['Mhael9', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['chael10', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['chael11', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['chael12', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['chael13', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['Jean', '4A', 'study', 'web', 'Frontend', 'rejected']),
  createData(tableColumns, [
    'Jack',
    '3A',
    'study',
    'electrical',
    'Zip Zap',
    'interview',
  ]),
];

export const tabs = ['pending', 'interview', 'rejected', 'undecided'];

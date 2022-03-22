import { createData } from '../../../utils';

export const tableColumns = ['name', 'year of study', 'term', 'subteam', 'position', 'status'];

export const rows = [
  createData(tableColumns, ['m1int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['m2int', '1B', 'coop', 'web', 'Backend', 'pending']),
  createData(tableColumns, ['m3int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['m4int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['m5int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['m6int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['m7int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['m8int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['m9int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['m10int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['m11int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['m12int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['m13int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['m14int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, ['m15int', '1A', 'study', 'web', 'Frontend', 'pending']),
  createData(tableColumns, [
    'Jeanint',
    '4A',
    'study',
    'web',
    'Frontend',
    'rejected',
  ]),
  createData(tableColumns, [
    'Jack',
    '3A',
    'study',
    'electrical',
    'Zip Zap',
    'accept',
  ]),
];

export const tabs = ['pending', 'accept', 'rejected', 'undecided'];

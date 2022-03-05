/* eslint-disable */

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import theme2 from '../../../theme';

function createData(name, year, term, subteam, position, status) {
  return { name, year, term, subteam, position, status };
}

const ROWS_PER_PAGE = 11;

// TODO: (optional): Move to separate file (hooks.js) that grabs relevant data from backend
// TODO: and gives us only data that needs to be used in ApplicationsTable.js.
const rows = [
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

const colNames = ['NAME', 'YEAR OF STUDY', 'TERM', 'SUBTEAM', 'POSITION'];

// TODO: consider overriding css styling directly using backticks ``. Stick with MatUI if this is too difficult.
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E1D9F6',
    color: theme.palette.common.black,
    fontWeight: 600,
    font: theme2.medium18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    font: theme2.medium18,
    fontWeight: 600,
  },
}));

function CustomizedTables({ status, subteams, termTypes, years }) {
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const rowsShown = rows.filter(
    (row) =>
      row.status === status &&
      subteams[row.subteam] &&
      termTypes[row.term] &&
      years[row.year],
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {colNames.map((col) => (
              <StyledTableCell align="center">{col}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsShown
            .slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE)
            .map((row) => (
              <TableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {`${row.name}${status}`}
                </StyledTableCell>
                <TableCell align="center">{row.year}</TableCell>
                <TableCell align="center">{row.term}</TableCell>
                <TableCell align="center">{row.subteam}</TableCell>
                <TableCell align="left">{row.position}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component={TableContainer}
        count={rowsShown.length}
        rowsPerPage={ROWS_PER_PAGE}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
}
export default CustomizedTables;

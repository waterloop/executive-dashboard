import * as React from 'react';
/* eslint-disable */
import { useEffect } from 'react';
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

const rowsPerPage = 11;

const rows = [
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E1D9F6',
    color: theme.palette.common.black,
    fontWeight: 600,
    font: theme2.fonts18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    font: theme2.fonts18,
    fontWeight: 600,
  },
}));

function CustomizedTables({ status, subteams, termTypes, years }) {
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>NAME</StyledTableCell>
            <StyledTableCell align="center">YEAR OF STUDY</StyledTableCell>
            <StyledTableCell align="center">TERM</StyledTableCell>
            <StyledTableCell align="center">SUBTEAM</StyledTableCell>
            <StyledTableCell align="left">POSITION</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .filter((row) => row.status === status)
            .filter((row) => subteams[row.subteam])
            .filter((row) => termTypes[row.term])
            .filter((row) => years['_' + row.year])
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
        count={
          rows
            .filter((row) => row.status === status)
            .filter((row) => subteams[row.subteam])
            .filter((row) => termTypes[row.term])
            .filter((row) => years['_' + row.year]).length
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
}
export default CustomizedTables;

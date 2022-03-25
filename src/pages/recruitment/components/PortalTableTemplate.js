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
import { ROWS_PER_PAGE } from './Constants';

// TODO: consider overriding css styling directly using backticks ``. Stick with MatUI if this is too difficult.
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E1D9F6',
    color: theme.palette.common.black,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 600,
  },
}));

const PortalTableTemplate = ({ columns, rows }) => {
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table" component="table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <StyledTableCell align="center" key={col}>
                {col.toUpperCase()}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE)
            .map((row) => (
              <TableRow
                key={row.name}
                onClick={() =>
                  row.profileLink && window.history.push(row.profileLink)
                }
              >
                <StyledTableCell
                  component="th"
                  scope="row"
                  key={`${row.name}-fullname`}
                >
                  {`${row.name}`}
                </StyledTableCell>
                {columns.slice(1).map((col) => (
                  <TableCell align="center" key={col}>
                    {row[col]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component={TableContainer}
        count={rows.length}
        rowsPerPage={ROWS_PER_PAGE}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};
export default PortalTableTemplate;

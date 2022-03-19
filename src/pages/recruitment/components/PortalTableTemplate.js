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

const ROWS_PER_PAGE = 11;

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

const PortalTableTemplate = ({
  status,
  subteams,
  termTypes,
  years,
  columns,
  rows,
}) => {
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
      <Table aria-label="customized table" component="table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <StyledTableCell align="center" key={col.columnName}>
                {col.formattedName}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsShown
            .slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE)
            .map((row) => (
              <TableRow key={row.name}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  key={`${row.name}1`}
                >
                  {`${row.name}`}
                </StyledTableCell>
                {columns.slice(1).map((col) => (
                  <TableCell align="center" key={col.columnName}>
                    {row[col.columnName]}
                  </TableCell>
                ))}
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
};
export default PortalTableTemplate;

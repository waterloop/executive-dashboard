import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { Typography } from '@material-ui/core';

import { ROWS_PER_PAGE } from './Constants';

const EntryTableRow = styled(TableRow)`
  background-color: ${({ theme }) => theme.colours.white};

  &.link {
    cursor: pointer;
  }
`;

const ColumnHeaderRow = styled(TableRow)`
  -webkit-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  -moz-box-shadow: ${({ theme }) => theme.shadows.shadow1};
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
`;

const ColumnHeaderCell = styled(TableCell)`
  background-color: ${({ theme }) => theme.colours.purples.purple2};
  color: ${({ theme }) => theme.colours.black1};
`;

const ColumnHeaderText = styled(Typography)`
  && {
    font: ${({ theme }) => theme.fonts.bold18};
  }
`;

const NameRowText = styled(Typography)`
  && {
    font: ${({ theme }) => theme.fonts.bold16};
  }
`;

const RowText = styled(Typography)`
  && {
    font: ${({ theme }) => theme.fonts.medium16};
  }
`;

const PortalTableTemplate = ({ columns, rows }) => {
  const history = useHistory();

  const [page, setPage] = React.useState(0);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer>
      <Table component="table">
        <TableHead>
          <ColumnHeaderRow>
            {columns.map((col) => (
              <ColumnHeaderCell align="center" key={col}>
                <ColumnHeaderText>{col.toUpperCase()}</ColumnHeaderText>
              </ColumnHeaderCell>
            ))}
          </ColumnHeaderRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE)
            .map((row) => (
              <EntryTableRow
                key={row.name}
                onClick={() => row.profileLink && history.push(row.profileLink)}
                className={row.profileLink && 'link'}
              >
                <TableCell
                  component="th"
                  scope="row"
                  key={`${row.name}-fullname`}
                >
                  <NameRowText>{`${row.name}`}</NameRowText>
                </TableCell>
                {columns.slice(1).map((col) => (
                  <TableCell align="center" key={col}>
                    <RowText>{row[col]}</RowText>
                  </TableCell>
                ))}
              </EntryTableRow>
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

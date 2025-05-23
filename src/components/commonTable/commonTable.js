import PropTypes from 'prop-types';
import { useMemo, Fragment, useEffect } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { CircularProgress, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';

import { HeaderSort, TablePagination } from 'components/third-party/ReactTable';
import { renderFilterTypes } from 'utils/react-table';
import EmptyPlaceholder from 'components/Placeholders/emptyPlaceholder';
import ScrollX from 'components/ScrollX';

const CommonTable = ({
  columns,
  data,
  getHeaderProps,
  renderRowSubComponent,
  loading,
  page,
  setPage,
  totalRecords,
  isPagination,
  selectedTrue = false,
  onSelectedRowsChange
}) => {
  const theme = useTheme();

  const filterTypes = useMemo(() => renderFilterTypes, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    visibleColumns,
    rows,
    state: { expanded },
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      filterTypes
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    onSelectedRowsChange && onSelectedRowsChange(selectedFlatRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFlatRows]);

  return (
    <ScrollX>
      <Stack spacing={3}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={`headerGroup-${i}`}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell
                    {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}
                    key={`headerCell-${index}`}
                  >
                    <HeaderSort column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {loading || data?.length === 0 ? (
              <TableRow>
                <TableCell
                  style={{
                    textAlign: 'center',
                    height: '300px',
                    padding: '40px',
                    verticalAlign: 'top',
                    borderBottom: 'none',
                    backgroundColor: '#f5f5f5'
                  }}
                  colSpan="100%"
                >
                  {loading ? <CircularProgress /> : <EmptyPlaceholder msg="No conversations" height="100px" color="#64748B" />}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, i) => {
                prepareRow(row);
                const rowProps = row.getRowProps();

                return (
                  <Fragment key={`row-${i}`}>
                    <TableRow
                      {...rowProps}
                      {...(selectedTrue && { onClick: () => row.toggleRowSelected() })}
                      sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                      key={`row-${i}`}
                    >
                      {row.cells.map((cell, index) => (
                        <TableCell {...cell.getCellProps([{ className: cell.column.className }])} key={`cell-${index}`}>
                          {cell.render('Cell')}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })}
                  </Fragment>
                );
              })
            )}

            {isPagination && (
              <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
                <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                  <TablePagination disabled={loading} pageSize={10} page={page} totalRecord={totalRecords} setPage={setPage} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Stack>
    </ScrollX>
  );
};
CommonTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  getHeaderProps: PropTypes.func,
  handleAdd: PropTypes.func,
  renderRowSubComponent: PropTypes.any,
  loading: PropTypes.bool,
  isPagination: PropTypes.bool,
  selectedTrue: PropTypes.bool,
  totalRecords: PropTypes.number,
  page: PropTypes.number,
  setPage: PropTypes.func,
  ModalData: PropTypes.elementType,
  onSelectedRowsChange: PropTypes.func
};
export default CommonTable;

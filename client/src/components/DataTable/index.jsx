import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Menu,
  MenuItem, } from '@mui/material';
import { MoreVert as MoreVertIcon, } from '@mui/icons-material';
import TableChartIcon from '@mui/icons-material/TableChart';
import { visuallyHidden, } from '@mui/utils';

const DataTable = ({
  data,
  columns,
  onSort,
  actions,
  keyField,
}) => {
  const [order, setOrder,] = useState('asc');
  const [orderBy, setOrderBy,] = useState(columns[0].field);
  const [selected, setSelected,] = useState([]);
  const [menuAnchorEls, setMenuAnchorEls,] = useState({
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    onSort(property, isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data?.map((n) => n[keyField]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleMenuClick = (event, rowId) => {
    setMenuAnchorEls((prev) => ({
      ...prev,
      [rowId]: event.currentTarget,
    }));
  };

  const handleMenuClose = (rowId) => {
    setMenuAnchorEls((prev) => ({
      ...prev,
      [rowId]: null,
    }));
  };

  const renderTableRow = (row) => (
    <TableRow
      hover
      key={row[keyField]}
      tabIndex={-1}
    >
      <TableCell padding='checkbox'>
        <Checkbox
          color='primary'
          checked={isSelected(row[keyField])}
          onChange={(event) => handleClick(event, row[keyField])}
        />
      </TableCell>
      {columns.map((column) => (
        <TableCell
          key={column.field}
          align={column.numeric ? 'right' : 'left'}
          sx={{
            borderRight: '1px solid rgba(224, 224, 224, 1)', 
          }} // Vertical border between columns
        >
          {row[column.field]}
        </TableCell>
      ))}
      <TableCell>
        <IconButton
          aria-controls={`action-menu-${row[keyField]}`}
          aria-haspopup='true'
          onClick={(event) => handleMenuClick(event, row[keyField])}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id={`action-menu-${row[keyField]}`}
          anchorEl={menuAnchorEls[row[keyField]]}
          open={Boolean(menuAnchorEls[row[keyField]])}
          onClose={() => handleMenuClose(row[keyField])}
        >
          {actions?.map((action) => (
            <MenuItem
              key={action.label}
              onClick={() => {
                action.handler(row);
                handleMenuClose(row[keyField]);
              }}
            >
              {action.label}
            </MenuItem>
          ))}
        </Menu>
      </TableCell>
    </TableRow>
  );

  return (
    <Box sx={{
      width: '100%', overflowX: 'auto', 
    }}>
      <Paper sx={{
        width: '100%', mb: 2, 
      }}>
        <TableContainer>
          <Table
            sx={{
              minWidth: 750, 
            }}
            aria-labelledby='tableTitle'
            size='small'
          >
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox
                    color='primary'
                    indeterminate={selected?.length > 0 && selected?.length < data?.length}
                    checked={data?.length > 0 && selected?.length === data?.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {columns?.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.numeric ? 'right' : 'left'}
                    sortDirection={orderBy === column.field ? order : false}
                    sx={{
                      borderRight: '1px solid rgba(224, 224, 224, 1)', 
                    }} // Vertical border
                  >
                    <TableSortLabel
                      active={orderBy === column.field}
                      direction={orderBy === column.field ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, column.field)}
                    >
                      {column.label}
                      {orderBy === column.field ? (
                        <Box component='span' sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>
                  <Tooltip title='Filter list'>
                    <IconButton>
                      <TableChartIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => renderTableRow(row))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired,
  keyField: PropTypes.string.isRequired,
};

export default DataTable;

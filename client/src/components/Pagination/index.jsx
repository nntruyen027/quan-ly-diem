import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Pagination as MuiPagination, Select, } from '@mui/material';
import { translate, } from '~/helpers';

const Pagination = ({ count, page, setPage, rowsPerPage, setRowsPerPage, }) => {
  if(count <= 0)
    return (<></>);

  return (
    <div className='flex justify-between items-center'>
      <div className='flex-1 flex justify-center'>
        <MuiPagination 
          count={count} 
          page={page} 
          onChange={(e, value) => setPage(value)} 
        />
      </div>
      <span className='ml-auto'>
        <label className='mr-2 text-gray-900 text-base  font-medium'>{translate('rows-per-page-label')}</label>
        <Select
          size='small'
          labelId='demo-simple-select-disabled-label bg-'
          id='demo-simple-select-disabled'
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(e.target.value)}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </span>
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
};

export default Pagination;
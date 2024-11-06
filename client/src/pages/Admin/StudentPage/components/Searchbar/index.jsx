import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, } from '@mui/material';
import { translate, } from '~/helpers';

const Searchbar = ({ value, setValue, onSearch, }) => {
  console.log(value);
  const render = () => {
    return (
      <div className='flex gap-3 h-10 mb-3 w-full justify-end'>
        <TextField size='small' sx={{
          height: '100%',
        }} value={value} onChange={(e) => setValue(e.target.value)} placeholder='Nhập tên học sinh' label='Tìm kiếm'/>
        <Button onClick={onSearch} variant='contained'>{translate('Tìm kiếm')}</Button>
        <Button onClick={() => {
          setValue('');
          onSearch();
        }} variant='contained'>{translate('Làm mới')}</Button>
      </div>
    );
  };
  return render();
};

Searchbar.propTypes = {
  value: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Searchbar;
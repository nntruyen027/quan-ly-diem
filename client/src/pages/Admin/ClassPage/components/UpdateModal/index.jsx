import React, { useEffect, useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { FormControl, InputLabel, MenuItem, Select, TextField, } from '@mui/material';
import { useDispatch, useSelector, } from 'react-redux';
import { getTeachersStart, } from '~/redux/account/slice';

function UpdateModal({ classroom, show, setShow, updateClass, }) { 
  const [name, setName,] = useState('');
  const [homeroomTeacher, setHomeroomTeacher,] = useState('');
  const [gradeLevel, setGradeLevel,] = useState('');

  const handleClose = () => setShow(false);
  const handleSave = () => {
    updateClass(classroom?._id, {
      name, homeroomTeacher, gradeLevel,
    });
  };
  
  const dispatch = useDispatch();
  const { accounts, } = useSelector(state => state.account);

  useEffect(() => {
    dispatch(getTeachersStart({
      page: 1, 
      limit: 1000,
    }));
   
  }, []);

  useEffect(() => {
    setName(classroom?.name);
    
    setGradeLevel(classroom?.gradeLevel);
    setHomeroomTeacher(classroom?.homeroomTeacher?._id);
  }, [classroom, accounts,]);

  return (
    <BModal aria-labelledby='contained-modal-title-vcenter'
      centered show={show} onHide={handleClose}>
      <BModal.Header closeButton>
        <BModal.Title>{translate('update-class-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body className='flex flex-col gap-3'>
        <TextField 
          className='w-full'
          required
          id='outlined-required'
          label={translate('name-label')}
          size='small'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth size='small'>
          <InputLabel >{translate('homeroom-teacher')}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={homeroomTeacher}
            label={translate('homeroom-teacher')}
            size='small'
            onChange={(e) => setHomeroomTeacher(e.target.value)}
          >
            {accounts?.map(value => (
              <MenuItem key={value?._id} value={value?._id}>{value?.fullname}</MenuItem>
            ))}
            
          </Select>
        </FormControl>
        <FormControl fullWidth size='small'>
          <InputLabel >{translate('grade-level')}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={gradeLevel}
            label={translate('grade-level')}
            size='small'
            onChange={(e) => setGradeLevel(e.target.value)}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>
      </BModal.Body>
      <BModal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          {translate('cancel-btn-label')}
        </Button>
        <Button variant='primary' onClick={handleSave}>
          {translate('save-btn-label')}
        </Button>
      </BModal.Footer>
    </BModal>
  ); }

UpdateModal.propTypes = {
  classroom: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  updateClass: PropTypes.func.isRequired,
};

export default UpdateModal;
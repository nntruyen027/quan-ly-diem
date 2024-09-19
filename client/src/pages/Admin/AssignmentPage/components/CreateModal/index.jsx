import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { FormControl, InputLabel, MenuItem, Select, } from '@mui/material';
import { useDispatch, useSelector, } from 'react-redux';
import { getTeachersStart, } from '~/redux/account/slice';
import { getSubjectsStart, } from '~/redux/subject/slice';

function CreateModal({ show, setShow, createObject, }) {
  const { accounts, } = useSelector(state => state.account);
  const { subjects, } = useSelector(state => state.subject);

  const [subject, setSubject,] = useState('');
  const [teacher, setTeacher,] = useState('');

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleSave = () => {
    createObject({
      subject,
      teacher,
    });
  };

  React.useEffect(() => {
    dispatch(getTeachersStart({
      limit: 1000,
      page: 1,
    }));
    dispatch(getSubjectsStart({
      limit: 1000,
      page: 1,
    }));
  }, []);

  return (
    <BModal aria-labelledby='contained-modal-title-vcenter'
      centered show={show} onHide={handleClose}>
      <BModal.Header closeButton>
        <BModal.Title>{translate('create-subject-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body className='flex flex-col gap-3'>
        <FormControl fullWidth size='small'>
          <InputLabel >{translate('teacher')}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={teacher}
            label={translate('teacher')}
            size='small'
            onChange={(e) => setTeacher(e.target.value)}
          >
            {accounts?.map(value => (
              <MenuItem key={value?._id} value={value?._id}>{value?.fullname}</MenuItem>
            ))}
            
          </Select>
        </FormControl>
        <FormControl fullWidth size='small'>
          <InputLabel >{translate('subject')}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={subject}
            label={translate('subject')}
            size='small'
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjects?.map(value => (
              <MenuItem key={value?._id} value={value?._id}>{value?.name}</MenuItem>
            ))}
            
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
  );
}

CreateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  createObject: PropTypes.func.isRequired,
};

export default CreateModal;
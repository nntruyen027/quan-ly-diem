import React, { useEffect, useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { FormControl, InputLabel, MenuItem, Select, } from '@mui/material';
import { useDispatch, useSelector, } from 'react-redux';
import { getClassesStart, } from '~/redux/class/slice';

function UpdateModal({ account, show, setShow, updateAccount, }) {
  const [classroom, setClassroom,] = useState(account?.class);

  const { classes, } = useSelector(state => state.class);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleSave = () => {
    updateAccount(account?._id, {
      className: classroom,
    });
  };

  useEffect(() => {
    dispatch(getClassesStart({
      limit: 1000,
      page: 1,
    }));
  }, []);

  useEffect(() => {
    if (account) {
      setClassroom(account?.class?._id);
    }
  }, [classes,]);

  return (
    <BModal aria-labelledby='contained-modal-title-vcenter'
      centered show={show} onHide={handleClose}>
      <BModal.Header closeButton>
        <BModal.Title>{translate('update-account-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body className='flex flex-col gap-3'>
        <FormControl fullWidth size='small'>
          <InputLabel >{translate('class')}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={classroom}
            label={translate('class')}
            size='small'
            onChange={(e) => setClassroom(e.target.value)}
          >
            {classes?.map(value=> <MenuItem key={value?._id} value={value?._id}>{`${value?.gradeLevel}${value?.name}`}</MenuItem>)}
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

UpdateModal.propTypes = {
  account: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
};

export default UpdateModal;
import React, { useEffect, useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { FormControl, InputLabel, MenuItem, Select, } from '@mui/material';

function UpdateModal({ account, show, setShow, updateAccount, }) {
  const [isAdmin, setIsAdmin,] = useState(account?.isAdmin);
  const [isTeacher, setIsTeacher,] = useState(account?.isTeacher);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    updateAccount(account?._id, {
      isAdmin, isTeacher,
    });
  };

  useEffect(() => {
    if (account) {
      setIsAdmin(account.isAdmin || false);
      setIsTeacher(account.isTeacher || false);
    }
  }, [account,]);

  return (
    <BModal aria-labelledby='contained-modal-title-vcenter'
      centered show={show} onHide={handleClose}>
      <BModal.Header closeButton>
        <BModal.Title>{translate('update-account-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body className='flex flex-col gap-3'>
        <FormControl fullWidth size='small'>
          <InputLabel >{translate('is-admin')}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={isAdmin}
            label={translate('is-admin')}
            size='small'
            onChange={(e) => setIsAdmin(e.target.value)}
          >
            <MenuItem value={true}>{translate('yes')}</MenuItem>
            <MenuItem value={false}>{translate('no')}</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size='small'>
          <InputLabel >{translate('is-teacher')}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={isTeacher}
            label={translate('is-teacher')}
            size='small'
            onChange={(e) => setIsTeacher(e.target.value)}
          >
            <MenuItem value={true}>{translate('yes')}</MenuItem>
            <MenuItem value={false}>{translate('no')}</MenuItem>
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
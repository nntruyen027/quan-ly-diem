import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, } from '@mui/material';

function CreateModal({ show, setShow, createAccount, }) {
  const [username, setUsername,] = useState('');
  const [fullname, setFullname,] = useState('');
  const [email, setEmail,] = useState('');
  const [password, setPassword,] = useState('');

  const handleClose = () => setShow(false);
  const handleSave = () => {
    createAccount({
      username, fullname, email, password, isAdmin: true,
    });
  };

  return (
    <BModal aria-labelledby='contained-modal-title-vcenter'
      centered show={show} onHide={handleClose}>
      <BModal.Header closeButton>
        <BModal.Title>{translate('create-account-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body className='flex flex-col gap-3'>
        <div className='flex gap-3 justify-between'>
          <TextField 
            className='w-full'
            required
            id='outlined-required'
            label={translate('username')}
            size='small'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className='w-full'
            id='outlined-multiline-flexible'
            label={translate('fullname')}
            multiline
            maxRows={4}
            size='small'
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className='flex gap-3 justify-between'>
          <TextField 
            className='w-full'
            required
            id='outlined-required'
            label={translate('email')}
            size='small'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className='w-full'
            id='outlined-multiline-flexible'
            label={translate('password')}
            multiline
            maxRows={4}
            size='small'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
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
  createAccount: PropTypes.func.isRequired,
};

export default CreateModal;
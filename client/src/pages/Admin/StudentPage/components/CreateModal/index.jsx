import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, MenuItem, } from '@mui/material';

function CreateModal({ show, setShow, createAccount, }) {
  const [username, setUsername,] = useState('');
  const [fullname, setFullname,] = useState('');
  const [email, setEmail,] = useState('');
  const [password, setPassword,] = useState('');
  const [birthday, setBirthday,] = useState('');
  const [phone, setPhone,] = useState('');
  const [address, setAddress,] = useState('');
  const [gender, setGender,] = useState('');
  const [father, setFather,] = useState('');
  const [fatherPhone, setFatherPhone,] = useState('');
  const [mother, setMother,] = useState('');
  const [motherPhone, setMotherPhone,] = useState('');
  const [note, setNote,] = useState('');

  const handleClose = () => setShow(false);
  const handleSave = () => {
    createAccount({
      username,
      fullname,
      email,
      password,
      birthday,
      phone,
      address,
      gender,
      father,
      fatherPhone,
      mother,
      motherPhone,
      note,
      isAdmin: false,
      isTeacher: false,
    });
  };

  return (
    <BModal aria-labelledby='contained-modal-title-vcenter' centered show={show} onHide={handleClose}>
      <BModal.Header closeButton>
        <BModal.Title>{translate('create-account-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body className='flex flex-col gap-3'>
        <div className='flex gap-3 justify-between'>
          <TextField
            className='w-full'
            required
            label={translate('username')}
            size='small'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className='w-full'
            label={translate('fullname')}
            size='small'
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className='flex gap-3 justify-between'>
          <TextField
            className='w-full'
            required
            label={translate('email')}
            size='small'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className='w-full'
            label={translate('password')}
            type='password'
            size='small'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex gap-3 justify-between'>
          <TextField
            className='w-full'
            label={translate('birthday')}
            type='date'
            size='small'
            InputLabelProps={{
              shrink: true, 
            }}
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          <TextField
            className='w-full'
            label={translate('phone')}
            size='small'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className='flex gap-3 justify-between'>
          <TextField
            className='w-full'
            label={translate('address')}
            size='small'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            className='w-full'
            select
            label={translate('gender')}
            size='small'
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value='Male'>{translate('male')}</MenuItem>
            <MenuItem value='Female'>{translate('female')}</MenuItem>
            <MenuItem value='Other'>{translate('other')}</MenuItem>
          </TextField>
        </div>
        <div className='flex gap-3 justify-between'>
          <TextField
            className='w-full'
            label={translate('father')}
            size='small'
            value={father}
            onChange={(e) => setFather(e.target.value)}
          />
          <TextField
            className='w-full'
            label={translate('father-phone')}
            size='small'
            value={fatherPhone}
            onChange={(e) => setFatherPhone(e.target.value)}
          />
        </div>
        <div className='flex gap-3 justify-between'>
          <TextField
            className='w-full'
            label={translate('mother')}
            size='small'
            value={mother}
            onChange={(e) => setMother(e.target.value)}
          />
          <TextField
            className='w-full'
            label={translate('mother-phone')}
            size='small'
            value={motherPhone}
            onChange={(e) => setMotherPhone(e.target.value)}
          />
        </div>
        <TextField
          className='w-full'
          label={translate('note')}
          size='small'
          multiline
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
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

import React, { useEffect, useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, FormControl, InputLabel, MenuItem, Select, } from '@mui/material';
import { useDispatch, useSelector, } from 'react-redux';
import { getClassesStart, } from '~/redux/class/slice';

function UpdateModal({ account, show, setShow, updateAccount, }) {
  const [classroom, setClassroom,] = useState(account?.class?._id || '');
  const [birthday, setBirthday,] = useState(account?.birthday || '');
  const [phone, setPhone,] = useState(account?.phone || '');
  const [address, setAddress,] = useState(account?.address || '');
  const [gender, setGender,] = useState(account?.gender || '');
  const [father, setFather,] = useState(account?.father || '');
  const [fatherPhone, setFatherPhone,] = useState(account?.fatherPhone || '');
  const [mother, setMother,] = useState(account?.mother || '');
  const [motherPhone, setMotherPhone,] = useState(account?.motherPhone || '');
  const [note, setNote,] = useState(account?.note || '');

  const { classes, } = useSelector(state => state.class);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleSave = () => {
    updateAccount(account?._id, {
      className: classroom,
      birthday,
      phone,
      address,
      gender,
      father,
      fatherPhone,
      mother,
      motherPhone,
      note,
    });
  };

  useEffect(() => {
    // Load danh sách lớp học khi component được mount
    dispatch(getClassesStart({
      limit: 1000,
      page: 1,
    }));
  }, [dispatch,]);

  useEffect(() => {
    // Thiết lập giá trị mặc định mỗi khi `account` thay đổi
    if (account) {
      setClassroom(account?.class?._id || '');
      setBirthday(account?.birthday || '');
      setPhone(account?.phone || '');
      setAddress(account?.address || '');
      setGender(account?.gender || '');
      setFather(account?.father || '');
      setFatherPhone(account?.fatherPhone || '');
      setMother(account?.mother || '');
      setMotherPhone(account?.motherPhone || '');
      setNote(account?.note || '');
    }
  }, [account,]);

  return (
    <BModal aria-labelledby='contained-modal-title-vcenter' centered show={show} onHide={handleClose}>
      <BModal.Header closeButton>
        <BModal.Title>{translate('update-account-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body className='flex flex-col gap-3'>
        <FormControl fullWidth size='small'>
          <InputLabel>{translate('class')}</InputLabel>
          <Select
            labelId='class-select-label'
            id='class-select'
            value={classroom}
            label={translate('class')}
            size='small'
            onChange={(e) => setClassroom(e.target.value)}
          >
            {classes?.map(value => (
              <MenuItem key={value?._id} value={value?._id}>{`${value?.gradeLevel}${value?.name}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <TextField
          className='w-full'
          label={translate('address')}
          size='small'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <FormControl fullWidth size='small'>
          <InputLabel>{translate('gender')}</InputLabel>
          <Select
            labelId='gender-select-label'
            id='gender-select'
            value={gender}
            label={translate('gender')}
            size='small'
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value='Male'>{translate('male')}</MenuItem>
            <MenuItem value='Female'>{translate('female')}</MenuItem>
            <MenuItem value='Other'>{translate('other')}</MenuItem>
          </Select>
        </FormControl>
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

UpdateModal.propTypes = {
  account: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired,
};

export default UpdateModal;

import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { FormControl, InputLabel, MenuItem, Select, TextField, } from '@mui/material';

function CreateModal({ show, setShow, createSubject, }) {
  const [name, setName,] = useState('');
  const [description, setDescription,] = useState('');
  const [gradeLevel, setGradeLevel,] = useState('');
  const [mieng, setMieng,] = useState(2);
  const [numberOf15p, setNumberOf15,] = useState(2);
  const [onePeriod, setOnePeriod,] = useState(2);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    createSubject({
      name, description, gradeLevel, numberOfOnePeriodTest: onePeriod, numberOfOralTest : mieng, numberOf15mTest: numberOf15p,
    });
  };

  return (
    <BModal aria-labelledby='contained-modal-title-vcenter'
      centered show={show} onHide={handleClose}>
      <BModal.Header closeButton>
        <BModal.Title>{translate('create-subject-label')}</BModal.Title>
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
        <TextField
          className='w-full'
          id='outlined-multiline-flexible'
          label={translate('description-label')}
          multiline
          maxRows={4}
          size='small'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
        <div className='flex space-x-3'>
          <TextField
            className='w-full'
            id='outlined-multiline-flexible'
            label={translate('oral-label')}
            type='number'
            size='small'
            value={mieng}
            onChange={(e) => setMieng(e.target.value)}
          />
          <TextField
            className='w-full'
            id='outlined-multiline-flexible'
            label={translate('15m-label')}
            type='number'
            size='small'
            value={numberOf15p}
            onChange={(e) => setNumberOf15(e.target.value)}
          />
          <TextField
            className='w-full'
            id='outlined-multiline-flexible'
            label={translate('one-period-label')}
            type='number'
            size='small'
            value={onePeriod}
            onChange={(e) => setOnePeriod(e.target.value)}
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
  createSubject: PropTypes.func.isRequired,
};

export default CreateModal;
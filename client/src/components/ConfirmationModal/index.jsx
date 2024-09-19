import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';

const ConfirmationModal = ({ show, onHide, onConfirm, title, body, }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          {translate('cancel-btn-label')}
        </Button>
        <Button variant='primary' onClick={onConfirm}>
          {translate('confirm-btn-label')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
};

ConfirmationModal.defaultProps = {
  title: translate('comfirm-label'),
  body: translate('are-you-sure-txt'),
};

export default ConfirmationModal;
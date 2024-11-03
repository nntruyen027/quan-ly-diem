import React from 'react';
import { Modal, Box, Typography, Button, Divider, } from '@mui/material';
import PropTypes from 'prop-types';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faIdCard, faUser, faEnvelope, faMapMarkerAlt, faSchool, faUsers, faPhoneAlt, faMale, faFemale, } from '@fortawesome/free-solid-svg-icons';

const DetailModal = ({ student, show, onClose, }) => (
  <Modal open={show} onClose={onClose}>
    <Box sx={{
      padding: 4, backgroundColor: '#f9f9f9', margin: 'auto', width: 500, mt: 5, borderRadius: 2, boxShadow: 3,
    }}>
      {/* Header */}
      <Typography variant='h5' component='h2' sx={{
        color: '#3f51b5', mb: 2, display: 'flex', alignItems: 'center', 
      }}>
        <FontAwesomeIcon icon={faUsers} style={{
          marginRight: '8px', 
        }} />
        Thông tin học sinh
      </Typography>
      <Divider sx={{
        mb: 2, 
      }} />

      {/* Student Details */}
      <Typography sx={{
        display: 'flex', alignItems: 'center', mb: 1, 
      }}>
        <FontAwesomeIcon icon={faIdCard} style={{
          color: '#3f51b5', marginRight: '8px', 
        }} />
        <strong>ID :</strong> {student?._id || 'Không có'}
      </Typography>
      
      <Typography sx={{
        display: 'flex', alignItems: 'center', mb: 1, 
      }}>
        <FontAwesomeIcon icon={faUser} style={{
          color: '#3f51b5', marginRight: '8px', 
        }} />
        <strong>Tên đăng nhập :</strong> {student?.username || 'Không có'}
      </Typography>
      
      <Typography sx={{
        display: 'flex', alignItems: 'center', mb: 1, 
      }}>
        <FontAwesomeIcon icon={faUser} style={{
          color: '#3f51b5', marginRight: '8px', 
        }} />
        <strong>Họ và Tên :</strong> {student?.fullname || 'Không có'}
      </Typography>
      
      <Typography sx={{
        display: 'flex', alignItems: 'center', mb: 1, 
      }}>
        <FontAwesomeIcon icon={faSchool} style={{
          color: '#3f51b5', marginRight: '8px', 
        }} />
        <strong>Lớp :</strong> {student?.class ? `${student.class.gradeLevel} ${student.class.name}` : 'Không có'}
      </Typography>
      
      <Typography sx={{
        display: 'flex', alignItems: 'center', mb: 1, 
      }}>
        <FontAwesomeIcon icon={faEnvelope} style={{
          color: '#3f51b5', marginRight: '8px', 
        }} />
        <strong>Email :</strong> {student?.email || 'Không có'}
      </Typography>
      
      <Typography sx={{
        display: 'flex', alignItems: 'center', mb: 1, 
      }}>
        <FontAwesomeIcon icon={faMapMarkerAlt} style={{
          color: '#3f51b5', marginRight: '8px', 
        }} />
        <strong>Địa chỉ :</strong> {student?.address?.[0] || 'Không có'}
      </Typography>

      {/* Parent Information */}
      <Divider sx={{
        my: 2, 
      }} />
      <Typography variant='h6' sx={{
        color: '#3f51b5', mb: 1, display: 'flex', alignItems: 'center', 
      }}>
        <FontAwesomeIcon icon={faUsers} style={{
          marginRight: '8px', 
        }} />
        Thông tin phụ huynh
      </Typography>
      
      <Typography sx={{
        display: 'flex', alignItems: 'center', mb: 1, 
      }}>
        <FontAwesomeIcon icon={faMale} style={{
          color: '#3f51b5', marginRight: '8px', 
        }} />
        <strong>Họ và Tên Cha :</strong> {student?.father || 'Không có'}
      </Typography>
      
      <Typography sx={{
        display: 'flex', alignItems: 'center', mb: 1, 
      }}>
        <FontAwesomeIcon icon={faFemale} style={{
          color: '#3f51b5', marginRight: '8px', 
        }} />
        <strong>Họ và Tên Mẹ :</strong> {student?.mother || 'Không có'}
      </Typography>
      
      <Typography sx={{
        display: 'flex', alignItems: 'center', mb: 1, 
      }}>
        <FontAwesomeIcon icon={faPhoneAlt} style={{
          color: '#3f51b5', marginRight: '8px', 
        }} />
        <strong>Liên hệ Cha: </strong> {student?.fatherPhone || 'Không có'}
      </Typography>

      <Typography sx={{
        display: 'flex', alignItems: 'center', mb: 1, 
      }}>
        <FontAwesomeIcon icon={faPhoneAlt} style={{
          color: '#3f51b5', marginRight: '8px', 
        }} />
        <strong>Liên hệ Mẹ :</strong> {student?.motherPhone || 'Không có'}
      </Typography>

      {/* Close Button */}
      <Button onClick={onClose} variant='contained' sx={{
        mt: 3, backgroundColor: '#3f51b5', color: '#fff', '&:hover': {
          backgroundColor: '#303f9f', 
        },
      }}>
        Đóng
      </Button>
    </Box>
  </Modal>
);

DetailModal.propTypes = {
  student: PropTypes.object,
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

export default DetailModal;

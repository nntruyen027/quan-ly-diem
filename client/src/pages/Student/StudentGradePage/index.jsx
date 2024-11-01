import { FormControl, InputLabel, MenuItem, Paper, Select, Typography, Divider, Box, Button, } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { translate, } from '~/helpers';
import { getMyGradesStart, } from '~/redux/grade/slice';
import GradeTable from './components/GradeTable';
import { getRatingForStudentStart, } from '~/redux/rating/slice';

const StudentGradePage = () => {
  const dispatch = useDispatch();
  const { grades, } = useSelector(state => state.grade);
  const { rating, } = useSelector(state => state.rating);
  const { user, } = useSelector(state => state.auth);

  const [term, setTerm,] = React.useState(1);
  const currentYear = new Date().getFullYear();
  const [academicYear, setAcademicYear,] = React.useState(currentYear);

  const academicYears = Array.from({
    length: 5, 
  }, (v, i) => `${currentYear - i}`);

  React.useEffect(() => {
    dispatch(getMyGradesStart({
      term, academicYear, 
    }));
    dispatch(getRatingForStudentStart({
      term, academicYear, 
    }));
  }, [term, academicYear,]);

  const conductDescriptions = {
    'T': 'Tốt',
    'K': 'Khá',
    'TB': 'Trung bình',
    'Y': 'Yếu',
  };

  const ratingDescriptions = {
    'G': 'Giỏi',
    'K': 'Khá',
    'TB': 'Trung bình',
    'Y': 'Yếu',
    'Kem': 'Kém',
  };

  return (
    <Box sx={{
      padding: 4, 
    }}>
      <Typography variant='h4' sx={{
        color: '#3f51b5', marginBottom: 3, 
      }}>
        Bảng điểm cá nhân
      </Typography>

      {/* Personal Information Panel */}
      <Paper elevation={3} sx={{
        padding: 2, marginBottom: 3, 
      }}>
        <Typography variant='h6' sx={{
          color: '#3f51b5', 
        }}>Thông tin cá nhân</Typography>
        <Divider sx={{
          marginY: 1, 
        }} />
        <Box sx={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, 
        }}>
          <Typography><strong>Họ tên:</strong> {user?.fullname || 'Rỗng'}</Typography>
          <Typography><strong>Giới tính:</strong> {user?.gender || 'Rỗng'}</Typography>
          <Typography><strong>Năm Sinh:</strong> {user?.birthday.split('T')[0] || 'Rỗng'}</Typography>
          <Typography><strong>Địa chỉ:</strong> {user?.address || 'Rỗng'}</Typography>
          <Typography><strong>Email:</strong> {user?.email || 'Rỗng'}</Typography>
          <Typography><strong>Họ tên cha:</strong> {user?.father || 'Rỗng'}</Typography>
          <Typography><strong>Số điện thoại cha:</strong> {user?.fatherPhone || 'Rỗng'}</Typography>
          <Typography><strong>Họ tên me:</strong> {user?.mother || 'Rỗng'}</Typography>
          <Typography><strong>Số điện thoại mẹ:</strong> {user?.motherPhone || 'Rỗng'}</Typography>
          <Typography><strong>Ghi chú:</strong> {user?.notes || 'Rỗng'}</Typography>
        </Box>
      </Paper>

      {/* Term and Academic Year Selection */}
      <Box sx={{
        display: 'flex', gap: 3, marginBottom: 3, 
        width: '100%',
      }}>
        <FormControl fullWidth size='small'>
          <InputLabel>{translate('term')}</InputLabel>
          <Select
            value={term}
            label={translate('term')}
            onChange={(e) => setTerm(e.target.value)}
          >
            <MenuItem value={1}>Học Kỳ I</MenuItem>
            <MenuItem value={2}>Học Kỳ II</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth size='small'>
          <InputLabel>{translate('academicYear')}</InputLabel>
          <Select
            value={academicYear}
            label={translate('academicYear')}
            onChange={(e) => setAcademicYear(e.target.value)}
          >
            {academicYears.map((year, index) => (
              <MenuItem key={index} value={year}>
                {`${Number.parseInt(year)} - ${Number.parseInt(year) + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <Button variant='contained' color='primary'>Xem</Button>
        </Box>
      </Box>

      {/* Academic Performance Panel */}
      <Paper elevation={3} sx={{
        padding: 2, marginBottom: 3, 
      }}>
        <Typography variant='h6' sx={{
          color: '#3f51b5', 
        }}>Đánh Giá Kết Quả Học Tập</Typography>
        <Divider sx={{
          marginY: 1, 
        }} />
        <Box sx={{
          display: 'flex', gap: 5, justifyContent: 'space-around', 
        }}>
          <span>{translate('conduct')}: {conductDescriptions[rating?.conduct] || 'Chưa xếp loại'}</span>
          <span>{translate('rating')}: {ratingDescriptions[rating?.rating] || 'Chưa xếp loại'}</span>
        </Box>
      </Paper>

      {/* Grade Table */}
      <Paper elevation={3} sx={{
        padding: 2, 
      }}>
        <Typography variant='h6' sx={{
          color: '#3f51b5', 
        }}>Bảng Điểm</Typography>
        <Divider sx={{
          marginY: 1, 
        }} />
        <GradeTable data={grades} />
      </Paper>
    </Box>
  );
};

export default StudentGradePage;

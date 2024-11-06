import React from 'react';
import { Box, Typography, Container, Grid, Paper, Button, Divider, } from '@mui/material';

const HomePage = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Hibbing_High_School_2014.jpg/1200px-Hibbing_High_School_2014.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Typography variant='h2' sx={{
          fontWeight: 'bold', marginBottom: 2, 
        }}>
          Chào mừng đến với Trường Trung Học Phổ Thông ABC
        </Typography>
        <Typography variant='h5' sx={{
          marginBottom: 4, 
        }}>
          Nơi ươm mầm những ước mơ và phát triển tài năng
        </Typography>
        <Button variant='contained' color='primary' size='large'>
          Tìm hiểu thêm
        </Button>
      </Box>

      <Container maxWidth='lg' sx={{
        paddingY: 5, 
      }}>
        {/* Phần Tin tức */}
        <Typography variant='h4' sx={{
          fontWeight: 'bold', marginBottom: 4, 
        }}>
          Tin Tức Mới Nhất
        </Typography>
        <Grid container spacing={4}>
          {/* Ví dụ tin tức */}
          {Array.from({
            length: 3, 
          }).map((_, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={3} sx={{
                padding: 2, 
              }}>
                <img
                  src={'https://res.cloudinary.com/doewa/image/upload/t_xl/v1690248774/public-websites/International/2023%20schools/Sevenoaks%20Senior%20College/2304_DOE_RARE_SEVENOAKS_0418_LOWRES-crop.jpg'}
                  alt={`Tin tức ${index + 1}`}
                  style={{
                    width: '100%', borderRadius: '4px', 
                  }}
                />
                <Typography variant='h6' sx={{
                  marginTop: 2, 
                }}>
                  Tiêu đề tin tức {index + 1}
                </Typography>
                <Typography variant='body2' sx={{
                  marginBottom: 1, 
                }}>
                  Mô tả ngắn gọn về tin tức {index + 1}.
                </Typography>
                <Button variant='outlined' color='primary'>
                  Đọc thêm
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{
          marginY: 5, 
        }} />

        {/* Phần Sự kiện sắp tới */}
        <Typography variant='h4' sx={{
          fontWeight: 'bold', marginBottom: 4, 
        }}>
          Sự Kiện Sắp Tới
        </Typography>
        <Grid container spacing={4}>
          {Array.from({
            length: 3, 
          }).map((_, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={3} sx={{
                padding: 2, 
              }}>
                <Typography variant='h6'>
                  Sự kiện {index + 1}
                </Typography>
                <Typography variant='body2' sx={{
                  marginBottom: 1, 
                }}>
                  Thời gian: Ngày {index + 1} tháng 12
                </Typography>
                <Typography variant='body2'>
                  Địa điểm: Hội trường lớn
                </Typography>
                <Button variant='outlined' color='primary' sx={{
                  marginTop: 2, 
                }}>
                  Xem chi tiết
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{
          marginY: 5, 
        }} />

        {/* Phần Hoạt động ngoại khóa */}
        <Typography variant='h4' sx={{
          fontWeight: 'bold', marginBottom: 4, 
        }}>
          Hoạt Động Ngoại Khóa
        </Typography>
        <Grid container spacing={4}>
          {Array.from({
            length: 3, 
          }).map((_, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={3} sx={{
                padding: 2, 
              }}>
                <Typography variant='h6'>
                  Hoạt động {index + 1}
                </Typography>
                <Typography variant='body2' sx={{
                  marginBottom: 1, 
                }}>
                  Thời gian: Ngày {index + 1} tháng 11
                </Typography>
                <Typography variant='body2'>
                  Mô tả ngắn gọn về hoạt động {index + 1}.
                </Typography>
                <Button variant='outlined' color='primary' sx={{
                  marginTop: 2, 
                }}>
                  Tham gia
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;

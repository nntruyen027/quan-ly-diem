import React from 'react';
import { Box, Typography, Paper, Container, Grid, Button, Divider, } from '@mui/material';

const AboutSchoolPage = () => {
  return (
    <Box>
      {/* Phần Banner */}
      <Box 
        sx={{
          backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Hibbing_High_School_2014.jpg/1200px-Hibbing_High_School_2014.jpg")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          padding: 8, 
          color: '#fff', 
          textAlign: 'center',
        }}
      >
        <Typography variant='h2' sx={{
          fontWeight: 'bold', marginBottom: 2, 
        }}>
          Chào mừng đến với Trường của chúng tôi
        </Typography>
        <Typography variant='h5' sx={{
          marginBottom: 4, 
        }}>
          Nơi học sinh phát triển và hiện thực hóa ước mơ
        </Typography>
        <Button variant='contained' color='primary' size='large'>
          Tìm hiểu thêm
        </Button>
      </Box>

      <Container maxWidth='lg' sx={{
        paddingY: 5, 
      }}>
        {/* Phần Giới thiệu về Trường */}
        <Paper elevation={3} sx={{
          padding: 4, marginBottom: 4, 
        }}>
          <Typography variant='h4' sx={{
            color: '#3f51b5', fontWeight: 'bold', marginBottom: 2, 
          }}>
            Giới thiệu về Trường
          </Typography>
          <Divider sx={{
            marginBottom: 3, 
          }} />
          <Typography variant='body1' sx={{
            lineHeight: 1.7, 
          }}>
            Trường của chúng tôi được thành lập với sứ mệnh truyền cảm hứng và tạo điều kiện cho mỗi học sinh phát huy 
            tối đa tiềm năng của mình. Chúng tôi tự hào cung cấp môi trường học tập toàn diện và hỗ trợ, nơi học sinh có 
            thể đạt được thành tích học tập, phát triển cá nhân và học hỏi suốt đời.
          </Typography>
        </Paper>

        {/* Phần Sứ mệnh và Giá trị */}
        <Grid container spacing={4} sx={{
          marginBottom: 4, 
        }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{
              padding: 4, 
            }}>
              <Typography variant='h5' sx={{
                color: '#3f51b5', fontWeight: 'bold', marginBottom: 2, 
              }}>
                Sứ mệnh của chúng tôi
              </Typography>
              <Typography variant='body1' sx={{
                lineHeight: 1.7, 
              }}>
                Chúng tôi tạo ra một cộng đồng học tập năng động, khuyến khích mỗi học sinh phát triển về học tập, 
                xã hội và cảm xúc, chuẩn bị cho một tương lai thành công.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{
              padding: 4, 
            }}>
              <Typography variant='h5' sx={{
                color: '#3f51b5', fontWeight: 'bold', marginBottom: 2, 
              }}>
                Giá trị của chúng tôi
              </Typography>
              <Typography variant='body1' sx={{
                lineHeight: 1.7, 
              }}>
                Chúng tôi tin vào sự tôn trọng, liêm chính, kiên trì và cam kết học tập suốt đời. 
                Những giá trị này định hướng cách tiếp cận của chúng tôi với giáo dục và hình thành nên văn hóa trường học.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Phần Thành tựu nổi bật */}
        <Paper elevation={3} sx={{
          padding: 4, marginBottom: 4, 
        }}>
          <Typography variant='h4' sx={{
            color: '#3f51b5', fontWeight: 'bold', marginBottom: 2, 
          }}>
            Thành tựu nổi bật
          </Typography>
          <Divider sx={{
            marginBottom: 3, 
          }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' sx={{
                fontWeight: 'bold', 
              }}>100+</Typography>
              <Typography variant='body1'>Giáo viên chất lượng cao</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' sx={{
                fontWeight: 'bold', 
              }}>95%</Typography>
              <Typography variant='body1'>Tỉ lệ hài lòng của học sinh</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='h6' sx={{
                fontWeight: 'bold', 
              }}>50+</Typography>
              <Typography variant='body1'>Chương trình ngoại khóa</Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Phần Lời chứng thực */}
        <Paper elevation={3} sx={{
          padding: 4, marginBottom: 4, backgroundColor: '#f9f9f9', 
        }}>
          <Typography variant='h4' sx={{
            color: '#3f51b5', fontWeight: 'bold', marginBottom: 2, 
          }}>
            Lời chứng thực
          </Typography>
          <Divider sx={{
            marginBottom: 3, 
          }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{
                padding: 3, 
              }}>
                <Typography variant='body1' sx={{
                  fontStyle: 'italic', marginBottom: 1, 
                }}>
                  &quot;Các thầy cô ở đây rất hỗ trợ và luôn khuyến khích chúng em cố gắng hết mình&quot;
                </Typography>
                <Typography variant='subtitle2' sx={{
                  fontWeight: 'bold', textAlign: 'right', 
                }}>
                  - Học sinh A
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{
                padding: 3, 
              }}>
                <Typography variant='body1' sx={{
                  fontStyle: 'italic', marginBottom: 1, 
                }}>
                  &quot;Con tôi đã phát triển vượt bậc về cả học tập lẫn kỹ năng xã hội. Đây là một ngôi trường tuyệt vời.&quot;
                </Typography>
                <Typography variant='subtitle2' sx={{
                  fontWeight: 'bold', textAlign: 'right', 
                }}>
                  - Phụ huynh B
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Phần Thông tin liên hệ */}
        <Paper elevation={3} sx={{
          padding: 4, backgroundColor: '#e3f2fd', 
        }}>
          <Typography variant='h4' sx={{
            color: '#3f51b5', fontWeight: 'bold', marginBottom: 2, 
          }}>
            Thông tin liên hệ
          </Typography>
          <Divider sx={{
            marginBottom: 3, 
          }} />
          <Typography variant='body1'>
            Địa chỉ: 123 Đường Trường, Thành phố, Quốc gia
          </Typography>
          <Typography variant='body1'>
            Điện thoại: (123) 456-7890
          </Typography>
          <Typography variant='body1'>
            Email: info@school.edu
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutSchoolPage;

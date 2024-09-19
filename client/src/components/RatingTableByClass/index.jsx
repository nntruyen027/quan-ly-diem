import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, } from '@mui/material';
import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { translate, } from '~/helpers'; // For table generation in PDF

// Define a mapping for conduct and rating descriptions
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

const RatingTableByClass = ({ data, }) => {
  const subjects = [];
  data.forEach(item => {
    item.subjectScores.forEach(subjectScore => {
      if (!subjects.includes(subjectScore.subject)) {
        subjects.push(subjectScore.subject);
      }
    });
  });

  // Export to Excel function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map(item => {
        const subjectScores = subjects.reduce((acc, subject) => {
          const subjectScore = item.subjectScores.find(ss => ss.subject === subject);
          acc[subject] = subjectScore ? subjectScore.averageScore.toFixed(2) : 'N/A';
          return acc;
        }, {
        });
        return {
          Student: item.student.name,
          ...subjectScores,
          AverageScore: item.averageScore.toFixed(2),
          Conduct: conductDescriptions[item.conduct] || 'Chưa Xếp Loại',
          Rating: ratingDescriptions[item.rating] || 'Chưa Xếp Loại',
        };
      })
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Rating');
    XLSX.writeFile(workbook, 'rating_data.xlsx');
  };

  // Export to PDF function
  // const exportToPDF = () => {
  //   const doc = new jsPDF();
  //   const tableColumn = ['Học sinh', ...subjects, 'Điểm trung bình', 'Hạnh kiểm', 'Xếp loại',];
  //   const tableRows = data.map(item => {
  //     const subjectScores = subjects.map(subject => {
  //       const subjectScore = item.subjectScores.find(ss => ss.subject === subject);
  //       return subjectScore ? subjectScore.averageScore.toFixed(2) : 'N/A';
  //     });
  //     return [
  //       item.student.name,
  //       ...subjectScores,
  //       item.averageScore.toFixed(2),
  //       conductDescriptions[item.conduct] || 'Chưa Xếp Loại',
  //       ratingDescriptions[item.rating] || 'Chưa Xếp Loại',
  //     ];
  //   });
  //
  //   doc.autoTable({
  //     head: [tableColumn,],
  //     body: tableRows,
  //   });
  //
  //   doc.save('rating_data.pdf');
  // };

  return (
    <div>
      <div className={'mb-3 flex justify-end'}>
        <Button variant='contained' onClick={exportToExcel} style={{
          marginRight: '10px', 
        }}>
          {translate('export')}

        </Button>
        {/* <Button variant='contained' onClick={exportToPDF}>*/}
        {/*            Export to PDF*/}
        {/* </Button>*/}
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{
                borderRight: '1px solid rgba(224, 224, 224, 1)', 
              }}>Học sinh</TableCell>
              {subjects.map(subject => (
                <TableCell key={subject} align='center' sx={{
                  borderRight: '1px solid rgba(224, 224, 224, 1)', 
                }}>
                  {subject}
                </TableCell>
              ))}
              <TableCell align='center' sx={{
                borderRight: '1px solid rgba(224, 224, 224, 1)', 
              }}>Điểm trung bình</TableCell>
              <TableCell align='center' sx={{
                borderRight: '1px solid rgba(224, 224, 224, 1)', 
              }}>Hạnh kiểm</TableCell>
              <TableCell align='center'>Xếp loại</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{
                  borderRight: '1px solid rgba(224, 224, 224, 1)', 
                }}>
                  {item?.student?.name}
                </TableCell>
                {subjects.map(subject => {
                  const subjectScore = item.subjectScores.find(ss => ss.subject === subject);
                  return (
                    <TableCell key={subject} sx={{
                      borderRight: '1px solid rgba(224, 224, 224, 1)', 
                    }} align='center'>
                      {subjectScore ? Number.parseFloat(subjectScore.averageScore).toFixed(2) : 'N/A'}
                    </TableCell>
                  );
                })}
                <TableCell align='center' sx={{
                  borderRight: '1px solid rgba(224, 224, 224, 1)', 
                }}>
                  {Number.parseFloat(item?.averageScore).toFixed(2)}
                </TableCell>
                <TableCell align='center' sx={{
                  borderRight: '1px solid rgba(224, 224, 224, 1)', 
                }}>
                  {conductDescriptions[item?.conduct] || 'Chưa Xếp Loại'}
                </TableCell>
                <TableCell align='center'>
                  {ratingDescriptions[item?.rating] || 'Chưa Xếp Loại'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

RatingTableByClass.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      student: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      conduct: PropTypes.string, // Conduct value (Tốt, Khá, Trung bình, Yếu)
      rating: PropTypes.string, // Rating value (G, K, TB, Y, Kem)
      averageScore: PropTypes.number,
      subjectScores: PropTypes.arrayOf(
        PropTypes.shape({
          subject: PropTypes.string.isRequired,
          averageScore: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default RatingTableByClass;

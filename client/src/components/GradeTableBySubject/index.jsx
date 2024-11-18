import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, } from '@mui/material';
import * as XLSX from 'xlsx';
import { translate, } from '~/helpers';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable'; // To use for table generation in PDF

const GradeTableBySubject = ({ data, }) => {
  // Function to join scores for tests in a readable format
  const joinScores = (tests) => tests?.map(test => test.score)?.join(' ');

  // Export to Excel function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map(item => ({
        Student: item?.student?.name,
        OralTests: joinScores(item?.grades?.oralTests),
        FifteenMinTests: joinScores(item?.grades?.fifteenMinuteTests),
        OnePeriodTests: joinScores(item?.grades?.onePeriodTests),
        FinalExam: joinScores(item?.grades?.finalExam),
        AverageScore: item?.averageScore?.toFixed(2),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Grades');
    XLSX.writeFile(workbook, 'grade_data.xlsx');
  };

  // Export to PDF function
  // const exportToPDF = () => {
  //   const doc = new jsPDF();
  //   const tableColumn = ['Student', 'Oral Tests', '15 Min Tests', '1 Period Tests', 'Final Exam', 'Average Score',];
  //   const tableRows = data.map(item => [
  //     item.student.name,
  //     joinScores(item.grades.oralTests),
  //     joinScores(item.grades.fifteenMinuteTests),
  //     joinScores(item.grades.onePeriodTests),
  //     joinScores(item.grades.finalExam),
  //     item.averageScore.toFixed(2),
  //   ]);
  //
  //   doc.autoTable({
  //     head: [tableColumn,],
  //     body: tableRows,
  //   });
  //
  //   doc.save('grade_data.pdf');
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
        {/*    Export to PDF*/}
        {/* </Button>*/}
      </div>
      <TableContainer component={Paper}>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{
                borderRight: '1px solid rgba(224, 224, 224, 1)', 
              }}>Học sinh</TableCell>
              <TableCell align='center' sx={{
                borderRight: '1px solid rgba(224, 224, 224, 1)', 
              }}>Điểm miệng</TableCell>
              <TableCell align='center' sx={{
                borderRight: '1px solid rgba(224, 224, 224, 1)', 
              }}>15 phút</TableCell>
              <TableCell align='center' sx={{
                borderRight: '1px solid rgba(224, 224, 224, 1)', 
              }}>1 tiết</TableCell>
              <TableCell align='center' sx={{
                borderRight: '1px solid rgba(224, 224, 224, 1)', 
              }}>Thi cuối kỳ</TableCell>
              <TableCell align='center'>Điểm trung bình</TableCell>
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
                <TableCell align='center' sx={{
                  borderRight: '1px solid rgba(224, 224, 224, 1)', 
                }}>
                  {joinScores(item?.grades?.oralTests)}
                </TableCell>
                <TableCell align='center' sx={{
                  borderRight: '1px solid rgba(224, 224, 224, 1)', 
                }}>
                  {joinScores(item?.grades?.fifteenMinuteTests)}
                </TableCell>
                <TableCell align='center' sx={{
                  borderRight: '1px solid rgba(224, 224, 224, 1)', 
                }}>
                  {joinScores(item?.grades?.onePeriodTests)}
                </TableCell>
                <TableCell align='center' sx={{
                  borderRight: '1px solid rgba(224, 224, 224, 1)', 
                }}>
                  {joinScores(item?.grades?.finalExam)}
                </TableCell>
                <TableCell align='center'>{item?.averageScore?.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

GradeTableBySubject.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      student: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      grades: PropTypes.shape({
        oralTests: PropTypes.arrayOf(
          PropTypes.shape({
            score: PropTypes.number.isRequired,
          })
        ).isRequired,
        fifteenMinuteTests: PropTypes.arrayOf(
          PropTypes.shape({
            score: PropTypes.number.isRequired,
          })
        ).isRequired,
        onePeriodTests: PropTypes.arrayOf(
          PropTypes.shape({
            score: PropTypes.number.isRequired,
          })
        ).isRequired,
        finalExam: PropTypes.arrayOf(
          PropTypes.shape({
            score: PropTypes.number.isRequired,
          })
        ).isRequired,
      }).isRequired,
      averageScore: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default GradeTableBySubject;

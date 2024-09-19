import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';

const GradeTable = ({ data, }) => {
  const joinScores = (tests) => tests?.map(test => test.score)?.join(' ');

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Môn học</TableCell>
            <TableCell align='center'>Điểm miệng</TableCell>
            <TableCell align='center'>15 phút</TableCell>
            <TableCell align='center'>1 tiết</TableCell>
            <TableCell align='center'>Thi cuối kỳ</TableCell>
            <TableCell align='center'>Điểm trung bình</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item?.subject?.name}</TableCell>
              <TableCell align='center'>{joinScores(item?.grades.oralTests)}</TableCell>
              <TableCell align='center'>{joinScores(item?.grades.fifteenMinuteTests)}</TableCell>
              <TableCell align='center'>{joinScores(item?.grades.onePeriodTests)}</TableCell>
              <TableCell align='center'>{joinScores(item?.grades.finalExam)}</TableCell>
              <TableCell align='center'>{item?.averageScore?.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

GradeTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.shape({
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

export default GradeTable;


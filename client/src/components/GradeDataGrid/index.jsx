import React from 'react';
import { DataGrid, } from '@mui/x-data-grid';
import { InputLabel, MenuItem, Select, FormControl, Button, } from '@mui/material';
import { useSelector, useDispatch, } from 'react-redux';
import { getGradesForClassAndSubjectStart, createOrUpdateGradeStart, } from '~/redux/grade/slice';
import { getSubjectStart, } from '~/redux/subject/slice';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import * as XLSX from 'xlsx';
import { saveAs, } from 'file-saver';

const extractTestScores = (tests, index) => (tests && tests[index] ? tests[index].score : '');

const getColumns = (numberOfOralTest, numberOf15mTest, numberOfOnePeriodTest) => [
  {
    field: 'studentId', headerName: 'Student ID', flex: 1, minWidth: 100, 
  },
  {
    field: 'studentName', headerName: 'Student Name', flex: 1.5, minWidth: 150, 
  },
  ...Array.from({
    length: numberOfOralTest, 
  }, (_, i) => ({
    field: `oral_${i + 1}`, headerName: `Miệng ${i + 1}`, flex: 1, minWidth: 120, editable: true,
  })),
  ...Array.from({
    length: numberOf15mTest, 
  }, (_, i) => ({
    field: `fifteenMinutes_${i + 1}`, headerName: `15p ${i + 1}`, flex: 1, minWidth: 120, editable: true,
  })),
  ...Array.from({
    length: numberOfOnePeriodTest, 
  }, (_, i) => ({
    field: `onePeriod_${i + 1}`, headerName: `1 tiết ${i + 1}`, flex: 1, minWidth: 120, editable: true,
  })),
  {
    field: 'finalExam', headerName: 'Thi', flex: 1, minWidth: 120, editable: true, 
  },
  {
    field: 'averageScore', headerName: 'Điểm trung bình', flex: 1, minWidth: 150, 
  },
];

const GradeDataGrid = ({ classId, subjectId, }) => {
  const { grades, updateSuccess, } = useSelector((state) => state.grade);
  const { subject, } = useSelector((state) => state.subject);
  const [term, setTerm,] = React.useState(1);
  const currentYear = new Date().getFullYear();
  const [academicYear, setAcademicYear,] = React.useState(currentYear);
  const dispatch = useDispatch();

  const academicYears = Array.from({
    length: 5, 
  }, (v, i) => `${currentYear - i}`);

  React.useEffect(() => {
    dispatch(getGradesForClassAndSubjectStart({
      classId, subjectId, term, academicYear, 
    }));
  }, [dispatch, classId, subjectId, updateSuccess, term, academicYear,]);

  React.useEffect(() => {
    dispatch(getSubjectStart(subjectId));
  }, [dispatch, subjectId,]);

  const rows = grades?.length
    ? grades.map((grade, index) => ({
      id: grade?._id || `generated-id-${index}`,
      studentId: grade?.student?._id,
      studentName: grade?.student?.name,
      ...Object.fromEntries([
        ...Array.from({
          length: subject?.numberOfOralTest, 
        }, (_, i) => [
          `oral_${i + 1}`, extractTestScores(grade?.grades?.oralTests, i),
        ]),
        ...Array.from({
          length: subject?.numberOf15mTest, 
        }, (_, i) => [
          `fifteenMinutes_${i + 1}`, extractTestScores(grade?.grades?.fifteenMinuteTests, i),
        ]),
        ...Array.from({
          length: subject?.numberOfOnePeriodTest, 
        }, (_, i) => [
          `onePeriod_${i + 1}`, extractTestScores(grade?.grades?.onePeriodTests, i),
        ]),
        ['finalExam', extractTestScores(grade?.grades?.finalExam, 0),],
      ]),
      averageScore: grade?.averageScore || '',
    }))
    : [];

  // Function to export grades to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      rows.map((row) => {
        const oralTestColumns = Array.from({
          length: subject?.numberOfOralTest || 0,
        }, (_, i) => ({
          [`Miệng ${i + 1}`]: row[`oral_${i + 1}`] || '',
        }));

        const fifteenMinuteTestColumns = Array.from({
          length: subject?.numberOf15mTest || 0,
        }, (_, i) => ({
          [`15p ${i + 1}`]: row[`fifteenMinutes_${i + 1}`] || '',
        }));

        const onePeriodTestColumns = Array.from({
          length: subject?.numberOfOnePeriodTest || 0,
        }, (_, i) => ({
          [`1 tiết ${i + 1}`]: row[`onePeriod_${i + 1}`] || '',
        }));

        return {
          'Mã học sinh': row.studentId,
          'Tên học sinh': row.studentName,
          ...Object.assign({
          }, ...oralTestColumns),
          ...Object.assign({
          }, ...fifteenMinuteTestColumns),
          ...Object.assign({
          }, ...onePeriodTestColumns),
          'Thi': row.finalExam || '',
        };
      })
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Grades');
    const excelBuffer = XLSX.write(wb, {
      bookType: 'xlsx', type: 'array',
    });
    const blob = new Blob([excelBuffer,], {
      type: 'application/octet-stream', 
    });
    saveAs(blob, 'grades_template.xlsx');
  };

  // Function to handle Excel file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, {
        type: 'array', 
      });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      jsonData.forEach((row) => {
        const updatedGrades = {
          oralTests: Array.from({
            length: subject?.numberOfOralTest, 
          }, (_, i) => ({
            score: row[`Miệng ${i + 1}`] || 0,
          })),
          fifteenMinuteTests: Array.from({
            length: subject?.numberOf15mTest, 
          }, (_, i) => ({
            score: row[`15p ${i + 1}`] || 0,
          })),
          onePeriodTests: Array.from({
            length: subject?.numberOfOnePeriodTest, 
          }, (_, i) => ({
            score: row[`1 tiết ${i + 1}`] || 0,
          })),
          finalExam: [{
            score: row['Thi'] || 0, 
          },],
        };

        dispatch(
          createOrUpdateGradeStart({
            studentId: row['Mã học sinh'],
            classId,
            subjectId,
            grades: updatedGrades,
            term,
            academicYear,
          })
        );
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const handleProcessRowUpdate = (updatedRow) => {
    const { studentId, ...updatedScores } = updatedRow;

    const updatedGrades = {
      oralTests: Array.from({
        length: subject?.numberOfOralTest, 
      }, (_, i) => ({
        score: updatedScores[`oral_${i + 1}`] || 0,
      })),
      fifteenMinuteTests: Array.from({
        length: subject?.numberOf15mTest, 
      }, (_, i) => ({
        score: updatedScores[`fifteenMinutes_${i + 1}`] || 0,
      })),
      onePeriodTests: Array.from({
        length: subject?.numberOfOnePeriodTest, 
      }, (_, i) => ({
        score: updatedScores[`onePeriod_${i + 1}`] || 0,
      })),
      finalExam: [{
        score: updatedScores.finalExam || 0, 
      },],
    };

    dispatch(
      createOrUpdateGradeStart({
        studentId,
        classId,
        subjectId,
        grades: updatedGrades,
        term,
        academicYear,
      })
    );

    return updatedRow;
  };

  return (
    <>
      <div className='w-full flex gap-3 my-3'>
        <FormControl fullWidth size='small'>
          <InputLabel>{translate('term')}</InputLabel>
          <Select
            value={term}
            label={translate('term')}
            onChange={(e) => setTerm(e.target.value)}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
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
        <Button fullWidth variant='contained' component='label'>
          {translate('upload')}
          <input type='file' accept='.xlsx' hidden onChange={handleFileUpload} />
        </Button>
        <Button fullWidth variant='contained' onClick={exportToExcel}>
          {translate('download')}
        </Button>
      </div>
      <DataGrid
        rows={rows}
        columns={getColumns(subject?.numberOfOralTest, subject?.numberOf15mTest, subject?.numberOfOnePeriodTest)}
        pageSize={10}
        processRowUpdate={handleProcessRowUpdate}
        className='w-full'
      />
    </>
  );
};

GradeDataGrid.propTypes = {
  classId: PropTypes.string.isRequired,
  subjectId: PropTypes.string.isRequired,
};

export default GradeDataGrid;

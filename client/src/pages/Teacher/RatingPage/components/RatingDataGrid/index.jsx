import React from 'react';
import { DataGrid, } from '@mui/x-data-grid';
import { FormControl, InputLabel, MenuItem, Select, Button, } from '@mui/material';
import { useSelector, useDispatch, } from 'react-redux';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import { saveAs, } from 'file-saver';
import { createOrUpdateConductStart, getRatingsForClassStart, } from '~/redux/rating/slice'; // Replace with correct imports
import { translate, } from '~/helpers';

const conductOptions = [
  {
    value: 'T', label: 'Tốt', 
  },
  {
    value: 'K', label: 'Khá', 
  },
  {
    value: 'TB', label: 'Trung bình', 
  },
  {
    value: 'Y', label: 'Yếu', 
  },
  {
    value: '', label: 'Chưa Xếp Loại', 
  },
];

const RatingDataGrid = ({ classId, }) => {
  const { ratings, updateSuccess, } = useSelector((state) => state.rating);
  const dispatch = useDispatch();
  const [term, setTerm,] = React.useState(1);
  const [academicYear, setAcademicYear,] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    dispatch(getRatingsForClassStart({
      classId, term, academicYear,
    }));
  }, [dispatch, classId, updateSuccess, term, academicYear,]);

  const rows = ratings?.length
    ? ratings.map((rating, index) => ({
      id: index,
      studentId: rating?.student?._id,
      studentName: rating?.student?.name,
      conduct: rating?.conduct || '',
      rating: rating?.rating,
    }))
    : [];

  const handleConductChange = (studentId, newConduct) => {
    dispatch(
      createOrUpdateConductStart({
        classId,
        data: {
          studentId,
          conduct: newConduct,
          term,
          academicYear,
        },
      })
    );
  };

  // Function to download Excel template for entering scores
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      rows.map((row) => ({
        'Mã số học sinh': row.studentId,
        'Tên học sinh': row.studentName,
        'Hạnh kiểm': row.conduct,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ratings');
    const excelBuffer = XLSX.write(wb, {
      bookType: 'xlsx', type: 'array', 
    });
    const blob = new Blob([excelBuffer,], {
      type: 'application/octet-stream', 
    });
    saveAs(blob, 'ratings_template.xlsx');
  };

  // Function to handle file upload for score entry
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
        const studentId = row['Mã số học sinh'];
        const conduct = row['Hạnh kiểm'];
        dispatch(
          createOrUpdateConductStart({
            classId,
            data: {
              studentId, conduct, term, academicYear, 
            },
          })
        );
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const getColumns = () => [
    {
      field: 'studentId', headerName: translate('student-id'), flex: 1, minWidth: 100,
    },
    {
      field: 'studentName', headerName: translate('student-name'), flex: 1, minWidth: 150,
    },
    {
      field: 'conduct',
      headerName: translate('conduct'),
      flex: 1,
      minWidth: 150,
      editable: true,
      renderCell: (params) => (
        <Select
          value={params.value || ''}
          onChange={(e) => handleConductChange(params.row.studentId, e.target.value)}
          fullWidth
          size='small'
        >
          {conductOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: 'rating', headerName: translate('rating'), flex: 1, minWidth: 100,
    },
  ];

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
            {Array.from({
              length: 5, 
            }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <MenuItem key={year} value={year}>
                  {`${year} - ${year + 1}`}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <div className='w-full flex justify-between my-3'>
        <Button variant='contained' onClick={exportToExcel}>
          {translate('download-excel-template')}
        </Button>
        <input
          accept='.xlsx, .xls'
          type='file'
          onChange={handleFileUpload}
          style={{
            display: 'none', 
          }}
          id='upload-excel'
        />
        <label htmlFor='upload-excel'>
          <Button variant='contained' component='span'>
            {translate('upload-excel')}
          </Button>
        </label>
      </div>

      <DataGrid
        rows={rows}
        columns={getColumns()}
        pageSize={10}
        className='w-full'
      />
    </>
  );
};

RatingDataGrid.propTypes = {
  classId: PropTypes.string.isRequired,
};

export default RatingDataGrid;

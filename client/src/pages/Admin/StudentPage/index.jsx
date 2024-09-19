import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { translate, } from '~/helpers';
import { getStudentsStart as getAccountsStart,
  updateAccountStart,
  deleteAccountStart,
  createAccountStart, } from '~/redux/account/slice';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';
import { Button, FormControl, InputLabel, MenuItem, Select, } from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs, } from 'file-saver';
import { getClassesStart, } from '~/redux/class/slice';

const StudentPage = () => {
  const dispatch = useDispatch();
  const { accounts, meta, account, updateSucess, deleteSuccess, createSuccess, } = useSelector(state => state.account);
  const { classes, } = useSelector(state => state.class);
  const [orderBy, setOrderBy,] = React.useState('');
  const [descending, setDescending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit, setLimit,] = React.useState(5);
  const [selectedObj, setSelectedObj,] = React.useState(null);
  const [showCreate, setShowCreate,] = React.useState(false);
  const [showUpdate, setShowUpdate,] = React.useState(false);
  const [showConfirm, setShowConfirm,] = React.useState(false);
  const [confirmAction, setConfirmAction,] = React.useState(() => () => {});
  const [confirmMessage, setConfirmMessage,] = React.useState('');
  const [classroom, setClassroom,] = React.useState('all');
  const getAccounts = () => {
    dispatch(getAccountsStart({
      orderBy,
      page,
      limit,
      descending,
      class: classroom !== 'all' ? classroom : undefined,
    }));
  };

  const getClasses = () => {
    dispatch((getClassesStart({
      page: 1,
      limit: 1000,
    })));
  };

  React.useEffect(() => {
    getClasses();
  }, []);

  React.useEffect(() => {
    getAccounts();
  }, [orderBy, descending, page, limit, dispatch, account, selectedObj, updateSucess, deleteSuccess, createSuccess, classroom,]);

  const updateAccount = (id, account) => {
    dispatch(updateAccountStart({
      id: id,
      data: JSON.stringify(account),
    }));
  };

  const handleUpdate = (value) => {
    const selectedCopy = {
      ...value, 
    };
    setSelectedObj(selectedCopy);
    setShowUpdate(true);
  };

  const createAccounts = (data) => {
    dispatch(createAccountStart(JSON.stringify(data)));
    setShowCreate(false);
  };

  const confirmUpdateAccount = (id, account) => {
    setConfirmAction(() => () => {
      updateAccount(id, account);
      setShowConfirm(false);
      setShowUpdate(false);
    });
    setConfirmMessage('Bạn có chắc chắn muốn lưu thay đổi này không?');
    setShowConfirm(true);
  };

  const handleDelete = (value) => {
    setConfirmAction(() => () => {
      dispatch(deleteAccountStart(value?._id));
      setSelectedObj(null);
      setShowConfirm(false);
    });
    setConfirmMessage('Bạn có chắc chắn muốn xóa mục này không?');
    setShowConfirm(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, {
        type: 'array', 
      });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      
      jsonData?.map(value => {
        createAccounts({
          ...value,
          password: String.toString(value?.password),
          isAdmin: false,
          isTeacher: false,
        });
      });
      
    };
    
    reader.readAsArrayBuffer(file);
  };

  const handleExport = () => {

    const worksheet = XLSX.utils.json_to_sheet(accounts.map((value, index) => ({
      'STT': index + 1,
      'Mã định danh': value?._id,
      'Tên đăng nhập': value?.username,
      'Họ và tên': value.fullname,
      'Địa chỉ': value?.addresss?.[0],
      'Lớp': `${value?.class?.gradeLevel}${value?.class?.name}`,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    const wbout = XLSX.write(workbook, {
      bookType: 'xlsx', type: 'array', 
    });
    saveAs(new Blob([wbout,], {
      type: 'application/octet-stream', 
    }), 'students.xlsx'); 
  };

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        username: '', fullname: '', email: '', password: '', 
      },
    ];
    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
    const wbout = XLSX.write(workbook, {
      bookType: 'xlsx', type: 'array', 
    });
    saveAs(new Blob([wbout,], {
      type: 'application/octet-stream', 
    }), 'student_import_template.xlsx');
  };

  const render = () => (
    <>
      <ConfirmationModal
        body={confirmMessage}
        onConfirm={confirmAction}
        onHide={() => setShowConfirm(false)}
        title='Xác nhận'
        show={showConfirm}
      />
      <CreateModal setShow={setShowCreate} show={showCreate} createAccount={createAccounts} />
      <UpdateModal setShow={setShowUpdate} show={showUpdate} updateAccount={confirmUpdateAccount} account={selectedObj} />
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>{translate('student')}</div>
        <div className='flex flex-row w-full justify-between gap-3'>
          <div className='rounded-xl p-3 bg-white w-full'>
            <div className='text-right mb-3 flex justify-between'>
              <div className='flex gap-3 justify-between'>
                <FormControl size='small'>
                  <InputLabel>{translate('class')}</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={classroom}
                    label={translate('class')}
                    size='small'
                    onChange={(e) => setClassroom(e.target.value)}
                  >
                    <MenuItem value={'all'}>{translate('all')}</MenuItem>
                    {classes?.map((value, index) => (
                      <MenuItem key={index} value={value?._id}>{`${value?.gradeLevel}${value?.name}`}</MenuItem>
                    ))}

                  </Select>
                </FormControl>
                <Button component='label' variant='contained'>
                  {translate('import')}
                  <input type='file' hidden onChange={handleFileUpload} />
                </Button>
                <Button onClick={handleExport} variant='contained'>{translate('export')}</Button>
                <Button onClick={handleDownloadTemplate} variant='contained'>
                  {translate('download-template')}
                </Button>
              </div>

              <Button onClick={() => setShowCreate(true)} variant='contained'>{translate('create')}</Button>
            </div>
            <DataTable 
              actions={[
                {
                  label: translate('update'),
                  handler: handleUpdate,
                },
                {
                  label: translate('delete'),
                  handler: handleDelete,
                },
              ]}
              columns={[
                {
                  field: 'username',
                  enableSort: true,
                  label: translate('username'),
                },
                {
                  field: 'avatar',
                  enableSort: false,
                  label: translate('avatar'),
                },
                {
                  field: 'fullname',
                  enableSort: false,
                  label: translate('fullname'),
                },
                {
                  field: 'className',
                  enableSort: false,
                  label: translate('class'),
                },
                {
                  field: 'email',
                  enableSort: false,
                  label: translate('email'),
                },
              ]}
              data={accounts?.map(item => ({
                ...item,
                'id': item._id,
                'avatar': (<div><img src={item.avatar}/></div>),
                'className': `${item?.class?.gradeLevel}${item?.class?.name}`,
                'address': null,
                'photos': null,
              }))}
              keyField='_id'
              onSort={(f, des) => {
                setOrderBy(f);
                setDescending(des == 'desc');
              }}
            />
            <Pagination count={meta?.totalPage} page={page} rowsPerPage={limit} setPage={setPage} setRowsPerPage={setLimit} />
          </div>
        </div>
      </div>
    </>
  );

  return render();
};

export default StudentPage;

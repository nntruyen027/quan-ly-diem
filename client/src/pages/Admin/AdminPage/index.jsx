import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { translate, } from '~/helpers';
import { getAdminsStart as getAccountsStart, updateAccountStart, deleteAccountStart, createAccountStart, } from '~/redux/account/slice';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';
import { Button, } from '@mui/material';

const AdminPage = () => {
  const dispatch = useDispatch();
  const { accounts, meta, account, updateSucess, deleteSuccess, createSuccess, } = useSelector(state => state.account);

  const [ orderBy, setOrderBy, ]= React.useState('');
  const [ descending, setDescending, ] = React.useState(true);
  const [ page, setPage, ] = React.useState(1);
  const [ limit, setLimit, ] = React.useState(5);
  const [ selectedObj, setSelectedObj, ] = React.useState(null);

  const [showCreate, setShowCreate,] = React.useState(false);
  const [showUpdate, setShowUpdate,] = React.useState(false);
  const [showConfirm, setShowConfirm,] = React.useState(false);
  const [confirmAction, setConfirmAction,] = React.useState(() => () => {});
  const [confirmMessage, setConfirmMessage,] = React.useState('');

  const getAccounts = () => {
    dispatch(getAccountsStart({
      orderBy,
      page,
      limit,
      descending,
    }));
  };

  React.useEffect(() => {
    getAccounts();
  }, [orderBy, descending, page, limit, dispatch, account, selectedObj,updateSucess, deleteSuccess, createSuccess,]);

  const updateAccount = (id, account) => {

    dispatch(updateAccountStart({
      id: id, data: JSON.stringify(account),
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
      <UpdateModal setShow={setShowUpdate} show={showUpdate} updateAccount={confirmUpdateAccount} account={selectedObj}/>
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>{translate('admin')}</div>
        <div className='flex flex-row w-full justify-between gap-3'>
          <div className='rounded-xl p-3 bg-white w-full'>
            <div className='text-right mb-3'>
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
                  field: 'role',
                  enableSort: false,
                  label: translate('role'),
                },
                {
                  field: 'email',
                  enableSort: false,
                  label: translate('email'),
                },
                
              ]} data={accounts?.map(item => ({
                ...item,
                'id': item._id,
                'avatar': (<div><img src={item.avatar}/></div>),
                'role': item?.isAdmin ? translate('admin') : item?.isTeacher ? translate('teacher') : translate('student'),
                'address': null,
                'photos': null,
              }))} keyField='_id' onSort={(f, des) => {
                setOrderBy(f);
                setDescending(des == 'desc');
              }}/>

            <Pagination count={meta?.totalPage} page={page} rowsPerPage={limit} setPage={setPage} setRowsPerPage={setLimit}/>
          </div>
         
        </div>
      </div>
    </>

  );

  return render();
};

export default AdminPage;
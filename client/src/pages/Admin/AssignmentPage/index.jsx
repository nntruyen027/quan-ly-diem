import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { translate, } from '~/helpers';
import { createAssignmentStart, updateAssignmentStart, deleteAssignmentStart, getAssignmentsByClassStart, } from '~/redux/assignment/slice';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';
import { Breadcrumbs, Button, Typography, } from '@mui/material';
import { Link, useParams, } from 'react-router-dom';
import { adminRoutes, } from '~/configs/routes';

const AsignmentPage = () => {
  const dispatch = useDispatch();
  const { id, } = useParams();
  const { assignments, meta, assignment, updateSucess, deleteSuccess, createSuccess, } = useSelector(state => state.assignment);

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

  const getObjects = () => {
    dispatch(getAssignmentsByClassStart({
      id,
      query: {
        orderBy,
        page,
        limit,
        descending,
      },
    }));
  };

  React.useEffect(() => {
    getObjects();
  }, [orderBy, descending, page, limit, dispatch, assignment, selectedObj,updateSucess, deleteSuccess, createSuccess,]);

  const updateObject = (id, object) => {

    dispatch(updateAssignmentStart({
      id: id, data: JSON.stringify(object),
    }));
  };

  const handleUpdate = (value) => {
    const selectedCopy = {
      ...value, 
    };
    setSelectedObj(selectedCopy);
    setShowUpdate(true);
  };

  const createObject = (data) => {
    data.class = id;
    dispatch(createAssignmentStart(JSON.stringify(data)));
    
    setShowCreate(false);
  };

  const confirmUpdateObject = (id, object) => {
    setConfirmAction(() => () => {
      updateObject(id, object);
      setShowConfirm(false);
      setShowUpdate(false);
    });
    setConfirmMessage('Bạn có chắc chắn muốn lưu thay đổi này không?');
    setShowConfirm(true);
  };

  const handleDelete = (value) => {
    setConfirmAction(() => () => {
      dispatch(deleteAssignmentStart(value?._id));
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
      <CreateModal setShow={setShowCreate} show={showCreate} createObject={createObject} />
      <UpdateModal setShow={setShowUpdate} show={showUpdate} updateObject={confirmUpdateObject} object={selectedObj}/>
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link className='no-underline text-gray-400' color='inherit' to={adminRoutes.category.class}>
              {translate('class')}
            </Link>
            <Typography sx={{
              color: 'text.primary', 
            }}>{translate('class-assignment')}</Typography>
          </Breadcrumbs>
        </div>
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
                  field: 'STT',
                  enableSort: false,
                  label: translate('STT'),
                },
                {
                  field: 'subjectName',
                  enableSort: false,
                  label: translate('subject'),
                },
         
                {
                  field: 'teacherName',
                  enableSort: false,
                  label: translate('teacher'),
                },
                
              ]} data={assignments?.map((item, index) => ({
                ...item,
                'STT': (Number.parseInt(page)-1)*Number.parseInt(limit) + index + 1,
                'id': item._id,
                subjectName: item?.subject?.name,
                teacherName: item?.teacher?.fullname,
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

export default AsignmentPage;
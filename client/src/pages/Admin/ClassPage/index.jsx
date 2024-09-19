import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { translate, } from '~/helpers';
import { createClassStart, deleteClassStart, getClassesStart, updateClassStart, } from '~/redux/class/slice';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';
import { Button, } from '@mui/material';
import { useNavigate, } from 'react-router-dom';

const ClassPage = () => {
  const dispatch = useDispatch();
  const { classes, meta, classroom, updateSucess, deleteSuccess, createSuccess, } = useSelector(state => state.class);

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

  const nav = useNavigate();

  const getClasses = () => {
    dispatch(getClassesStart({
      orderBy,
      page,
      limit,
      descending,
    }));
  };

  React.useEffect(() => {
    getClasses();
  }, [orderBy, descending, page, limit, dispatch, classroom, selectedObj,updateSucess, deleteSuccess, createSuccess,]);

  const updateClass = (id, classroom) => {

    const data = {
    };
    data.name = classroom?.name;
    if(classroom?.homeroomTeacher)
      data.homeroomTeacher = classroom?.homeroomTeacher;
    if(classroom?.gradeLevel)
      data.gradeLevel = classroom?.gradeLevel;

    dispatch(updateClassStart({
      id: id, data: JSON.stringify(data),
    }));
  };

  const handleUpdate = (value) => {
    const selectedCopy = {
      ...value, 
    };
    setSelectedObj(selectedCopy);
    setShowUpdate(true);
  };

  const createClass = (object) => {
    const data = {
    };
    data.name = object.name;
    if(object.homeroomTeacher)
      data.homeroomTeacher = object.homeroomTeacher;
    if(object.gradeLevel)
      data.gradeLevel = object.gradeLevel;

    dispatch(createClassStart(JSON.stringify(data)));
    
    setShowCreate(false);
  };

  const confirmUpdateClass = (id, classroom) => {
    console.log(classroom);
    setConfirmAction(() => () => {
      updateClass(id, classroom);
      setShowConfirm(false);
      setShowUpdate(false);
    });
    setConfirmMessage('Bạn có chắc chắn muốn lưu thay đổi này không?');
    setShowConfirm(true);
  };

  const handleDelete = (value) => {
    setConfirmAction(() => () => {
      dispatch(deleteClassStart(value?._id));
      setSelectedObj(null);
      setShowConfirm(false);
    });
    setConfirmMessage('Bạn có chắc chắn muốn xóa mục này không?');
    setShowConfirm(true);
  };

  const handleDetail = (value) => {
    nav(`/admin/class/${value._id}/students`);
  };

  const handleAssign = (value) => {
    nav(`/admin/class/${value._id}/subjects`);
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
      <CreateModal setShow={setShowCreate} show={showCreate} createClass={createClass} />
      <UpdateModal setShow={setShowUpdate} show={showUpdate} updateClass={confirmUpdateClass} classroom={selectedObj}/>
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>{translate('class')}</div>
        <div className='flex flex-row w-full justify-between gap-3'>
          <div className='rounded-xl p-3 bg-white w-full'>
            <div className='text-right mb-3'>
              <Button onClick={() => setShowCreate(true)} variant='contained'>{translate('create')}</Button>
            </div>
            <DataTable 
              actions={[
                {
                  label: translate('student'),
                  handler: handleDetail,
                },
                {
                  label: translate('update'),
                  handler: handleUpdate,
                },
                {
                  label: translate('delete'),
                  handler: handleDelete,
                },
                {
                  label: translate('subject'),
                  handler: handleAssign,
                },
              ]} 
              columns={[
                {
                  field: 'id',
                  enableSort: false,
                  label: translate('#'),
                },
                {
                  field: 'name',
                  enableSort: true,
                  label: translate('name'),
                },
                {
                  field: 'gradeLevel',
                  enableSort: false,
                  label: translate('grade-level'),
                },
                {
                  field: 'teacherName',
                  enableSort: false,
                  label: translate('homeroom-teacher'),
                },
              ]} data={classes?.map(item => ({
                ...item,
                'id': item._id,
                teacherName: item?.homeroomTeacher?.fullname,
                students: null,
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

export default ClassPage;
import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { translate, } from '~/helpers';
import { createSubjectStart, deleteSubjectStart, getSubjectsStart, updateSubjectStart, } from '~/redux/subject/slice';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';
import { Button, } from '@mui/material';

const SubjectPage = () => {
  const dispatch = useDispatch();
  const { subjects, meta, subject, updateSucess, deleteSuccess, createSuccess, } = useSelector(state => state.subject);

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

  const getsubjects = () => {
    dispatch(getSubjectsStart({
      orderBy,
      page,
      limit,
      descending,
    }));
  };

  React.useEffect(() => {
    getsubjects();
  }, [orderBy, descending, page, limit, dispatch, subject, selectedObj,updateSucess, deleteSuccess, createSuccess,]);

  const updateSubject = (id, Subject) => {
    const data = {
    };
    data.name = Subject?.name;
    if(Subject?.description)
      data.description = Subject?.description;
    if(Subject?.gradeLevel)
      data.gradeLevel = Subject?.gradeLevel;
    if(Subject?.numberOfOralTest)
      data.numberOfOralTest = Subject?.numberOfOralTest;
    if(Subject?.numberOf15mTest)
      data.numberOf15pTest = Subject?.numberOf15mTest;
    if(Subject?.numberOfOnePeriodTest)
      data.numberOfOnePeriodTest = Subject?.numberOfOnePeriodTest;

    dispatch(updateSubjectStart({
      id: id, data: JSON.stringify(data),
    }));
  };

  const handleUpdate = (value) => {
    console.log(value);
    const selectedCopy = {
      ...value, 
    };
    setSelectedObj(selectedCopy);
    setShowUpdate(true);
  };

  const createSubjects = ({ name, description, gradeLevel, numberOf15mTest, numberOfOnePeriodTest, numberOfOralTest, }) => {
    const data = {
    };
    data.name = name;
    if(description)
      data.description = description;
    if(gradeLevel)
      data.gradeLevel = gradeLevel;
    if(numberOfOralTest)
      data.numberOfOralTest = numberOfOralTest;
    if(numberOf15mTest)
      data.numberOf15pTest = numberOf15mTest;
    if(numberOfOnePeriodTest)
      data.numberOfOnePeriodTest = numberOfOnePeriodTest;

    dispatch(createSubjectStart(JSON.stringify(data)));
    
    setShowCreate(false);
  };

  const confirmUpdateSubject = (id, Subject) => {
    setConfirmAction(() => () => {
      updateSubject(id, Subject);
      setShowConfirm(false);
      setShowUpdate(false);
    });
    setConfirmMessage('Bạn có chắc chắn muốn lưu thay đổi này không?');
    setShowConfirm(true);
  };

  const handleDelete = (value) => {
    setConfirmAction(() => () => {
      dispatch(deleteSubjectStart(value?._id));
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
      <CreateModal setShow={setShowCreate} show={showCreate} createSubject={createSubjects} />
      <UpdateModal setShow={setShowUpdate} show={showUpdate} updateSubject={confirmUpdateSubject} subject={selectedObj}/>
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>{translate('subject')}</div>
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
                  field: 'description',
                  enableSort: false,
                  label: translate('description'),
                },
                {
                  field: 'numberOfOralTest',
                  enableSort: false,
                  label: translate('oral'),
                },
                {
                  field: 'numberOf15mTest',
                  enableSort: false,
                  label: translate('15-minute'),
                },
                {
                  field: 'numberOfOnePeriodTest',
                  enableSort: false,
                  label: translate('one-period'),
                },
              ]} data={subjects?.map(item => ({
                ...item,
                'id': item._id,
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

export default SubjectPage;
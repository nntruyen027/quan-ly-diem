import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { DataTable, Pagination, } from '~/components';
import { translate, } from '~/helpers';
import { getAssignmentsByTeacherState as getAssignmentsStart, } from '~/redux/assignment/slice';
import { useNavigate, } from 'react-router-dom';

const AsignmentPage = () => {
  const nav = useNavigate();

  const dispatch = useDispatch();
  const { assignments, meta, assignment, updateSucess, deleteSuccess, createSuccess, } = useSelector(state => state.assignment);

  const [ orderBy, setOrderBy, ]= React.useState('');
  const [ descending, setDescending, ] = React.useState(true);
  const [ page, setPage, ] = React.useState(1);
  const [ limit, setLimit, ] = React.useState(5);
  const [ selectedObj, , ] = React.useState(null);

  const getObjects = () => {
    dispatch(getAssignmentsStart({
      orderBy,
      page,
      limit,
      descending,
    }));
  };

  const handleEditScore = (value) => {
    nav(`/teacher/${value?.class?._id}/${value?.subject?._id}`);
  };
  const handleViewScore = (value) => {
    nav(`/teacher/${value?.class?._id}/${value?.subject?._id}/grades`);
  };

  React.useEffect(() => {
    getObjects();
  }, [orderBy, descending, page, limit, dispatch, assignment, selectedObj,updateSucess, deleteSuccess, createSuccess,]);

  const render = () => (
    <> 
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>{translate('class-assignment')}</div>
        <div className='flex flex-row w-full justify-between gap-3'>
          <div className='rounded-xl p-3 bg-white w-full'>
            <DataTable 
              actions={[
                {
                  label: translate('view-score'),
                  handler: handleViewScore,
                },
                {
                  label: translate('edit-score'),
                  handler: handleEditScore,
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
                  field: 'className',
                  enableSort: false,
                  label: translate('class'),
                },
                
              ]} data={assignments?.map((item, index) => ({
                ...item,
                'id': item._id,
                'STT': (Number.parseInt(page)-1)*Number.parseInt(limit) + index + 1,
                subjectName: item?.subject?.name,
                className: item?.class?.gradeLevel + item?.class?.name,
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
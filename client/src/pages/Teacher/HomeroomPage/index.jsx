import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { DataTable, } from '~/components';
import { translate, } from '~/helpers';
import { getStudentsByHomeroomStart, } from '~/redux/account/slice';

const ClassPage = () => {
  const dispatch = useDispatch();
  const { accounts, updateSucess, deleteSuccess, createSuccess, } = useSelector(state => state.account);

  const [ orderBy, setOrderBy, ]= React.useState('');
  const [ descending, setDescending, ] = React.useState(true);
  const [ selectedObj, , ] = React.useState(null);

  const nav = useNavigate();

  const getClasses = () => {
    dispatch(getStudentsByHomeroomStart({
      orderBy,
      descending,
    }));
  };

  React.useEffect(() => {
    getClasses();
  }, [orderBy, descending, dispatch, selectedObj,updateSucess, deleteSuccess, createSuccess,]);

  const render = () => (
    <> 
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>{translate('home-room-class')}</div>
        <div className='flex flex-row w-full justify-between gap-3'>
          <div className='rounded-xl p-3 bg-white w-full'>

            <DataTable 
              actions={[
                {
                  label: translate('detail'),
                  handler: (value) => nav(`/teacher/homeroom/${value?._id}`),
                },
              ]} 
              columns={[
                {
                  field: 'STT',
                  enableSort: false,
                  label: translate('STT'),
                },
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
                
              ]} data={accounts?.map((item, index) => ({
                ...item,
                'id': item._id,
                'STT':  index + 1,
                'avatar': (<div><img src={item.avatar}/></div>),
                'className': item?.class?.name,
                'address': null,
                'photos': null,
              }))} keyField='_id' onSort={(f, des) => {
                setOrderBy(f);
                setDescending(des == 'desc');
              }}/>

          </div>
         
        </div>
      </div>
    </>

  );

  return render();
};

export default ClassPage;
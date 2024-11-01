import React, { useEffect, } from 'react';
import { LoadingPage, } from '~/pages';
import { useDispatch, useSelector, } from 'react-redux';
import { getInfoRequestStart, } from '~/redux/auth/slice';
import { StudentHeader, } from '~/components';
import { Navigate, } from 'react-router-dom';
import { authRoutes, } from '~/configs/routes';

const StudentMainLayout = ({ children, }) => {
  const { user, loading, } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user)
      dispatch(getInfoRequestStart());
  }, []);

  const render = () => {
    if (loading) return <LoadingPage />;

    if (!user) return <Navigate to={authRoutes.login} />;

    return (
      <div >
        <StudentHeader/>
        <main className='flex bg-gray-50 h-screen overflow-hidden w-full mt-2 -translate-y-3'>
          <div className='flex flex-col flex-grow ' >
            <div className=' overflow-y-auto p-3'>
              {children}
            </div>
          </div>
        </main>
      </div>
    );
  };

  return render();
};

export default StudentMainLayout;
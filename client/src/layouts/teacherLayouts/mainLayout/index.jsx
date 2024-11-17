import React, { useEffect, } from 'react';
import { LoadingPage, } from '~/pages';
import { useDispatch, useSelector, } from 'react-redux';
import { getInfoRequestStart, } from '~/redux/auth/slice';
import { authRoutes, } from '~/configs/routes';
import { Navigate, } from 'react-router-dom';
import { AdminHeader, Sidebar, } from '~/components';
import { teacherSidebar as sidebar, } from '~/constants';

const TeacherMainLayout = ({ children, }) => {
  const { user, loading, } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoRequestStart());
  }, []);

  const render = () => {
    if (loading) return <LoadingPage />;

    if (!user?.isTeacher) return <Navigate to={authRoutes.teacherLogin} />;

    return (
      <div>
        <main className='flex bg-gray-50 h-screen overflow-hidden'>
          <Sidebar className='bg-[#1565C0] text-black' content={sidebar}/>
            
          <div className='flex flex-col flex-grow ' >
            <AdminHeader/>
            <div className=' overflow-y-auto  p-3'>
              {children}
            </div>
          </div>
          
        </main>
      </div>
    );
  };

  return render();
};

export default TeacherMainLayout;
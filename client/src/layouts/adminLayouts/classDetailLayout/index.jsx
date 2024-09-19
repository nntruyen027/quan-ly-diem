import React, { useEffect, } from 'react';
import { LoadingPage, } from '~/pages';
import { useDispatch, useSelector, } from 'react-redux';
import { getInfoRequestStart, } from '~/redux/auth/slice';
import { authRoutes, } from '~/configs/routes';
import { Navigate, } from 'react-router-dom';
import { AdminHeader, } from '~/components';

const ClassDetailLayout = ({ children, }) => {
  const { user, loading, token, } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(token && user)
      dispatch(getInfoRequestStart());
  }, [token,]);

  const render = () => {
    if (loading) return <LoadingPage />;

    if (!user?.isAdmin) return <Navigate to={authRoutes.adminLogin} />;

    return (
      <div>
        <main className='flex bg-gray-50 h-screen overflow-hidden'>
            
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

export default ClassDetailLayout;
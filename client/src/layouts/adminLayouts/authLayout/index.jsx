import React, { useEffect, useState, } from 'react';
import { LoadingPage, } from '~/pages';
import { useDispatch, useSelector, } from 'react-redux';
import { getInfoRequestStart, } from '~/redux/auth/slice';
import { adminRoutes, } from '~/configs/routes';
import { Navigate, } from 'react-router-dom';

const AdminAuthLayout = ({ children, }) => {
  const [isLogin, setIsLogin,] = useState(false);
  const [isLoading, setIsLoading,] = useState(true);
  const { user, loading, error, } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!user)
      dispatch(getInfoRequestStart());
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      if (!error && user?.isAdmin) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }

      setIsLoading(false);
    };

    if (!loading) {
      checkAuth();
    }
  }, [loading, error, user,]);

  const render = () => {
    if (loading || isLoading) return <LoadingPage />;

    if (isLogin) return <Navigate to={adminRoutes.profile} />;

    return (
      <div>
        <main>
          {children}
        </main>
      </div>
    );
  };

  return render();
};

export default AdminAuthLayout;
import { useDispatch } from 'react-redux';
import { useEffect, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout.jsx';
import { PrivateRoute } from './PrivateRoute/PrivateRoute.jsx';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute.jsx';
import { refreshUser } from '../redux/auth/operations';
import { useAuth } from '../hooks';

const HomePage = lazy(() => import('../pages/HomePage/HomePage.jsx'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage.jsx'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage.jsx'));
const ContactsPage = lazy(() => import('../pages/ContactsPage/ContactsPage.jsx'));

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/register"
            element={<RestrictedRoute redirectTo="/contacts" component={<RegisterPage />} />}
          />
          <Route
            path="/login"
            element={<RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute redirectTo="/login" component={<ContactsPage />} />}
          />
        </Route>
      </Routes>
    </>
  );
}

import { Header } from '../header/Header.tsx';
import { Outlet } from 'react-router-dom';
import s from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={s.container}>
      <Header />
      <Outlet />
    </div>
  );
};

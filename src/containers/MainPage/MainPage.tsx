import { Outlet } from 'react-router';
import classes from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <div className={classes.MainPage}>
      <h1>MainPage</h1>
      <Outlet />
    </div>
  );
};

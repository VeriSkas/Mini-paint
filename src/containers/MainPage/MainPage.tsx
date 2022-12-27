import { Outlet } from 'react-router';

import { NavBar } from '../../components/UI/NavBar/NavBar';
import classes from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <div className={classes.MainPage}>
      <NavBar />
      <div className={classes.Content}>
        <div className={classes.ContentContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

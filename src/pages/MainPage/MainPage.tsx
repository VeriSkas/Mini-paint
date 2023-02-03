import { FC } from 'react';
import { Outlet } from 'react-router';

import { NavBar } from '@components/UI/NavBar/NavBar';
import classes from './MainPage.module.scss';

export const MainPage: FC<{ theme: string }> = ({ theme }) => {
  const cls = `${classes.MainPage} ${classes[theme]}`;

  return (
    <div className={cls}>
      <NavBar theme={theme} />
      <div className={classes.Content}>
        <div className={classes.ContentContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

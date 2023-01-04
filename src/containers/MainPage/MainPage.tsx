import { Outlet } from 'react-router';

import { NavBar } from '../../components/UI/NavBar/NavBar';
import classes from './MainPage.module.scss';

export const MainPage = (props: any) => {
  const cls = [classes.MainPage, classes[props.theme]];

  return (
    <div className={cls.join(' ')}>
      <NavBar theme={props.theme} />
      <div className={classes.Content}>
        <div className={classes.ContentContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

import { NavLink } from 'react-router-dom';

import { ButtonTypes, LinkText, TitleText } from '@constants/text/text';
import { logOutHandler } from '@queries/apiHandlers/logOutHandler';
import { Button } from '../Button/Button';
import classes from './NavBar.module.scss';

export const NavBar = (props: { theme: string }) => {
  const cls = `${classes.NavBar} ${classes[props.theme]}`;

  const logOut = () => {
    logOutHandler();
  };

  return (
    <div className={cls}>
      <div className={classes.NavBarContainer}>
        <div className={classes.Title}>
          <div className={classes.Logo}></div>
          <h1>{TitleText.logoTitle}</h1>
        </div>
        <div className={classes.NavLinksBlock}>
          <div className={classes.NavLinks}>
            <NavLink
              to={'/'}
              className={({ isActive }) => (isActive ? classes.ActiveLink : '')}
            >
              {LinkText.home}
            </NavLink>
            <NavLink
              to={'/editor'}
              className={({ isActive }) => (isActive ? classes.ActiveLink : '')}
            >
              {LinkText.editor}
            </NavLink>
          </div>
        </div>
        <div className={classes.Logout}>
          <Button type={ButtonTypes.standard} onClick={logOut}>
            {LinkText.logOut}
          </Button>
        </div>
      </div>
    </div>
  );
};

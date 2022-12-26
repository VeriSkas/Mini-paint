import { NavLink } from 'react-router-dom';

import { ButtonTypes, LinkText, TitleText } from '../../../shared/text/text';
import { Button } from '../Button/Button';
import classes from './NavBar.module.scss';

export const NavBar = () => {
  return (
    <div className={classes.NavBar}>
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
          <Button type={ButtonTypes.standard}>{LinkText.logOut}</Button>
        </div>
      </div>
    </div>
  );
};

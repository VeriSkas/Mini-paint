import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ButtonTypes, LinkText, TitleText } from '@constants/text/text';
import { logOutHandler } from '@queries/apiHandlers/logOutHandler';
import { Button } from '../Button/Button';
import classes from './NavBar.module.scss';
import { paths } from '@constants/paths';

export const NavBar = (props: { theme: string }) => {
  const { t } = useTranslation();
  const cls = `${classes.NavBar} ${classes[props.theme]}`;

  const logOut = () => {
    logOutHandler();
  };

  return (
    <div className={cls}>
      <div className={classes.NavBarContainer}>
        <div className={classes.Title}>
          <div className={classes.Logo}></div>
          <h1>{t(TitleText.logoTitle)}</h1>
        </div>
        <div className={classes.NavLinksBlock}>
          <div className={classes.NavLinks}>
            <NavLink
              to={paths.home}
              className={({ isActive }) => (isActive ? classes.ActiveLink : '')}
            >
              {t(LinkText.home)}
            </NavLink>
            <NavLink
              to={`${paths.home}${paths.editor}`}
              className={({ isActive }) => (isActive ? classes.ActiveLink : '')}
            >
              {t(LinkText.editor)}
            </NavLink>
          </div>
        </div>
        <div className={classes.Logout}>
          <Button type={ButtonTypes.standard} onClick={logOut}>
            {t(LinkText.logOut)}
          </Button>
        </div>
      </div>
    </div>
  );
};

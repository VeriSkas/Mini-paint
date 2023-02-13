import { FC, useEffect, useState } from 'react';

import { themes } from '@constants/constants';
import { localStorageHandler } from '@utils/localStorage';
import { Tooltip } from '@constants/text/text';
import classes from './ThemeToggler.module.scss';

export const ThemeToggler: FC<{ themeToggler: (theme: string) => void }> = ({
  themeToggler,
}) => {
  const [theme, setTheme] = useState('');
  const [cls, setClasses] = useState([classes.TogglerIcon]);

  useEffect(() => {
    const themeNew = localStorageHandler('getItem', 'theme') || themes.light;

    setTheme(themeNew);
  }, []);

  useEffect(() => {
    setClasses(() => [classes.TogglerIcon, classes[theme]]);
  }, [theme]);

  const toggleTheme = () => {
    if (theme) {
      if (theme === themes.light) {
        setTheme(themes.dark);
        themeToggler(themes.dark);
        localStorageHandler('setItem', 'theme', themes.dark);
      } else {
        setTheme(themes.light);
        themeToggler(themes.light);
        localStorageHandler('setItem', 'theme', themes.light);
      }
    }
  };

  return (
    <div className={classes.ThemeToggler} title={Tooltip.themeToggle}>
      <div className={cls.join(' ')} onClick={toggleTheme}></div>
    </div>
  );
};

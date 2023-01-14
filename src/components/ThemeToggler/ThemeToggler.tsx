import { useEffect, useState } from 'react';
import { themes } from '../../shared/constants';

import { localStorageHandler } from '../../shared/localStorage';
import { Tooltip } from '../../shared/text/text';
import classes from './ThemeToggler.module.scss';

export const ThemeToggler = (props: {
  themeToggler: (theme: string) => void,
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
        props.themeToggler(themes.dark);
        localStorageHandler('setItem', 'theme', themes.dark);
      } else {
        setTheme(themes.light);
        props.themeToggler(themes.light);
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

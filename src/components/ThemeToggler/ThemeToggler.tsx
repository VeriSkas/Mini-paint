import { useEffect, useState } from 'react';

import { localStorageHandler } from '../../shared/localStorage';
import { Tooltip } from '../../shared/text/text';
import classes from './ThemeToggler.module.scss';

export const ThemeToggler = (props: {
  themeToggler: (theme: string) => void,
}) => {
  const [theme, setTheme] = useState('');
  const [cls, setClasses] = useState([classes.TogglerIcon]);

  useEffect(() => {
    const themeNew = localStorageHandler('getItem', 'theme') || 'Light';

    setTheme(themeNew);
  }, []);

  useEffect(() => {
    setClasses(() => [classes.TogglerIcon, classes[theme]]);
  }, [theme]);

  const toggleTheme = () => {
    if (theme) {
      if (theme === 'Light') {
        setTheme('Dark');
        props.themeToggler('Dark');
        localStorageHandler('setItem', 'theme', 'Dark');
      } else {
        setTheme('Light');
        props.themeToggler('Light');
        localStorageHandler('setItem', 'theme', 'Light');
      }
    }
  };

  return (
    <div className={classes.ThemeToggler} title={Tooltip.themeToggle}>
      <div className={cls.join(' ')} onClick={toggleTheme}></div>
    </div>
  );
};

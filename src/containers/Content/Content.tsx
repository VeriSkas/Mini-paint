import { useState } from 'react';

import { Select } from '../../components/UI/Select/Select';
import { InputLabels, TitleText } from '../../shared/text/text';
import { ImageBoard } from '../ImageBoard/ImageBoard';
import classes from './Content.module.scss';

export const Content = () => {
  const [users, setUsers] = useState([
    { value: 'Петя', id: '1' },
    { value: 'Вася', id: '2' },
    { value: 'Гена', id: '3' },
  ]);
  const [activeUserName, setActiveUserName] = useState<string>(users[0].id);

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveUserName(event.target.value);
  };

  return (
    <>
      <h1 className={classes.Title}>{TitleText.images}</h1>
      <div className={classes.ContentBody}>
        <Select
          onChange={onChangeHandler}
          value={activeUserName}
          labelText={InputLabels.select}
          options={users.length ? users : []}
        />
        <ImageBoard />
      </div>
    </>
  );
};

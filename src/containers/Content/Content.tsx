import { useEffect, useState } from 'react';

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
  const [activeUserName, setActiveUserName] = useState<string>('Гена');

  useEffect(() => {
    if (users.length) {
      setActiveUserName(users[0].value);
    }
  }, [users]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value) {
      const activeUser = findUserNameById(event.target.value);

      setActiveUserName(activeUser);
    }
  };

  const findUserNameById = (id: string) => {
    return users.find((user) => user.id === id)?.value || '';
  };

  return (
    <>
      <h1 className={classes.Title}>{TitleText.images}</h1>
      <div className={classes.ContentBody}>
        <Select
          value={activeUserName}
          labelText={InputLabels.select}
          options={users.length ? users : []}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            onChangeHandler(event)
          }
        />
        <ImageBoard />
      </div>
    </>
  );
};

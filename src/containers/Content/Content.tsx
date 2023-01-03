import { useEffect, useState } from 'react';

import {
  getUsers,
  unsubscribeUsers,
} from '../../api/apiHandlers/dataBaseHandler';
import { Select } from '../../components/UI/Select/Select';
import { OptionsType } from '../../shared/interfaces';
import { InputLabels, TitleText } from '../../shared/text/text';
import { ImageBoard } from '../ImageBoard/ImageBoard';
import classes from './Content.module.scss';

export const Content = () => {
  const [users, setUsers] = useState<OptionsType[]>([]);
  const [activeUserName, setActiveUserName] = useState<string>('');

  useEffect((): void | any => {
    getUsers().then((users) => {
      if (users) {
        const usersOptions: OptionsType[] = users.map((user) => ({
          id: user.uid,
          value: user.nickname,
        }));

        setUsers((state) => [...state, ...usersOptions]);
      }
    });

    return () => unsubscribeUsers();
  }, []);

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveUserName(event.target.value);
  };

  return (
    <>
      <h1 className={classes.Title}>{TitleText.images}</h1>
      <div className={classes.ContentBody}>
        <Select
          onChange={onChangeHandler}
          emptyField={true}
          value={activeUserName}
          labelText={InputLabels.select}
          options={users.length ? users : []}
        />
        <ImageBoard user={activeUserName} />
      </div>
    </>
  );
};

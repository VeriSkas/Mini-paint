import { useEffect, useState } from 'react';

import { Select } from '../../components/UI/Select/Select';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { OptionsType } from '../../shared/interfaces';
import { InputLabels, TitleText } from '../../shared/text/text';
import { fetchUsers } from '../../store/userSlice';
import { ImageBoard } from '../ImageBoard/ImageBoard';
import classes from './Content.module.scss';

export const Content = () => {
  const dispatch = useAppDispatch();
  const [activeUserName, setActiveUserName] = useState<string>('');
  const options: OptionsType[] = useAppSelector(
    (state) => state.users.users
  ).map((user) => ({
    id: user.uid,
    value: user.nickname,
  }));

  useEffect((): void | any => {
    dispatch(fetchUsers());
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
          options={options.length ? options : []}
        />
        <ImageBoard user={activeUserName} />
      </div>
    </>
  );
};

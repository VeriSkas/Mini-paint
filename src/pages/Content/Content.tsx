import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Select } from '@components/UI/Select/Select';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { OptionsType } from '@interfaces/interfaces';
import { InputLabels, TitleText } from '@constants/text/text';
import { fetchUsers } from '@store/userSlice';
import { ImageBoard } from '@components/ImageBoard/ImageBoard';
import classes from './Content.module.scss';

export const Content = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [activeUserName, setActiveUserName] = useState<string>('');
  const options: OptionsType[] = useAppSelector(
    (state) => state.users.users
  ).map((user) => ({
    id: user.uid,
    value: user.nickname,
  }));

  useEffect((): void => {
    dispatch(fetchUsers());
  }, []);

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveUserName(event.target.value);
  };

  return (
    <>
      <h1 className={classes.Title}>{t(TitleText.images)}</h1>
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

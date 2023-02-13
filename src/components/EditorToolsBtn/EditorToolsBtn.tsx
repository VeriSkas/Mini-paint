import { FC } from 'react';

import classes from './EditorToolsBtn.module.scss';

export const EditorToolsBtn: FC<{
  img: string,
  onClick: (value: string) => void,
  value: string,
}> = ({ img, onClick, value }) => {
  return (
    <div className={classes.EditorToolsBtn} onClick={() => onClick(value)}>
      <img src={img} alt="img" />
    </div>
  );
};

import { FC } from 'react';

import classes from './Image.module.scss';

export const Image: FC<{ src: string }> = ({ src }) => {
  return (
    <div className={classes.Image}>
      <div className={classes.ImageContainer}>
        <img src={src} className={classes.ImageContent} alt="image" />
      </div>
    </div>
  );
};

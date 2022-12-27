import classes from './Image.module.scss';
import img from '../../shared/img/img.jpg';

export const Image = () => {
  const imgPath = img;

  return (
    <div className={classes.Image}>
      <div className={classes.ImageContainer}>
        <img src={imgPath} className={classes.ImageContent} alt="image" />
      </div>
    </div>
  );
};

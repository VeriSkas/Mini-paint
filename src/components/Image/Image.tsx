import classes from './Image.module.scss';

export const Image = (props: { src: string }) => {
  return (
    <div className={classes.Image}>
      <div className={classes.ImageContainer}>
        <img src={props.src} className={classes.ImageContent} alt="image" />
      </div>
    </div>
  );
};

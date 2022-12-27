import classes from './EditorToolsBtn.module.scss';

export const EditorToolsBtn = (props: any) => {
  return (
    <div className={classes.EditorToolsBtn}>
      <img src={props.img} alt="img" />
    </div>
  );
};

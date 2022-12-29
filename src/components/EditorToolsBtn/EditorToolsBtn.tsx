import classes from './EditorToolsBtn.module.scss';

export const EditorToolsBtn = (props: any) => {
  return (
    <div
      className={classes.EditorToolsBtn}
      onClick={() => props.onClick(props.value)}
    >
      <img src={props.img} alt="img" />
    </div>
  );
};

import classes from './EditorToolsBtn.module.scss';

export const EditorToolsBtn = (props: {
  img: string,
  onClick: (value: string) => void,
  value: string,
}) => {
  return (
    <div
      className={classes.EditorToolsBtn}
      onClick={() => props.onClick(props.value)}
    >
      <img src={props.img} alt="img" />
    </div>
  );
};

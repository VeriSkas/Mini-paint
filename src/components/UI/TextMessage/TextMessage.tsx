import classes from './TextMessage.module.scss';

export const TextMessage = (props: { text: string }) => {
  return (
    <div className={classes.TextMessage}>
      <h2>{props.text}</h2>
    </div>
  );
};

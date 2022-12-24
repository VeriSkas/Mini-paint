import { Link } from 'react-router-dom';
import classes from './SignUp.module.scss';

export const SignUp = () => {
  return (
    <div className={classes.SignUp}>
      <h1> SignUp</h1>
      <Link to={'/auth'}>Auth</Link>
    </div>
  );
};

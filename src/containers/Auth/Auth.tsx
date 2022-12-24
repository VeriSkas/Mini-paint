import { Link } from 'react-router-dom';
import classes from './Auth.module.scss';

export const Auth = () => {
  return (
    <div className={classes.Auth}>
      <h1>Auth</h1>
      <Link to={'/sign-up'}>Sign up</Link>
    </div>
  );
};

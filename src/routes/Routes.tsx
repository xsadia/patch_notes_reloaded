import { Switch, Route } from 'react-router';
import { Homepage } from '../pages/Homepage/Homepage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { PostPage } from '../pages/PostPage/PostPage';
import { SignUpPage } from '../pages/SignUpPage/SignUpPage';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/posts/:id" component={PostPage} />
      <Route path="/signin" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
    </Switch>
  );
};

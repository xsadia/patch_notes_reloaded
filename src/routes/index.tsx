import { Switch, Route } from 'react-router';
import { Homepage } from '../pages/Homepage/Homepage';
import { PostPage } from '../pages/PostPage/PostPage';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Homepage} />
      <Route path="/posts/:id" component={PostPage} />
    </Switch>
  );
};

import { Route } from '../../../classes/Route';
import { routeHome } from '../home';

export const routePosts = new Route({
  path: `posts`,
  parent: routeHome,
});

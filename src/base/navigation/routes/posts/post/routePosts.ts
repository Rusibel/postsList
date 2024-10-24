import { Route } from '../../../../classes/Route';
import {routePosts} from "../routePosts.ts";

interface IParams {
  id: number | string;
}
export const routePost = new Route<IParams>({
  path: `:id`,
  url: (args) => `${routePosts.url}/${args.id}`,
  parent: routePosts,
});

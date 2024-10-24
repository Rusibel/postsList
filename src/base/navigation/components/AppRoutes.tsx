import { FC } from 'react';

import { Route, Routes, Navigate } from 'react-router';
import { routeHome } from '../routes';
import { routePosts } from '../routes/posts';
import { AllPostsPage } from '../../../pages/AllPostsPage';
import { routePost } from '../routes/posts/post';
import { PostsPage } from '../../../pages/PostPage';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <>Hello world</>
      <Route path={routePosts.fullPath} element={<AllPostsPage />} />
      <Route path={routePost.fullPath} element={<PostsPage />} />
      <Route
        path={routeHome.fullPath}
        element={<Navigate to={routePosts.fullPath} />}
      />
    </Routes>
  );
};

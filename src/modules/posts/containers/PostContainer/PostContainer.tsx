import { routePost } from '../../../../base/navigation/routes/posts/post';
import { useEffect } from 'react';
import { postsStore } from '../../store';
import { observer } from 'mobx-react';
import { getPostByIdAction } from '../../actions/getPostByIdAction.ts';
import { PostCard } from '../../components/PostCard';
// @ts-ignore
import { ReactComponent as BackLogo } from 'src/assets/icons/back.svg';
import { MainLayout } from '../../../../base/components/MainLayout';
import { ERequestStatus, useNavigateBack } from '../../../../base';

export const PostContainer = observer(() => {
  const { id } = routePost.useParams();
  const { post, users, status } = postsStore;
  const { goBack } = useNavigateBack();

  useEffect(() => {
    getPostByIdAction({ id });
    return () => {
      postsStore.setPost(null);
    };
  }, [id]);

  if (status === ERequestStatus.Loading) {
    return <>Loading...</>;
  }
  if (!post) {
    return null;
  }

  return (
    <MainLayout
      topTitle="Пост"
      leftTopIcon={{
        svg: <BackLogo />,
        clicked: goBack,
      }}
    >
      <PostCard post={post} name={users?.[post.userId]?.name} />
    </MainLayout>
  );
});

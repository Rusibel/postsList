import { observer } from 'mobx-react';
import { Pagination, Stack } from '@mui/material';
import { PostListItem } from '../PostListItem';
import { useCallback } from 'react';
import { getAlLPostsAction } from '../../actions';
import { postsStore } from '../../store';
import { isArray } from '../../../../base';
import { COUNT, LIMIT } from '../../../../base/utils/config.ts';
import styles from './styles.module.scss';

export const PostsList = observer(() => {
  const onChangePageHandler = useCallback((_e: any, page: number) => {
    getAlLPostsAction({ _page: page, _limit: LIMIT });
  }, []);
  const { data: posts } = postsStore;

  if (!isArray(posts)) {
    return null;
  }
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {posts?.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        <Pagination
          count={COUNT}
          color="primary"
          onChange={onChangePageHandler}
        />
      </Stack>
    </div>
  );
});

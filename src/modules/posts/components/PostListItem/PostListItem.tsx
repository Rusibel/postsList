// import { Container } from '@mui/material';
import { IPost } from '../../types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import styles from './styles.module.scss';
import { getShortDescription } from '../../../../base';
import { observer } from 'mobx-react';
import { postsStore } from '../../store';
import { Typography } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { routePost } from '../../../../base/navigation/routes/posts/post';

export const PostListItem = observer(({ post }: { post: IPost }) => {
  const { users } = postsStore;
  const navigate = useNavigate();
  if (!post) return null;

  const onClickHandler = useCallback(() => {
    navigate(routePost.url({ id: post.id }));
  }, [navigate, post.id]);

  return (
    <Box sx={{ flexGrow: 1 }} className={styles.container}>
      <Grid
        container
        spacing={2}
        sx={{ width: '100%', height: '100%' }}
        onClick={onClickHandler}
      >
        <Grid size={12}>
          <Typography variant="h6" component="h6" sx={{ cursor: 'pointer' }}>
            {getShortDescription(post.title)}
          </Typography>
        </Grid>
        <Grid container size={6}>
          <Paper className={styles.imageContainer}>
            <img src={post.src} alt={post.title} />
          </Paper>
        </Grid>
        <Grid container size={6} sx={{ alignContent: 'space-around' }}>
          <Paper className={styles.description}>
            <span>{getShortDescription(post.body, 150)}</span>
            <span>Cоздано: {users?.[post.userId].name}</span>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
});

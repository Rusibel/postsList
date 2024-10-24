import styles from './styles.module.scss';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { IPost } from '../../types';

export const PostCard = ({ post, name }: { post: IPost; name?: string }) => {
  return (
    <div className={styles.body}>
      <Box sx={{ flexGrow: 1 }} className={styles.container}>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid size={12}>
            <Typography variant="h5" component="h4">
              {post.title}
            </Typography>
          </Grid>
          <Grid container size={12}>
            <Paper className={styles.imageContainer}>
              <img src={post.src} alt={post.title} />
            </Paper>
          </Grid>
          <Grid container size={12} sx={{ alignContent: 'space-around' }}>
            <Grid size={12} className={styles.description}>
              <span>{post.body}</span>
              <span>Cоздано: {name ?? ''}</span>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

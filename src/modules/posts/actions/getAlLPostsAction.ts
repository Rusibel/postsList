import { axiosInstance } from '../../../base/api';
import { postsStore } from '../store';
import { IPost, IUser, IUsers } from '../types';
import getImageSrc from '../helpers/getImageSrc.ts';

interface IParams {
  _page: number;
  _limit: number;
}

export const getAlLPostsAction = async (params: IParams): Promise<void> => {
  postsStore.setLoading();
  try {
    // const res = [];
    const posts = await axiosInstance<IPost[]>({
      url: `/posts`,
      params,
    });

    const users: IUsers = {};
    const postsData = [...posts.data];

    for (const post of postsData) {
      if (!users[post.userId]) {
        const user = await axiosInstance<IUser>({
          url: `/users/${post.userId}`,
        });
        users[user.data.id] = user.data;
      }
      post.src = getImageSrc(post.id);
    }

    postsStore.setFinished(postsData);
    postsStore.setUsers(users);
  } catch (e) {
    postsStore.setError(e);
  }
};

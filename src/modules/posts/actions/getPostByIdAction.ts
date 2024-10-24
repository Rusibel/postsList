import { axiosInstance } from '../../../base/api';
import { postsStore } from '../store';
import { IPost, IUser, IUsers } from '../types';
import getImageSrc from '../helpers/getImageSrc.ts';

interface IParams {
  id: string | number;
}

export const getPostByIdAction = async ({ id }: IParams): Promise<void> => {
  postsStore.setLoading();
  try {
    const post = await axiosInstance<IPost>({
      url: `/posts/${id}`,
    });

    const users: IUsers = {};
    const postData = { ...post.data };

    if (!users[postData.userId]) {
      const user = await axiosInstance<IUser>({
        url: `/users/${postData.userId}`,
      });
      users[user.data.id] = user.data;
    }
    postData.src = getImageSrc(postData.id);

    postsStore.setPost(postData);
    postsStore.setUsers(users);
  } catch (e) {
    postsStore.setError(e);
  }
};

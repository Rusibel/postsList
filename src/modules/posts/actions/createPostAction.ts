import { axiosInstance } from '../../../base/api';
import { postsStore } from '../store';
import { IPost } from '../types';

interface IParams {
  data: FormData;
}

export const createPostAction = async ({ data }: IParams): Promise<void> => {
  postsStore.setLoading();
  try {
    await axiosInstance<IPost>({
      method: 'post',
      url: `/posts`,
      data,
    });

    postsStore.setReady();
  } catch (e) {
    postsStore.setError(e);
  }
};

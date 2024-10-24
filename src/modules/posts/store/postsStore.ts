import { action, makeObservable, observable, override } from 'mobx';
import { BaseApiStoreClass } from '../../../base/classes';
import { IPost, IUsers } from '../types';

class PostsStore extends BaseApiStoreClass<IPost[]> {
  public post: IPost | null = null;
  public users: IUsers | null = null;

  public constructor() {
    super();
    makeObservable(this, {
      data: override,
      post: observable,
      setPost: action,
      setUsers: action,
    });
  }

  public setPost = (payload: IPost | null): void => {
    if (!payload) {
      this.post = null;
    }
    this.post = payload;
    this.setReady();
  };

  public setUsers = (payload: IUsers): void => {
    this.users = payload;
  };
}

export const postsStore = new PostsStore();

import { useCallback, useEffect } from 'react';
import { getAlLPostsAction } from '../../actions';
import { observer } from 'mobx-react';
import { MainLayout } from '../../../../base/components/MainLayout';
import { PostsList } from '../../components/PostsList/PostsList.tsx';
import { LIMIT } from '../../../../base/utils/config.ts';
// @ts-ignore
import { ReactComponent as PlusIcon } from '../../../../assets/icons/plusIcon.svg';
import { usePopup } from '../../../../base/components';
import { CreatePostPopup } from '../../components/CreatePostPopup/CreatePostPopup.tsx';

export const AllPostsContainer = observer(() => {
  const { isOpen, handleOpenPopup, handleClosePopup } = usePopup();

  const addPostHandler = useCallback(() => {
    handleOpenPopup();
    console.log('click');
  }, [handleOpenPopup]);

  useEffect(() => {
    getAlLPostsAction({ _page: 1, _limit: LIMIT });
  }, []);

  return (
    <>
      <MainLayout
        topTitle="Все посты"
        rightTopIcon={{
          svg: <PlusIcon />,
          clicked: addPostHandler,
        }}
      >
        <PostsList />
      </MainLayout>
      <CreatePostPopup onCloseHandler={handleClosePopup} isOpen={isOpen} />
    </>
  );
});
import React, { FC, useCallback } from 'react';
import { Popup } from '../../../../base/components';
import { Box, TextField } from '@mui/material';
import { createPostAction } from '../../actions';
import { useNavigate } from 'react-router';

interface IProps {
  onCloseHandler: () => void;
  isOpen: boolean;
}
export const CreatePostPopup: FC<IProps> = ({ onCloseHandler, isOpen }) => {
  const ref = React.useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(async () => {
    if (ref.current) {
      const data = new FormData(ref.current);

      createPostAction({ data }).then(() => {
        navigate('/posts', { state: { page: 11 } });
        onCloseHandler();
      });
    }
  }, [navigate, onCloseHandler]);

  return (
    <Popup
      isOpen={isOpen}
      headerTitle="Создать пост"
      submitButtonLabel="Создать"
      handleCancelButtonClick={onCloseHandler}
      handleClickSubmit={handleSubmit}
    >
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        ref={ref}
      >
        <div>
          <TextField required id="userId" name="userId" label="userId" />
          <TextField required id="title" name="title" label="title" />
          <TextField required id="body" name="body" label="description" />
        </div>
      </Box>
    </Popup>
  );
};

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
    // e.preventDefault();
    // console.log(formData);
    if (ref.current) {
      const data = new FormData(ref.current);
      console.log(
        'formdata: ',
        ref.current,
        data.get('title'),
        data.get('body'),
        data.get('userId'),
      );
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
      {/*<div>*/}
      {/*  <label htmlFor="userId">User ID:</label>*/}
      {/*  <input type="number" id="userId" name="userId" required />*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <label htmlFor="title">Title:</label>*/}
      {/*  <input type="text" id="title" name="title" required />*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <label htmlFor="description">Description:</label>*/}
      {/*  <textarea id="body" name="body" required />*/}
      {/*</div>*/}
      {/*</form>*/}
    </Popup>
  );
};

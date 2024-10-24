import { Dispatch, SetStateAction, useState } from 'react';

interface IResult {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleClosePopup: () => void;
  handleOpenPopup: () => void;
}

export const usePopup = (
  initialState?: boolean,
  onClose?: () => void,
): IResult => {
  const [isOpen, setIsOpen] = useState(Boolean(initialState));

  const handleClosePopup = (): void => {
    if (onClose) {
      onClose();
    }
    setIsOpen(false);
  };

  const handleOpenPopup = (): void => {
    setIsOpen(true);
  };

  return {
    isOpen,
    setIsOpen,
    handleClosePopup,
    handleOpenPopup,
  };
};

import React, {
  FC,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';

import { Button } from '../Button';

// @ts-ignore
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import styles from './styles.module.scss';
import { SwipeableHandlers, useSwipeable } from 'react-swipeable';
import { IWithClassName } from '../../types';

interface IPopupProps extends IWithClassName {
  headerTitle: ReactNode;
  handleClickSubmit?: () => void;
  handleCancelButtonClick?: () => void;
  handleClosePopup?: () => void;
  submitButtonLabel?: ReactNode;
  cancelButtonLabel?: ReactNode;
  submitButtonDisabled?: boolean;
  cancelButtonDisabled?: boolean;
  children: ReactNode | ReactElement;
  isOpen: boolean;
  isCancelButton?: boolean;
  isBottomSheet?: boolean;
  isDoNotUseSwipeHandlers?: boolean;
  headerFontSize?: number | null;
  showSubtitle?: boolean;
}

export const Popup: FC<IPopupProps> = ({
  children,
  headerTitle,
  handleClickSubmit,
  handleClosePopup,
  handleCancelButtonClick,
  submitButtonDisabled,
  submitButtonLabel,
  cancelButtonDisabled,
  cancelButtonLabel,
  isOpen = false,
  isCancelButton = true,
  isBottomSheet = false,
  className,
  isDoNotUseSwipeHandlers,
  headerFontSize = 18,
  showSubtitle = true,
}) => {
  const [destinationExists, setDestinationExists] = useState(false);
  const destinationElement = useRef<HTMLDivElement>();

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  const [willBeClosed, setWillBeClosed] = useState(false);

  let currentSwipeHandlers: SwipeableHandlers | undefined = useSwipeable({
    onSwipedDown: () => {
      if (handleClosePopup) {
        setWillBeClosed(true);
        setTimeout(() => {
          handleClosePopup();
          setWillBeClosed(false);
        }, 300);
      }
    },
  });

  if (isDoNotUseSwipeHandlers) {
    currentSwipeHandlers = undefined;
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.poppupBody__opened);
    } else {
      document.body.classList.remove(styles.poppupBody__opened);
    }
  }, [isOpen]);

  useEffect(() => {
    destinationElement.current = document.createElement('div');
    destinationElement.current.classList.add('PopupDestination');
    document.body.append(destinationElement.current);
    setDestinationExists(true);

    return () => {
      destinationElement.current?.remove();
      setDestinationExists(false);
    };
  }, []);
  return (
    <>
      {destinationExists &&
        destinationElement.current &&
        createPortal(
          <div
            className={cx(
              styles.overlay,
              {
                [styles.overlayOpened]: isOpen,
                [styles.overlayClosed]: !isOpen,
                [styles.BottomSheet]: isBottomSheet,
              },
              'overlay',
              className,
            )}
          >
            <div
              data-uitest="popup-container"
              className={cx(styles['popup-centered'], 'popup-centered', {
                [styles.willBeClosed]: willBeClosed,
              })}
              {...currentSwipeHandlers}
            >
              <div
                onClick={handleStopPropagation}
                className={cx(styles['popup-modal'], 'popup-modal')}
              >
                <div
                  className={cx(
                    styles['popup-modal-header'],
                    'popup-modal-header',
                  )}
                >
                  <div
                    style={{ fontSize: `${headerFontSize}px` }}
                    className={cx(
                      styles['popup-modal-header__title'],
                      {
                        [styles['popup-modal-header__title-center']]:
                          !handleClosePopup,
                      },
                      'popup-modal-header__title',
                    )}
                  >
                    {headerTitle}
                  </div>
                  {handleClosePopup && (
                    <div
                      data-uitest="close-popup"
                      onClick={handleClosePopup}
                      className={cx(
                        styles['popup-modal-header__closeIcon'],
                        'popup-modal-header__closeIcon',
                      )}
                    >
                      <CloseIcon width={24} height={24} />
                    </div>
                  )}
                </div>
                {showSubtitle && (
                  <div
                    className={cx(
                      styles['popup-modal-subtitle'],
                      'popup-modal-subtitle',
                    )}
                  >
                    {children}
                  </div>
                )}
                <div className={styles.popupModalFooter}>
                  {handleClickSubmit && (
                    <Button
                      disabled={submitButtonDisabled}
                      onClick={handleClickSubmit}
                      size="m"
                    >
                      {submitButtonLabel ?? 'ok'}
                    </Button>
                  )}
                  {handleCancelButtonClick && isCancelButton && (
                    <Button
                      disabled={cancelButtonDisabled}
                      onClick={handleCancelButtonClick}
                      theme="secondary"
                      size="m"
                    >
                      {cancelButtonLabel ?? 'отмена'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>,
          destinationElement.current,
        )}
    </>
  );
};

import { ButtonHTMLAttributes, FC } from 'react';
import cx from 'classnames';

import { IWithClassName } from '../../types';
import styles from './styles.module.scss';

export interface IButtonProps
  extends IWithClassName,
    ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  theme?: 'primary' | 'secondary' | 'action';
  isFullWidth?: boolean;
  size?: 'l' | 'm' | 's' | 'xs';
  withHorizontalPadding?: boolean;
}

export const Button: FC<IButtonProps> = ({
  className,
  children,
  disabled,
  isFullWidth = true,
  theme = 'primary',
  type = 'submit',
  size = 'l',
  onClick,
  withHorizontalPadding,
  ...restProps
}) => {
  return (
    <button
      className={cx(
        styles.button,
        className,
        styles[`button_${theme}`],
        isFullWidth && styles.button_fullWidth,
        `${styles[`button_size-${size}`]}`,
        withHorizontalPadding && styles.buttonWithPadding,
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
};

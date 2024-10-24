import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import cx from 'classnames';

import styles from './styles.module.scss';
import { ISvgIconWithClick, IWithClassName } from '../../../types';
import { ButtonIcon } from './ButtonIcon';

export interface IHeaderPanel extends IWithClassName {
  leftIcon?: ISvgIconWithClick;
  rightIcon?: ISvgIconWithClick;
  title: string;
}

export const HeaderPanel = ({
  className,
  leftIcon,
  title,
  rightIcon,
}: IHeaderPanel): JSX.Element => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <section className={cx(styles.container, className)}>
      <div className={styles.left} data-uitest="button-header-left">
        {leftIcon && (
          <ButtonIcon
            onClick={leftIcon?.clicked ? leftIcon?.clicked : handleBack}
          >
            {leftIcon.svg}
          </ButtonIcon>
        )}
      </div>
      <h1>{title}</h1>
      <div className={styles.right} data-uitest="button-header-right">
        {rightIcon && (
          <ButtonIcon onClick={rightIcon?.clicked}>{rightIcon.svg}</ButtonIcon>
        )}
      </div>
    </section>
  );
};

import React, { ReactElement, UIEventHandler } from 'react';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames/bind';
import { ISvgIconWithClick, IWithClassName } from '../../types';
import styles from './styles.module.scss';
import { HeaderPanel } from './HeaderPanel';
import { routePosts } from '../../navigation';

const cx = classNames.bind(styles);

export interface IMainMenuLayoutProps extends IWithClassName {
  children: React.ReactNode;
  leftTopIcon?: ISvgIconWithClick;
  topTitle?: string;
  rightTopIcon?: ISvgIconWithClick;
  withBottomNavigation?: boolean;
  onScroll?: UIEventHandler<HTMLDivElement>;
  contentClassName?: string;
}

export const MainLayout = ({
  children,
  topTitle,
  leftTopIcon,
  rightTopIcon,
  withBottomNavigation = true,
  onScroll,
  className,
  contentClassName,
}: IMainMenuLayoutProps): ReactElement => {
  return (
    <div className={cx(styles.container, className)}>
      {/* Верхняя панель */}
      {topTitle && (
        <section className={styles.topPanel}>
          <HeaderPanel
            leftIcon={leftTopIcon}
            title={topTitle ? topTitle : ''}
            rightIcon={rightTopIcon}
          />
        </section>
      )}
      {/* Секция контента */}
      <section
        onScroll={onScroll}
        className={cx(
          styles.content,
          {
            content_withTop: topTitle,
            content_withBottomMenu: withBottomNavigation,
          },
          contentClassName,
        )}
      >
        {children}
      </section>
      {/* Нижнее меню */}
      {withBottomNavigation && (
        <section className={styles.bottomMenu}>
          <ul>
            <li>
              <NavLink to={routePosts.url}>
                {({ isActive }) => (
                  <div
                    className={cx(styles.linkBtn, {
                      [styles.linkBtn_active]: isActive,
                    })}
                  >
                    <p className={styles.text}>На главную</p>
                  </div>
                )}
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </div>
  );
};

// libs
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import cn from 'classnames';
import {getAuth} from 'firebase/auth';
// hooks
import {useFirebase} from '../../../context/firebase';
// components
import {Button} from '../Button/Button';
import NotificationsMenu from '../../Notifications/NotificationsMenu';
import SearchUser from './SearchUser';
// utils
import {routes} from '../../../utils/routes';
// assets
import styles from './Header.module.scss';

interface IHeader {
  noButton: boolean | undefined;
}

export const Header = ({noButton}: IHeader) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  useEffect(() => {
    setIsLogin(!router.asPath.includes(routes.login));
  }, [router.asPath]);

  const app = useFirebase();
  const user = getAuth(app).currentUser;
  const isLogged = !!user;

  return (
    <header
      className={cn('bg-white py-8 md:py-16', {[styles.logged]: isLogged})}>
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-y-4">
          <a
            href={routes.home}
            className={cn('w-[126px] md:w-[196px]', styles.logo)}>
            <img src={'./logo.svg'} alt="" />
          </a>
          <SearchUser />
          {isLogged ? (
            <ul
              className={cn(
                'flex items-center gap-x-6 md:gap-x-12 ml-2',
                styles.nav,
              )}>
              <li>
                <img src={'./ball.svg'} alt="" />
              </li>
              <NotificationsMenu />
              <li>
                <img src={'./chest.svg'} alt="" />
              </li>
            </ul>
          ) : !noButton ? (
            isLogin ? (
              <Button href={routes.login} classname="!py-3">
                Login
              </Button>
            ) : (
              <Button href={routes.signUp} classname="!py-3">
                Sign Up
              </Button>
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </header>
  );
};

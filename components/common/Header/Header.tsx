// libs
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import cn from 'classnames';
import {getAuth} from 'firebase/auth';
import Link from 'next/link';
// hooks
import {useFirebase} from '../../../context/firebase';
// components
import {Button} from '../Button/Button';
import NotificationsMenu from '../../Notifications/NotificationsMenu';
import SearchUser from './SearchUser';
import MobileMenu from './MobileMenu';
import LogoIcon from '../../icons/LogoIcon';
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
            className={cn('w-40 no-underline', styles.logo)}>
            <img className="hidden md:block" src="/logo.svg" alt="" />
            <div className="flex md:hidden items-center gap-4">
              <div className="w-8">
                <LogoIcon />
              </div>
              <span className="bg-main-50 text-main-700 font-semibold px-2 rounded-full capitalize">
                {router.pathname.startsWith('/profile')
                  ? 'Chest'
                  : router.pathname.split('/')[1]}
              </span>
            </div>
          </a>
          <div className="flex items-center gap-8">
            <SearchUser />
            <MobileMenu />
          </div>

          <div className="hidden md:block">
            {isLogged ? (
              <ul
                className={cn(
                  'flex items-center gap-x-6 md:gap-x-12 ml-2',
                  styles.nav,
                )}>
                <li>
                  <Link href="/community">
                    <img src="/ball.svg" alt="" />
                  </Link>
                </li>
                <NotificationsMenu />
                <li>
                  <Link href="/profile">
                    <img src="/chest.svg" alt="" />
                  </Link>
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
      </div>
    </header>
  );
};

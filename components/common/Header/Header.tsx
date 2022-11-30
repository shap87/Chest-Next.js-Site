// libs
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

// components
import { Button } from "../Button/Button";
import { routes } from "../../../utils/routes";

// assets
import styles from "./Header.module.scss";

interface IHeader {
  noButton: boolean | undefined
}

export const Header = ({ noButton }: IHeader) => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    if (router.asPath.includes(routes.login)) setIsLogin(false);
    if (router.asPath.includes(routes.profile)) setIsLogged(true);
  }, [])

  return (
    <>
      <header className={cn('bg-white py-8 md:py-16', { [styles.logged]: isLogged })}>
        <div className='container'>
          <div className='flex flex-wrap items-center justify-between gap-y-4'>
            <a href={routes.home} className={cn('w-[126px] md:w-[196px]', styles.logo)}>
              <img src={'./logo.svg'} alt='' />
            </a>
            {isLogged
              ? <ul className={cn('flex items-center gap-x-6 md:gap-x-12 ml-2', styles.nav)}>
                <li>
                  <img src={'./ball.svg'} alt='' />
                </li>
                <li className='relative'>
                  <div
                    className='absolute z-10 -top-1 -right-1 text-[11px] text-white flex items-center justify-center font-bold bg-primary h-4 p-0.5 min-w-[16px] rounded-full border border-white pointer-events-none'>
                    2
                  </div>
                  <img src={'./bell.svg'} alt='' />
                </li>
                <li>
                  <img src={'./chest.svg'} alt='' />
                </li>
              </ul>
              : !noButton
                ? isLogin
                  ? <Button href={routes.login} classname='!py-3'>Login</Button>
                  : <Button href={routes.signUp} classname='!py-3'>Sign Up</Button>
                : ''}
          </div>
        </div>
      </header>
    </>
  )
}
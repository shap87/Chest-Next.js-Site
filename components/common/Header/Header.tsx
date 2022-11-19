// libs
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import { Button } from "../Button/Button";
import { routes } from "../../../utils/routes";

export const Header = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath.includes(routes.getStarted)) setShowLogin(false);
  }, [])

  return (
    <header className='py-8 md:py-16'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <a href={routes.home} className='w-[120px] md:w-[196px]'>
            <img src={'./logo.svg'} alt='' />
          </a>
          {showLogin
            ? <Button href='#' classname='!px-5 !py-3'>Login</Button>
            : <Button href='#' classname='!px-5 !py-3'>Sign Up</Button>}
        </div>
      </div>
    </header>
  )
}
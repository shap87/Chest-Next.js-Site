// components
import { Button } from "../Button/Button";
import { routes } from "../../../utils/routes";

export const Header = () => {
  return (
    <header className='py-8 md:py-16'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <a href={routes.home} className='w-[120px] md:w-[196px]'>
            <img src={'./logo.svg'} alt='' />
          </a>
          <Button href='#' classname='!px-5 !py-3'>Login</Button>
        </div>
      </div>
    </header>
  )
}
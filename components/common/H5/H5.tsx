// libs
import cn from 'classnames';

interface IH5 {
  children: any;
  classname?: string;
}

export const H5 = ({children, classname}: IH5) => {
  return (
    <h5
      className={cn(
        'mb-2 text-base md:text-lg lg:text-xl font-semibold text-[#101828]',
        classname,
      )}>
      {children}
    </h5>
  );
};

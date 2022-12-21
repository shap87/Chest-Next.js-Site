// libs
import cn from 'classnames';

interface IH6 {
  children: any;
  classname?: string;
}

export const H6 = ({children, classname}: IH6) => {
  return (
    <h6
      className={cn(
        'mb-4 text-sm md:text-base lg:text-lg font-semibold text-[#101828]',
        classname,
      )}>
      {children}
    </h6>
  );
};

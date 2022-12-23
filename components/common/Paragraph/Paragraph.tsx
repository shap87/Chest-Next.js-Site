import cn from 'classnames';

export const Paragraph = ({children, className}: any) => {
  return <p className={cn('text-base mb-2', className)}>{children}</p>;
};

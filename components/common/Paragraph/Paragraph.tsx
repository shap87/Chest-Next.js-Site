import cn from "classnames";

export const Paragraph = ({ children, classname }: any) => {
  return <p className={cn('text-lg md:text-xl mb-4 md:mb-8', classname)}>{children}</p>
}
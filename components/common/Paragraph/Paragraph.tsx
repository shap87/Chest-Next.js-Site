import cn from "classnames";

export const Paragraph = ({ children, classname }: any) => {
  return <p className={cn('text-base mb-2', classname)}>{children}</p>
}
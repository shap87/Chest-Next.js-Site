// libs
import cn from "classnames";

interface IH1 {
  children: any,
  classname?: string
}

export const H1 = ({ children, classname }: IH1) => {
  return <h1 className={cn('mb-2 text-4xl lg:text-6xl font-extrabold text-second', classname)}>{children}</h1>
}
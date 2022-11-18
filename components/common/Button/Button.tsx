//libs
import Link from "next/link";
import cn from "classnames";

// assets
import styles from "./Button.module.scss";


interface IButton {
  children: any,
  href: string,
  classname?: string,
  type?: string,
  target?: string,
}

export const Button = ({ children, href, target, classname, type }: IButton) => {

  return href
    ? <Link href={href}>
      <a target={target} className={cn(styles.btn, classname, { [styles.btnSecond]: type === 'second' })}>
        {children}
      </a>
    </Link>
    : <button type='button' className={cn(styles.btn, classname, { [styles.btnSecond]: type === 'second' })}>
      {children}
    </button>
}
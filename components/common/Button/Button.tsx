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
}

export const Button = ({ children, href, classname, type }: IButton) => {

  return href
    ? <Link href={href}>
      <a className={cn(styles.btn, classname, { [styles.btnSecond]: type === 'second' })}>
        {children}
      </a>
    </Link>
    : <button type='button' className={cn(styles.btn, classname, { [styles.btnSecond]: type === 'second' })}>
      {children}
    </button>
}
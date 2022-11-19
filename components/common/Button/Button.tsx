//libs
import Link from "next/link";
import cn from "classnames";

// assets
import styles from "./Button.module.scss";


interface IButton {
  children: any,
  href?: string,
  classname?: string,
  type?: string,
  target?: string,
  disabled?: boolean,
  htmlType?: "button" | "submit" | "reset" | undefined,
}

export const Button = ({ disabled, children, href, target, classname, type, htmlType }: IButton) => {

  return href
    ? <Link href={href}>
      <a target={target} className={cn(styles.btn, classname, { [styles.btnSecond]: type === 'second' })}>
        {children}
      </a>
    </Link>
    : <button
      type={htmlType ? htmlType : 'button'}
      disabled={disabled}
      className={cn(styles.btn, classname, { [styles.btnSecond]: type === 'second' })}>
      {children}
    </button>
}
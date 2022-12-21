//libs
import Link from 'next/link';
import cn from 'classnames';

// assets
import styles from './Button.module.scss';

interface IButton {
  children: any;
  href?: string;
  classname?: string;
  color?: 'pink' | 'light-pink' | 'red' | 'green' | undefined;
  target?: string;
  icon?: 'icon-left' | 'icon-right';
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
}

export const Button = ({
  disabled,
  children,
  href,
  target,
  classname,
  color,
  htmlType,
  onClick,
  icon,
}: IButton) => {
  return href ? (
    <Link href={href}>
      <a
        target={target}
        className={cn(
          styles.btn,
          classname,
          color && styles[color],
          icon && styles[icon],
        )}>
        {children}
      </a>
    </Link>
  ) : (
    <button
      type={htmlType ? htmlType : 'button'}
      disabled={disabled}
      className={cn(
        styles.btn,
        classname,
        color && styles[color],
        icon && styles[icon],
      )}
      onClick={onClick}>
      {children}
    </button>
  );
};

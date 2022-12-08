//  libs
import cn from "classnames";

//  components
import { Paragraph } from "../Paragraph/Paragraph";

// assets
import styles from "./Notification.module.scss"

interface INotification {
  notification: { message: string, type: string }
}

export const Notification = ({ notification }: INotification) => {
  return (
    <div
      className={cn(styles.notification, "fixed top-2 right-2 z-40 rounded-md px-4 py-3 max-w-[300px]", { [styles.error]: notification.type === 'error' })}>
      <Paragraph classname="!mb-0">{notification.message}</Paragraph>
    </div>
  )
}
import React, { FC, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  containerId: string;
  show: boolean;
}

export const Modal: FC<ModalProps> = ({ children, containerId, show }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    if (show) {
      return ReactDOM.createPortal(
        children,
        document.getElementById(containerId)!
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
};

import React, { FC, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  content: React.ReactNode;
  containerId: string;
}

export const Modal: FC<ModalProps> = ({ content, containerId }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(
      content,
      document.getElementById(containerId)!
    );
  } else {
    return null;
  }
};

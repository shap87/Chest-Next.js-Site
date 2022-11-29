import ReactDOM from "react-dom";
import React, { FC, useEffect, useState } from "react";

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

  const modalContent = (
    <>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/[0.55] z-10">
        {children}
      </div>
    </>
  );

  if (isBrowser) {
    if (show) {
      return ReactDOM.createPortal(
        modalContent,
        document.getElementById(containerId)!
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
};

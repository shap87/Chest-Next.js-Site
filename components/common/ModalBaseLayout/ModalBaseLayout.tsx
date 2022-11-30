import React, { FC } from "react";

interface ModalBaseLayoutProps {
  title: React.ReactNode;
  maxWidth?: string;
  show: any;
  children: React.ReactNode;
  onClose: () => void;
}

export const ModalBaseLayout: FC<ModalBaseLayoutProps> = (
  {
    children,
    title,
    maxWidth,
    onClose,
    show
  }) => {
  return (
    show &&
    <div className="fixed z-30 top-0 left-0 w-full h-full flex justify-center items-center bg-black/[0.55] z-10">
      <div style={{ maxWidth: `${maxWidth}px` }}
           className="w-full relative bg-white p-[24px] pl-[14px] pt-[14px] border-2 border-solid border-slate-100 rounded-lg">
        <div className="flex flex-row justify-between items-center">
          {title}
          <button onClick={onClose} className="hover:opacity-70 transition-all">
            <img className="w-3 h-3" src={"./close.svg"} alt="Close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

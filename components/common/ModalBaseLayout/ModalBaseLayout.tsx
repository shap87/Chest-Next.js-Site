import React, {FC} from 'react';

interface ModalBaseLayoutProps {
  title: React.ReactNode;
  icon: string;
  maxWidth?: string;
  show: any;
  children: React.ReactNode;
  onClose: () => void;
}

export const ModalBaseLayout: FC<ModalBaseLayoutProps> = ({
  children,
  title,
  maxWidth,
  onClose,
  show,
  icon,
}) => {
  return (
    show && (
      <div className="fixed z-30 top-0 left-0 w-full h-full flex justify-center items-center bg-black/[0.55]">
        <div
          style={{maxWidth: `${maxWidth}px`}}
          className="w-full relative bg-white p-[24px] pl-[14px] pt-[14px] border-2 border-solid border-slate-100 rounded-lg">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-start ">
              <img className="w-5 h-5" src={icon} alt="" />
              <p className="text-[#667085] text-lg font-semibold ml-2.5">
                {title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="hover:opacity-70 transition-all">
              <img className="w-3 h-3" src="/close.svg" alt="Close" />
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  );
};

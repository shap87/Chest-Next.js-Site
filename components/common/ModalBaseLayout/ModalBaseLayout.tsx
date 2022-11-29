import { FC } from "react";

interface ModalBaseLayoutProps {
  title: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
}

export const ModalBaseLayout: FC<ModalBaseLayoutProps> = ({
  children,
  title,
  onClose,
}) => {
  return (
    <div className="relative bg-white p-[24px] pl-[14px] pt-[14px] border-2 border-solid border-slate-100 rounded-lg">
      <div className="flex flex-row justify-between items-center">
        {title}
        <button onClick={onClose}>
          <img
            style={{ width: "12px", height: "12px" }}
            src={"./close.svg"}
            alt="Close"
          />
        </button>
      </div>
      {children}
    </div>
  );
};

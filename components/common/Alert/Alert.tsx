interface IAlert {
  showSavedMessage: string;
  iconWidth: string;
  icon: string | React.ReactNode;
  children?: any;
}

export const Alert = ({
  showSavedMessage,
  iconWidth,
  icon,
  children,
}: IAlert) => {
  return (
    <div className="w-full flex justify-center absolute -top-20">
      <div className="bg-[#FFF4FA] py-2 px-4 flex flex-row justify-center items-center border-[1px] border-[#FF9AD4] rounded-[10px]">
        {typeof icon === 'string' ? (
          <img className={iconWidth} src={icon} alt="" />
        ) : (
          icon
        )}
        <h4 className="font-semibold text-lg text-[#FF0098] ml-4 whitespace-nowrap">
          {showSavedMessage}
        </h4>
        {children}
      </div>
    </div>
  );
};

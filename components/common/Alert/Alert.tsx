interface IAlert {
  showSavedMessage: string,
  iconWidth: string
  icon: string
}

export const Alert = ({ showSavedMessage, iconWidth, icon }: IAlert) => {
  return (
    <div
      className="w-full flex justify-center absolute -top-20">
      <div
        className="bg-[#FFF4FA] py-2 px-4 flex flex-row justify-center items-center border-[1px] border-[#FF9AD4] rounded-[10px]">
        <img className={iconWidth} src={icon} alt="" />
        <h4 className="font-['Inter-Semibold'] text-lg text-[#FF0098] ml-4 whitespace-nowrap">
          {showSavedMessage}
        </h4>
      </div>
    </div>
  )
}
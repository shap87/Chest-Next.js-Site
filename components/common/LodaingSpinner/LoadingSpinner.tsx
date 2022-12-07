import SpinnerIcon from '../../icons/SpinnerIcon';

export const LoadingSpinner = () => {
  return (
    <div className="fixed z-50 left-0 top-0 w-full h-full bg-black/20 flex items-center justify-center">
      <div className="w-40">
        <SpinnerIcon className="fill-main-500" />
      </div>
    </div>
  );
};

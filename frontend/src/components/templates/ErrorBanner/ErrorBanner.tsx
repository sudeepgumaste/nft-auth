import { FC } from "react";

const ErrorBanner: FC<{ message: string }> = ({ message }) => {
  return (
    <div className="tw-w-full | te-flex | tw-p-3 | tw-bg-red-700">
      <div className="tw-max-w-7xl | tw-mx-auto | tw-text-center">
        {message}
      </div>
    </div>
  );
};

export default ErrorBanner;

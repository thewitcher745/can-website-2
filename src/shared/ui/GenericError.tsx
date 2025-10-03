import { MdError } from "react-icons/md";

const GenericError = ({ message }: { message: string }) => {
  return (
    <div className="flex size-full gap-2 items-center justify-center">
      <MdError className="w-6 h-6 text-error" />
      <span className="text-error text-xl">{message}</span>
    </div>
  );
};

export default GenericError;

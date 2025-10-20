import { MdClose } from "react-icons/md";

const ChartModal = ({
  imgSrc,
  closeModal,
}: {
  imgSrc: string;
  closeModal: any;
}) => {
  return (
    <div className="fixed top-0 z-1000 size-full flex justify-center items-center">
      <div
        className="absolute size-full bg-gray-800 opacity-80"
        onClick={closeModal}
      />
      <div className="relative z-1">
        <div
          className="absolute right-0 top-0 p-1 m-3 bg-black/60 rounded-full cursor-pointer"
          onClick={closeModal}
        >
          <MdClose className="w-4 h-4 md:w-6 md:h-6 text-text-main" />
        </div>

        <img
          src={imgSrc}
          className="object-cover lg:min-w-200 xl:min-w-300 2xl:min-w-400"
        />
      </div>
    </div>
  );
};

export default ChartModal;

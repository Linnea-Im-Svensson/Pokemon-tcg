import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

const PaginationBtn = ({
  pageNr,
  direction,
  currPage,
  setCurrPage,
}: {
  pageNr?: number;
  direction?: "left" | "right";
  currPage: number;
  setCurrPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <button
      className={`flex h-10 w-10 items-center justify-center rounded-full ${
        currPage === pageNr ? "bg-yellow-200" : "bg-white"
      } text-black hover:bg-neutral-300`}
      onClick={() =>
        pageNr
          ? setCurrPage(pageNr)
          : direction === "left"
          ? setCurrPage((prev) => prev - 1)
          : direction === "right"
          ? setCurrPage((prev) => prev + 1)
          : ""
      }
    >
      {pageNr ? (
        pageNr
      ) : direction === "left" ? (
        <AiOutlineArrowLeft />
      ) : (
        <AiOutlineArrowRight />
      )}
    </button>
  );
};

export default PaginationBtn;

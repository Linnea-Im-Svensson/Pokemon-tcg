"use client";

import PaginationBtn from "./PaginationBtn";
import { UseQueryResult } from "@tanstack/react-query";

const Pagination = ({
  totalPages,
  page,
  setPage,
  query,
}: {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  query: UseQueryResult;
}) => {
  const secondTLPage = totalPages - 1;
  const thirdTLPage = totalPages - 2;

  return (
    <div className="flex items-center justify-center gap-4">
      <PaginationBtn direction="left" setCurrPage={setPage} currPage={page} />
      <PaginationBtn pageNr={1} currPage={page} setCurrPage={setPage} />

      {page <= 3 ? (
        <>
          <PaginationBtn pageNr={2} currPage={page} setCurrPage={setPage} />
          <PaginationBtn pageNr={3} currPage={page} setCurrPage={setPage} />
          ...
        </>
      ) : page >= totalPages - 2 ? (
        <>
          ...
          <PaginationBtn
            pageNr={thirdTLPage}
            currPage={page}
            setCurrPage={setPage}
          />
          <PaginationBtn
            pageNr={secondTLPage}
            currPage={page}
            setCurrPage={setPage}
          />
        </>
      ) : (
        <>
          ...
          <PaginationBtn
            pageNr={page - 1}
            currPage={page}
            setCurrPage={setPage}
          />
          <PaginationBtn pageNr={page} currPage={page} setCurrPage={setPage} />
          <PaginationBtn
            pageNr={page + 1}
            currPage={page}
            setCurrPage={setPage}
          />
          ...
        </>
      )}

      <PaginationBtn
        pageNr={totalPages}
        currPage={page}
        setCurrPage={setPage}
      />
      <PaginationBtn direction="right" currPage={page} setCurrPage={setPage} />
    </div>
  );
};

export default Pagination;

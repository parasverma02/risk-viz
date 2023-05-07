"use client"

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import React from "react";

import './pagination.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updatePage } from "@/app/store/reducers/riskSlice";

type PaginationProps = {
  rowsPerPage: number,
  totalRowsCount: number,
  // handlePageChange: (pageNumber: number) => void,
}

// util
const createArrayFromNum = (n: number) => {
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  return arr;
}

const Pagination = (props: PaginationProps) => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const pathname = usePathname();

  const page = useSelector((state: RootState) => state.risk.page)
  const dispatch = useDispatch();
  const totalPages: number = useMemo(() => {
    return Math.ceil(props.totalRowsCount / props.rowsPerPage);
  }, [props.rowsPerPage, props.totalRowsCount]);

  useEffect(() => {
    debugger;
    const route = '/page_' + page;
    router.push(pathname + route);
  }, [page])

  const pageArray = useMemo(() => {
    return createArrayFromNum(totalPages)
  }, [totalPages]);

  const handlePageClick = (pageNo: number) => {
    dispatch(updatePage(pageNo));
  }
  const handleNextClick = () => {
    dispatch(updatePage(page + 1));

    // setCurrentPage((prevPage) => prevPage + 1);
  }
  const handlePrevClick = () => {
    dispatch(updatePage(page - 1));

    // setCurrentPage((prevPage) => prevPage - 1);
  }

  const isPrevDisabled = useMemo(() => {
    return page == 1
  }, [page])

  const isNextDisabled = useMemo(() => {
    return page == totalPages;
  }, [page, totalPages])

  return (
    <div className="pagination-container">
      <button className={"page-button"} disabled={isPrevDisabled} onClick={handlePrevClick}>Prev</button>
      {pageArray.map((pageNo: number) => (
        <button className={`page-number-button ${pageNo == page && 'selectedPage'}`} key={pageNo} onClick={() => handlePageClick(pageNo)}>{pageNo}</button>
      ))
      }
      <button className={"page-button "} disabled={isNextDisabled} onClick={handleNextClick}>Next</button>
    </div>
  )
}

export default React.memo(Pagination);
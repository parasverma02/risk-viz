"use client"

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import React from "react";

import './pagination.css';

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

  const totalPages: number = useMemo(() => {
    return Math.ceil(props.totalRowsCount / props.rowsPerPage);
  }, [props.rowsPerPage, props.totalRowsCount]);

  useEffect(() => {
    const route = '/page_' + currentPage;
    router.push(pathname + route);
  }, [currentPage, pathname, router])

  const pageArray = useMemo(() => {
    return createArrayFromNum(totalPages)
  }, [totalPages]);

  const handlePageClick = (pageNo: number) => {
    setCurrentPage(pageNo);
  }
  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  }
  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  const isPrevDisabled = useMemo(() => {
    return currentPage == 1
  }, [currentPage])

  const isNextDisabled = useMemo(() => {
    return currentPage == totalPages;
  }, [currentPage, totalPages])

  return (
    <div className="pagination-container">
      <button className={"page-button"} disabled={isPrevDisabled} onClick={handlePrevClick}>Prev</button>
      {pageArray.map((page: number) => (
        <button className={`page-number-button ${page == currentPage && 'selectedPage'}`} key={page} onClick={() => handlePageClick(page)}>{page}</button>
      ))
      }
      <button className={"page-button "} disabled={isNextDisabled} onClick={handleNextClick}>Next</button>
    </div>
  )
}

export default React.memo(Pagination);
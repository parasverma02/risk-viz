"use client"

import React, { useCallback, useMemo } from "react";

// Project imports
import './data-table.css';
// import Pagination from "./pagination";

export type DataTableProps = {
  heading: string[],
  dataRows: (string | number)[][],
  // totalRows: number,
}
const DataTable = (props: DataTableProps) => {
 
  const { heading, dataRows } = props;
  // const handlePageChange = useCallback((currentPage: number) =>  {
  // }, [])

  return(
    <div className={"data-table-container"}>
      <table>
        <thead>
          <tr className={"data-table-head-row"}>
            {heading.map((headingLable: string, index: number) => (
              <th className={"data-table-head-label"} key={index}>{headingLable}</th>
            ))}
          </tr>
        </thead>
        <tbody className={"data-table-body"}>
          {dataRows.map((dataRow: (string | number)[], index: number) => (
            <tr className={"data-table-data-row"}key={index}>
              {dataRow.map((data: string | number, index: number) => (
                <td className={"data-table-data-label"} key={index}>{data}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className={'data-table-pagination-container'}>
        <Pagination rowsPerPage={rowsPerPage} totalRowsCount={totalRows} />
      </div> */}
    </div>
  )
}

export default React.memo(DataTable);
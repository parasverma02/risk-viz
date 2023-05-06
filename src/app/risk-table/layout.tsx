import React from "react";
import { notFound } from "next/navigation";

//Project imports
import MenuOptions from "./client-components/menu-option";
import { getBusinessCategoryList, getRiskFactorList, getRowsCount } from "@/app/api/googlesheet/google-sheets";
// import Pagination from "./client-components/pagination";

const getBusinessCategories = async () => {
  const data = await getBusinessCategoryList();
  return data;
}

const getRiskFactors = async () => {
  const data = await getRiskFactorList();
  return data;
}

// const getTotalRows = async () => {
//   const data = await getRowsCount();
//   return data
// }

export default async function RootLayout({
  children,
}: { children: React.ReactNode}) {
  const businessCategories = await getBusinessCategories();
  const riskFactors = await getRiskFactors();

  if (!businessCategories || !riskFactors ) {
    return notFound();
  }
  return (
    <div className="main-container">
      <div className="main-heading">
        <h1>Risk Table</h1>
      </div>
      <MenuOptions filterOptions={{ businessCategories: businessCategories, riskFactors: riskFactors}} />
      {children}
      {/* <div className={'data-table-pagination-container'}>
        <Pagination rowsPerPage={10} totalRowsCount={totalRows}/>
      </div> */}
    </div>
  )
}
import { notFound } from "next/navigation";

// Project imports
import { getRiskData, getRowsCount } from "@/app/api/googlesheet/google-sheets";
import DataTable from "../client-components/data-table";
import { parseParams } from "@/app/api/googlesheet/utils/parseParams";
import store from "@/app/store/store";
import Pagination from "../client-components/pagination";
import { ROWS_PER_PAGE } from "@/constants";
// import { useDispatch } from "react-redux";
// import store from "@/app/store/store";

type RiskTableProps = {
  params: {
    year: string,
    options: string[];
  }
}

const getData = async (year: string, options?: string[]) => {
  if (options != null) {
    return await getRiskData(year, options);
  }
  return await getRiskData(year);
}

// const getTotalRows = async (year: string, options?: string[]) => {
//   const data = await getRowsCount(year, options);
//   return data
// }

const RiskTable = async (props: RiskTableProps) => {
  // let totalRows: number;
  let riskData;
  // const state = store.getState().risk;
  if (props.params.options != null) {
    const options = props.params.options.map((option: string) => parseParams(option));
    riskData = await getData(options[0], options);
  } else {
    riskData = await getData('2030');
  }

  if (!riskData) {
    return notFound();
  }
  return (
    <div className="risk-table-container">
      <DataTable 
        heading={Object.keys(riskData[0])} 
        dataRows={riskData.map((data) => Object.values(data))} 
        // totalRows={riskData.length}
      />
      {/* <div className={'data-table-pagination-container'}>
        <Pagination rowsPerPage={ROWS_PER_PAGE} totalRowsCount={riskData.length} />
      </div> */}
    </div>
  )
}

export default RiskTable;
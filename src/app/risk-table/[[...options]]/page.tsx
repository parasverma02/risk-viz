import { notFound } from "next/navigation";

// Project imports
import { getRiskData, getRowsCount } from "@/app/api/googlesheet/google-sheets";
import DataTable from "../client-components/data-table";
import { parseParams } from "@/app/api/googlesheet/utils/parseParams";

type RiskTableProps = {
  params: {
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
  const selectedYear = '2050'
  if (props.params.options != null) {
    const options = props.params.options.map((option: string) => parseParams(option));
    riskData = await getData(selectedYear, options);
  } else {
    riskData = await getData(selectedYear);
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
    </div>
  )
}

export default RiskTable;
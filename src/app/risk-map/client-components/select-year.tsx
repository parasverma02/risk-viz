"use client"

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState,  } from "react";

// Project imports
import CustomSelect from "@/common/custom-select/custom-select";
import { getOptionsForSelect } from "@/utils/getOptionsForSelect";


type SelectYear = {
  years: string[],
} ;

const SelectYear = (props: SelectYear) => {
  const [year, setYear] = useState<string>(props.years[0]);
  const router = useRouter();

  useEffect(() => {
    router.push(`/risk-map/${year}`)
  }, [router, year])

  const handleSelectChange = useCallback((value: string | any) => {
    if (value) {
    setYear(value);
    }
  }, [])

  const selectOptions = useMemo(() => {
    return getOptionsForSelect(props.years);
  }, [props.years])

  return (
    <CustomSelect defaultValue={selectOptions[0]} options={selectOptions} label={"Year"} onChange={handleSelectChange}/>
  )
}

export default SelectYear;
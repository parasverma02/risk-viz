"use client"

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState,  } from "react";

// Project imports
import CustomSelect from "@/common/custom-select/custom-select";
import { getOptionsForSelect } from "@/utils/getOptionsForSelect";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { updateYear } from "@/app/store/reducers/riskSlice";


type SelectYear = {
  years: string[],
  defaultValue: Number
} ;

const SelectYear = (props: SelectYear) => {
  console.log(props.defaultValue)
  // const [year, setYear] = useState<string>(props.defaultValue.toString());
  const router = useRouter();
  const year = useSelector((state: RootState) => state.risk.year);
  const dispatch = useDispatch();

  useEffect(() => {
    router.push(`/risk-map/${year}`)
  }, [router, year])

  const handleSelectChange = useCallback((value: string | any) => {
    if (value) {
      // setYear(value)
    dispatch(updateYear(value));
    }
  }, [dispatch])

  const selectOptions = useMemo(() => {
    return getOptionsForSelect(props.years);
  }, [props.years])

  return (
    <CustomSelect defaultValue={selectOptions.find((option) => option.value == year.toString())} options={selectOptions} label={"Year"} onChange={handleSelectChange}/>
  )
}

export default SelectYear;
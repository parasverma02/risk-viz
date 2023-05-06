"use client"

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

// Project imports
import { SORT_OPTIONS } from "@/constants";
import CustomSelect from "@/common/custom-select/custom-select";
import { getOptionsForSelect } from "@/utils/getOptionsForSelect";

type SortProps = {
  handleRouteChange: (routeSuffix: string) => void
}

const Sort = (props: SortProps) => {
  const router = useRouter();

  const handleSelectChange = useCallback((value: string | any) => { 
    props.handleRouteChange('_' + value);
  }, [props])

  const options = useMemo(() => {
    return getOptionsForSelect(Object.keys(SORT_OPTIONS));
  }, [])

  return (
    <CustomSelect options={options} onChange={handleSelectChange} label={"Sort by"}/>
  )
}

export default Sort;

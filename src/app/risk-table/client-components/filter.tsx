"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useMemo, useState } from "react";

// Project imports
import CustomSelect from "@/common/custom-select/custom-select";
import { getOptionsForSelect } from "@/utils/getOptionsForSelect";


type FilterProps = {
  label: string,
  options: string[]
  handleRouteChange: (routeSuffix: string) => void
}

const Filter = (props: FilterProps) => {
  const router = useRouter();

  const handleSelectChange = useCallback((values: string[] | string) => {

    let route = '';
    if (Array.isArray(values)) {
      values.forEach((value) => {
        route += '_' + value
      })
      props.handleRouteChange(route);
    }
  
  }, [props])

  const selectOptions = useMemo(() => {
    return getOptionsForSelect(props.options)
  }, [props.options])

  return (
    <CustomSelect isMulti={true} options={selectOptions} onChange={handleSelectChange} label={props.label} />
  )
}

export default Filter;
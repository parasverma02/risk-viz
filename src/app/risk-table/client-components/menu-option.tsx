"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// project imports
import Filter from "./filter";
import Sort from "./sort";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { updateBusinessCategoryFilter, updateRiskFactorFilter } from "@/app/store/reducers/riskSlice";

type MenuOptionsProps = {
  filterOptions: { businessCategories?: string[], riskFactors?: string[]},
}

const MenuOptions =  (props: MenuOptionsProps) => {

  // const [businessfilterRoute, setbusinessFilterRoute] = useState<string>('');
  // const [riskfilterRoute, setRiskFilterRoute] = useState<string>('');

  const [sortRoute, setSortRoute] = useState<string>('');
  const router = useRouter();
  const { businessCategories, riskFactors } = props.filterOptions;
  const state = useSelector((state: RootState) => state.risk);
  const dispatch = useDispatch();

  useEffect(() => {
    let route = '/risk-table/' + state.year;
    if (sortRoute != '') {
      route += '/sortby' + sortRoute
    }
    if (state.businessCategoryFilter != '') {
      route += '/filterbyBC' + state.businessCategoryFilter
    }
    if (state.riskFactorFilter != '') {
      route += '/filterbyRF' + state.riskFactorFilter
    }

    router.push(route);

  }, [router, sortRoute, state.businessCategoryFilter, state.riskFactorFilter, state.year])

  const handleRiskFilterRouteChange = (route: string) => {
    dispatch(updateBusinessCategoryFilter(route));
    // setRiskFilterRoute(route);

  }
  const handleBusinessFilterRouteChange = (route: string) => {
    dispatch(updateRiskFactorFilter(route));

    // setbusinessFilterRoute(route);
  }

  const handleSortRouteChange = (route: string) => {
    setSortRoute(route);
  }

  const getFilters = () => {
    if (businessCategories == null && riskFactors == null) {
      return <></>;
    }
    return (
      <div className="flex mx-2">
         {businessCategories != null &&
          <Filter handleRouteChange={handleBusinessFilterRouteChange} label={'Business Category Filter'} options={businessCategories}/>
         }
         {riskFactors != null &&
          <Filter handleRouteChange={handleRiskFilterRouteChange} label={'Risk Factor Filter'} options={riskFactors}/>
         }
      </div>
    )
  }
  return (
    <div className="flex my-2 px-2">
      <Sort handleRouteChange={handleSortRouteChange} />
      {getFilters()}
    </div>
  )
}

export default MenuOptions;
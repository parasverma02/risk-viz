"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// project imports
import Filter from "./filter";
import Sort from "./sort";

type MenuOptionsProps = {
  filterOptions: { businessCategories?: string[], riskFactors?: string[]},
}

const MenuOptions =  (props: MenuOptionsProps) => {

  const [businessfilterRoute, setbusinessFilterRoute] = useState<string>('');
  const [riskfilterRoute, setRiskFilterRoute] = useState<string>('');

  const [sortRoute, setSortRoute] = useState<string>('');
  const router = useRouter();
  const { businessCategories, riskFactors } = props.filterOptions;

  useEffect(() => {
    let route = '/risk-table';
    if (sortRoute != '') {
      route += '/sortby' + sortRoute
    }
    if (businessfilterRoute != '') {
      route += '/filterbyBC' + businessfilterRoute
    }
    if (riskfilterRoute != '') {
      route += '/filterbyRF' + riskfilterRoute
    }

    router.push(route);

  }, [businessfilterRoute, riskfilterRoute, router, sortRoute])

  const handleRiskFilterRouteChange = (route: string) => {
    setRiskFilterRoute(route);

  }
  const handleBusinessFilterRouteChange = (route: string) => {
    setbusinessFilterRoute(route);
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
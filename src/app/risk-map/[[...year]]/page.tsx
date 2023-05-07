import { notFound } from 'next/navigation';

// Project imports
import { RiskData } from '../../../types/types';
import { getRiskData } from '../../api/googlesheet/google-sheets';
import GoogleMapCustom from '../client-components/google-map-custom';
import { DEFAULT_MAP_ZOOM } from '@/constants';
import store from '@/app/store/store';
import { updateYear } from '@/app/store/reducers/riskSlice';
// import store from '@/app/store/store';
// import { updateYear } from '@/app/store/reducers/riskSlice';

type RiskMap = {
  params : {
    year: string,
  }
}

const getData = async (year: string) => {
  const res = await getRiskData(year);
  return res;
}

const RiskMap = async (props: RiskMap) => {
  let data: RiskData[] | undefined;
  // const state = store.getState().risk;
  const dispatch = store.dispatch;
  
  if (props.params.year != null) {
    // dispatch(updateYear(Number(props.params.year)));
    data = await getData(props.params.year);
  } else {
    data = await getData('2050');
  }

  if (!data) {
    return notFound();
  }

  return (
    <div className='riskmap-container'>
      <GoogleMapCustom 
        zoom={DEFAULT_MAP_ZOOM}
        riskDataList={data}
      />
    </div>
  )
}

export default RiskMap;

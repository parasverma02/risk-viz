"use client"

import { useMemo } from "react";
import { GoogleMap, Marker, MarkerClusterer, useLoadScript } from "@react-google-maps/api";

// Project imports
import { RiskData } from "../../../types/types";
import './google-map-custom.css';

type GoogleMapCustom = {
  zoom: number,
  riskDataList: RiskData[]
}

const GoogleMapCustom = (props: GoogleMapCustom) => {
  const { isLoaded } = useLoadScript({
    // @ts-ignore
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const latLng = useMemo(() => {
    return { lat: props.riskDataList[0].lat, lng: props.riskDataList[0].lng}
  }, [props.riskDataList])

  if (!isLoaded) {
    return <div>Loading...</div>
  }
  return(
    <div className="custom-map-container">
      <GoogleMap
        center={latLng}
        zoom={props.zoom}
        mapContainerClassName="map-container"
      >
      <MarkerClusterer maxZoom={10} >
      {(clusterer) =>
        <>
          {props.riskDataList.map((data: RiskData, index: number) => (
          <Marker key={index} position={{lat: data.lat, lng: data.lng}} clusterer={clusterer} />
        ))}
        </>
      }
      </MarkerClusterer>
      </GoogleMap>
    </div>
    
    
  )
}

export default GoogleMapCustom;
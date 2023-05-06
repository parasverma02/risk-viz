export type MarkerData = {
  lat: number,
  lng: number,
  assetName: string,
  businessCategory: string,
  riskRating: number,
  // color: string
}

export type RiskData = {
  assetName: string,
  lat: number,
  lng: number,
  businessCategory: string,
  riskRating: number,
  riskFactors: any,
  year: string,
}
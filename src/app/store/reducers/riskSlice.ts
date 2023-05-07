import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RiskState {
  year: number,
  sortBy: string,
  businessCategoryFilter: string,
  riskFactorFilter: string,
  page: number,
}

const initialState: RiskState = {
  year: 2030,
  sortBy: '',
  businessCategoryFilter: '',
  riskFactorFilter: '',
  page: 1
}

const riskSlice = createSlice({
  name: "risk",
  initialState,
  reducers: {
    updateYear(state, action: PayloadAction<number>) {
      state.year = action.payload
    },
    updateSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload
    },
    updateBusinessCategoryFilter(state, action: PayloadAction<string>) {
      state.businessCategoryFilter = action.payload
    },
    updateRiskFactorFilter(state, action: PayloadAction<string>) {
      state.riskFactorFilter = action.payload
    },
    updatePage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },

  }
})

export const { updateYear, updateSortBy, updateBusinessCategoryFilter, updateRiskFactorFilter, updatePage } = riskSlice.actions;
export default riskSlice.reducer;
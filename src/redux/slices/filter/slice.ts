import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FilterSliceState, Sort } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  typeSort: 'rating',
  currentPage: 1
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearhValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setTypeSort: (state, action: PayloadAction<Sort>) => {
      state.typeSort = action.payload; 
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload; 
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.currentPage = Number(action.payload.currentPage);
      state.typeSort = action.payload.typeSort;
      state.categoryId = Number(action.payload.categoryId);
    }
  },
})

export const { setCategoryId, setTypeSort, setCurrentPage, setFilters, setSearhValue } = filterSlice.actions;

export default filterSlice.reducer;
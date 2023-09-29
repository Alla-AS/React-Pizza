import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

export type Sort = 'rating' | 'price' | '-price' | 'title';

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  typeSort: Sort;
  currentPage: number;
}

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

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.typeSort;

export const { setCategoryId, setTypeSort, setCurrentPage, setFilters, setSearhValue } = filterSlice.actions;

export default filterSlice.reducer;
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  categoryId: 0,
  typeSort: 'rating',
  currentPage: 1
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setTypeSort: (state, action) => {
      state.typeSort = action.payload; 
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload; 
    },
    setFilters: (state, action) => {
      state.currentPage = Number(action.payload.currentPage);
      state.typeSort = action.payload.typeSort;
      state.categoryId = Number(action.payload.categoryId);

    }
  },
})

export const { setCategoryId, setTypeSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
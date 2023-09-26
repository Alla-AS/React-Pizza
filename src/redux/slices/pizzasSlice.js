import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, sortby, order, search, currentPage } = params;
    const {data} = await axios.get(`https://6509ee0ef6553137159c4521.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortby=${sortby}&order=${order}${search}`);
    return data;
  }
);

const initialState = {
  pizzas: [], 
  status: 'loading', // loading | success | error
}

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: {
      [fetchPizzas.pending]: (state, action) => {
        state.status = 'loading';
        state.pizzas = [];
      },
      [fetchPizzas.fulfilled]: (state, action) => {
        console.log(action.payload)
        state.pizzas = action.payload;
        state.status = 'success';
        console.log(state.status);
      },
      [fetchPizzas.rejected]: (state, action) => {
        state.status = 'error';
        state.pizzas = [];
      },
  }
})

export const {setPizzas} = pizzasSlice.actions;

export default pizzasSlice.reducer;
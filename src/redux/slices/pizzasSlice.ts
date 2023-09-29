import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { type } from 'os';


// type FetchPizzasArgs = Record<string, string>;
type FetchPizzasArgs = {
  category: string; 
  sortby: string;
  order: string;
  search: string;
  currentPage: number;
};

// export type SearchPizzaParams = {
//   category: string; 
//   sortby: string; 
//   order: string; 
//   search: string; 
//   currentPage: number;
// }

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, sortby, order, search, currentPage } = params;
    const {data} = await axios.get<PizzaItem[]>(`https://6509ee0ef6553137159c4521.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortby=${sortby}&order=${order}${search}`);
    return data;
  }
);

type PizzaItem = {
  id: string;
  title: string; 
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzaSliceState {
  pizzas: PizzaItem[]; 
  status: Status;
}

const initialState: PizzaSliceState = {
  pizzas: [], 
  status: Status.LOADING, 
}

export const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<PizzaItem[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  }
  // extraReducers: {
  //     [fetchPizzas.pending]: (state) => {
  //       state.status = 'loading';
  //       state.pizzas = [];
  //     },
  //     [fetchPizzas.fulfilled]: (state, action) => {
  //       state.pizzas = action.payload;
  //       state.status = 'success';
  //     },
  //     [fetchPizzas.rejected]: (state, action) => {
  //       state.status = 'error';
  //       state.pizzas = [];
  //     },
  // }
})

export const selectPizzaData = (state: RootState) => state.pizza;

export const {setPizzas} = pizzasSlice.actions;

export default pizzasSlice.reducer;
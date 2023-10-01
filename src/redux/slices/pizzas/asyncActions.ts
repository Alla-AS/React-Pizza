import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchPizzasArgs, PizzaItem } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, sortby, order, search, currentPage } = params;
    const {data} = await axios.get<PizzaItem[]>(`https://6509ee0ef6553137159c4521.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortby=${sortby}&order=${order}${search}`);
    return data;
  }
);

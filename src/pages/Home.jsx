import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/index';
import { PizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';
import { Pagination } from '../components/Pagination';
import { AppContext } from '../App';
import { setFilters } from "../redux/slices/filterSlice";



export function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const {categoryId, typeSort, currentPage} = useSelector(state => state.filter);
  const {searchValue} = React.useContext(AppContext);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoadingPizzas, setIsLoadingPizzas] = React.useState(true);

  const items = pizzas
    // .filter((el) => el.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => (<PizzaBlock key={obj.id} {...obj}/>));
  const skeletons = [...new Array(6)]
    .map((_, index) => <PizzaSkeleton key={index}/>);

 
  const fetchPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortby = typeSort.replace('-', '');
    const order = typeSort.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : '';

    setIsLoadingPizzas(true);
    axios.get(`https://6509ee0ef6553137159c4521.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortby=${sortby}&order=${order}${search}`)
      .then((res) => {
        setPizzas(res.data);
        setIsLoadingPizzas(false);
      }
    )
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      
      dispatch (
        setFilters({
          ...params
        })
      )
      isSearch.current = true;
    }

  }, []);


  React.useEffect(() => {
    window.scrollTo(0,0);
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;

  }, [categoryId, typeSort, searchValue, currentPage]);

  
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        typeSort,
        categoryId,
        currentPage
      });
      navigate(`?${queryString}`);
    }
    console.log(isMounted);
    isMounted.current = true;

  }, [categoryId, typeSort, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoadingPizzas ? 
          skeletons : 
          items
        }
      </div>
      <Pagination/>
    </div>

  )
}
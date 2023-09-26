import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/index';
import { PizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';
import { Pagination } from '../components/Pagination';
import { AppContext } from '../App';
import { setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from '../redux/slices/pizzasSlice';



export function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const {categoryId, typeSort, currentPage} = useSelector(state => state.filter);
  const {pizzas, status} = useSelector(state => state.pizza);
  const {searchValue} = React.useContext(AppContext);
  // const [pizzas, setPizzas] = React.useState([]);
  // const [isLoadingPizzas, setIsLoadingPizzas] = React.useState(true);


  const items = pizzas
    .map((obj) => (<PizzaBlock key={obj.id} {...obj}/>));
  const skeletons = [...new Array(6)]
    .map((_, index) => <PizzaSkeleton key={index}/>);

 
  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortby = typeSort.replace('-', '');
    const order = typeSort.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : '';

    // try {
    //   // setIsLoadingPizzas(true);
    //   dispatch(fetchPizzas({
    //     category,
    //     sortby,
    //     order,
    //     search,
    //     currentPage
    //   }))
    // } catch (error) {
    //   console.log('Error', error);
    //   alert('Ошибка запроса пицц');
    // } finally {
    //   // setIsLoadingPizzas(false);
    // }
    dispatch(fetchPizzas({
      category,
      sortby,
      order,
      search,
      currentPage
    }));
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
      getPizzas();
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

    isMounted.current = true;

  }, [categoryId, typeSort, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? 
      <div className="content__error-info">
        <h2>Произошла ошибка<span>😕</span></h2>
        <p>К сожалению, не удалось загрузить пиццы. Попробуйте повторить попытку позже.</p>
      </div> : 
      <div className="content__items">
        {
          status === 'loading' ? 
          skeletons : 
          items
        }
      </div>
      }

      <Pagination/>
    </div>

  )
}
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';

import { Categories } from '../components/Categories';
import { SortBlock } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/index';
import { PizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';
import { Pagination } from '../components/Pagination';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/slices/filter/selectors';
import { selectPizzaData } from '../redux/slices/pizzas/selectors';
import { fetchPizzas } from '../redux/slices/pizzas/asyncActions';



export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const {categoryId, typeSort, currentPage, searchValue} = useSelector(selectFilter);
  const {pizzas, status} = useSelector(selectPizzaData);

  const items = pizzas
    .map((obj: any) => (<PizzaBlock key={obj.id} {...obj}/>));
  const skeletons = [...new Array(6)]
    .map((_, index) => <PizzaSkeleton key={index}/>);

 
  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortby = typeSort.replace('-', '');
    const order = typeSort.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
      category,
      sortby,
      order,
      search,
      currentPage
    }));
  } 

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = (qs.parse(window.location.search.substring(1)) as unknown) as FilterSliceState;
      
  //     dispatch (
  //       setFilters(params)
  //     )
  //     isSearch.current = true;
  //   }

  // }, []);


  React.useEffect(() => {
    window.scrollTo(0,0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, typeSort, searchValue, currentPage]); 
  
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       typeSort,
  //       categoryId,
  //       currentPage
  //     });
  //     navigate(`?${queryString}`);
  //   }

  //   isMounted.current = true;

  // }, [categoryId, typeSort, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories/>
        <SortBlock/>
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
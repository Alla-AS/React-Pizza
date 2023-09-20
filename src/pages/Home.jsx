import React from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/index';
import { PizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';
import { Pagination } from '../components/Pagination';

export function Home({searchValue, setSearchValue}) {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoadingPizzas, setIsLoadingPizzas] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [typeSort, setTypeSort] = React.useState('rating');
  const [currentPage, setCurrentPage] = React.useState(1);

  const onClickCategory = (index) => {
    setCategoryId(index);
  }
  
  const items = pizzas
    // .filter((el) => el.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => (<PizzaBlock key={obj.id} {...obj}/>));
  const skeletons = [...new Array(6)]
    .map((_, index) => <PizzaSkeleton key={index}/>);

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortby = typeSort.replace('-', '');
  const order = typeSort.includes('-') ? 'desc' : 'asc';
  const search =searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoadingPizzas(true);
    fetch(`https://6509ee0ef6553137159c4521.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortby=${sortby}&order=${order}${search}`)
      .then((res) => { return res.json();})
      .then((json) => {
        setPizzas(json);
        setIsLoadingPizzas(false);
      });
      window.scrollTo(0,0);
  }, [categoryId, typeSort, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
          activeIndex={categoryId}
          onClickCategory={onClickCategory}/>
        <Sort 
          typeSort={typeSort}
          setTypeSort={setTypeSort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoadingPizzas ? 
          skeletons : 
          items
        }
      </div>
      <Pagination onChangePage={number => setCurrentPage(number)}/>
    </div>

  )
}
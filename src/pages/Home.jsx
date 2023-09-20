import React from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/index';
import { PizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';

export function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoadingPizzas, setIsLoadingPizzas] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [typeSort, setTypeSort] = React.useState('rating');

  const onClickCategory = (index) => {
    setCategoryId(index);
  }

  const category = categoryId > 0 ? `$category=${categoryId}` : '';
  const sortby = typeSort.replace('-', '');
  const order = typeSort.includes('-') ? 'desc' : 'asc';

  React.useEffect(() => {
    setIsLoadingPizzas(true);
    fetch(`https://6509ee0ef6553137159c4521.mockapi.io/pizzas?${category}&sortby=${sortby}&order=${order}`)
      .then((res) => { return res.json();})
      .then((json) => {
        setPizzas(json);
        setIsLoadingPizzas(false);
      });
      window.scrollTo(0,0);
  }, [categoryId, typeSort]);

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
          [...new Array(6)].map((_, index) => <PizzaSkeleton key={index}/>) : 
          pizzas.map((obj) => (<PizzaBlock key={obj.id} {...obj}/>))
        }
      </div>
    </div>

  )
}
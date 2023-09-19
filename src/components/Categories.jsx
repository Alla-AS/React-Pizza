import React from "react";

export function Categories() {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const onClickCategory = (index) => {
      setActiveIndex(index);
    }
    console.log(activeIndex);

    return (
      <div className="categories" /*onClick={(e) => onClickCategory(e.target.id)}*/>
        <ul>
          <li onClick={() => onClickCategory(0)} className={activeIndex === 0 ? 'active' : ''} id="0">Все</li>
          <li onClick={() => onClickCategory(1)} className={activeIndex === 1 ? 'active' : ''} id="1">Мясные</li>
          <li onClick={() => onClickCategory(2)} className={activeIndex === 2 ? 'active' : ''} id="2">Вегетарианская</li>
          <li onClick={() => onClickCategory(3)} className={activeIndex === 3 ? 'active' : ''} id="3">Гриль</li>
          <li onClick={() => onClickCategory(4)} className={activeIndex === 4 ? 'active' : ''} id="4">Острые</li>
          <li onClick={() => onClickCategory(5)} className={activeIndex === 5 ? 'active' : ''} id="5">Закрытые</li>
        </ul>
      </div>
    );
  }
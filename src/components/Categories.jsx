import React from "react";

export function Categories({activeIndex, onClickCategory}) {

    const categories = [
      'Все',
      'Мясные',
      'Вегетарианские',
      'Гриль',
      'Острые',
      'Закрытые'
    ];



    return (
      <div className="categories">
        <ul>
          {
            categories.map((value, index) => (
              <li key={value} onClick={() => onClickCategory(index)}
                className={activeIndex === index ? 'active' : ''}
                id="0">
                  {value}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

import React from "react";

export function Categories() {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const categories = [
      'Все',
      'Мясные',
      'Вегетарианские',
      'Гриль',
      'Острые',
      'Закрытые'
    ];

    const onClickCategory = (index) => {
      setActiveIndex(index);
    }

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

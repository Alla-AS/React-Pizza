import React from "react";
import { useSelector, useDispatch} from 'react-redux';
import { setCategoryId } from "../redux/slices/filterSlice";

export function Categories() {

    const categories = [
      'Все',
      'Мясные',
      'Вегетарианские',
      'Гриль',
      'Острые',
      'Закрытые'
    ];

    const categoryId = useSelector(state => state.filter.categoryId);
    const dispatch = useDispatch();

    return (
      <div className="categories">
        <ul>
          {
            categories.map((value, index) => (
              <li key={value} onClick={() => dispatch(setCategoryId(index))}
                className={categoryId === index ? 'active' : ''}
                id="0">
                  {value}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';

import styles from './search.module.scss';
import { setSearhValue } from '../../redux/slices/filter/slice';


export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: any) => state.filter.searchValue);
  const [value, setValue] = React.useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearhValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  const onClickClear = () => {
    // dispatch(setSearhValue(''));
    setValue('');
    updateSearchValue('');
    inputRef.current?.focus();
  }

  return (
    <div className={styles.root}>
      <svg className={styles.icon} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
      <input ref={inputRef} value={value} onChange={onChangeInput} className={styles.input} placeholder='Поиск пиццы ...' />
      { searchValue && 
        <svg 
          onClick={onClickClear} 
          className={styles.clear_icon} 
          height="20px" 
          id="Layer_1" 
          version="1.1" 
          viewBox="0 0 512 512" 
          xmlns="http://www.w3.org/2000/svg">
            <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
        </svg>
      }
    </div>
    
  )
}
import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filter/slice';

import styles from './Pagination.module.scss';

export const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  }

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  )
}
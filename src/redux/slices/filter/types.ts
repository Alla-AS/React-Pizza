export type Sort = 'rating' | 'price' | '-price' | 'title';

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  typeSort: Sort;
  currentPage: number;
}
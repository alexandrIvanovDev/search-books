import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderFilterType } from '../../components/header/Header.tsx';

export const slice = createSlice({
  name: 'filter',
  initialState: {
    term: '',
    orderBy: 'relevance',
    category: 'all',
    startIndex: 0,
  } as InitialStateType,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload;
    },
    setOrder: (state, action: PayloadAction<OrderFilterType>) => {
      state.orderBy = action.payload;
    },
    setStartIndex: (state, action: PayloadAction<number>) => {
      state.startIndex = action.payload;
    },
    changeCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setSearchTerm, setOrder, setStartIndex, changeCategory } =
  slice.actions;

export default slice.reducer;

type InitialStateType = {
  term: string;
  orderBy: OrderFilterType;
  category: string;
  startIndex: number;
};

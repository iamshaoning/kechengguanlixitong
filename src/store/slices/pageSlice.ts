import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type PageName = 'calendar' | 'studentManagement' | 'statistics';

interface PageState {
  currentPage: PageName;
}

const initialState: PageState = {
  currentPage: 'calendar',
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<PageName>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = pageSlice.actions;
export default pageSlice.reducer;

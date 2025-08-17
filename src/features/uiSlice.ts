import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../types/Types';

type FilterStatus = 'all' | 'active' | 'completed';

interface UiState {
  filterStatus: FilterStatus;
  showModal: boolean;
  todoToDelete: Todo | null;
}

const initialState: UiState = {
  filterStatus: 'all',
  showModal: false,
  todoToDelete: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFilterStatus: (state, action: PayloadAction<FilterStatus>) => {
      state.filterStatus = action.payload;
    },
    openModal: (state, action: PayloadAction<Todo>) => {
      state.showModal = true;
      state.todoToDelete = action.payload;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.todoToDelete = null;
    },
  },
});

export const { setFilterStatus, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;

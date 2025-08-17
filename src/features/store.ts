import { configureStore } from '@reduxjs/toolkit';
import ui from './uiSlice';
import todos from './todosSlice';


export const store = configureStore({
  reducer: {
    ui,
    todos
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../types/Types';
;

interface TodosState {
    items: Todo[];
}

const initialState: TodosState = {
    items: []
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.items = action.payload;
        },
        addNewTodo: (state, action: PayloadAction<Todo>) => {
            state.items.unshift(action.payload)

        },
        toggleStatusTodo: (state, action: PayloadAction<Todo>) => {
            state.items = state.items.map(todo => todo.id === action.payload.id ? action.payload : todo)
        },
        removeTodo: (state, action: PayloadAction<Todo>) => {
            state.items = state.items.filter(todo => todo.id != action.payload.id)
        }
    }
})

export const { setTodos, addNewTodo, toggleStatusTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
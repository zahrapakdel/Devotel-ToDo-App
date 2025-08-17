import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from 'react-redux';
import type { Todo } from "../types/Types"
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import { removeTodo, setTodos } from "../features/todosSlice";
import { setFilterStatus, openModal, closeModal } from "../features/uiSlice";
import type { RootState } from "../features/store";
import FilterByStatus from "./FilterByStatus";
import ConfirmationModal from "./ConfirmationModal";
import axios from "axios";
import { useCallback } from "react";

const TodoContainer = () => {
    const dispatch = useDispatch()
    const todos = useSelector((state: RootState) => state.todos.items);
    const { filterStatus, showModal, todoToDelete } = useSelector((state: RootState) => state.ui);


    const deleteTodo = async (todo: Todo): Promise<Todo> => {
        const response = await axios.delete(`https://dummyjson.com/todos/${todo.id}`
        )
        return response.data;
    }

    const deleteTodoMutation = useMutation({
        mutationFn: deleteTodo,
        onMutate: (todo: Todo) => {
            dispatch(removeTodo(todo))
        },
        onSuccess: (data) => {
            dispatch(removeTodo(data))
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const handleDelete = (todo: Todo) => {
        dispatch(openModal(todo))
    }
    const handleCancelDelete = () => {
    }
    const handleConfirmDelete = () => {
        if (todoToDelete)
            deleteTodoMutation.mutate(todoToDelete);
        dispatch(closeModal());
    }



    const fetchTodosList = async (): Promise<Todo[]> => {
        try {
            const response = await fetch('https://dummyjson.com/todos');
            if (!response.ok) {
                throw new Error('Failed to fetch todos: ' + response.statusText);
            }
            const data = await response.json();
            dispatch(setTodos(data.todos));
            return data.todos;


        } catch (error) {
            console.error('Eroor');
            throw new Error('An error occurred while fetching the todos.');

        }

    }
    const todosQuery = useQuery<Todo[], Error>({
        queryKey: ['todos'],
        queryFn: fetchTodosList,


    })

    if (todosQuery.isError) {
        return (
            <div className="text-center py-8 text-red-600">
                Error: {todosQuery.error.message}
            </div>
        );
    }
   


    const filteredTodos = todos ? todos.filter(todo => {
        if (filterStatus === 'completed') return todo.completed;
        if (filterStatus === 'active') return !todo.completed;
        return true;
    }) : [];




    const handleReorder = useCallback((draggedId: number, hoveredId: number) => {
        const reordered = [...todos];
        const draggedIndex = reordered.findIndex((t) => t.id === draggedId);
        const hoveredIndex = reordered.findIndex((t) => t.id === hoveredId);
        if (draggedIndex === -1 || hoveredIndex === -1) return;

        const [moved] = reordered.splice(draggedIndex, 1);
        reordered.splice(hoveredIndex, 0, moved);
        dispatch(setTodos(reordered));

    }, [todos])





    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-xl mx-auto p-4 w-full">
                <h1 className="text-3xl font-bold text-center mb-6">Your Todos</h1>
                <AddTodoForm />
                {todosQuery.isLoading ? (<><div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading todos...</p>
                </div></>) : (<><FilterByStatus filterStatus={filterStatus} onSetFilter={(status) => dispatch(setFilterStatus(status))} />
                    <TodoList todos={filteredTodos} onDelete={handleDelete} onMove={handleReorder} /></>
                )}
            </div>
            {showModal && todoToDelete && (
                <ConfirmationModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    todoTitle={todoToDelete.todo}
                />
            )}
        </div>
    )
}


export default TodoContainer;
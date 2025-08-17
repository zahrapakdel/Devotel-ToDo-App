import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { Todo } from "../types/Types";
import axios from "axios";
import z from "zod";
import { useDispatch } from "react-redux";
import { addNewTodo } from "../features/todosSlice";


const AddTodoForm = () => {
    const [todoTitle, setTodoTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();


    const queryClient = useQueryClient();

    const todoSchema = z.object({
        todo: z.string().min(1, { error: 'Todo title should not be empty' })
    })
    const addTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
        const response = await axios.post('https://dummyjson.com/todos/add', newTodo);
        return response.data;
    }

    const addTodoMutation = useMutation({
        mutationFn: addTodo,
        onMutate: (newTodo) => {
            const newTodoAdded = { ...newTodo, id: -Date.now() }

            const AllPrevTodos = queryClient.getQueryData<Todo[]>(['todos']);
            queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => {
                return [newTodoAdded, ...(oldTodos || [])];
            });

            dispatch(addNewTodo(newTodoAdded));
            return ({ AllPrevTodos })


        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
            setErrorMessage('Failed to add todo. Please try again.');
        },

        retry: 3,
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            todoSchema.parse({ todo: todoTitle })
            addTodoMutation.mutate({ todo: todoTitle, completed: false, userId: 3 })
            setTodoTitle('');
            setErrorMessage('')
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrorMessage(error.issues[0].message)
            }
        }

    }

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                    placeholder="Add a new todo..."
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={addTodoMutation.isPending}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                >
                    {addTodoMutation.isPending ? 'Adding...' : 'Add Todo'}
                </button>
            </div>
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </form>
    )
}

export default AddTodoForm;
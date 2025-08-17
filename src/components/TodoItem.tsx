import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo, TodoItemProps , DraggedItem} from "../types/Types";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleStatusTodo } from "../features/todosSlice";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";




const TodoItem = ({ todo, onDelete, onMove }: TodoItemProps) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const TodoRef = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop<DraggedItem, void, { isOver: boolean }>({
        accept: 'TODO',
        hover: (item) => {
            if (!TodoRef.current) {
                return;
            }
            const draggedId = item.id;
            const hoveredId = todo.id;

            if (draggedId !== hoveredId)
                onMove(draggedId, hoveredId);

            console.log({ hoveredId, draggedId })

            item.id = hoveredId;
        },
    })
    const [, drag] = useDrag({
        type: 'TODO',
        item: () => ({ id: todo.id }),
    });
    drag(drop(TodoRef));


    const toggleStatus = async (todo: Todo): Promise<Todo> => {
        const response = await axios.put(`https://dummyjson.com/todos/${todo.id}`, {
            completed: !todo.completed
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        return response.data;
    }

    const toggleStatusMutation = useMutation({
        mutationFn: toggleStatus,
        onMutate: (todoToToggle) => {

            const AllPrevTodos = queryClient.getQueryData<Todo[]>(['todos']);
            queryClient.setQueryData<Todo[]>(['todos'], (prevTodos) => {
                return (prevTodos || []).map(todo => todo.id === todoToToggle.id ? { ...todo, completed: !todo.completed } : todo)
            })
            dispatch(toggleStatusTodo({ ...todoToToggle, completed: !todoToToggle.completed }))
            return { AllPrevTodos }

        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })
    const handleToggle = () => {
        toggleStatusMutation.mutate(todo)
    }




    return (

        <div ref={TodoRef} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm mb-2 cursor-grab active:cursor-grabbing">
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggle}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded-md"
                />
                <span className={`text-lg ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.todo}
                </span>
            </div>
            <button
                onClick={() => onDelete(todo)}
                className="px-2 py-1 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition-colors"
            >
                Delete
            </button>

        </div>



    )
}

export default TodoItem;
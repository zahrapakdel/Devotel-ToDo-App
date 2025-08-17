import type { TodoListProps } from "../types/Types"
import TodoItem from "./TodoItem";




const TodoList = ({ todos, onDelete, onMove }: TodoListProps) => {

    return (
        <div className="max-w-xl mx-auto p-4">
            <div>
                {
                    todos.map(todo => (
                        <TodoItem key={todo.id} todo={(todo)} onDelete={onDelete} onMove={onMove} />
                    ))
                }
            </div>
        </div>
    )
}


export default TodoList;
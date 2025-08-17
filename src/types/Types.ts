export interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number
}

export type FilterStatus = 'all' | 'active' | 'completed';


export interface TodoListProps {
    todos: Todo[];
    onDelete: (todo: Todo) => void,
    onMove: (draggedId: number, hoveredId: number) => void
}


export interface TodoItemProps {
    todo: Todo,
    onDelete: (todo: Todo) => void,
    onMove: (draggedId: number, hoveredId: number) => void
}

export interface DraggedItem {
    id: number;
    type: string;
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DndProvider} from 'react-dnd';
import { Provider } from 'react-redux';
import { store } from './features/store';
import TodoContainer from './components/TodoContainer';
import { HTML5Backend } from 'react-dnd-html5-backend';


const queryClient = new QueryClient();

function App() {

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <DndProvider backend={HTML5Backend}>
            <TodoContainer />
          </DndProvider>
        </QueryClientProvider>
      </Provider>


    </>
  )
}

export default App

import React, {useEffect} from "react"
import TodoList from "./Todo/TodoList"
import Context from "./context"
import AddTodo from "./Todo/AddTodo"
import Loader from "./Loader"

// ленивая загрузка компоненты
//const AddTodo = React.lazy(() => new Promise(resolve => {    //обращается к динамическому import
//    setTimeout(() => {
//        resolve(import('./Todo/AddTodo'))
//    }, 3000)
//}))

const styles = {
    h1: {
        color: '#6e4c99',
        display: 'flex',
        justifyContent: 'center'
    },
    p: {
        display: 'flex',
        justifyContent: 'center',
        color: '#6e4c99',
        fontWeight: '600',
        fontSize: '20px'
    },
    h3: {
        fontSize: '12px',
        opacity: '.4',
        color: '#6e4c99',
        display: 'flex',
        justifyContent: 'center'
    }
}

function App() {
    /* useState(Hook) - всегда возвращает массив, состоящий из 2 элементов: состояние; функция - позволяющая изменять данное состояние */
    const [todos, setTodos] = React.useState([])   /* передаём начальное состояние для state */
    // State, чтобы следить за loading. По умолчанию будет процесс загрузки, поэтому начальное значение true
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {   /* делаем запрос на сервер*/
        /* fetch - нативный метод, получаем спосок todos */
        /* ?_limit=5 - query параметр со значением 5, чтобы загрузилось всего 5 элементов */
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=0')
            .then(response => response.json())
            .then(todos => {    // получаем массив todos, и изменяем state. Обращаемся к функции setTodos() и передаём массив todos
                setTimeout(() => {
                    setTodos(todos)
                    setLoading(false)  // когда загрузка задач завершена, loader уберается
                }, 1000)    // делаем задержку 2 сек
            })
    }, [])  /* пустой массив - список зависимостей, которые будут служить для того, чтобы обрабатывать данному callback 1 раз */

    function toggleTodo(id) {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })  )
    }

    /* удаление задачки */
    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    function addTodo(title) {   /* изменить state */
        setTodos(todos.concat([{      /* concat() - добавить нужный элемент */
            title: title,
            id: Date.now(),
            completed: false
        }]))
    }

    return (
        <Context.Provider value={{removeTodo}}>
            <div className="header">
                <h3 style={styles.h3}>vard0ni © 2020</h3>
            </div>
            <div className="wrapper">
                <h1 style={styles.h1}>todo app for ladies<span role="img" aria-label="donut">💜</span></h1>

                {/*<Modal />*/}

                <React.Suspense fallback={<Loader />}>    {/* fallback - что будет показывать, пока компонент будет грузиться */}
                    <AddTodo onCreate={addTodo}/>  {/* передаём переменную, которую lazy лоадим */}
                </React.Suspense>
               {/* <AddTodo onCreate={addTodo}/>*/}

                {/* если переменная loading в значении true -> показывать компонент <Loader /> */}
                {loading && <Loader />}
                {todos.length ? (
                    <TodoList todos={todos} onToggle={toggleTodo}/>
                ): loading ? null : (
                    <p style={styles.p}>No todos<span role="img" aria-label="donut">🤨</span></p>
                )}
            </div>
        </Context.Provider>
  )
}

export default App

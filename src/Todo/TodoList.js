import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from "./TodoItem"

const styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    },
    todo: {
        color: '#6e4c99'
    }
}

function TodoList(props) {
    return (
        <ul style={styles.ul}>
            { props.todos.map((todo, index) => {
                /* key - чтобы react более эффективно рендерил шаблон */
                return <TodoItem todo={todo} key={todo.id} index={index} onChange={props.onToggle}/>
            }) }
        </ul>
    )
}

TodoList.propTypes = {    /* валидация для компонента TodoList */
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,   /* массив из объектов для работы данного компонента */
    onToggle: PropTypes.func.isRequired
}

export default TodoList






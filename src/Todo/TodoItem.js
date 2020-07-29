import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import Context from "../context"
import "../index.css"

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        border: '1px solid #6e4c99',
        borderRadius: '5px',
        marginBottom: '0.5rem'
    },
    input: {
        marginRight: '1rem'
    },
    strong: {
        color: '#6e4c99'
    }
}

function TodoItem({ todo, index, onChange }) {
    const {removeTodo} = useContext(Context)
    let classes = []

    if (todo.completed) {
        classes.push('done')
    }

    return (
        <li style={styles.li}>
            <span className={classes.join(' ')}>  {/*приводим массив к строке*/}
                <input type="checkbox" checked={todo.completed} style={styles.input} onChange={() => onChange(todo.id)}/>
                <strong style={styles.strong}>{index + 1}</strong>
                &nbsp;   {/*символ пробела*/}
                {todo.title}
            </span>

            <button className='rm' onClick={removeTodo.bind(null, todo.id)}>&times;</button>
        </li>
    )
}

TodoItem.propTypes = { /* валидация для компонента TodoItem */
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem

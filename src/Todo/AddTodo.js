import React, {useState} from 'react'
import PropTypes from 'prop-types'

const styles = {
    button: {
        color: '#f0f0f0',
        background: '#6e4c99',
        border: 'none',
        marginLeft: '0.85rem',
        padding: '0.4rem',
        cursor: 'pointer',
        borderRadius: '5px'
    },
    input: {
        marginLeft: '0.4rem',
        width: '500px',
        color: '#6e4c99',
        padding: '0.3rem'
    }
}

/* создание Hook, по конвенции называть со строчки use */
function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)  // логика по определению value

    return {    // в качестве значения возвращаем объект, содержит те ключи, которые нужны для input
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),  //setValue('')  /* убрать текст после добавления новой todo */
        value: () => value
    }
}

function AddTodo({onCreate}) {

    const input = useInputValue('')  /* свой собственный хук */

    function submitHandler(event) {
        event.preventDefault()  /* чтобы страница не перезагружалась */

        /* валидация. Если input пустой, то ничего не будем делать */
        if (input.value().trim()) { /* trim() - удаляем лишние пробелы */
            onCreate(input.value())
            input.clear()
        }
    }

    return (
        <form style={{marginBottom: '1rem'}} onSubmit={submitHandler}>
            {/* ярлычок ... - оператор spread для развёртывания объекта input. Поместит value и onChange*/}
            <input style={styles.input} {...input.bind}/>
            <button style={styles.button} type="submit">Add todo</button>
        </form>
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo

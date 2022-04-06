import {useState, useEffect} from 'react'

const SERVER_URL = 'http://localhost:4000'
function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {getTodos()}, [])

  const getTodos = () => {
    fetch(SERVER_URL + "/todos").then(res => res.json()).then(data => setTodos(data)).catch(err => console.error("Error", err))
  }

  const completeTodo = async (id) => {
    const data = await fetch(SERVER_URL + '/todos/completed/' + id).then(res => res.json()) 
    setTodos(todos.map(todo => {
      if (todo._id === data._id){
        todo.completed = data.completed
      }
      return todo
    })) 
  }

  const deleteTodo = async (id) => {
    const data = await fetch(SERVER_URL + '/todos/delete/' + id, {method: "DELETE"}).then(res => res.json()) 
    setTodos(todos.filter(todo => todo._id !== data._id
    ))
    }

  const addTodo = async () => {
    const data = await fetch(SERVER_URL + "/todos/add", {
      method: "POST", headers: {
      "Content-Type": "application/json"
    },
  body: JSON.stringify({
    text: newTodo
    })
  }).then(res => res.json())
  setTodos([...todos, data])
  setNewTodo("")
  }
  return (
    <div className="App">
    <h1>Welcome to your todo list app!</h1>
    <h2>your todos</h2>
    <div className="todos">
    {todos.map(todo => 
      <div className={"todo " + (todo.completed? "is-complete": "")} key={todo._id} onClick={() => completeTodo(todo._id)}>
        <input type="checkbox" checked = { todo.completed && true}></input>
        <div className="text">{todo.text}</div>
        <div className="delete-todo"onClick={() => deleteTodo(todo._id)}>x</div>
      </div>
      )}
    </div>
    <button className='add-btn'>+</button>
    <input className='add-todo' placeholder='Add a new todo' type="text" onChange={e => setNewTodo(e.target.value)} value={newTodo} ></input>
    <button className='ok-btn' onClick={addTodo}>OK</button>
    </div>
  );
}

export default App;

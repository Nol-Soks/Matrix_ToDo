import { useEffect, useState } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([])
  
  useEffect(()=>{

    async function main(){
      const response = await axios.get("http://localhost:8888/todos");
        setTodos(response.data.todos)
      }
    main();
  },[])
  
  return (
    <div style={{margin:'100px 500px '}}>
      <CreateTodo />
      <Todos todos={todos } setTodos={setTodos}></Todos>
    </div>
  )
}
export default App

import axios from "axios"
import { useRef, useState } from "react"



export function Todos({todos,setTodos}){
        
        async function handleCompletedClick(todoID){
            setTodos((prevTodo)=>
                prevTodo.map((todo)=>
                    todo._id===todoID ? {...todo , completed: true} : todo
                )
            );
          await axios.put("http://localhost:8888/completed",{
            id:todoID
          })
          alert("Marked as Completed ")
          }
          async function handleDeleteClick(todoID){
            
          await axios.delete("http://localhost:8888/remove",{
            data:{id:todoID}
          })
          setTodos((prevTodo)=>
            prevTodo.filter(todo=>
                todo._id!==todoID ))
                alert("Todo Deleted Successfully")
               
            }
          
        const draggedPerson=useRef(0);
        const draggedOverPerson=useRef(0);
        function handleExchange(){
          const array=[...todos]
          const temp = array[draggedPerson.current]
          array[draggedPerson.current]=array[draggedOverPerson.current]
          array[draggedOverPerson.current]=temp
          setTodos(array)
        }
        
        function handleDrop(e){
          e.preventDefault();
          handleExchange();
        }
        return <div >
        
        {todos.map( (todo , index) => {

            return <div  draggable onDragStart={()=>(draggedPerson.current=index)} onDragEnter={()=>(draggedOverPerson.current=index)}  onDragOver={(e)=>e.preventDefault()} onDrop={handleDrop}
            style={{color:"black", backgroundColor:"lightyellow", margin:'10px' , borderRadius:'10px',padding:"20px"}} key={(todo._id)}>
            <br/>
            <p style={{border:"2px solid black" , fontWeight:"bold"}}>{todo.title}</p>
            <p style={{border:"2px solid black"}}>{todo.description}</p>
            <button style={{textAlign:'center'}} onClick={()=>handleCompletedClick(todo._id)} >{todo.completed == true ? "Task Completed" : "Mark as Complete"} </button>
            <button style={{textAlign:'center'}} onClick={()=>handleDeleteClick(todo._id)}>Delete</button>
            </div>        
        })}  
    </div>
}

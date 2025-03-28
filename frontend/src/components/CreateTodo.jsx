import axios from "axios";
import { useState } from "react"
export function CreateTodo({setTodos}) {

    const [title , setTitle]=useState("");
    const [description,setDescription]=useState("");
    return <div className="AddTodo"  style={{color:"black", backgroundColor:"lightpink", margin:'50px' , borderRadius:'10px',padding:"50px"}}>
        
        <input style={{
            padding:5,
            margin:5
        }} type="text" placeholder="title" onChange={function(e) {
            const value= e.target.value;
            setTitle(e.target.value);
        }}></input><br></br>
        <input style={{
            padding:5,
            margin:5
        }} type="text" placeholder="description" onChange={function(e) {
            const value= e.target.value;
            setDescription(e.target.value);
        }}></input><br></br>
        <button style={{
            textAlign:"center",
            margin:'5px'
        }} onClick={async ()=>{
            fetch("http://localhost:8888/todo",{
                method:"POST",
                body: JSON.stringify({
                    title:title,
                    description : description
                }),
                headers:{
                    "Content-type":"application/json"
                }
            })
            .then(async function(res){
                const json = await res.json();
                alert("Todo added");
                const allTodosResponse = await axios.get("http://localhost:8888/todos");
                setTodos(allTodosResponse.data.todos)
                console.log("setTodos inside onClick:", setTodos);

                })
                
        }}>Add Todo</button>
     </div>
}
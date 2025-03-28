const express = require("express");
const { createTodo, updateTodo , updateProperties } = require("./types");
const app = express();
const { todo } = require("./db");
const cors= require("cors");

console.log(updateProperties)
console.log(updateTodo)
console.log('server started');
app.use(express.json())
app.use(cors());


app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success){
        res.status(411).json({
            message :" wrong input types"
    })
        return ;
    }

    await todo.create({
        title : createPayload.title ,
        description : createPayload.description,
        completed : false
    })
    res.json({
        msg: "Todo created successfully"
    });

})

app.get("/todos", async function(req, res) {
    const todos = await todo.find({});
    res.json({
        todos
    });
})

app.put("/update", async function(req,res) {
    const newpayload = req.body;
    const parsedPayload = updateProperties.safeParse(newpayload);
    if (!parsedPayload.success){
        res.status(411).json({
            msg : "wrong inputs my friend"
        })
        return ;
    }
    
    await todo.findByIdAndUpdate(req.body.id,{
        title:newpayload.title,
        description:newpayload.description
    })
    res.json({
        msg:"todo is updated"
    })
})

app.put("/completed", async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success){
        res.status(411).json({
            msg : "wrong inputs my friend"
        })
        return ;
    }
    
    await todo.findByIdAndUpdate(req.body.id,{completed:"true"})
    res.json({
        msg:"todo is completed"
    });

})

app.delete("/remove",async (req,res)=>{
    //console.log('Connected to MongoDB');
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success){
        res.status(411)
        return ;
    }
    await todo.findByIdAndDelete(req.body.id)
    res.json("completed deleting");    
    
})
app.listen(8888);

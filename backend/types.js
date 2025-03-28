const zod = require("zod");


const createTodo = zod.object({
    
    title : zod.string(),
    description : zod.string()

})

const updateProperties = zod.object({
    id: zod.string(),
    title : zod.string(),
    description : zod.string()
})

const updateTodo = zod.object ({
    id: zod.string()
})

module.exports={
    createTodo: createTodo,
    updateTodo: updateTodo,
    updateProperties : updateProperties
}
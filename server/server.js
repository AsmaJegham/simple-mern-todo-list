const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = 4000
const Todo = require('./models/todo')

app.use(express.json())
app.use(cors())

const url = `mongodb+srv://asma123:asma123@todo-list-app.d1emv.mongodb.net/todo-list-app?retryWrites=true&w=majority`

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`)})

app.get('/todos', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

app.post('/todos/add', (req, res) =>{
    const todo = new Todo({
        text: req.body.text
    })
    todo.save()
    res.json(todo)
})

app.delete('/todos/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})

app.get('/todos/completed/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    todo.completed = !todo.completed
    todo.save()
    res.json(todo)
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos)
    }
  }, [])
  

  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleEdit = (e,id)=>{
    let t = todos.filter(i=>i.id==id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    });
    settodos(newTodos)
    saveToLs();
  }
  const handleDelete = (e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    });
    settodos(newTodos)
    saveToLs();
  }
  const handleAdd = ()=>{
    settodos([...todos,{id:uuidv4(),todo,isCompleted: false}])
    setTodo("")
    console.log(todos);
    saveToLs();
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }

  const handleCheck = (e) => {
    console.log(e,e.target)
    let id = e.target.name;
    console.log(`The id is ${id}`)
    let index = todos.findIndex(item=>{
      return item.id == id;
    })
    console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted= !newTodos[index].isCompleted;
    settodos(newTodos);
    console.log(newTodos);
    saveToLs();
  }
  
  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  }

  return (
    <>
      <Navbar/>
      <div className="md:container mx-3 md:mx-auto my-8 rounded-xl bg-violet-50 p-5 min-h-[80vh] md:w-[40%]">
      <h1 className='font-bold text-center text-2xl'>TaskTracker-Manage Your Tasks at one Place</h1>
        <div className="addTodo my-5 flex flex-col">
          <h2 className="text-lg font-bold">Add a Task</h2>
          <input onChange = {handleChange} value = {todo} type="text" className='w-full rounded-lg px-5 py-1' />
          <button onClick = {handleAdd} disabled = {todo.length<=3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mt-2 text-sm font-bold disabled:bg-violet-700'>Save</button>
        </div>
        <input id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className= 'mx-2' htmlFor="show">Show Finished</label>
        <div className="h-[1px] opacity-20 bg-black my-2 w-[90%] mx-auto"></div>
        <h2 className="text-lg font-bold my-4">Your Tasks</h2>
        {todos.length==0 && <div className='m-5'>No tasks created </div>}
        <div className="todos">
          {todos.map(item=>{
            return (showFinished || !item.isCompleted) && <div key = {item.id} className="todo flex justify-between md:w-full my-3">
               <div className='flex gap-5'>
               <input name={item.id} onChange={handleCheck} type="checkbox" checked={item.isCompleted} />
               <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
                    <div className="buttons flex h-full">
                      <button onClick = {(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md text-sm font-bold mx-1'><FaEdit/></button>
                      <button onClick = {(e)=>handleDelete(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md text-sm font-bold mx-1'><MdDelete/></button>
                    </div >
                  </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

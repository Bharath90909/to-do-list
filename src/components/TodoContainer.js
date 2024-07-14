import AddTask from "./AddTask";
import NewTask from "./NewTask";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import classes from "../todo.module.css";
const TodoContainer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function addTask(taskInput) {
    const newTasks = [...tasks];
    if (isEditing) {
      newTasks.splice(editIndex, 1, taskInput);
      setIsEditing(false);
    } else {
      newTasks.push(taskInput);
    }
    localStorage.setItem("todos",JSON.stringify(newTasks))
    setInput("");
    setTasks(newTasks);
  }

  function deleteTask(delIndex) {
    // const prevTasks = [...tasks];
    // prevTasks.splice(index, 1);
    // setTasks(prevTasks);
    //or
    const updatedTasks=tasks.filter((todo,index)=>index!==delIndex)
    localStorage.setItem("todos",JSON.stringify(updatedTasks))
    setTasks(updatedTasks)

    
  }

  function editTask(index) {
    const editContent = tasks[index];
    setInput(editContent);
    setEditIndex(index);
    setIsEditing(true);
  }

  useEffect(()=>{
    setTasks(JSON.parse(localStorage.getItem("todos")))
  },[])

  return (
    <Fragment>
      <h1 className={classes.heading}>Todo List</h1>
      <div className={classes["todo-container"]}>
        <NewTask
          addTask={addTask}
          input={input}
          setInput={(input) => {
            setInput(input);
          }}
          isEditing={isEditing}
        />
        {tasks.length === 0 && (
          <p class={classes["notes-empty"]}>Notes is Empty!!!</p>
        )}

        <div className={classes["tasks-wrapper"]}>
          {tasks.map((task, index) => {
            return (
              <AddTask
                key={index}
                data={task}
                index={index}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default TodoContainer;

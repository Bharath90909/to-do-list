import React from 'react'
import classes from "../todo.module.css";
export default function AddTask(props) {
  const {data,index,deleteTask,editTask}=props
    function deleteHandler(){
        deleteTask(index)
    }
    function editHandler(){
      editTask(index)
    }
  return (
    <div className={classes.task}>
        <p className={classes["task-content"]}>{data}</p>
        <button className={classes.button} onClick={editHandler}>Edit</button>
        <button onClick={deleteHandler} className={classes.button}>Delete</button>
    </div>
  )
}

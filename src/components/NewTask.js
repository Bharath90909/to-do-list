import React, { Fragment, useEffect, useRef } from "react";
import { useState } from "react";
import classes from "../todo.module.css";

export default function NewTask({ input, setInput, isEditing, addTask }) {
  const [error, setError] = useState(false);
  const inputElement = useRef();

  function addHandler() {
    if (input.trim().length !== 0) {
      addTask(input);
      setInput("");
      setError(false);
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    function callBack(e) {
      if (e.code === "Enter") {
        addHandler();
      }
    }
    inputElement.current.focus();
    document.addEventListener("keydown", callBack);
    return () => document.removeEventListener("keydown", callBack);
  }, [input, addHandler]);

  return (
    <Fragment>
      <div className={classes["input-container"]}>
        <input
          className={classes.input}
          type="text"
          value={input}
          ref={inputElement}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={classes.button} onClick={addHandler}>
          {isEditing ? "Edit" : "Add Task"}
        </button>
      </div>
      {error && (
        <p class={classes["error-msg"]}>Input field cannot be empty!!!</p>
      )}
    </Fragment>
  );
}

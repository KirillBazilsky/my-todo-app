"use client";

import React, { FC, FormEvent, useState } from "react";
import { styles } from "./taskForm.styles";
import { createTask } from "@/client/api/tasks";

const TaskForm: FC = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    await createTask(title).then(() => {
      setTitle("");
      window.location.reload();
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form} id="new-task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Add Task
        </button>
      </form>
    </>
  );
};

export default TaskForm;

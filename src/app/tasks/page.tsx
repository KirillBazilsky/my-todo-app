import React from "react";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";

const TasksPage = () => {
  return (
    <div className="flex-wrapper flex-col mt-16">
      <h2>Task Management</h2>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default TasksPage;

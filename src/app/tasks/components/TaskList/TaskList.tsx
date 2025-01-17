"use client";

import React, { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { TaskStatus } from "@prisma/client";
import { styles } from "./taskList.style";
import { ITask } from "@/client/interfaces/task";
import { deleteTask, getTasks, updateTaskStatus } from "@/client/api/tasks";
import { TASK_STATUS_LABELS } from "@/client/constatnts/common";

const TaskList: FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChangeStatus = async (taskId: number, status: TaskStatus) => {
    const updatedTask = await updateTaskStatus(taskId, status);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: updatedTask?.status } : task
      )
    );
  };

  const handleDeleteTask = async (taskId: number) => {
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (!tasks.length) {
    return <h4>No tasks</h4>;
  }

  return (
    <div className="flex-wrapper">
      <ul className={styles.taskList}>
        <h4>Task List</h4>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <span
              className={clsx({
                [styles.taskTitle]: task?.status === TaskStatus.COMPLETED,
                [styles.taskInProgress]: task?.status === TaskStatus.IN_PROGRESS,
                [styles.taskPaused]: task?.status === TaskStatus.PAUSED,
              })}
            >
              {task.title}
            </span>
            <div className={styles.buttonWrapper}>
              <select
                value={task.status}
                onChange={(e) =>
                  handleChangeStatus(task.id, e.target.value as TaskStatus)
                }
                className={styles.statusDropdown}
              >
                {Object.entries(TASK_STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className={clsx(styles.buttonBase, styles.deleteButton)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

"use client";

import React, { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { TaskStatus } from "@prisma/client";
import { ITask } from "@/client/types/task";
import { deleteTask, getTasks, updateTaskStatus } from "@/client/api/tasks";
import { TASK_STATUS_LABELS } from "@/client/constatnts/common";

const TaskList: FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const data = await getTasks();

        setTasks(data);
      } finally {
        setLoading(false);
      }
    };

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
    <div className="flex-wrapper w-full flex-col">
      <ul className="space-y-4 shadow-lg p-4 rounded-lg w-1/2 max-h-[600px] overflow-y-scroll">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between border-b pb-2 gap-8 w-100"
          >
            <span
              className={clsx({
                "line-through text-gray-500 px-2 w-full break-world truncate max-w-84 overflow-hidden":
                  task?.status === TaskStatus.COMPLETED,
                "bg-green-300 text-black px-2 w-full rounded break-world truncate max-w-84 overflow-hidden":
                  task?.status === TaskStatus.IN_PROGRESS,
                "bg-gray-300 text-black px-2 w-full rounded break-world truncate max-w-84 overflow-hidden":
                  task?.status === TaskStatus.PAUSED,
                "text-black px-2 w-full rounded break-world truncate max-w-84 overflow-hidden":
                  task?.status === TaskStatus.PENDING,
              })}
            >
              {task.title}
            </span>
            <div className="space-x-2 flex-wrapper">
              <select
                value={task.status}
                onChange={(e) =>
                  handleChangeStatus(task.id, e.target.value as TaskStatus)
                }
                className="bg-white border border-gray-300 text-gray-700 px py rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-8 italic"
              >
                {Object.entries(TASK_STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className={clsx(
                  "px-3 py-1 text-sm rounded text-white",
                  "bg-red-500 hover:bg-red-600 h-8"
                )}
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

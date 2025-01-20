"use client";

import React, { FC, FormEvent, useState } from "react";
import { createTask } from "@/client/api/tasks";
import { useRouter } from "next/navigation";

const TaskForm: FC = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = async(e: FormEvent) => {

    e.preventDefault();
    await createTask(title).then(() => {
      setTitle("");
      router.push("/")
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex-wrapper flex-row rounded-md w-1/2 shadow-lg border min-w-96 p-2"
        id="new-task-form"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
          className="w-full h-8"
        />
        <button
          type="submit"
          className="btn-primary px-2 py rounded min-w-24 h-8"
        >
          Add Task
        </button>
      </form>
    </>
  );
};

export default TaskForm;

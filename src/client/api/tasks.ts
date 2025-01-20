import axios from "axios";
import { errorManager } from "@/client/utils/errorManager";
import { API_TASK_URL } from "../constatnts/api";

 export const getTasks = async() => {
    try {
      const response = await axios.get(API_TASK_URL);

      return response.data;
    } catch (error) {
      errorManager.notify(`Failed to fetch tasks: ${error}`);
      throw error;
    }
  }

  export const createTask = async(title: string) => {
    try {
      const response = await axios.post(API_TASK_URL, { title });

      return response.data;
    } catch (error) {
      errorManager.notify(`Failed to create task: ${error}`);
      throw error;
    }
  }

  export const updateTaskStatus = async(taskId: number, status: string) => {
    try {
      const response = await axios.patch(`${API_TASK_URL}/${taskId}`, {
        status,
      });
      
      return response.data;
    } catch (error) {
      errorManager.notify(`Failed to update task status: ${error}`);
      throw error;
    }
  }

  export const deleteTask = async(taskId: number) => {
    try {
      const response = await axios.delete(`${API_TASK_URL}/${taskId}`);

      return response.data;
    } catch (error) {
      errorManager.notify(`Failed to delete task: ${error}`);
      throw error;
    }
  }

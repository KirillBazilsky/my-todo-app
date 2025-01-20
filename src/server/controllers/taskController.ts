import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { TaskService } from "../services/taskService";
import { authOptions } from "../utils/auth";

export class TaskController {
  static async getTasks() {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(session.user.id);

    const tasks = await TaskService.getAllTasksByUserId(userId);
    
    return NextResponse.json(tasks);
  }

  static async createTask(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const userId = Number(session.user.id);
    const task = await TaskService.createTask(title, userId);

    return NextResponse.json(task, { status: 201 });
  }

  static async updateTask(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const taskId = Number(req.url.split("/").pop());
    const { status } = await req.json();

    if (!taskId || status === undefined) {
      return NextResponse.json(
        { error: "Task ID and status are required" },
        { status: 400 }
      );
    }

    const userId = Number(session.user.id);
    const task = await TaskService.updateTaskStatus(taskId, status, userId);

    return NextResponse.json(task);
  }

  static async deleteTask(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const taskId = Number(req.url.split("/").pop());

    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    const userId = Number(session.user.id);
    await TaskService.deleteTask(taskId, userId);

    return NextResponse.json({ message: "Task deleted successfully" });
  }
}

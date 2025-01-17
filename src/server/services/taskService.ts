import { TaskStatus } from "@prisma/client";
import prisma from "@/server/utils/db";

export class TaskService {
  
  static async getAllTasksByUserId(userId: number) {
    return prisma.task.findMany({
      where: { userId },
      orderBy: {
        createdAt: "asc"
      },
    });
  }

  
  static async createTask(title: string, userId: number) {
    return prisma.task.create({
      data: { title, userId },
    });
  }


  static async updateTaskStatus(
    id: number,
    status: TaskStatus,
    userId: number
  ) {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task || task.userId !== userId) {
      throw new Error("Task not found or unauthorized");
    }

    return prisma.task.update({
      where: { id },
      data: { status },
    });
  }

  
  static async deleteTask(id: number, userId: number) {
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task || task.userId !== userId) {
      throw new Error("Task not found or unauthorized");
    }

    return prisma.task.delete({ where: { id } });
  }
}

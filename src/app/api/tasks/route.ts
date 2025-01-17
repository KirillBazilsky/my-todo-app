import { NextRequest } from "next/server";
import { TaskController } from "@/server/controllers/taskController";

export async function GET() {
  return TaskController.getTasks();
}

export async function POST(req: NextRequest) {
  return TaskController.createTask(req);
}

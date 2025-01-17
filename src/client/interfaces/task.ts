import { TaskStatus } from "@prisma/client";
import { IUser } from "./user";

export interface ITask {
  id: number;
  title: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: IUser;
}

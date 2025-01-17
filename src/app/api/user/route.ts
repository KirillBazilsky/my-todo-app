import { UserController } from "@/server/controllers/userController";
import { NextRequest } from "next/server";

export async function GET() {
  return UserController.getUser();
}

export async function PATCH(req: NextRequest) {
  return UserController.updateUser(req);
}

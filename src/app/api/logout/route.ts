import { AuthController } from "@/server/controllers/authController";

export async function POST() {
  return AuthController.logout();
}

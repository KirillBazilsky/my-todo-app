import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/server/services/userService";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";

export class UserController {
  static async getUser() {
    try {
      const session = await getServerSession(authOptions);

      if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const user = await userService.getUserById(Number(session.user.id));

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      console.error("Error fetching user:", error);

      return NextResponse.json(
        { message: "Error fetching user" },
        { status: 500 }
      );
    }
  }

  static async updateUser(req: NextRequest) {
    try {
      const session = await getServerSession(authOptions);

      if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const userId = Number(session.user.id);
      const updateData = await req.json();

      const updatedUser = await userService.updateUser(userId, updateData);

      return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
      console.error("Error updating user:", error);
      
      return NextResponse.json(
        { message: "Error updating user" },
        { status: 500 }
      );
    }
  }
}

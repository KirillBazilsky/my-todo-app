import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/server/services/authService";

export class AuthController {
  static async register(req: NextRequest) {
    try {
      const body = await req.json();
      
      const { email, password, firstName, lastName } = body;

      if (!email || !password) {
        console.error("Missing email or password");
        
        return NextResponse.json(
          { message: "Email and password are required" },
          { status: 400 }
        );
      }

      const newUser = await userService.register(
        email,
        password,
        firstName,
        lastName
      );

      return NextResponse.json(
        {
          message: "User registered successfully",
          user: { id: newUser.id, email: newUser.email },
        },
        { status: 201 }
      );
    } catch (error: unknown) {
      console.error("Error in register method:", error);

      if ((error as Error).message === "User already exists") {
        return NextResponse.json(
          { message: "User already exists" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { message: "Error registering user" },
        { status: 500 }
      );
    }
  }

  static async login(req: NextRequest) {
    const { email, password } = await req.json();

    try {
      const user = await userService.login(email, password);
      return NextResponse.json(
        {
          message: "Login successful",
          user: { id: user.id, email: user.email },
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: `Invalid credentials ${error}` },
        { status: 400 }
      );
    }
  }

  static async logout() {
    try {
      await userService.logout();

      return NextResponse.json(
        { message: "Logged out successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during logout:", error);

      return NextResponse.json(
        { message: "Error during logout" },
        { status: 500 }
      );
    }
  }
}

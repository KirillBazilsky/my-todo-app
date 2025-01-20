import bcrypt from "bcrypt";
import prisma from "../utils/db";

export const userService = {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new Error("Invalid password");

    return user;
  },

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    return newUser;
  },
  
  async logout(): Promise<void> {
    console.log("User logged out using NextAuth.");
  },
};

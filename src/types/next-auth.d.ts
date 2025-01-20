
import { User as DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    email: string;
    firstName?: string;
    lastName?: string;
    id?: string;
  }

  interface Session {
    user: {
      email: string;
      firstName?: string;
      lastName?: string;
      id?: string;
    };
  }
}

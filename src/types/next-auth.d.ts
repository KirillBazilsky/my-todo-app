
import { User as DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    email: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
}

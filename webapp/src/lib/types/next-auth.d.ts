/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      displayName: string;
      reputation: number;
    } & DefaultUser
  }

  interface User {
    id: string;
    displayName: string;
    reputation: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: string;
    user: {
      id: string;
      displayName: string;
      reputation: number;
    }
  }
}

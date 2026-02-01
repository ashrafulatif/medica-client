"use server";
import { userService } from "@/services/user.service";

export const authGetSesssion = async () => {
  return await userService.getSession();
};

"use server";
import { userService } from "@/services/user.service";
import { IUpdateProfile } from "@/types";
import { updateTag } from "next/cache";

export const authGetSesssion = async () => {
  return await userService.getSession();
};
export const updateProfileAction = async (newProfileData: IUpdateProfile) => {
  
  const result = await userService.updateProfile(newProfileData);
  if (result.data && !result.error) {
    updateTag("userData");
  }
};

export const getLoggedInUserDataAction = async () => {
  return await userService.getLoggedInUserData();
};

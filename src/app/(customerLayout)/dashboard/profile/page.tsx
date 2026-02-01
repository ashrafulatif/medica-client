import ProfileView from "@/components/modules/customer/ProfileView";
import { userService } from "@/services/user.service";
import React from "react";

const ProfilePage = async () => {
  const { data } = await userService.getSession();

  const userInfo = data.user;

  return (
    <div className="container mx-auto px-6 py-15">
      <ProfileView user={userInfo} />
    </div>
  );
};

export default ProfilePage;

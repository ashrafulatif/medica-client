import { getLoggedInUserDataAction } from "@/actions/auth.action";
import ProfileView from "@/components/layout/ProfileView";
import { Metadata } from "next";

const ProfilePage = async () => {
  const result = await getLoggedInUserDataAction();

  return (
    <div className="container mx-auto px-6 py-15">
      <ProfileView user={result.data} />
    </div>
  );
};

export default ProfilePage;

export const metadata: Metadata = {
  title: "Profile",
  description: "Browse all medicine",
};

import { getLoggedInUserDataAction } from "@/actions/auth.action";
import ProfileView from "@/components/layout/ProfileView";
import { Metadata } from "next";
import { authGetSesssion } from "@/actions/auth.action";

const PharmacistProfilePage = async () => {
  const [profileResult, sessionResult] = await Promise.all([
    getLoggedInUserDataAction(),
    authGetSesssion(),
  ]);

  const user = profileResult.data ?? sessionResult.data?.user ?? null;

  return (
    <div className="container mx-auto px-6 py-15">
      <ProfileView user={user} />
    </div>
  );
};

export default PharmacistProfilePage;

export const metadata: Metadata = {
  title: "Profile",
  description: "Browse all medicine",
};

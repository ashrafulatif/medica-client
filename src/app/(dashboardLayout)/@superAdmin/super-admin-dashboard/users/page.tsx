import UserManagement from "@/components/modules/admin/UserManagement/UserManagement";
import { Metadata } from "next";

interface UserManagementPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

const UserManagementPage = async ({
  searchParams,
}: UserManagementPageProps) => {
  const params = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <UserManagement searchParams={params} />
    </div>
  );
};

export default UserManagementPage;

export const metadata: Metadata = {
  title: "User Management",
  description: "Browse all medicine",
};

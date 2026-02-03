import AdminDashboardView from "@/components/modules/admin/admin-dashboard/AdminDashboardView";
import { Metadata } from "next";

const AdminDashboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <AdminDashboardView />
    </div>
  );
};

export default AdminDashboardPage;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Browse all medicine",
};

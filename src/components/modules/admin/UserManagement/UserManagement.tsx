import { getAllUsersAction } from "@/actions/admin.action";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, AlertCircle } from "lucide-react";
import PaginationControls from "@/components/ui/pagination-control";
import { userRoles } from "@/constants/userRoles";
import UserActions from "./UserActions";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: "ADMIN" | "CUSTOMER" | "SELLER";
  phone: string | null;
  status: "ACTIVE" | "INACTIVE";
}

interface UsersResponse {
  result: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

interface UserManagementProps {
  searchParams?: {
    page?: string;
    limit?: string;
  };
}

const UserManagement = async ({ searchParams }: UserManagementProps) => {
  const result = await getAllUsersAction(searchParams);

  if (result.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {result.error || "Failed to load users"}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const usersData = result.data as UsersResponse;
  const users = usersData?.result || [];
  const meta = usersData?.meta;

  const getRoleBadgeVariant = (role: string) => {
    if (role === userRoles.seller) {
      return "default";
    } else {
      return "secondary";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === "ACTIVE" ? "default" : "destructive";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Management ({users.length} users)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!users || users.length === 0 ? (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No users found</h3>
            <p className="text-muted-foreground">
              No users are currently registered in the system.
            </p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <Users className="h-4 w-4" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{user.name}</p>
                          {user.emailVerified && (
                            <p className="text-xs text-green-600">Verified</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {user.phone || "Not provided"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <UserActions
                        userId={user.id}
                        currentStatus={user.status}
                        userName={user.name}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {meta && <PaginationControls meta={meta} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagement;

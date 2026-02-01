import { IUserInfo } from "@/types/user.type";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Calendar, Shield, Edit, CheckCircle } from "lucide-react";

const ProfileView = ({ user }: { user: IUserInfo }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "customer":
        return "bg-blue-100 text-blue-700";
      case "admin":
        return "bg-purple-100 text-purple-700";
      case "seller":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.image || ""} />
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <Badge className={getRoleBadgeColor(user.role)} variant="secondary">
              {user.role}
            </Badge>
            <Badge className={getStatusColor(user.status)} variant="secondary">
              {user.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
            {user.emailVerified && (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
          </div>
        </div>
        <Button variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group border-2 hover:border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{user.email}</p>
                {user.emailVerified && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="font-mono text-sm text-gray-600">{user.id}</p>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="hover:shadow-lg transition-shadow duration-300 group border-2 hover:border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Account Status</p>
              <Badge
                className={getStatusColor(user.status)}
                variant="secondary"
              >
                {user.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <Badge
                className={getRoleBadgeColor(user.role)}
                variant="secondary"
              >
                {user.role}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <p className="font-medium">{formatDate(user.createdAt)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">{formatDate(user.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start">
              <Edit className="h-4 w-4 mr-2" />
              Update Profile
            </Button>
            <Button variant="outline" className="justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Change Password
            </Button>
            {!user.emailVerified && (
              <Button variant="outline" className="justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Verify Email
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileView;

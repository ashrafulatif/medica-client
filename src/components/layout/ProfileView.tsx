"use client";

import { IUserInfo } from "@/types/user.type";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Calendar, Shield, Edit, CheckCircle } from "lucide-react";
import {
  getRoleBadgeColor,
  getStatusColorProfile,
} from "@/helpers/colorHelpers";
import ProfileEditModal from "./ProfileEditModal";
import { updateProfileAction } from "@/actions/auth.action";
import { toast } from "sonner";
import { formatDate, getInitials } from "@/helpers/formatData";
import { useSession } from "@/context/authContext";

const ProfileView = ({ user }: { user: IUserInfo }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const { refreshSession } = useSession();

  const handleEditProfile = async (data: { name: string; phone: string }) => {
    try {
      console.log("Updating with data:", data);
      await updateProfileAction(data);

      // update the current user
      const updatedUser = {
        ...currentUser,
        name: data.name,
        phone: data.phone,
        updatedAt: new Date().toISOString(),
      };

      // console.log(updatedUser);
      setCurrentUser(updatedUser);

      // refresh session context
      await refreshSession();

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
      throw error;
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-16 w-16">
          <AvatarImage src={currentUser.image || ""} />
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
            {getInitials(currentUser.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">
              {currentUser.name || "Unknown User"}
            </h1>
            <Badge
              className={getRoleBadgeColor(currentUser.role)}
              variant="secondary"
            >
              {currentUser.role}
            </Badge>
            <Badge
              className={getStatusColorProfile(currentUser.status)}
              variant="secondary"
            >
              {currentUser.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{currentUser.email || "No email provided"}</span>
            {currentUser.emailVerified && (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
          </div>
        </div>
        <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
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
              <p className="font-medium">
                {currentUser.name || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">
                  {currentUser.email || "Not provided"}
                </p>
                {currentUser.emailVerified && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">
                {currentUser.phone || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="font-mono text-sm text-gray-600">
                {currentUser.id || "Unknown"}
              </p>
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
                className={getStatusColorProfile(currentUser.status)}
                variant="secondary"
              >
                {currentUser.status || "Unknown"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <Badge
                className={getRoleBadgeColor(currentUser.role)}
                variant="secondary"
              >
                {currentUser.role || "Unknown"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <p className="font-medium">
                  {currentUser.createdAt
                    ? formatDate(currentUser.createdAt)
                    : "Unknown"}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">
                {currentUser.updatedAt
                  ? formatDate(currentUser.updatedAt)
                  : "Unknown"}
              </p>
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
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Update Profile
            </Button>
            <Button variant="outline" className="justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Change Password
            </Button>
            {!currentUser.emailVerified && (
              <Button variant="outline" className="justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Verify Email
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={{
          name: currentUser.name || "",
          phone: currentUser.phone || "",
        }}
        onSave={handleEditProfile}
      />
    </div>
  );
};

export default ProfileView;

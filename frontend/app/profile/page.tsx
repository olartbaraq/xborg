"use client";

import { useState, useEffect } from "react";
import { useAuth, useUpdateUser } from "@/lib/hooks";
import { Header, Footer, ProtectedRoute } from "@/components/layout";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Avatar,
  Spinner,
} from "@/components/ui";
import { Edit2, Save, X, Mail, Calendar, CheckCircle } from "lucide-react";
import type { UpdateUserDto } from "@/lib/types";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user, isLoading } = useAuth();
  const updateUserMutation = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateUserDto>({
    firstName: "",
    lastName: "",
  });

  // Initialize form data when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      await updateUserMutation.mutateAsync({
        id: user.id,
        data: formData,
      });
      console.log(user.id, formData);
      setIsEditing(false);
    } catch (error) {
      // Error is handled by the mutation
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-borg-dark flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
            <p className="text-borg-gray">
              Manage your account settings and preferences
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Spinner size="lg" />
            </div>
          ) : user ? (
            <div className="grid gap-6 md:grid-cols-3">
              {/* Profile Card */}
              <Card className="md:col-span-1">
                <CardContent className="text-center py-8">
                  <Avatar
                    name={`${user.firstName} ${user.lastName}`}
                    size="xl"
                    className="mx-auto mb-4"
                  />
                  <h2 className="text-xl font-semibold text-white mb-1">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-borg-gray text-sm mb-4">{user.email}</p>

                  <div className="flex items-center justify-center gap-2 text-sm">
                    {user.isActive ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-borg-green" />
                        <span className="text-borg-green">Active Account</span>
                      </>
                    ) : (
                      <span className="text-borg-gray">Inactive</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Details Card */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details here
                      </CardDescription>
                    </div>
                    {!isEditing && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        leftIcon={<Edit2 className="h-4 w-4" />}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Input
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your first name"
                      />
                      <Input
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your last name"
                      />
                    </div>

                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={user.email}
                      disabled
                    />

                    {/* Account Info */}
                    <div className="pt-4 border-t border-borg-border">
                      <h3 className="text-sm font-medium text-borg-gray mb-4">
                        Account Information
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-10 w-10 rounded-lg bg-borg-card flex items-center justify-center">
                            <Mail className="h-4 w-4 text-borg-gray" />
                          </div>
                          <div>
                            <p className="text-borg-gray">Sign-in Method</p>
                            <p className="text-white">Google OAuth</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="h-10 w-10 rounded-lg bg-borg-card flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-borg-gray" />
                          </div>
                          <div>
                            <p className="text-borg-gray">Member Since</p>
                            <p className="text-white">
                              {formatDate(user.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>

                {isEditing && (
                  <CardFooter className="flex justify-end gap-3">
                    <Button
                      variant="ghost"
                      onClick={handleCancel}
                      leftIcon={<X className="h-4 w-4" />}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      isLoading={updateUserMutation.isPending}
                      leftIcon={<Save className="h-4 w-4" />}
                    >
                      Save Changes
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}

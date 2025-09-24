import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import SignInPage from "./auth/SignInPage";
import SignUpPage from "./auth/SignUpPage";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";

// Role-based router component
const RoleBasedRouter = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // Get user role from Clerk public metadata
  const userRole = user.publicMetadata?.role;

  // Redirect based on role
  switch (userRole.toLowerCase()) {
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    case "moderator":
      return <Navigate to="/moderator/dashboard" replace />;
    case "member":
    default:
      return <Navigate to="/user/dashboard" replace />;
  }
};

// Placeholder components for different roles
const MemberDashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Member Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.firstName || "Member"}!
              </p>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Member
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">My Tickets</h3>
              <p className="text-gray-600 text-sm">
                View and manage your support tickets
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Profile</h3>
              <p className="text-gray-600 text-sm">
                Update your account information
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Help & Support
              </h3>
              <p className="text-gray-600 text-sm">
                Get help with using the platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModeratorDashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Moderator Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.firstName || "Moderator"}!
              </p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Moderator
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Ticket Management
              </h3>
              <p className="text-gray-600 text-sm">
                Review and moderate support tickets
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                User Management
              </h3>
              <p className="text-gray-600 text-sm">
                Manage user accounts and permissions
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Reports & Analytics
              </h3>
              <p className="text-gray-600 text-sm">
                View system reports and statistics
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <SignedOut>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="*" element={<SignInPage />} />
        </Routes>
      </SignedOut>

      <SignedIn>
        <Routes>
          {/* Root path redirects based on user role */}
          <Route path="/" element={<RoleBasedRouter />} />

          {/* User/Member routes */}
          <Route
            path="/user/*"
            element={
              <Routes>
                <Route path="/" element={<MemberDashboard />} />
                <Route path="dashboard" element={<MemberDashboard />} />
                <Route
                  path="tickets"
                  element={
                    <div className="p-6">
                      <h2>User Tickets</h2>
                    </div>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <div className="p-6">
                      <h2>User Profile</h2>
                    </div>
                  }
                />
              </Routes>
            }
          />

          {/* Moderator routes */}
          <Route
            path="/moderator/*"
            element={
              <Routes>
                <Route path="/" element={<ModeratorDashboard />} />
                <Route path="dashboard" element={<ModeratorDashboard />} />
                <Route
                  path="tickets"
                  element={
                    <div className="p-6">
                      <h2>Moderator Tickets</h2>
                    </div>
                  }
                />
                <Route
                  path="users"
                  element={
                    <div className="p-6">
                      <h2>Manage Users</h2>
                    </div>
                  }
                />
                <Route
                  path="reports"
                  element={
                    <div className="p-6">
                      <h2>Moderator Reports</h2>
                    </div>
                  }
                />
              </Routes>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route
                  path="tickets"
                  element={
                    <div className="p-6">
                      <h2>Admin Tickets</h2>
                    </div>
                  }
                />
                <Route
                  path="users"
                  element={
                    <div className="p-6">
                      <h2>Admin Manage Users</h2>
                    </div>
                  }
                />
                <Route
                  path="moderators"
                  element={
                    <div className="p-6">
                      <h2>Manage Moderators</h2>
                    </div>
                  }
                />
                <Route
                  path="analytics"
                  element={
                    <div className="p-6">
                      <h2>System Analytics</h2>
                    </div>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <div className="p-6">
                      <h2>System Settings</h2>
                    </div>
                  }
                />
              </Routes>
            }
          />

          {/* Catch all route for signed-in users */}
          <Route
            path="*"
            element={
              <div className="p-6">
                <h2>404 - Page Not Found</h2>
                <a href="/" className="text-blue-600 hover:underline">
                  Go back to home
                </a>
              </div>
            }
          />
        </Routes>
      </SignedIn>
    </>
  );
}

export default App;

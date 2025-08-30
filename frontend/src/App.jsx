import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import SignInPage from "./auth/SignInPage";
import SignUpPage from "./auth/SignUpPage";
import HomePage from "./pages/HomePage";

// Placeholder components for different roles
const UserDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
    <p>Welcome to the user dashboard!</p>
  </div>
);

const ModeratorDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Moderator Dashboard</h1>
    <p>Welcome to the moderator dashboard!</p>
  </div>
);

const AdminDashboard = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <p>Welcome to the admin dashboard!</p>
  </div>
);

// const Home = () => (
//   <div className="p-6">
//     <h1 className="text-2xl font-bold mb-4">Welcome to AI Ticketing System</h1>
//     <SignedIn>
//       <div className="flex items-center gap-4">
//         <p>You are signed in!</p>
//         <UserButton />
//       </div>
//       <div className="mt-4">
//         <p>Navigate to your dashboard:</p>
//         <div className="flex gap-2 mt-2">
//           <a href="/user/dashboard" className="text-blue-600 hover:underline">
//             User Dashboard
//           </a>
//           <a
//             href="/moderator/dashboard"
//             className="text-green-600 hover:underline"
//           >
//             Moderator Dashboard
//           </a>
//           <a href="/admin/dashboard" className="text-red-600 hover:underline">
//             Admin Dashboard
//           </a>
//         </div>
//       </div>
//     </SignedIn>
//     <SignedOut>
//       <p>Please sign in to access the ticketing system.</p>
//     </SignedOut>
//   </div>
// );

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
          {/* Home route */}
          <Route path="/" element={<HomePage />} />

          {/* User routes */}
          <Route
            path="/user/*"
            element={
              <Routes>
                <Route path="/" element={<UserDashboard />} />
                <Route path="dashboard" element={<UserDashboard />} />
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

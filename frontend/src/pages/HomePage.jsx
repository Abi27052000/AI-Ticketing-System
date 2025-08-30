import React, { useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();

  // Mock tickets data - replace with real data from your backend
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "Login Issue",
      description: "Cannot access my account",
      status: "open",
      priority: "high",
      createdAt: "2025-01-15",
    },
    {
      id: 2,
      title: "Feature Request",
      description: "Add dark mode support",
      status: "in-progress",
      priority: "medium",
      createdAt: "2025-01-14",
    },
    {
      id: 3,
      title: "Bug Report",
      description: "Page loading slowly",
      status: "resolved",
      priority: "low",
      createdAt: "2025-01-13",
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (newTicket.title && newTicket.description) {
      const ticket = {
        id: Date.now(),
        ...newTicket,
        status: "open",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setTickets([ticket, ...tickets]);
      setNewTicket({ title: "", description: "", priority: "medium" });
      setShowCreateForm(false);
    }
  };

  const handleDeleteTicket = (id) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Show loading state while user data is being loaded
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                AI Ticketing System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {!isSignedIn ? (
                <>
                  <Button
                    onClick={() => navigate("/sign-in")}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => navigate("/sign-up")}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.firstName || user?.fullName || "User"}!
                  </span>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8",
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isSignedIn ? (
          /* Landing Page for Non-Authenticated Users */
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8 mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to AI Ticketing System
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Streamline your support workflow with intelligent ticket
                management
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Smart Automation
                  </h3>
                  <p className="text-gray-600">
                    AI-powered ticket routing and prioritization
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Real-time Tracking
                  </h3>
                  <p className="text-gray-600">
                    Monitor ticket progress and resolution times
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Priority Management
                  </h3>
                  <p className="text-gray-600">
                    Intelligent priority assignment and escalation
                  </p>
                </div>
              </div>

              <div className="space-x-4">
                <Button
                  onClick={() => navigate("/sign-up")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => navigate("/sign-in")}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Dashboard for Authenticated Users */
          <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    My Tickets
                  </h2>
                  <p className="text-gray-600">
                    Manage and track your support tickets
                  </p>
                </div>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Ticket
                </Button>
              </div>
            </div>

            {/* Create Ticket Form */}
            {showCreateForm && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Create New Ticket
                </h3>
                <form onSubmit={handleCreateTicket} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newTicket.title}
                      onChange={(e) =>
                        setNewTicket({ ...newTicket, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of the issue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newTicket.description}
                      onChange={(e) =>
                        setNewTicket({
                          ...newTicket,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                      placeholder="Detailed description of the issue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) =>
                        setNewTicket({ ...newTicket, priority: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Create Ticket
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Tickets List */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
              {tickets.length === 0 ? (
                <div className="p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No tickets yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create your first ticket to get started
                  </p>
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Create Ticket
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(ticket.status)}
                          <h3 className="text-lg font-medium text-gray-900">
                            {ticket.title}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                              ticket.priority
                            )}`}
                          >
                            {ticket.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="text-red-600 hover:text-red-900 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{ticket.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>
                          Status:{" "}
                          <span className="capitalize">
                            {ticket.status.replace("-", " ")}
                          </span>
                        </span>
                        <span>Created: {ticket.createdAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;

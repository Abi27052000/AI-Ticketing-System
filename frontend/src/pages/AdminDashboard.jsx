import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserButton, useUser } from "@clerk/clerk-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("users");

  // Fetch users from backend API
  const fetchUsers = async (role = null) => {
    try {
      setLoading(true);
      setError(null);

      let url = `${import.meta.env.VITE_BACKEND_URL}/api/users/get-users`;
      if (role && role !== "all") {
        url += `?role=${role}`;
      }

      const response = await axios.get(url);

      console.log("API Response:", response.data);

      let userData = [];

      if (
        response.data &&
        response.data.users &&
        Array.isArray(response.data.users)
      ) {
        userData = response.data.users;
      } else if (Array.isArray(response.data)) {
        userData = response.data;
      }

      setUsers(userData);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.response?.data?.message || "Failed to fetch users");
      setUsers([]); // Ensure users is always an array even on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch tickets from backend API
  const fetchTickets = async (priority = null, status = null) => {
    try {
      setLoading(true);
      setError(null);

      let url = `${import.meta.env.VITE_BACKEND_URL}/api/tickets/get-tickets`;
      const queryParams = [];
      
      if (priority && priority !== "all") {
        queryParams.push(`priority=${priority}`);
      }
      
      if (status && status !== "all") {
        queryParams.push(`status=${status}`);
      }
      
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }

      const response = await axios.get(url);

      console.log("Tickets API Response:", response.data);

      let ticketData = [];

      if (
        response.data &&
        response.data.tickets &&
        Array.isArray(response.data.tickets)
      ) {
        ticketData = response.data.tickets;
      } else if (Array.isArray(response.data)) {
        ticketData = response.data;
      }

      setTickets(ticketData);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError(err.response?.data?.message || "Failed to fetch tickets");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when dependencies change
  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers(selectedRole);
    } else if (activeTab === "tickets") {
      fetchTickets(selectedPriority, selectedStatus);
    }
  }, [selectedRole, selectedPriority, selectedStatus, activeTab]);

  // Refresh function
  const handleRefresh = () => {
    if (activeTab === "users") {
      fetchUsers(selectedRole);
    } else if (activeTab === "tickets") {
      fetchTickets(selectedPriority, selectedStatus);
    }
  };

  // Handle role filter change
  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  // Handle priority filter change
  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);
  };

  // Handle status filter change
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(null); // Clear any existing errors
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Admin Dashboard
          </h1>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading users...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Admin Dashboard
          </h1>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleRefresh}
                    className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <button
              onClick={handleRefresh}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Refresh {activeTab === "users" ? "Users" : "Tickets"}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => handleTabChange("users")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "users"
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              Users Management
            </button>
            <button
              onClick={() => handleTabChange("tickets")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "tickets"
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              Tickets Management
            </button>
          </div>

          {/* Role Filter - Only show for users tab */}
          {activeTab === "users" && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                Filter by role:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRoleChange("all")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedRole === "all"
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Users
                </button>
                <button
                  onClick={() => handleRoleChange("Member")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedRole === "Member"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Members
                </button>
                <button
                  onClick={() => handleRoleChange("Moderator")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedRole === "Moderator"
                      ? "bg-purple-100 text-purple-800 border border-purple-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Moderators
                </button>
              </div>
            </div>
          )}

          {/* Ticket Filters - Only show for tickets tab */}
          {activeTab === "tickets" && (
            <div className="space-y-4">
              {/* Priority Filter */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Filter by priority:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePriorityChange("all")}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedPriority === "all"
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Priorities
                  </button>
                  <button
                    onClick={() => handlePriorityChange("high")}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedPriority === "high"
                        ? "bg-red-100 text-red-800 border border-red-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    High
                  </button>
                  <button
                    onClick={() => handlePriorityChange("medium")}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedPriority === "medium"
                        ? "bg-orange-100 text-orange-800 border border-orange-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => handlePriorityChange("low")}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedPriority === "low"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Low
                  </button>
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">
                  Filter by status:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange("all")}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedStatus === "all"
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Status
                  </button>
                  <button
                    onClick={() => handleStatusChange("TODO")}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedStatus === "TODO"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    TODO
                  </button>
                  <button
                    onClick={() => handleStatusChange("IN_PROGRESS")}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedStatus === "IN_PROGRESS"
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange("COMPLETED")}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedStatus === "COMPLETED"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Users Section */}
        {activeTab === "users" && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedRole === "all"
                  ? `All Users (${users.length})`
                  : `${selectedRole}s (${users.length})`}
              </h2>
            </div>

            {users.length === 0 ? (
              <div className="p-6 text-center">
                <div className="text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No users found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No users with the Member role were found.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Skills
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.skills && user.skills.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {user.skills.map((skill, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-400">
                                No skills listed
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tickets Section */}
        {activeTab === "tickets" && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {(() => {
                  const filters = [];
                  if (selectedPriority !== "all") filters.push(`${selectedPriority} priority`);
                  if (selectedStatus !== "all") filters.push(`${selectedStatus} status`);
                  
                  if (filters.length === 0) {
                    return `All Tickets (${tickets.length})`;
                  } else {
                    return `Tickets - ${filters.join(', ')} (${tickets.length})`;
                  }
                })()}
              </h2>
            </div>

            {tickets.length === 0 ? (
              <div className="p-6 text-center">
                <div className="text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No tickets found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No tickets have been created yet.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deadline
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Skills Required
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tickets.map((ticket) => (
                      <tr key={ticket._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {ticket.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1 max-w-xs truncate">
                            {ticket.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              ticket.status === "TODO"
                                ? "bg-yellow-100 text-yellow-800"
                                : ticket.status === "IN_PROGRESS"
                                ? "bg-blue-100 text-blue-800"
                                : ticket.status === "COMPLETED"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              ticket.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : ticket.priority === "medium"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ticket.assignedTo || "Unassigned"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ticket.deadline
                            ? new Date(ticket.deadline).toLocaleDateString()
                            : "No deadline"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {ticket.relatedSkills &&
                            ticket.relatedSkills.length > 0 ? (
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {ticket.relatedSkills
                                  .slice(0, 3)
                                  .map((skill, index) => (
                                    <span
                                      key={index}
                                      className="inline-flex px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-800"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                {ticket.relatedSkills.length > 3 && (
                                  <span className="text-xs text-gray-500">
                                    +{ticket.relatedSkills.length - 3} more
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400">
                                No skills specified
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ticket.createdAt
                            ? new Date(ticket.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

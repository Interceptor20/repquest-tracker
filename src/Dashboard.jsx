import "./styles.css";
import {
  Calendar,
  Flag,
  Home,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  StickyNote,
} from "lucide-react";
import { useState } from "react";
import Sidebar, { SidebarItem } from "./components/Sidebar";

const Dashboard = () => {
  const activeMenu = true;
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({
    name: "",
    size: "",
    complaint: "",
    urgency: "",
  });

  const [adminView, setAdminView] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({
      ...newRequest,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequests([...requests, { ...newRequest, status: "Pending" }]);
    setNewRequest({
      name: "",
      size: "",
      complaint: "",
      urgency: "",
    });
  };

  const getPriorityColor = (urgency) => {
    switch (urgency) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const updateStatus = (index, newStatus) => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = newStatus;
    setRequests(updatedRequests);
  };

  const sidebarItems = [
    { icon: <Home size={20} />, text: "Home", path: "/" },
    {
      icon: <LayoutDashboard size={20} />,
      text: "Dashboard",
      path: "/dashboard",
    },
    { icon: <StickyNote size={20} />, text: "Requests", path: "/requests" },
    { icon: <Calendar size={20} />, text: "Calendar", path: "/calendar" },
    { icon: <Layers size={20} />, text: "Tasks", path: "/tasks" },
    { icon: <Flag size={20} />, text: "Reporting", path: "/reporting" },
  ];

  const utilityItems = [
    { icon: <Settings size={20} />, text: "Settings", path: "/settings" },
    { icon: <LifeBuoy size={20} />, text: "Help", path: "/help" },
  ];

  return (
    <div className="flex">
      <Sidebar>
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            path={item.path}
          />
        ))}
        <hr className="my-3" />
        {utilityItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            path={item.path}
          />
        ))}
      </Sidebar>
      <div className="flex flex-col justify-start w-full dashboard-container">
        <div>Create Request</div>
        {!adminView && (
          <div>
            <h1>User Request Dashboard</h1>
            <form onSubmit={handleSubmit} className="request-box">
              <div className="request-content">
                <div>
                  <label>Request Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newRequest.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label>Task Size:</label>
                  <select
                    name="size"
                    value={newRequest.size}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </div>
                <div className="full-width">
                  <label>Complaint:</label>
                  <textarea
                    name="complaint"
                    value={newRequest.complaint}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label>Urgency:</label>
                  <select
                    name="urgency"
                    value={newRequest.urgency}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <button type="submit">Submit Request</button>
            </form>
          </div>
        )}

        <h1>Your Requests</h1>
        <div>
          {requests.length === 0 ? (
            <p>No requests yet.</p>
          ) : (
            <ul>
              {requests.map((request, index) => (
                <li
                  key={index}
                  className={`request-list-item ${getPriorityColor(
                    request.urgency
                  )}`}
                >
                  <strong>{request.name}</strong> - {request.size} Task
                  <p>Complaint: {request.complaint}</p>
                  <p>Urgency: {request.urgency}</p>
                  <p>Status: {request.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-section">
          <button
            onClick={() => setAdminView(!adminView)}
            className="admin-toggle-btn"
          >
            Toggle Admin View
          </button>

          {adminView && (
            <div className="admin-view">
              <h1>Admin Request Management</h1>
              {requests.map((request, index) => (
                <div key={index} className="admin-request">
                  <p>
                    <strong>{request.name}</strong> - {request.size} Task
                  </p>
                  <p>Complaint: {request.complaint}</p>
                  <p>Urgency: {request.urgency}</p>
                  <select
                    value={request.status}
                    onChange={(e) => updateStatus(index, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Requirement Gathering">
                      Requirement Gathering
                    </option>
                    <option value="Prototyping">Prototyping</option>
                    <option value="Implementation">Implementation</option>
                    <option value="Testing">Testing</option>
                    <option value="Complete">Complete</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

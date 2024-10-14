import { useState } from "react";
import "./styles.css"; // Make sure the external CSS is linked here

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

  return (
    <div className="dashboard-container">
      <div>
        {activeMenu ? (
          <div className= "w-72 fixed sidebar bg-white">
            Sidebar
          </div>
        ) : (
          <div className="w-0">
            Sidebar w-0
          </div>
        )}
      </div>
      <h1>User Request Dashboard</h1>

      <form onSubmit={handleSubmit} className="request-box">
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

        <button type="submit">Submit Request</button>
      </form>

      <h2>Your Requests</h2>
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
            <h2>Admin Request Management</h2>
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
  );
};

export default Dashboard;

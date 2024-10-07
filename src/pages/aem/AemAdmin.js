import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./adminStyle.css";

function AemAdmin() {
  const [ticketData, setTicketData] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [statusOptions] = useState(["open", "processing", "closed"]);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await fetch('https://australia-southeast2-journaler-ai-bot.cloudfunctions.net/function-2-1');
        const data = await response.json();
        setTicketData(data.tickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTicketData();
    const interval = setInterval(fetchTicketData, 10000);
    return () => clearInterval(interval);
  }, []);

  function updateTicket(ticket_id, new_status) {
    fetch('https://australia-southeast2-journaler-ai-bot.cloudfunctions.net/function-3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticket_id: ticket_id,
        new_status: new_status,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.error('Error updating data:', data);
      })
      .catch((error) => {
        console.error('Error updating ticket:', error);
      });
  }

  const handleStatusChange = async (ticketId, newStatus) => {
    setTicketData((prevData) =>
      prevData.map((ticket) =>
        ticket.ticket_id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
    updateTicket(ticketId, newStatus);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const closeTicketDetail = () => {
    setSelectedTicket(null);
  };

  const getStatusClass = (status) => {
    if (status === "open") return "status-open";
    if (status === "processing") return "status-processing";
    if (status === "closed") return "status-closed";
    return "";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-navbar">
        <h1>Admin Dashboard</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin/tickets">Manage Tickets</Link>
          </li>
          <li>
            <Link to="/admin/settings">Settings</Link>
          </li>
        </ul>
      </nav>

      <div className="admin-main-content">
        <div className="ticket-table-container">
          <h2>Support Tickets</h2>
          <table className="ticket-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>User ID</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Resolved At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ticketData.length > 0 ? (
                ticketData.map((ticket) => (
                  <tr key={ticket.ticket_id}>
                    <td>{ticket.ticket_id}</td>
                    <td>{ticket.user_id}</td>
                    <td>{ticket.user_name}</td>
                    <td>{ticket.user_email}</td>
                    <td>{ticket.issue}</td>
                    <td>
                      <select
                        className={`status-dropdown ${getStatusClass(ticket.status)}`}
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(ticket.ticket_id, e.target.value)}
                      >
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{formatDate(ticket.created_at)}</td>
                    <td>{formatDate(ticket.updated_at)}</td>
                    <td>{ticket.resolved_at ? formatDate(ticket.resolved_at) : 'N/A'}</td>
                    <td>
                      <button
                        className="view-ticket-btn"
                        onClick={() => handleTicketClick(ticket)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No tickets available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedTicket && (
          <div className="ticket-detail-modal">
            <div className="ticket-detail-content">
              <h3>Ticket Details</h3>
              <p>
                <strong>Ticket ID:</strong> {selectedTicket.ticket_id}
              </p>
              <p>
                <strong>User ID:</strong> {selectedTicket.user_id}
              </p>
              <p>
                <strong>User Name:</strong> {selectedTicket.user_name}
              </p>
              <p>
                <strong>Email:</strong> {selectedTicket.user_email}
              </p>
              <p>
                <strong>Issue:</strong> {selectedTicket.issue}
              </p>
              <p>
                <strong>Status:</strong> {selectedTicket.status}
              </p>
              <p>
                <strong>Created At:</strong> {formatDate(selectedTicket.created_at)}
              </p>
              <p>
                <strong>Updated At:</strong> {formatDate(selectedTicket.updated_at)}</p>
              <p>
                <strong>Resolved At:</strong> {selectedTicket.resolved_at ? formatDate(selectedTicket.resolved_at) : 'N/A'}
              </p>
              <button className="close-btn" onClick={closeTicketDetail}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AemAdmin;

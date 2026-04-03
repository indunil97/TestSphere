import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);

  const [form, setForm] = useState({
    test_type: "",
    location: "",
    deadline: "",
  });

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Load data
useEffect(() => {
  fetch("http://localhost:5000/api/requests")
    .then((res) => res.json())
    .then((data) => {
      console.log("DATA:", data);

      if (Array.isArray(data)) {
        setRequests(data);
      } else if (Array.isArray(data.data)) {
        setRequests(data.data);
      } else {
        setRequests([]);
      }
    })
    .catch((err) => {
      console.error(err);
      setRequests([]);
    });
}, []);

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add request
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((newItem) => {
        setRequests([...requests, newItem]);
        setForm({ test_type: "", location: "", deadline: "" });
      })
      .catch((err) => console.error(err));
  };

  // Delete
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/requests/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setRequests(requests.filter((r) => r.id !== id));
      })
      .catch((err) => console.error(err));
  };

  // Update
  const handleUpdate = (id) => {
    fetch(`http://localhost:5000/api/requests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test_type: editText }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setRequests(
          requests.map((r) => (r.id === id ? updated : r))
        );
        setEditId(null);
        setEditText("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h2>Test Requests</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          name="test_type"
          placeholder="Test Type"
          value={form.test_type}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit" className="add-btn">Add Request</button>
      </form>

      <hr />

      {/* LIST */}
      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <div>
          {requests.map((req) => (
            <div className="card">
              {editId === req.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <br /><br />

                  <button className="save-btn" onClick={() => handleUpdate(req.id)}>
  Save
</button>

                  <button className="cancel-btn" onClick={() => setEditId(null)}>
  Cancel
</button>
                </>
              ) : (
                <>
                  <h3>{req.test_type || req.testType}</h3>
                  <p>{req.location}</p>
                  <p>{req.deadline}</p>

                  <button className="delete-btn" onClick={() => handleDelete(req.id)}>
                   Delete
                  </button>

                  <button
  className="edit-btn"
  onClick={() => {
    setEditId(req.id);
    setEditText(req.test_type || req.testType);
  }}
>
  Edit
</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
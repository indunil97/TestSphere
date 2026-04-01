const pool = require("../config/db");
exports.createRequest = async(req, res) => {
  const { testType, location, deadline } = req.body;

  if (!testType || !location || !deadline) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }
  try {
    const result = await pool.query(
      "INSERT INTO requests (test_type, location, deadline) VALUES ($1, $2, $3) RETURNING *",
      [testType, location, deadline]
    );

    res.status(201).json({
      message: "Request created",
      data: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error",error:error.message });
  }

};

exports.getAllRequests = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM requests");

    res.json({
      data: result.rows
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.deleteRequest = (req, res) => {
  const id = parseInt(req.params.id);

  // find index
  const index = requests.findIndex(req => req.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Request not found"
    });
  }

  // remove item
  const deleted = requests.splice(index, 1);

  res.json({
    message: "Request deleted successfully",
    data: deleted[0]
  });
};
exports.updateRequest = (req, res) => {
  const id = parseInt(req.params.id);
  const { testType, location, deadline } = req.body;

  // find request
  const request = requests.find(req => req.id === id);

  if (!request) {
    return res.status(404).json({
      message: "Request not found"
    });
  }

  // update fields (only if provided)
  if (testType) request.testType = testType;
  if (location) request.location = location;
  if (deadline) request.deadline = deadline;

  res.json({
    message: "Request updated successfully",
    data: request
  });
};
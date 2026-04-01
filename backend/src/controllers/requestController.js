const pool = require("../config/db");
exports.createRequest = async(req, res) => {
  const { testType, location, deadline } = req.body;

  // validation
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
exports.deleteRequest = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM requests WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    res.json({
      message: "Request deleted",
      data: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};
exports.updateRequest = (req, res) => {
  const id = parseInt(req.params.id);
  const { testType, location, deadline } = req.body;

  try {
    const result = await pool.query(
      `UPDATE requests 
       SET test_type = $1, location = $2, deadline = $3 
       WHERE id = $4 
       RETURNING *`,
      [testType, location, deadline, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    res.json({
      message: "Request updated",
      data: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};



// 🔹 DELETE REQUEST
exports.deleteRequest = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM requests WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    res.json({
      message: "Request deleted",
      data: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};